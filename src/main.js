/* ==========================================================================
   SATCORP ORBITAL

   Namtar sits at the world origin and is the centre of the whole composition:
   camera, orbits, craft attitude and the range readout are all defined against
   it. The planet, its clouds, atmosphere, ring and moons come from the NAMTAR
   Blender project; the craft, HUD and telemetry are the mission-control frame
   built around them.

   Scale is deliberately non-literal the craft are drawn large against the
   planet so they stay readable as tracking targets.
   ========================================================================== */
/* Old #/division links become page loads. Imported first so it runs before
   three.js is evaluated   no reason to build a scene for a page about to
   unload. */
import './hud/legacy.js';

import { Clock, Group, Raycaster, Sphere, Vector2, Vector3, Color } from 'three';

import {
  REDUCED, PR, SUNDIR, CRAFT_ORBITS, COARSE, MAX_DPR, MIN_DPR,
} from './core/config.js';
import { DATA } from './content/data.js';

import { createRenderer, createLights } from './scene/renderer.js';
import { loadTextures } from './scene/textures.js';
import { createSurface } from './scene/planet.js';
import { createClouds } from './scene/clouds.js';
import { createAtmosphere } from './scene/atmosphere.js';
import { createRing } from './scene/ring.js';
import { createMoons } from './scene/moons.js';
import { createStars } from './scene/stars.js';
import { buildCraft } from './scene/craft.js';
import { orbitRing, beam, surveyLattice } from './scene/orbits.js';
import { createComposer } from './post/composer.js';

import { createMenu } from './hud/menu.js';
import { createBoot } from './hud/boot.js';
import { createTelemetry } from './hud/telemetry.js';
import { createTag, createPin } from './hud/callouts.js';
import { createLandmarks } from './hud/landmarks.js';

const { renderer, scene, camera } = createRenderer();
const cv = renderer.domElement;
const { sun, shadowCam } = createLights(scene);

/* ------------------------------------------------------------------ assets */
const { tex, ready } = loadTextures(renderer.capabilities.getMaxAnisotropy());
createBoot(ready);

/* ------------------------------------------------------------------ planet */
const planet = new Group();
scene.add(planet);

const surface = createSurface(tex);
planet.add(surface);

const clouds = createClouds(tex);
planet.add(clouds);

const atmosphere = createAtmosphere();
planet.add(atmosphere);

const lattice = surveyLattice();
planet.add(lattice);

const ring = createRing();
scene.add(ring);

scene.add(createStars(tex));

let moons = null;
createMoons(tex).then((m) => {
  moons = m;
  scene.add(m.group);
}).catch((err) => console.error('moons unavailable', err));

/* -------------------------------------------------------------- spacecraft */
const CRAFT = [];
for (const [id, rad, inc, phase, speed] of CRAFT_ORBITS) {
  const d = DATA[id];
  const c = buildCraft(d.color, d.payload);
  scene.add(c.group);
  const trail = orbitRing(rad, inc, d.color);
  scene.add(trail);
  const link = beam(d.color);
  scene.add(link);
  CRAFT.push({
    id, ...c, rad, inc, ang: phase, speed, ring: trail, beam: link,
    act: 0, color: new Color(d.color),
  });
}

/* ------------------------------------------------------------------ camera */
/* The default range frames Namtar as the hero: the planet fills roughly half
   the viewport height, with the inner orbits reading clearly around it. */
const cam = { theta: 0.7, phi: 1.22, rad: 225, tTheta: 0.7, tPhi: 1.22, tRad: 225 };
const look = new Vector3();
const tLook = new Vector3();
let focus = null;
let orbitScale = 1;
let tOrbitScale = 1;

function applyCam() {
  const s = Math.sin(cam.phi);
  camera.position.set(
    look.x + cam.rad * s * Math.sin(cam.theta),
    look.y + cam.rad * Math.cos(cam.phi),
    look.z + cam.rad * s * Math.cos(cam.theta)
  );
  camera.lookAt(look);
}

let drag = false;
let px = 0;
let py = 0;
let moved = 0;
const ptr = new Vector2(-9, -9);

/* Live pointers, keyed by id. One is a drag, two are a pinch. Tracking them in
   a map rather than with a boolean is what lets a phone zoom at all   the wheel
   event below has no touch equivalent. */
const pointers = new Map();
let pinch = 0;

