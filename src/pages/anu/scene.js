/* ==========================================================================
   ANU   THE MACHINE ROOM

   The least glossy scene on the site, and deliberately. No bloom, no additive
   glow, no atmosphere: a flat-shaded low-poly rack on a drafting grid, lit by
   two lights and drawn in the same bone-on-black the rest of the page uses.
   Every other division's page is trying to impress; this one is trying to show
   you the hardware, and the visual language has to agree with that.

   Everything is built from primitives   a rack is boxes, and shipping a mesh
   for it would be shipping vertices that describe a cuboid. Three of the units
   are hotspots wired to the pillars in the page: clicking one opens its
   section, and reading a section lights its unit.

   Talks to the page over `unit` (scene → page) and `unit:go` (page → scene).
   ========================================================================== */

import { clamp, damp, pointerTracker, disposeTree } from '../shared/stage.js';

/* Which rack unit belongs to which pillar, top to bottom. `null` is filler  
   a rack with only three things in it is not a rack. */
const UNITS = [
  { u: 2, pillar: null, label: 'switch' },
  { u: 4, pillar: 0, label: 'compute' },
  { u: 2, pillar: null, label: 'blank' },
  { u: 3, pillar: 1, label: 'tooling' },
  { u: 2, pillar: null, label: 'blank' },
  { u: 4, pillar: 2, label: 'game servers' },
  { u: 3, pillar: null, label: 'psu' },
];

const RU = 1.0;            // one rack unit, in scene units
const RW = 9;              // rack width
const RD = 5.5;            // rack depth

