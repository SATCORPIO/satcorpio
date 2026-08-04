/* ==========================================================================
   PULSE   THE CONTROL ROOM

   Four screens and one signal, made literal. A 2×2 video wall hangs in a dark
   room over a wireframe waveform floor that ripples away from the cursor; the
   page scrolls the camera from a wide shot of the room down onto the wall, and
   each channel section tunes its own screen in as you reach it. Clicking a
   screen jumps the page to that channel.

   The screens carry real labels, drawn once into a canvas texture   the
   alternative is a font atlas and a glyph layout pass for twelve words that
   never change.

   Talks to the page over `channel` (scene → page, a screen was clicked) and
   `channel:go` (page → scene, a section came into view).
   ========================================================================== */

import { clamp, damp, scrollTracker, pointerTracker, disposeTree } from '../shared/stage.js';

const CHANNELS = [
  { n: '01', name: 'CREATOR NETWORK' },
  { n: '02', name: 'LIVE EXPERIENCES' },
  { n: '03', name: 'GROWTH INTELLIGENCE' },
  { n: '04', name: 'COMMUNITY FABRIC' },
];

const SW = 15, SH = 8.4, GAP = 1.3;

/* Screen faces. Static and scanlines while dormant, the label resolving out of
   the noise as the channel tunes in   the transition is the whole point, so
   `uTune` drives every term rather than switching between two looks. */
