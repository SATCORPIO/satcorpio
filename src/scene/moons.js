import { Group, Mesh, SphereGeometry, MeshStandardMaterial, Vector3 } from 'three';
import { MOONS, RIM_LAYER, TEX_DIR } from '../core/config.js';
import { loadHeightField } from './textures.js';

/**
 * TALOS   the larger moon. Gray volcanic surface with large impact scars
 * (spec sec.9). Blender displaces a 384x192 sphere; here the same relief rides
 * on a smooth 48x32 sphere as a baked normal map, which looks identical at the
 * size it occupies on screen and costs a fraction of the geometry.
 */
function createTalos(tex) {
  const { radius } = MOONS.talos;
  const mesh = new Mesh(
    new SphereGeometry(radius, 48, 32),
    new MeshStandardMaterial({
      map: tex.talos_albedo,
      normalMap: tex.talos_normal,
      roughness: 0.95,
      metalness: 0,
    })
  );
  mesh.castShadow = mesh.receiveShadow = true;
  mesh.layers.enable(RIM_LAYER);
  return mesh;
}

/**
 * VEYRA   a captured fragment, not a sphere. Its relief is 1.2x its own radius,
 * so a normal map cannot fake the silhouette: the vertices are actually moved.
 * The mesh is small enough (32x24) that displacing it on the CPU at load costs
 * nothing measurable.
 */
async function createVeyra() {
  const { radius } = MOONS.veyra;
  const geo = new SphereGeometry(radius, 40, 28);
  const field = await loadHeightField(`${TEX_DIR}veyra_height_lo.png`);

  const pos = geo.attributes.position;
  const uv = geo.attributes.uv;
  const v = new Vector3();
  // Blender: Displace strength 0.150, midlevel 0.42, on radius 0.125 BU.
  const strength = (0.150 / 0.125) * radius;

  for (let i = 0; i < pos.count; i++) {
    const u = uv.getX(i);
    const t = uv.getY(i);
    // SphereGeometry's own UVs, so the sampling matches the way an equirect map
    // would land on this mesh. V is flipped: image row 0 is the north pole.
    const px = Math.min(field.width - 1, Math.max(0, Math.round(u * (field.width - 1))));
    const py = Math.min(field.height - 1, Math.max(0, Math.round((1 - t) * (field.height - 1))));
    const h = field.data[py * field.width + px];
    v.fromBufferAttribute(pos, i);
    v.setLength(radius + (h - 0.42) * strength);
    pos.setXYZ(i, v.x, v.y, v.z);
  }
  pos.needsUpdate = true;
  /* The seam and the poles share vertices across UV boundaries, so normals have
     to be rebuilt from the moved geometry or the lighting cracks along them. */
  geo.computeVertexNormals();

  const mesh = new Mesh(geo, new MeshStandardMaterial({
    color: 0x4a4744,      // dark rocky surface, spec sec.9
    roughness: 1,
    metalness: 0,
  }));
  mesh.castShadow = mesh.receiveShadow = true;
  mesh.layers.enable(RIM_LAYER);
  return mesh;
}

/**
 * Both moons on invented orbits   the Blender scene places them off-axis for a
 * single still (place_off_axis) rather than on real paths. Radii sit outside
 * ANU's 100-unit orbit and inside the 430-unit zoom-out clamp.
 */
export async function createMoons(tex) {
  const group = new Group();
  const talos = createTalos(tex);
  const veyra = await createVeyra();
  group.add(talos, veyra);

  const bodies = [
    { mesh: talos, ...MOONS.talos, ang: MOONS.talos.phase, spin: 0.02 },
    { mesh: veyra, ...MOONS.veyra, ang: MOONS.veyra.phase, spin: 0.05 },
  ];

  // Veyra tumbles: a captured body has no reason to be tidally locked.
  veyra.rotation.set(0.6, 0.3, 1.1);

  function update(dt, scale) {
    for (const b of bodies) {
      b.ang += b.speed * dt * scale;
      b.mesh.position.set(
        Math.cos(b.ang) * b.orbit,
        Math.sin(b.ang) * b.orbit * Math.sin(b.inc),
        Math.sin(b.ang) * b.orbit * Math.cos(b.inc)
      );
      b.mesh.rotation.y += dt * b.spin * scale;
    }
  }

  update(0, 0);
  return { group, update, talos, veyra };
}
