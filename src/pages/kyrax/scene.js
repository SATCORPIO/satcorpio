/* ==========================================================================
   KYRAX   THE CORE

   One object, and it is the whole page. A single particle system sits fixed
   behind the document and re-forms as you scroll: a dense core, then five
   capability clusters, then a ring of addressed systems, then the architecture
   tree, then a constellation. Nothing is added or removed between formations  
   the same points are always all of them, which is the argument the page is
   making in the first place.

   This page ships no images. The core is the art direction, so it carries the
   weight a hero photograph would carry elsewhere, and everything else on the
   page is type over glass.
   ========================================================================== */

import { clamp, damp, scrollTracker, pointerTracker, disposeTree } from '../shared/stage.js';

/* Formations, in scroll order. Each builds one Float32Array of positions for
   the same particle budget   a formation is a rearrangement, never a different
   set of points. */
const FORMATIONS = ['core', 'clusters', 'ring', 'tree', 'constellation'];

/* Deterministic noise. Math.random() would reshuffle every formation on every
   reload, and a core that is a different shape each visit is a different logo
   each visit. */
function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/* An even sphere. The golden-angle spiral rather than random spherical coords,
   which clump at the poles and make the core look lopsided. */
function fibSphere(i, n) {
  const y = 1 - (i / (n - 1)) * 2;
  const r = Math.sqrt(Math.max(0, 1 - y * y));
  const th = i * 2.399963229728653;
  return [Math.cos(th) * r, y, Math.sin(th) * r];
}

function buildFormations(n) {
  const out = {};
  const rand = rng(0x5A7C09);
  /* One fixed jitter table reused by every formation, so a given particle keeps
     its personality   the same point stays on the outside of the cloud, at the
     edge of its cluster, and in the same arm of the tree. */
  const jit = new Float32Array(n * 3);
  for (let i = 0; i < n * 3; i++) jit[i] = rand() * 2 - 1;

  /* ---- core: a shell with a haze of infall, the object at rest ---- */
  const core = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const [x, y, z] = fibSphere(i, n);
    const r = 22 + jit[i * 3] * 3.2 + (i % 7 === 0 ? -7 * rand() : 0);
    core.set([x * r, y * r, z * r], i * 3);
  }
  out.core = core;

  /* ---- clusters: five capabilities condensing out of the cloud ---- */
  const clusters = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const k = i % 5;
    const a = (k / 5) * Math.PI * 2 - Math.PI / 2;
    const cx = Math.cos(a) * 26;
    const cy = Math.sin(a) * 15;
    const cz = Math.sin(a * 2) * 8;
    const spread = 6.5;
    clusters.set([
      cx + jit[i * 3] * spread,
      cy + jit[i * 3 + 1] * spread,
      cz + jit[i * 3 + 2] * spread,
    ], i * 3);
  }
  out.clusters = clusters;

  /* ---- ring: one intelligence, addressed from seven environments ---- */
  const ring = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    /* Most points make the band; every seventh condenses into one of the seven
       named nodes, so the nodes read as denser rather than as separate objects. */
    const node = i % 7 === 0;
    const a = node
      ? ((i / 7) % 7) / 7 * Math.PI * 2
      : (i / n) * Math.PI * 2 * 3;
    const r = node ? 30 : 30 + jit[i * 3] * 2.6;
    ring.set([
      Math.cos(a) * r + (node ? jit[i * 3] * 2 : 0),
      jit[i * 3 + 1] * (node ? 2 : 1.4),
      Math.sin(a) * r + (node ? jit[i * 3 + 2] * 2 : 0),
    ], i * 3);
  }
  out.ring = ring;

  /* ---- tree: the architecture diagram, in three dimensions ---- */
  const tree = new Float32Array(n * 3);
  const branch = [-26, 0, 26];
  for (let i = 0; i < n; i++) {
    const lane = i % 4;
    let x, y, z;
    if (lane === 0) {
      // the core node and its stem
      const t = rand();
      x = jit[i * 3] * 4 * (1 - t);
      y = 26 - t * 22;
      z = jit[i * 3 + 2] * 4 * (1 - t);
    } else {
      const b = branch[lane - 1];
      const t = rand();
      // the elbow out to a branch, then down its own leaf
      x = b * t + jit[i * 3] * 3;
      y = 4 - t * 4 - rand() * 16;
      z = jit[i * 3 + 2] * 3.4;
    }
    tree.set([x, y, z], i * 3);
  }
  out.tree = tree;

  /* ---- constellation: five bright services and a great deal of dust ---- */
  const constellation = new Float32Array(n * 3);
  const stars = [[-30, 12, 0], [-14, -14, 6], [4, 16, -8], [22, -8, 4], [34, 10, -2]];
  for (let i = 0; i < n; i++) {
    if (i % 11 === 0) {
      const s = stars[(i / 11 | 0) % 5];
      constellation.set([
        s[0] + jit[i * 3] * 2.4,
        s[1] + jit[i * 3 + 1] * 2.4,
        s[2] + jit[i * 3 + 2] * 2.4,
      ], i * 3);
    } else {
      constellation.set([
        jit[i * 3] * 44,
        jit[i * 3 + 1] * 24,
        jit[i * 3 + 2] * 20,
      ], i * 3);
    }
  }
  out.constellation = constellation;

  return out;
}

