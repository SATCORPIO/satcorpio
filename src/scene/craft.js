import {
  Group, Mesh, BoxGeometry, CylinderGeometry, SphereGeometry, CircleGeometry,
  OctahedronGeometry, MeshStandardMaterial, MeshBasicMaterial, Sprite,
  SpriteMaterial, Color, AdditiveBlending, DoubleSide,
} from 'three';
import { RIM_LAYER } from '../core/config.js';
import { HULL, SOLAR, FOIL, HALO } from './proctex.js';

const METAL = (color, roughness, metalness) => new MeshStandardMaterial({
  color, roughness, metalness,
  map: HULL, bumpMap: HULL, bumpScale: 0.035, roughnessMap: HULL,
});

/**
 * One spacecraft. The payload is the point: each division's craft carries the
 * instrument that describes what that division actually does, so the silhouette
 * alone distinguishes them at tracking range.
 */
export function buildCraft(color, payload) {
  const g = new Group();
  const foil = new MeshStandardMaterial({
    map: FOIL, bumpMap: FOIL, bumpScale: 0.05, roughness: 0.36, metalness: 0.92, color: 0xffffff,
  });
  const white = METAL(0xc6ccd3, 0.58, 0.3);
  const dark = METAL(0x3e444c, 0.5, 0.8);
  const col = new Color(color);

  const bus = new Mesh(new BoxGeometry(2.2, 2.4, 2.2), foil);
  bus.castShadow = bus.receiveShadow = true;
  g.add(bus);

  const collar = new Mesh(new CylinderGeometry(1.25, 1.25, 0.34, 20), white);
  collar.position.y = 1.32;
  g.add(collar);

  const nozzle = new Mesh(new CylinderGeometry(0.16, 0.42, 0.7, 16), dark);
  nozzle.position.y = -1.5;
  g.add(nozzle);

  for (let i = 0; i < 4; i++) {                       // RCS clusters
    const a = (i / 4) * Math.PI * 2 + 0.78;
    const t = new Mesh(new CylinderGeometry(0.06, 0.12, 0.3, 8), dark);
    t.position.set(Math.cos(a) * 1.15, -0.9, Math.sin(a) * 1.15);
    t.rotation.z = Math.cos(a) * 0.6;
    t.rotation.x = -Math.sin(a) * 0.6;
    g.add(t);
  }

  for (const s of [-1, 1]) {                          // division colour on the hull
    const strip = new Mesh(new BoxGeometry(0.09, 1.7, 0.09), new MeshBasicMaterial({ color: col }));
    strip.position.set(s * 1.11, 0, 1.11);
    g.add(strip);
  }

  const wings = [];
  for (const s of [-1, 1]) {
    const boom = new Mesh(new CylinderGeometry(0.09, 0.09, 1.5, 8), white);
    boom.rotation.z = Math.PI / 2;
    boom.position.x = s * 1.85;
    g.add(boom);
    const w = new Group();
    w.position.x = s * 4.9;
    const panel = new Mesh(new BoxGeometry(5.2, 0.07, 2.5), new MeshStandardMaterial({
      map: SOLAR, roughness: 0.22, metalness: 0.55, emissive: 0x0a1430, emissiveIntensity: 0.35,
    }));
    panel.castShadow = panel.receiveShadow = true;
    w.add(panel);
    const spar = new Mesh(new BoxGeometry(5.3, 0.14, 0.14), white);
    spar.position.z = -1.32;
    w.add(spar);
    g.add(w);
    wings.push(w);
  }

  const pay = new Group();
  pay.position.y = 1.9;
  g.add(pay);

  if (payload === 'optical') {                        // Ki-Ra   imaging telescope
    const tube = new Mesh(new CylinderGeometry(0.95, 0.95, 3.2, 28), white);
    tube.position.y = 1.5;
    pay.add(tube);
    const hood = new Mesh(new CylinderGeometry(1.12, 0.95, 0.9, 28, 1, true), dark);
    hood.position.y = 3.4;
    pay.add(hood);
    const lens = new Mesh(new CircleGeometry(0.93, 28), new MeshStandardMaterial({
      color: col, roughness: 0.06, metalness: 1, emissive: col, emissiveIntensity: 0.9,
    }));
    lens.position.y = 3.05;
    lens.rotation.x = -Math.PI / 2;
    pay.add(lens);
  } else if (payload === 'array') {                   // PULSE   phased array
    const face = new Mesh(new BoxGeometry(3.6, 0.22, 3.6), white);
    face.position.y = 1.1;
    pay.add(face);
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        const e = new Mesh(new CylinderGeometry(0.14, 0.14, 0.24, 10), new MeshStandardMaterial({
          color: col, emissive: col, emissiveIntensity: 0.85, roughness: 0.3, metalness: 0.7,
        }));
        e.position.set((i - 2) * 0.66, 1.32, (j - 2) * 0.66);
        pay.add(e);
      }
    }
  } else if (payload === 'antenna') {                 // KYRAX   dish cluster
    [[0, 1.9, 0, 1.5], [1.3, 1.2, 0.5, 0.85], [-1.15, 1.1, -0.6, 0.75]].forEach(([x, y, z, r]) => {
      const d = new Mesh(
        new SphereGeometry(r, 26, 18, 0, Math.PI * 2, 0, Math.PI / 2.5),
        new MeshStandardMaterial({ color: 0xe3e7eb, roughness: 0.2, metalness: 0.6, side: DoubleSide })
      );
      d.position.set(x, y, z);
      d.rotation.set(-0.9 + z * 0.3, x * 0.4, 0);
      pay.add(d);
      const f = new Mesh(new SphereGeometry(r * 0.13, 10, 8), new MeshStandardMaterial({
        color: col, emissive: col, emissiveIntensity: 1.2,
      }));
      f.position.set(x, y + r * 0.75, z + r * 0.3);
      pay.add(f);
    });
    const mast = new Mesh(new CylinderGeometry(0.06, 0.06, 3.4, 8), white);
    mast.position.y = 1.4;
    pay.add(mast);
  } else {                                            // ANU   instrument lab + boom
    const lab = new Mesh(new CylinderGeometry(1.05, 1.05, 2.6, 24), foil);
    lab.rotation.z = Math.PI / 2;
    lab.position.y = 0.9;
    pay.add(lab);
    const boom = new Mesh(new CylinderGeometry(0.05, 0.05, 4.4, 8), white);
    boom.position.set(0, 1.4, 2.2);
    boom.rotation.x = Math.PI / 2;
    pay.add(boom);
    const sensor = new Mesh(new OctahedronGeometry(0.34, 0), new MeshStandardMaterial({
      color: col, emissive: col, emissiveIntensity: 1.1, roughness: 0.25, metalness: 0.8,
    }));
    sensor.position.set(0, 1.4, 4.3);
    pay.add(sensor);
  }

  const beacon = new Mesh(new SphereGeometry(0.17, 12, 10), new MeshBasicMaterial({ color: col }));
  beacon.position.set(0, -1.05, 1.25);
  g.add(beacon);
  const halo = new Sprite(new SpriteMaterial({
    color: col, transparent: true, opacity: 0.5, blending: AdditiveBlending,
    depthWrite: false, map: HALO,
  }));
  halo.scale.set(3.4, 3.4, 1);
  beacon.add(halo);

  // Craft opt in to the rim light; Namtar deliberately does not.
  g.traverse((o) => {
    if (o.isMesh && !o.castShadow) { o.castShadow = true; o.receiveShadow = true; }
    o.layers.enable(RIM_LAYER);
  });

  return { group: g, wings, beacon, halo };
}
