/* ==========================================================================
   KI-RA STUDIOS — THE SHELF OF WORLDS

   A studio's site is a showreel, so the projects are the interactive object
   rather than a grid beneath one. Five slabs on a rail in a dark room, each
   carrying its own artwork, each with a reflection under it. The camera dollies
   along the rail; the visitor drags, clicks a slab, or uses the controls in the
   page, and the detail panel below follows whatever is centred.

   Unlike NAMTAR and KYRAX this is a contained module, not a fixed backdrop —
   it is one instrument on the page rather than the page's atmosphere, which is
   what keeps it from reading as the same site with different colours.

   The scene announces the centred slab as a `rail` CustomEvent on its host, so
   the DOM panel and the 3D stay in step without either owning the other.
   ========================================================================== */

import { clamp, damp, pointerTracker, disposeTree } from '../shared/stage.js';

const IMG = import.meta.env.BASE_URL + 'img/';

/* Slab order is the rail order, left to right. `art` null is the redacted one:
   it gets a procedural face because there is nothing to show yet, which is
   exactly the point it is making. */
const SLABS = [
  { id: 'namtar', art: `${IMG}namtar/hero-1600.webp` },
  { id: 'cluster-namtar', art: `${IMG}namtar/surface-1280.webp` },
  { id: 'hyperion', art: `${IMG}namtar/system-1280.webp` },
  { id: 'frostheim', art: `${IMG}namtar/atmosphere-1280.webp` },
  { id: 'redacted', art: null },
];

const GAP = 21;            // rail spacing between slab centres
const SW = 15.4;           // slab width  (16:9)
const SH = 8.7;            // slab height