/* Edges among the first N points, each joined to its nearest neighbours in the
   core formation. The pairs are fixed, so as the points move into other
   formations the same links stretch across the new shape   the network
   re-wiring rather than being redrawn. */
function buildEdges(core, linked, perNode) {
  const pairs = [];
  for (let i = 0; i < linked; i++) {
    const best = [];
    for (let j = 0; j < linked; j++) {
      if (i === j) continue;
      const dx = core[i * 3] - core[j * 3];
      const dy = core[i * 3 + 1] - core[j * 3 + 1];
      const dz = core[i * 3 + 2] - core[j * 3 + 2];
      const d = dx * dx + dy * dy + dz * dz;
      if (best.length < perNode) {
        best.push([d, j]);
        best.sort((a, b) => a[0] - b[0]);
      } else if (d < best[perNode - 1][0]) {
        best[perNode - 1] = [d, j];
        best.sort((a, b) => a[0] - b[0]);
      }
    }
    for (const [, j] of best) if (i < j) pairs.push(i, j);
  }
  return pairs;
}

export function create({ THREE, renderer, host, mobile }) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(46, 1, 1, 500);
  camera.position.set(0, 0, 96);

  const N = mobile ? 2400 : 6000;
  const LINKED = mobile ? 120 : 220;

  const forms = buildFormations(N);
  const edgePairs = buildEdges(forms.core, LINKED, 2);

  /* Live positions, and the two formations being blended between. */
  const pos = new Float32Array(N * 3);
  pos.set(forms.core);
  const seedTint = new Float32Array(N);
  for (let i = 0; i < N; i++) seedTint[i] = (i % 7 === 0 || i % 11 === 0) ? 1 : 0;

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3).setUsage(THREE.DynamicDrawUsage));
  geo.setAttribute('aKey', new THREE.BufferAttribute(seedTint, 1));

  /* Points are drawn from a shader rather than PointsMaterial so the "key"
     particles   the ones that become nodes and stars   can be both larger and
     a different colour without a second draw call. */
  const points = new THREE.Points(geo, new THREE.ShaderMaterial({
    uniforms: {
      uSize: { value: (mobile ? 2.0 : 2.6) * Math.min(devicePixelRatio, 2) },
      uFade: { value: 0 },
      uWarm: { value: new THREE.Color('#FF6A1F') },
      uCool: { value: new THREE.Color('#7FC8FF') },
    },
    vertexShader: /* glsl */`
      attribute float aKey;
      uniform float uSize;
      varying float vKey;
      varying float vDepth;
      void main() {
        vKey = aKey;
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vDepth = clamp(1.0 - (-mv.z - 40.0) / 130.0, 0.0, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = uSize * (1.0 + aKey * 1.6) * (60.0 / -mv.z);
      }
    `,
    fragmentShader: /* glsl */`
      uniform float uFade;
      uniform vec3 uWarm;
      uniform vec3 uCool;
      varying float vKey;
      varying float vDepth;
      void main() {
        // Round, soft-edged points. The default square is the single clearest
        // tell that a particle field is untreated gl_Points.
        vec2 d = gl_PointCoord - 0.5;
        float a = smoothstep(0.5, 0.08, length(d));
        if (a < 0.01) discard;
        vec3 c = mix(uCool, uWarm, vKey * 0.85 + 0.15);
        gl_FragColor = vec4(c, a * uFade * (0.25 + 0.75 * vDepth) * (0.5 + 0.5 * vKey));
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  }));
  scene.add(points);

  /* Links. Their vertices are copied from the particle positions each frame, so
     they morph for free. */
  const linePos = new Float32Array(edgePairs.length * 3);
  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute('position', new THREE.BufferAttribute(linePos, 3).setUsage(THREE.DynamicDrawUsage));
  const lines = new THREE.LineSegments(lineGeo, new THREE.LineBasicMaterial({
    color: '#FF6A1F',
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }));
  scene.add(lines);

  /* ---------------------------------------------------------------- input */
  const pointer = pointerTracker(host, { drag: false });
  const scroll = scrollTracker([...document.querySelectorAll('[data-stage]')]);

  let fade = 0;
  let spin = 0;
  const from = new Float32Array(N * 3);
  const to = new Float32Array(N * 3);
  from.set(forms.core);
  to.set(forms.core);
  let blendA = 0, blendB = 0;         // which formations `from`/`to` hold
  const repel = new THREE.Vector3();
  const ray = new THREE.Raycaster();
  const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  const hit = new THREE.Vector3();

  function resize(w, h) {
    camera.aspect = w / h;
    camera.fov = h > w ? 62 : 46;
    camera.updateProjectionMatrix();
  }
  resize(host.clientWidth || 1, host.clientHeight || 1);

  function update(dt, t) {
    fade = damp(fade, 1, 1.6, dt);
    points.material.uniforms.uFade.value = fade;

    /* --------------------------------------------- which two formations */
    const i = clamp(scroll.index, 0, FORMATIONS.length - 1);
    const j = Math.min(i + 1, FORMATIONS.length - 1);
    if (i !== blendA || j !== blendB) {
      from.set(forms[FORMATIONS[i]]);
      to.set(forms[FORMATIONS[j]]);
      blendA = i;
      blendB = j;
    }
    /* Smoothstep rather than the raw scroll fraction: the shape should settle
       at each section rather than being continuously mid-transition. */
    const raw = scroll.section;
    const k = raw * raw * (3 - 2 * raw);

    /* ------------------------------------------------------ pointer repel */
    /* The visitor can stir the core. Unprojected onto the plane through the
       origin, so the push happens where the cursor looks like it is. */
    let repelStrength = 0;
    if (pointer.inside) {
      ray.setFromCamera({ x: pointer.x, y: pointer.y }, camera);
      if (ray.ray.intersectPlane(plane, hit)) {
        /* Into the core's own frame, since the core is spinning under it. */
        repel.copy(hit).applyAxisAngle(new THREE.Vector3(0, 1, 0), -spin);
        repelStrength = 1;
      }
    }

    /* --------------------------------------------------------- integrate */
    const arr = geo.attributes.position.array;
    const R2 = 15 * 15;
    for (let n = 0; n < N; n++) {
      const o = n * 3;
      let tx = from[o] + (to[o] - from[o]) * k;
      let ty = from[o + 1] + (to[o + 1] - from[o + 1]) * k;
      let tz = from[o + 2] + (to[o + 2] - from[o + 2]) * k;

      /* A slow per-particle drift, so a settled formation still breathes. */
      const ph = n * 0.7;
      tx += Math.sin(t * 0.5 + ph) * 0.5;
      ty += Math.cos(t * 0.43 + ph) * 0.5;

      if (repelStrength) {
        const dx = tx - repel.x;
        const dy = ty - repel.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < R2 && d2 > 0.01) {
          const push = (1 - d2 / R2) * 13;
          const inv = 1 / Math.sqrt(d2);
          tx += dx * inv * push;
          ty += dy * inv * push;
        }
      }

      /* Eased rather than assigned: the points chase their target, which is
         what makes a morph read as a swarm deciding rather than a cut. */
      const e = 1 - Math.exp(-4.5 * dt);
      arr[o] += (tx - arr[o]) * e;
      arr[o + 1] += (ty - arr[o + 1]) * e;
      arr[o + 2] += (tz - arr[o + 2]) * e;
    }
    geo.attributes.position.needsUpdate = true;

    /* Links only make sense while the shape is a network. They fade out over
       the constellation, where the point is that the structure has dispersed. */
    const linkFade = i >= 3 ? (1 - k) * (i === 3 ? 0.5 : 0) : 0.34;
    lines.material.opacity = damp(lines.material.opacity, linkFade * fade, 3, dt);
    if (lines.material.opacity > 0.004) {
      lines.visible = true;
      for (let e = 0; e < edgePairs.length; e++) {
        const s = edgePairs[e] * 3;
        linePos[e * 3] = arr[s];
        linePos[e * 3 + 1] = arr[s + 1];
        linePos[e * 3 + 2] = arr[s + 2];
      }
      lineGeo.attributes.position.needsUpdate = true;
    } else {
      lines.visible = false;
    }

    /* The whole core turns, and leans toward the pointer. */
    spin += dt * 0.09;
    pointer.smooth(dt, 4);
    points.rotation.y = lines.rotation.y = spin;
    points.rotation.x = lines.rotation.x = pointer.sy * 0.22;
    camera.position.x = damp(camera.position.x, pointer.sx * 9, 3, dt);
    camera.position.y = damp(camera.position.y, pointer.sy * -6, 3, dt);
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  }

  function dispose() {
    pointer.dispose();
    scroll.dispose();
    disposeTree(scene);
  }

  return { update, resize, dispose };
}