export function create({ THREE, renderer, host, canvas, mobile }) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.5, 400);

  const ink = new THREE.Color('#EDE7DA');
  const live = new THREE.Color('#8FE388');
  const dark = new THREE.Color(0x2f3a2f);

  /* The filmic curve every other page on the site wants is wrong here. ACES
     rolls the midtones down, and a rack is nothing but midtones   under it the
     whole chassis sank to within a few values of the page background. Flat
     response instead, which is also what the drafting-table look is asking
     for: no highlight bloom to roll off, nothing to protect from clipping. */
  renderer.toneMapping = THREE.NoToneMapping;

  /* Two lights and no environment. A key from the front-left and a dim fill so
     the back of the chassis is not a silhouette. */
  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const key = new THREE.DirectionalLight(0xfff4e2, 1.5);
  key.position.set(-8, 14, 12);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0x8fa8c8, 0.5);
  fill.position.set(10, 4, -8);
  scene.add(fill);

  const rack = new THREE.Group();
  scene.add(rack);

  const totalU = UNITS.reduce((a, b) => a + b.u, 0);
  const H = totalU * RU + 2;

  /* ------------------------------------------------------------- chassis */
  /* Greys are chosen for what they read as on screen, not for what a painted
     chassis measures at: the page behind is nearly black, so anything below
     mid-grey disappears into it entirely. */
  const frameMat = new THREE.MeshLambertMaterial({ color: 0x40404a });
  const cab = new THREE.Mesh(new THREE.BoxGeometry(RW + 1, H, RD), frameMat);
  cab.position.z = -0.6;
  rack.add(cab);

  /* Rails: the two uprights a real rack screws into. */
  const railGeo = new THREE.BoxGeometry(0.34, H - 0.6, 0.34);
  const railMat = new THREE.MeshLambertMaterial({ color: 0x7c7c8a });
  for (const x of [-RW / 2 - 0.18, RW / 2 + 0.18]) {
    const r = new THREE.Mesh(railGeo, railMat);
    r.position.set(x, 0, RD / 2 - 0.2);
    rack.add(r);
  }

  /* ------------------------------------------------------------- the units */
  const sledGeo = new THREE.BoxGeometry(RW, 1, RD * 0.92);
  const ledGeo = new THREE.BoxGeometry(0.16, 0.16, 0.08);
  const units = [];
  let y = H / 2 - 1;

  for (const spec of UNITS) {
    const h = spec.u * RU - 0.14;
    const g = new THREE.Group();
    g.position.y = y - h / 2;
    y -= spec.u * RU;

    const isHot = spec.pillar !== null;
    /* The three hotspot units are a shade lighter than the filler, so the rack
       reads as having something to click before anything is hovered. */
    const mat = new THREE.MeshLambertMaterial({
      color: isHot ? 0x6d6d7b : 0x54545f,
      emissive: 0x000000,
    });
    const sled = new THREE.Mesh(sledGeo, mat);
    sled.scale.y = h;
    sled.position.z = 0.3;
    if (isHot) sled.userData.pillar = spec.pillar;
    g.add(sled);

    /* A front-panel bezel line, so units read as separate boxes rather than a
       column of one extrusion. */
    const lip = new THREE.Mesh(
      new THREE.BoxGeometry(RW - 0.4, 0.06, 0.12),
      new THREE.MeshLambertMaterial({ color: 0x9a9aab })
    );
    lip.position.set(0, -h / 2 + 0.16, RD * 0.46 + 0.3);
    g.add(lip);

    /* Status LEDs. Deterministic phases: a rack of randomly blinking lights
       reads as a fault, and a rack of synchronised ones reads as a decoration. */
    const leds = [];
    const count = isHot ? 6 : 3;
    for (let i = 0; i < count; i++) {
      const led = new THREE.Mesh(ledGeo, new THREE.MeshBasicMaterial({ color: 0x2f3a2f }));
      led.position.set(-RW / 2 + 0.7 + i * 0.34, h / 2 - 0.42, RD * 0.46 + 0.32);
      g.add(led);
      leds.push({ mesh: led, phase: (i * 2.7 + spec.u * 1.9) % 6.283, rate: 0.6 + (i % 3) * 0.45 });
    }

    rack.add(g);
    units.push({ group: g, sled, mat, leds, pillar: spec.pillar, h });
  }

  /* --------------------------------------------------------------- floor */
  /* A drafting grid, not a reflective plane. */
  const grid = new THREE.GridHelper(70, 28, 0x6a6a78, 0x3c3c46);
  grid.position.y = -H / 2 - 0.02;
  grid.material.transparent = true;
  grid.material.opacity = 0.5;
  scene.add(grid);

  /* ---------------------------------------------------------------- input */
  const pointer = pointerTracker(host);
  const ray = new THREE.Raycaster();
  const hotSleds = units.filter((u) => u.pillar !== null).map((u) => u.sled);

  let active = -1;
  let dragged = 0;
  let fade = 0;
  /* Parked at a three-quarter view: straight on, a rack is a rectangle. */
  let az = 0.62, tAz = 0.62;
  let el = 0.16, tEl = 0.16;
  let hover = -1;

  canvas.addEventListener('pointerup', () => {
    if (dragged > 6) { dragged = 0; return; }
    dragged = 0;
    ray.setFromCamera({ x: pointer.x, y: pointer.y }, camera);
    const hit = ray.intersectObjects(hotSleds, false)[0];
    if (!hit) return;
    active = hit.object.userData.pillar;
    host.dispatchEvent(new CustomEvent('unit', { detail: active }));
  });
  host.addEventListener('unit:go', (e) => { active = e.detail; });

  function resize(w, h) {
    camera.aspect = w / h;
    camera.fov = h > w ? 46 : 34;
    camera.updateProjectionMatrix();
  }
  resize(host.clientWidth || 1, host.clientHeight || 1);

  const dist = mobile ? 40 : 34;

  function update(dt, t) {
    fade = damp(fade, 1, 2, dt);

    const [dx, dy] = pointer.takeDrag();
    if (dx || dy) {
      dragged += Math.abs(dx) + Math.abs(dy);
      tAz -= dx * 0.006;
      tEl = clamp(tEl + dy * 0.004, -0.45, 0.75);
    }
    /* The rack is a thing on a table, so it does not spin freely   the drag is
       clamped either side of front-on and eases back toward it. */
    tAz = clamp(tAz, -0.95, 0.95);
    az = damp(az, tAz, 4, dt);
    el = damp(el, tEl, 4, dt);
    pointer.smooth(dt, 4);

    camera.position.set(
      Math.sin(az) * dist * Math.cos(el),
      Math.sin(el) * dist + 1.5,
      Math.cos(az) * dist * Math.cos(el)
    );
    camera.lookAt(0, 0, 0);

    /* ---------------------------------------------------------- hover pick */
    /* Done here rather than on pointermove: a raycast per mouse event is a
       raycast per pixel of travel, and the answer is only used once a frame. */
    hover = -1;
    if (pointer.inside && !pointer.down) {
      ray.setFromCamera({ x: pointer.x, y: pointer.y }, camera);
      const hit = ray.intersectObjects(hotSleds, false)[0];
      if (hit) hover = hit.object.userData.pillar;
    }
    canvas.style.cursor = hover >= 0 ? 'pointer' : '';

    /* ---------------------------------------------------------- the units */
    for (const u of units) {
      const on = u.pillar !== null && u.pillar === active;
      const hot = u.pillar !== null && u.pillar === hover;
      /* The selected unit slides out of the rack, which is the one gesture a
         rack actually makes. */
      u.group.position.z = damp(u.group.position.z, on ? 1.5 : hot ? 0.5 : 0, 6, dt);
      const target = on ? 0.16 : hot ? 0.07 : 0;
      u.mat.emissive.setScalar(damp(u.mat.emissive.r, target, 6, dt));

      for (const led of u.leds) {
        /* A slow square wave, so LEDs are on or off rather than pulsing. */
        const lit = Math.sin(t * led.rate + led.phase) > (on ? -0.4 : 0.55);
        led.mesh.material.color.copy(lit ? (on ? live : ink) : dark);
      }
    }

    rack.rotation.y = damp(rack.rotation.y, pointer.sx * 0.04, 3, dt);
    grid.material.opacity = 0.5 * fade;

    renderer.render(scene, camera);
  }

  function dispose() {
    pointer.dispose();
    sledGeo.dispose();
    ledGeo.dispose();
    railGeo.dispose();
    disposeTree(scene);
  }

  return { update, resize, dispose };
}