const VERT = /* glsl */`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAG = /* glsl */`
  uniform sampler2D uTex;
  uniform float uHasTex;
  uniform float uActive;     // 0 dormant .. 1 centred
  uniform float uMirror;     // 1 for the reflection copy
  uniform float uFade;
  uniform float uTime;
  uniform vec3  uAccent;
  varying vec2 vUv;

  // Cheap hash, for the redacted slab's static.
  float hash(vec2 p) { return fract(sin(dot(p, vec2(41.3, 289.1))) * 43758.5453); }

  void main() {
    vec3 c;
    if (uHasTex > 0.5) {
      c = texture2D(uTex, vUv).rgb;
    } else {
      // Nothing to show: a black face that tears rather than an empty panel.
      float band = step(0.985, hash(vec2(floor(vUv.y * 60.0), floor(uTime * 3.0))));
      c = vec3(0.03) + band * uAccent * 0.5 * hash(vec2(vUv.x * 20.0, uTime));
    }

    // Dormant slabs go cool and dim so the centred one reads as the subject
    // without needing a spotlight the room does not have.
    float lum = dot(c, vec3(0.299, 0.587, 0.114));
    c = mix(mix(vec3(lum) * 0.30, uAccent * lum * 0.5, 0.35), c, uActive);

    // A hairline frame, and a brighter one once centred.
    vec2 e = min(vUv, 1.0 - vUv);
    float edge = 1.0 - smoothstep(0.0, 0.006, min(e.x * (${SH.toFixed(1)} / ${SW.toFixed(1)}), e.y));
    c = mix(c, uAccent, edge * (0.25 + 0.75 * uActive));

    float a = uFade;
    if (uMirror > 0.5) {
      // The reflection is strongest where it meets the slab and gone well
      // before the bottom of the frame.
      a *= pow(1.0 - vUv.y, 2.2) * 0.34;
      c *= 0.8;
    }
    if (a < 0.004) discard;

    gl_FragColor = vec4(c, a);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

export function create({ THREE, renderer, host, canvas, mobile }) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.5, 400);

  const loader = new THREE.TextureLoader();
  const accent = new THREE.Color('#00E5FF');

  const rail = new THREE.Group();
  scene.add(rail);

  const slabs = [];
  const geo = new THREE.PlaneGeometry(SW, SH);

  SLABS.forEach((spec, i) => {
    const uniforms = {
      uTex: { value: null },
      uHasTex: { value: 0 },
      uActive: { value: i === 0 ? 1 : 0 },
      uMirror: { value: 0 },
      uFade: { value: 0 },
      uTime: { value: 0 },
      uAccent: { value: accent },
    };

    if (spec.art) {
      loader.load(spec.art, (t) => {
        t.colorSpace = THREE.SRGBColorSpace;
        t.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 8);
        uniforms.uTex.value = t;
        uniforms.uHasTex.value = 1;
      });
    }

    const mat = new THREE.ShaderMaterial({
      vertexShader: VERT, fragmentShader: FRAG, uniforms,
      transparent: true, side: THREE.DoubleSide, depthWrite: false,
    });

    const group = new THREE.Group();
    group.position.x = i * GAP;

    const face = new THREE.Mesh(geo, mat);
    face.userData.index = i;
    group.add(face);

    /* The reflection is a second draw of the same geometry, flipped. A real
       mirror here would mean a second render target for a surface nobody looks
       at directly. */
    const mirrorUniforms = { ...uniforms, uMirror: { value: 1 } };
    const mirror = new THREE.Mesh(geo, new THREE.ShaderMaterial({
      vertexShader: VERT, fragmentShader: FRAG, uniforms: mirrorUniforms,
      transparent: true, side: THREE.DoubleSide, depthWrite: false,
    }));
    mirror.position.y = -SH - 0.5;
    mirror.scale.y = -1;
    group.add(mirror);

    rail.add(group);
    slabs.push({ group, face, uniforms, mirrorUniforms, spec });
  });

  /* The floor the slabs stand on — a single gradient plane, which is all the
     room this scene needs. */
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(GAP * SLABS.length * 2, 120),
    new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: /* glsl */`
        uniform float uFade;
        varying vec2 vUv;
        void main() {
          float g = pow(1.0 - vUv.y, 3.0) * 0.5;
          gl_FragColor = vec4(vec3(0.02, 0.07, 0.10) * g, g * uFade);
        }
      `,
      uniforms: { uFade: { value: 0 } },
      transparent: true, depthWrite: false,
    })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -SH / 2 - 0.4;
  scene.add(floor);

  /* ---------------------------------------------------------------- input */
  const pointer = pointerTracker(host);
  const ray = new THREE.Raycaster();
  const ndc = new THREE.Vector2();

  let index = 0;            // the slab the page considers centred
  let railPos = 0;          // continuous, so a drag scrubs rather than steps
  let fade = 0;
  let dragged = 0;

  const announce = () => {
    host.dispatchEvent(new CustomEvent('rail', { detail: { index, id: SLABS[index].id } }));
  };

  /* Selecting from the page (the controls, or the project list) and selecting
     by clicking a slab are the same operation. */
  const select = (i) => {
    index = clamp(i, 0, SLABS.length - 1);
    announce();
  };
  host.addEventListener('rail:go', (e) => select(e.detail));

  canvas.addEventListener('pointerup', () => {
    /* A drag that ends where it started is a click. Anything further was the
       visitor scrubbing the rail, and must not also pick a slab. */
    if (dragged > 6) { dragged = 0; return; }
    dragged = 0;
    ndc.set(pointer.x, pointer.y);
    ray.setFromCamera(ndc, camera);
    const hit = ray.intersectObjects(slabs.map((s) => s.face), false)[0];
    if (hit) select(hit.object.userData.index);
  });

  function resize(w, h) {
    camera.aspect = w / h;
    /* Portrait crops the rail horizontally, which is the one axis this scene
       cannot lose — pull the camera back instead of widening the lens. */
    camera.fov = h > w ? 46 : 34;
    camera.updateProjectionMatrix();
  }
  resize(host.clientWidth || 1, host.clientHeight || 1);

  function update(dt, t) {
    fade = damp(fade, 1, 2, dt);
    floor.material.uniforms.uFade.value = fade;

    const [dx] = pointer.takeDrag();
    if (dx) {
      dragged += Math.abs(dx);
      railPos = clamp(railPos - dx * 0.012, 0, SLABS.length - 1);
      /* Scrubbing past the halfway point commits — the panel below should not
         wait for the visitor to let go. */
      const near = Math.round(railPos);
      if (near !== index) select(near);
    } else if (!pointer.down) {
      railPos = damp(railPos, index, 5, dt);
    }

    pointer.smooth(dt, 5);

    /* The rail slides under a camera that only leans. Moving the camera along
       the rail instead would swing the slabs' perspective as they pass, which
       looks like a carousel rather than a shelf. */
    rail.position.x = damp(rail.position.x, -railPos * GAP, 8, dt);
    rail.rotation.y = damp(rail.rotation.y, pointer.sx * 0.13, 4, dt);

    camera.position.set(pointer.sx * 1.6, 1.2 + pointer.sy * 1.4, 30);
    camera.lookAt(0, 0.4, 0);

    slabs.forEach((s, i) => {
      const d = Math.abs(i - railPos);
      const active = clamp(1 - d * 1.15, 0, 1);
      s.uniforms.uActive.value = damp(s.uniforms.uActive.value, active, 6, dt);
      s.mirrorUniforms.uActive.value = s.uniforms.uActive.value;
      s.uniforms.uFade.value = s.mirrorUniforms.uFade.value = fade;
      s.uniforms.uTime.value = s.mirrorUniforms.uTime.value = t;

      /* Dormant slabs sit back and turn away from the room. */
      s.group.position.z = damp(s.group.position.z, -d * 3.4, 5, dt);
      s.group.rotation.y = damp(s.group.rotation.y, (i - railPos) * -0.22, 5, dt);
      s.group.scale.setScalar(damp(s.group.scale.x, 1 - Math.min(d, 2) * 0.06, 5, dt));
    });

    renderer.render(scene, camera);
  }

  /* The page needs to know where the rail started. */
  queueMicrotask(announce);

  function dispose() {
    pointer.dispose();
    geo.dispose();
    disposeTree(scene);
  }

  return { update, resize, dispose };
}