const SCREEN_FRAG = /* glsl */`
  uniform sampler2D uLabel;
  uniform float uTune;      // 0 static .. 1 on air
  uniform float uTime;
  uniform float uFade;
  uniform vec3  uAccent;
  varying vec2 vUv;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

  void main() {
    vec2 uv = vUv;

    // Untuned screens roll and tear. The roll is slow enough to read as a
    // signal that has not locked rather than as an animation.
    float roll = (1.0 - uTune) * 0.06;
    uv.y = fract(uv.y + uTime * roll);
    float tear = step(0.995, hash(vec2(floor(uv.y * 90.0), floor(uTime * 8.0))));
    uv.x += tear * (1.0 - uTune) * 0.05;

    /* Dormant screens have to be legible as static without competing with the
       one that is on air   mid-grey noise across three panels out-shouts a
       single tuned picture, and the wall stops having a subject. */
    float noise = hash(uv * 220.0 + uTime * 40.0);
    vec3 col = vec3(noise) * (1.0 - uTune) * 0.24;

    vec4 label = texture2D(uLabel, uv);
    col += label.rgb * label.a * (0.25 + 0.75 * uTune);

    // A tuned screen has its own glow; a dormant one is just a grey panel.
    col += uAccent * uTune * 0.10 * (0.7 + 0.3 * sin(uTime * 1.6));

    // Scanlines, always   this is a CRT wall either way.
    col *= 0.72 + 0.28 * sin(vUv.y * 620.0);

    // Corner falloff, so the glass reads as curved.
    vec2 d = abs(vUv - 0.5) * 2.0;
    col *= 1.0 - 0.35 * pow(max(d.x, d.y), 3.0);

    gl_FragColor = vec4(col * uFade, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

/* One label texture per screen. Drawn at a fixed size and mip-mapped, because
   these are viewed at wildly different distances as the camera pushes in. */
function labelTexture(THREE, ch, accent) {
  const c = document.createElement('canvas');
  c.width = 1024;
  c.height = 576;
  const g = c.getContext('2d');

  g.fillStyle = accent;
  g.font = '600 132px "Share Tech Mono", ui-monospace, monospace';
  g.textAlign = 'center';
  g.fillText(`CH ${ch.n}`, 512, 250);

  g.fillStyle = '#EAF0F6';
  g.font = '400 52px "Share Tech Mono", ui-monospace, monospace';
  /* Two words per line at most: at wide-shot distance a long single line is
     a grey smear rather than a channel name. */
  const words = ch.name.split(' ');
  const lines = words.length > 2 ? [words.slice(0, -1).join(' '), words.at(-1)] : [ch.name];
  lines.forEach((line, i) => g.fillText(line, 512, 340 + i * 66));

  g.strokeStyle = accent;
  g.lineWidth = 6;
  g.globalAlpha = 0.5;
  g.strokeRect(28, 28, 1024 - 56, 576 - 56);

  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export function create({ THREE, renderer, host, canvas, mobile }) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.5, 600);
  const accent = new THREE.Color('#FFA500');

  /* ------------------------------------------------------------ the wall */
  const wall = new THREE.Group();
  scene.add(wall);

  const screenGeo = new THREE.PlaneGeometry(SW, SH, 1, 1);
  const screens = CHANNELS.map((ch, i) => {
    const col = i % 2, row = (i / 2) | 0;
    const x = (col - 0.5) * (SW + GAP);
    const y = (0.5 - row) * (SH + GAP);

    const uniforms = {
      uLabel: { value: labelTexture(THREE, ch, '#FFA500') },
      uTune: { value: 0 },
      uTime: { value: 0 },
      uFade: { value: 0 },
      uAccent: { value: accent },
    };
    const mesh = new THREE.Mesh(screenGeo, new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
      fragmentShader: SCREEN_FRAG,
    }));
    mesh.position.set(x, y, -Math.abs(x) * 0.22);
    /* Each panel toed in toward the operator's seat, which is what makes four
       flat planes read as one wall rather than four posters. */
    mesh.rotation.y = -x * 0.021;
    mesh.userData.index = i;
    wall.add(mesh);

    /* A bezel behind each screen, so the wall has hardware. */
    const bezel = new THREE.Mesh(
      new THREE.PlaneGeometry(SW + 0.5, SH + 0.5),
      new THREE.MeshBasicMaterial({ color: 0x110E1A })
    );
    bezel.position.copy(mesh.position).setZ(mesh.position.z - 0.06);
    bezel.rotation.copy(mesh.rotation);
    wall.add(bezel);

    return { mesh, uniforms };
  });

  /* --------------------------------------------------------- the waveform */
  /* A line grid rather than a shaded surface: an oscilloscope trace is the
     reference, and a lit mesh here would look like terrain instead. */
  const NX = mobile ? 48 : 84;
  const NZ = mobile ? 26 : 44;
  const SPAN_X = 88, SPAN_Z = 62;
  const wavePos = new Float32Array(NX * NZ * 3);
  for (let z = 0; z < NZ; z++) {
    for (let x = 0; x < NX; x++) {
      const i = (z * NX + x) * 3;
      wavePos[i] = (x / (NX - 1) - 0.5) * SPAN_X;
      wavePos[i + 1] = 0;
      wavePos[i + 2] = (z / (NZ - 1) - 0.5) * SPAN_Z;
    }
  }
  /* Index only the along-X runs. Both directions doubles the line count for a
     grid that then reads as a floor plan rather than a set of traces. */
  const waveIdx = [];
  for (let z = 0; z < NZ; z++) {
    for (let x = 0; x < NX - 1; x++) {
      waveIdx.push(z * NX + x, z * NX + x + 1);
    }
  }
  const waveGeo = new THREE.BufferGeometry();
  waveGeo.setAttribute('position', new THREE.BufferAttribute(wavePos, 3).setUsage(THREE.DynamicDrawUsage));
  waveGeo.setIndex(waveIdx);
  const wave = new THREE.LineSegments(waveGeo, new THREE.LineBasicMaterial({
    color: accent, transparent: true, opacity: 0.30, blending: THREE.AdditiveBlending, depthWrite: false,
  }));
  wave.position.y = -14;
  scene.add(wave);

  /* ---------------------------------------------------------------- input */
  const pointer = pointerTracker(host, { drag: false });
  const scroll = scrollTracker([...document.querySelectorAll('[data-stage]')]);
  const ray = new THREE.Raycaster();
  const hitPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 14);
  const ripple = new THREE.Vector3(0, 0, 999);

  let tuned = -1;            // which channel is on air, -1 for none
  let fade = 0;

  canvas.addEventListener('click', () => {
    ray.setFromCamera({ x: pointer.x, y: pointer.y }, camera);
    const hit = ray.intersectObjects(screens.map((s) => s.mesh), false)[0];
    if (!hit) return;
    const i = hit.object.userData.index;
    tuned = i;
    host.dispatchEvent(new CustomEvent('channel', { detail: i }));
  });
  host.addEventListener('channel:go', (e) => { tuned = e.detail; });

  function resize(w, h) {
    camera.aspect = w / h;
    camera.fov = h > w ? 62 : 42;
    camera.updateProjectionMatrix();
  }
  resize(host.clientWidth || 1, host.clientHeight || 1);

  function update(dt, t) {
    fade = damp(fade, 1, 1.8, dt);
    pointer.smooth(dt, 5);

    /* ----------------------------------------------- scroll → camera push */
    /* Wide shot of the room at the top of the page, down onto the wall by the
       time the channel sections start. */
    const p = clamp(scroll.p * 1.9, 0, 1);
    const ease = p * p * (3 - 2 * p);
    const camZ = 62 - ease * 20;
    const camY = -9 + ease * 9;
    camera.position.set(pointer.sx * 4, camY + pointer.sy * 2.5, camZ);
    camera.lookAt(0, ease * 0.5, 0);

    wall.rotation.y = damp(wall.rotation.y, pointer.sx * -0.05, 3, dt);

    /* ---------------------------------------------------------- the trace */
    /* Where the cursor meets the floor plane, so the ripple starts under the
       pointer rather than at a projected guess. */
    if (pointer.inside) {
      ray.setFromCamera({ x: pointer.x, y: pointer.y }, camera);
      ray.ray.intersectPlane(hitPlane, ripple);
    }

    const arr = waveGeo.attributes.position.array;
    for (let z = 0; z < NZ; z++) {
      for (let x = 0; x < NX; x++) {
        const i = (z * NX + x) * 3;
        const px = arr[i], pz = arr[i + 2];
        /* Two travelling waves at different rates, so the floor never repeats
           on a beat the eye can lock onto. */
        let y = Math.sin(px * 0.10 + t * 1.5) * 1.15
              + Math.sin(pz * 0.14 - t * 0.9) * 0.85;
        if (pointer.inside) {
          const d = Math.hypot(px - ripple.x, pz - ripple.z);
          /* A ring travelling out from the cursor, damped with distance  
             a touched oscilloscope rather than a spotlight. */
          y += Math.cos(d * 0.42 - t * 5.0) * 4.6 * Math.exp(-d * 0.075);
        }
        arr[i + 1] = y;
      }
    }
    waveGeo.attributes.position.needsUpdate = true;
    wave.material.opacity = 0.30 * fade;

    /* ------------------------------------------------------------ screens */
    screens.forEach((s, i) => {
      s.uniforms.uTime.value = t;
      s.uniforms.uFade.value = fade;
      const want = i === tuned ? 1 : 0;
      /* Tuning in is slower than dropping out, which is how a real receiver
         behaves and stops the wall flickering as the page scrolls past. */
      s.uniforms.uTune.value = damp(s.uniforms.uTune.value, want, want ? 3 : 5, dt);
      s.mesh.position.z = damp(
        s.mesh.position.z,
        -Math.abs(s.mesh.position.x) * 0.22 + (i === tuned ? 1.4 : 0),
        4, dt
      );
    });

    renderer.render(scene, camera);
  }

  function dispose() {
    pointer.dispose();
    scroll.dispose();
    screenGeo.dispose();
    disposeTree(scene);
  }

  return { update, resize, dispose };
}