function spread() {
  const [a, b] = [...pointers.values()];
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function zoom(d) {
  const lo = focus ? 9 : 95;
  const hi = focus ? 34 : 430;
  cam.tRad = Math.max(lo, Math.min(hi, cam.tRad + d));
}

function aim(e) {
  ptr.x = (e.clientX / innerWidth) * 2 - 1;
  ptr.y = -(e.clientY / innerHeight) * 2 + 1;
}

function startDrag(x, y) {
  drag = true;
  moved = 0;
  px = x;
  py = y;
  cv.classList.add('dragging');
}

cv.addEventListener('pointerdown', (e) => {
  // Once a departure is under way the camera belongs to the transition.
  if (departing) return;
  pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
  cv.setPointerCapture(e.pointerId);

  if (pointers.size === 2) {
    // Second finger down: stop orbiting, start pinching.
    drag = false;
    cv.classList.remove('dragging');
    pinch = spread();
    return;
  }
  // Three or more: no gesture. Drop the pinch reference so coming back down to
  // two fingers re-arms against where they are now rather than jumping.
  if (pointers.size > 2) { pinch = 0; return; }

  startDrag(e.clientX, e.clientY);
  /* Touch has no hover, so the pick a mouse would have done on its way in has
     to happen here   otherwise a tap lands with nothing under the cursor and
     the click below has nothing to select. */
  aim(e);
  if (!focus) pick();
});

cv.addEventListener('pointermove', (e) => {
  if (pointers.has(e.pointerId)) pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

  if (pointers.size === 2) {
    const d = spread();
    /* Pinching apart pulls the camera in, which is the gesture everyone
       expects. The rates put a full-screen pinch at roughly two-thirds of each
       range   enough to cross most of it in one gesture, not so much that a
       small adjustment slams into a clamp. */
    if (pinch) zoom((pinch - d) * (focus ? 0.055 : 0.55));
    pinch = d;
    return;
  }

  if (drag) {
    const dx = e.clientX - px;
    const dy = e.clientY - py;
    moved += Math.abs(dx) + Math.abs(dy);
    cam.tTheta -= dx * 0.0045;
    cam.tPhi = Math.max(0.28, Math.min(2.6, cam.tPhi - dy * 0.0038));
    px = e.clientX;
    py = e.clientY;
  }
  aim(e);
});

function release(e) {
  pointers.delete(e.pointerId);
  if (pointers.size < 2) pinch = 0;
  if (pointers.size === 1) {
    // Coming out of a pinch with a finger still down: hand it the drag, and
    // treat it as a fresh gesture so the leftover travel is not a click.
    const [p] = [...pointers.values()];
    startDrag(p.x, p.y);
    moved = 99;
  } else if (pointers.size === 0) {
    drag = false;
    cv.classList.remove('dragging');
  }
}
cv.addEventListener('pointerup', release);
cv.addEventListener('pointercancel', release);

addEventListener('wheel', (e) => {
  if (departing) return;
  zoom(e.deltaY * (focus ? 0.02 : 0.1));
}, { passive: true });

/* ----------------------------------------------------------------- picking */
const ray = new Raycaster();
const tag = createTag();
const pin = createPin();
const CRAFT_GROUPS = CRAFT.map((c) => c.group);
/* Namtar is a sphere of known radius at the origin, so hit-testing it is one
   quadratic rather than the ~12k ray-triangle tests a mesh raycast would run
   every frame. */
const NAMTAR = new Sphere(new Vector3(0, 0, 0), PR);
const hitPoint = new Vector3();
let hover = null;
/* Set while a menu entry is hovered. The list and the objects are the same set
   of things, so pointing at one lights the other. */
let preview = null;
let onPlanet = false;

cv.addEventListener('click', () => {
  // A drag that ends over something is not a click on it.
  if (moved >= 8 || departing) return;
  if (hover) depart(hover.id);
  else if (onPlanet) depart('namtar');
});

function pick() {
  ray.setFromCamera(ptr, camera);
  const hits = ray.intersectObjects(CRAFT_GROUPS, true);
  let found = null;
  if (hits.length) {
    let o = hits[0].object;
    while (o && !found) {
      found = CRAFT.find((c) => c.group === o);
      o = o.parent;
    }
  }
  if (found !== hover) {
    hover = found;
    if (found) tag.lock(DATA[found.id]);
    else tag.clear();
  }
  if (hover) tag.place(hover.group.position, camera);

  // A craft in front of the disc wins; the planet is only pickable behind it.
  onPlanet = !found && ray.ray.intersectSphere(NAMTAR, hitPoint) !== null;
  cv.classList.toggle('over', !!found || onPlanet);
}

/* ------------------------------------------------------------------- HUD */
const telemetry = createTelemetry();

// A phone has no cursor to put over anything, so the deck says "tap" instead.
document.getElementById('deck-hint').textContent = COARSE
  ? 'DRAG TO ORBIT · PINCH TO ZOOM · TAP A CRAFT OR NAMTAR'
  : 'DRAG TO ORBIT · SELECT A CRAFT OR NAMTAR';

/* ------------------------------------------------------------- departure */
/*
 * Choosing a division is a journey rather than a state change. The camera dives
 * at the object, the object's own colour washes over the frame, and the section
 * page takes over behind it.
 *
 * The two halves deliberately overlap. The wash is opaque before the navigation
 * fires, and every section page fades in from the same colour the wash ended on
 * (DATA[id].pageBg, which each page also sets as its --bg), so what the viewer
 * sees is one continuous move into the object   not a transition, then a blank
 * frame, then a page.
 */
const warp = document.getElementById('warp');
const nodeEl = document.getElementById('s-node');
const viewEl = document.getElementById('t-view');
let departing = false;

function depart(id) {
  if (departing) return;
  const d = DATA[id];
  if (!d) return;
  departing = true;

  warp.style.setProperty('--warp', d.color);
  warp.style.setProperty('--warp-bg', d.pageBg);
  document.documentElement.style.setProperty('--accent', d.color);
  document.body.classList.add('departing');
  nodeEl.textContent = d.call;
  viewEl.textContent = `ENTERING · ${d.name.toUpperCase()}`;

  hover = null;
  preview = null;
  tag.clear();
  cv.classList.remove('over');

  const leave = () => { location.href = `${import.meta.env.BASE_URL}${id}/`; };

  /* A reduced-motion request gets the same navigation without the dive: the
     wash alone, short enough not to feel like a stall. */
  if (REDUCED) {
    warp.classList.add('on');
    setTimeout(leave, 300);
    return;
  }

  if (id === 'namtar') {
    // No craft to follow   fall toward the planet until it fills the frame.
    focus = null;
    tLook.set(0, 0, 0);
    cam.tRad = PR * 1.3;
    cam.tPhi = 1.28;
  } else {
    focus = CRAFT.find((c) => c.id === id) ?? null;
    cam.tRad = 11;
    cam.tPhi = 1.32;
  }
  tOrbitScale = 0.06;

  setTimeout(() => warp.classList.add('on'), 330);
  setTimeout(leave, 890);
}

/* The limb callout is the discoverable half of the planet click   the hit area
   itself is the whole disc, which nothing on screen announces. */
document.getElementById('pin').querySelector('.bx')
  .addEventListener('click', () => depart('namtar'));

document.getElementById('home').addEventListener('click', () => {
  if (departing) return;
  focus = null;
  tLook.set(0, 0, 0);
  cam.tRad = 225;
  cam.tPhi = 1.22;
});

const menu = createMenu({
  onEnter: depart,
  onPreview(id) {
    if (departing) return;
    preview = id ? CRAFT.find((c) => c.id === id) ?? null : null;
    menu.highlight(id);
  },
});

/* Orbital motion is the largest moving thing on screen, so a reduced-motion
   request stops it before the first frame rather than after one. */
if (REDUCED) { orbitScale = 0; tOrbitScale = 0; }

let landmarks = null;
createLandmarks({
  planet, ring, camera,
  onOpen: () => { /* card handles its own presentation */ },
}).then((l) => { landmarks = l; })
  .catch((err) => console.warn('landmarks unavailable', err));

/* ------------------------------------------------------------------- post */
const composer = createComposer(renderer, scene, camera);

/* ------------------------------------------------------------------- loop */
const clock = new Clock();
const tmp = new Vector3();
const sunLocal = new Vector3();
const TAU = Math.PI * 2;

/* Quality governor.

   Every phone is a different GPU and none of them say so, and the tiers in
   config.js are a guess made from viewport width. This measures instead: a
   second of frame times, and if the device cannot hold the target it gives
   something up. What it gives up, and in what order, is the whole design:

     1. bloom resolution   bloom is already a blur, so running its five-tap
        pyramid at half linear resolution is the largest saving available for
        the least visible cost. This is the step to spend first, and on mobile
        it has already been spent at startup.
     2. framebuffer   a quarter step at a time. This softens everything,
        including type, so it comes second.
     3. frame rate   at the resolution floor there is nothing left to sharpen
        away, and a steady 30 beats a 45 that stutters. It also roughly halves
        what the GPU draws, which on a phone is battery rather than pixels.

   Every step is one-way. A ratio that walks both ways oscillates   dropping
   quality raises the frame rate, which is exactly the condition for putting it
   back   and a scene that visibly resamples itself once a second is worse than
   one that is simply a little soft. The first three seconds are ignored so
   texture uploads and shader compilation are not mistaken for a slow GPU. */
const DPR_CEIL = Math.min(devicePixelRatio, MAX_DPR);
let dpr = DPR_CEIL;
let perfT = 0;
let perfN = 0;
let warmup = 3;
let capped = false;

function governor(dt) {
  if (capped) return;                       // nothing left to give up
  if (warmup > 0) { warmup -= dt; return; }
  perfT += dt;
  perfN++;
  if (perfT < 1) return;
  const fps = perfN / perfT;
  perfT = 0;
  perfN = 0;
  if (fps >= 40) return;

  if (composer.setQuality('reduced')) return;
  if (dpr > MIN_DPR) {
    dpr = Math.max(MIN_DPR, dpr - 0.25);
    renderer.setPixelRatio(dpr);
    composer.resize();
    return;
  }
  capped = true;
}

/* Half-rate drawing, engaged only at the very bottom of the governor. The loop
   still runs its updates every frame   camera easing, orbits and telemetry all
   advance on the real delta, so nothing runs at half speed   and it is only the
   render that is skipped. */
let skipDraw = false;

function tick() {
  requestAnimationFrame(tick);
  /* A backgrounded tab already stops getting frames, but an on-screen page
     under a native share sheet or a locked phone does not always   and this
     scene is not cheap to keep drawing to nobody. */
  if (document.hidden) { clock.getDelta(); return; }
  const dt = Math.min(clock.getDelta(), 0.05);
  const t = clock.elapsedTime;
  governor(dt);
  skipDraw = capped && !skipDraw;
  orbitScale += (tOrbitScale - orbitScale) * Math.min(1, dt * 2.4);

  /* The surface shader needs the sun in the planet's own frame, because the
     planet turns underneath it   a world-space vector would drag the terminator
     across the map. */
  sunLocal.copy(SUNDIR).applyQuaternion(planet.quaternion.clone().invert());
  surface.userData.uniforms.uSunLocal.value.copy(sunLocal);
  surface.userData.uniforms.uTime.value = t;
  clouds.userData.uniforms.uSun.value.copy(SUNDIR);
  clouds.userData.uniforms.uTime.value = t;
  atmosphere.userData.uniforms.uSun.value.copy(SUNDIR);
  atmosphere.userData.uniforms.uTime.value = t;
  ring.userData.uniforms.uSun.value.copy(SUNDIR);

  if (!REDUCED) {
    planet.rotation.y += dt * 0.0075;
    clouds.rotation.y += dt * 0.0032;          // the deck drifts against the surface
    lattice.rotation.y += dt * 0.009;
    const scan = lattice.material.uniforms.uScan;
    scan.value += dt * 0.34;
    if (scan.value > 1.9) scan.value = -1.9;
    moons?.update(dt, 1);
  }

  for (const c of CRAFT) {
    c.ang += c.speed * dt * orbitScale;
    c.group.position.set(
      Math.cos(c.ang) * c.rad,
      Math.sin(c.ang) * c.rad * Math.sin(c.inc),
      Math.sin(c.ang) * c.rad * Math.cos(c.inc)
    );
    // nadir-pointing attitude: payload away from Namtar, then track along velocity
    tmp.set(0, 0, 0).sub(c.group.position).normalize();
    c.group.up.copy(tmp).negate();
    c.group.lookAt(
      c.group.position.x - Math.sin(c.ang),
      c.group.position.y + Math.cos(c.ang) * Math.sin(c.inc),
      c.group.position.z + Math.cos(c.ang) * Math.cos(c.inc)
    );
    for (const w of c.wings) w.rotation.x = Math.atan2(SUNDIR.y, SUNDIR.z) + t * 0.02;

    const on = focus === c || hover === c || preview === c;
    c.act += ((on ? 1 : 0) - c.act) * Math.min(1, dt * 5);
    const halo = c.halo.material;
    halo.opacity += (((on ? 0.95 : 0.42) + Math.sin(t * 2.4 + c.ang * 3) * 0.18) - halo.opacity)
      * Math.min(1, dt * 6);

    const ru = c.ring.material.uniforms;
    ru.uHead.value = ((c.ang / TAU) % 1 + 1) % 1;
    ru.uAct.value = c.act;

    // downlink, Namtar's surface to the craft; hidden while focused as it
    // clutters a close-up
    const bp = c.beam.geometry.attributes.position;
    const P = c.group.position;
    const k = (PR * 1.02) / Math.max(1e-3, P.length());
    bp.setXYZ(0, P.x * k, P.y * k, P.z * k);
    bp.setXYZ(1, P.x, P.y, P.z);
    bp.needsUpdate = true;
    const bu = c.beam.material.uniforms;
    bu.uT.value = t * 0.55;
    bu.uOn.value += (((focus ? 0 : 1) * (0.35 + c.act * 0.65)) - bu.uOn.value) * Math.min(1, dt * 4);
  }

  /* The shadow frustum follows the subject: tight on a focused craft so the
     close-up gets crisp contact shadows, system-wide otherwise. */
  const half = focus ? 18 : 110;
  if (shadowCam.right !== half) {
    shadowCam.left = -half;
    shadowCam.right = half;
    shadowCam.top = half;
    shadowCam.bottom = -half;
    shadowCam.updateProjectionMatrix();
  }
  if (focus) {
    tLook.copy(focus.group.position);
    sun.position.copy(focus.group.position).add(tmp.copy(SUNDIR).multiplyScalar(300));
    sun.target.position.copy(focus.group.position);
  } else {
    sun.position.copy(SUNDIR).multiplyScalar(300);
    sun.target.position.set(0, 0, 0);
  }
  sun.target.updateMatrixWorld();

  look.lerp(tLook, Math.min(1, dt * (departing ? 4.4 : 2.2)));
  if (!drag && !focus && !REDUCED && !departing) cam.tTheta += dt * 0.011;
  cam.theta += (cam.tTheta - cam.theta) * Math.min(1, dt * 4);
  cam.phi += (cam.tPhi - cam.phi) * Math.min(1, dt * 4);
  /* A departure covers most of the range from 225 units to arm's length in
     under a second, so the approach runs at roughly twice the rate the camera
     uses for an ordinary move   it should read as falling, not gliding. */
  cam.rad += (cam.tRad - cam.rad) * Math.min(1, dt * (departing ? 5 : 2.4));
  applyCam();

  if (!focus && !departing) pick();
  // Both are hidden during a departure; stop paying to place them as well.
  const quiet = !!focus || departing;
  pin(camera, quiet);
  landmarks?.update(quiet);
  telemetry(t, cam, camera);

  if (!skipDraw) composer.render(t);
}

/* Mobile browsers fire resize on every pixel of URL-bar travel, and each one
   here reallocates the composer's half-float target plus five bloom mips  
   dozens of times during one flick. Settling first turns that into a single
   reallocation; in the interim the canvas is CSS-stretched over the few pixels
   that changed, which nobody can see and the next frame corrects. */
let sizeW = innerWidth;
let sizeH = innerHeight;
let settle = 0;

function resize() {
  settle = 0;
  /* Never divide by a zero height. A viewport can momentarily report 0   a
     backgrounded tab, an iOS view transition, a hidden iframe   and the
     resulting NaN aspect makes projectionMatrixInverse NaN as well. That state
     is permanent: unproject stops working, so picking answers "yes" to every
     ray, and nothing later puts it back. The empty viewport is transient; the
     damage is not, so it is refused here. */
  const w = Math.max(1, innerWidth);
  const h = Math.max(1, innerHeight);
  if (w === sizeW && h === sizeH) return;
  sizeW = w;
  sizeH = h;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
  composer.resize();
}

addEventListener('resize', () => {
  clearTimeout(settle);
  settle = setTimeout(resize, 140);
});
// The new metrics are not in yet when this fires on iOS.
addEventListener('orientationchange', () => {
  clearTimeout(settle);
  settle = setTimeout(resize, 260);
});

applyCam();
tick();

/* Dev-only handle for tuning the look against the Blender reference renders:
   the shader constants here were art-directed by eye, and being able to park
   the camera and push a uniform from the console is how they got there. */
if (import.meta.env.DEV) {
  window.__satcorp = {
    cam, camera, renderer, scene, composer,
    planet, surface, clouds, atmosphere, ring, moons: () => moons, CRAFT,
    /** Frame the planet at a chosen range and sun-relative angle. */
    view(rad = 100, theta = 0.7, phi = 1.22) {
      cam.tRad = cam.rad = rad;
      cam.tTheta = cam.theta = theta;
      cam.tPhi = cam.phi = phi;
      applyCam();
    },
  };
}
