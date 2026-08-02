/* ==========================================================================
   SATCORP ORBITAL

   Namtar sits at the world origin and is the centre of the whole composition:
   camera, orbits, craft attitude and the range readout are all defined against
   it. The planet, its clouds, atmosphere, ring and moons come from the NAMTAR
   Blender project; the craft, HUD and telemetry are the mission-control frame
   built around them.

   Scale is deliberately non-literal — the craft are drawn large against the
   planet so they stay readable as tracking targets.
   ========================================================================== */
import { Clock, Group, Raycaster, Vector2, Vector3, Color } from 'three';

import { REDUCED, PR, SUNDIR, CRAFT_ORBITS } from './core/config.js';
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

import { createRouter } from './hud/router.js';
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

cv.addEventListener('pointerdown', (e) => {
  drag = true;
  moved = 0;
  px = e.clientX;
  py = e.clientY;
  cv.classList.add('dragging');
  cv.setPointerCapture(e.pointerId);
});
cv.addEventListener('pointerup', () => {
  drag = false;
  cv.classList.remove('dragging');
});
cv.addEventListener('pointermove', (e) => {
  if (drag) {
    const dx = e.clientX - px;
    const dy = e.clientY - py;
    moved += Math.abs(dx) + Math.abs(dy);
    cam.tTheta -= dx * 0.0045;
    cam.tPhi = Math.max(0.28, Math.min(2.6, cam.tPhi - dy * 0.0038));
    px = e.clientX;
    py = e.clientY;
  }
  ptr.x = (e.clientX / innerWidth) * 2 - 1;
  ptr.y = -(e.clientY / innerHeight) * 2 + 1;
});
addEventListener('wheel', (e) => {
  const lo = focus ? 9 : 95;
  const hi = focus ? 34 : 430;
  cam.tRad = Math.max(lo, Math.min(hi, cam.tRad + e.deltaY * (focus ? 0.02 : 0.1)));
}, { passive: true });

/* ----------------------------------------------------------------- picking */
const ray = new Raycaster();
const tag = createTag();
const pin = createPin();
let hover = null;

cv.addEventListener('click', () => {
  // A drag that ends over a craft is not a click on it.
  if (hover && moved < 8) router.go(hover.id);
});

function pick() {
  ray.setFromCamera(ptr, camera);
  const hits = ray.intersectObjects(CRAFT.map((c) => c.group), true);
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
    cv.classList.toggle('over', !!found);
    if (found) tag.lock(DATA[found.id]);
    else tag.clear();
  }
  if (hover) tag.place(hover.group.position, camera);
}

/* ------------------------------------------------------------------- HUD */
const telemetry = createTelemetry();

const router = createRouter({
  onSelect(id) {
    if (id === 'satcorp') {
      focus = null;
      tLook.set(0, 0, 0);
      cam.tRad = 225;
      cam.tPhi = 1.22;
      // Orbital motion is the largest moving thing on screen; a reduced-motion
      // request should stop it here too, not only in the focused view.
      tOrbitScale = REDUCED ? 0 : 1;
    } else {
      focus = CRAFT.find((c) => c.id === id);
      cam.tRad = 15;
      cam.tPhi = 1.32;
      tOrbitScale = REDUCED ? 0 : 0.1;
      hover = null;
      tag.clear();
      cv.classList.remove('over');
    }
  },
});

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

function tick() {
  requestAnimationFrame(tick);
  const dt = Math.min(clock.getDelta(), 0.05);
  const t = clock.elapsedTime;
  orbitScale += (tOrbitScale - orbitScale) * Math.min(1, dt * 2.4);

  /* The surface shader needs the sun in the planet's own frame, because the
     planet turns underneath it — a world-space vector would drag the terminator
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

    const on = focus === c || hover === c;
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

  look.lerp(tLook, Math.min(1, dt * 2.2));
  if (!drag && !focus && !REDUCED) cam.tTheta += dt * 0.011;
  cam.theta += (cam.tTheta - cam.theta) * Math.min(1, dt * 4);
  cam.phi += (cam.tPhi - cam.phi) * Math.min(1, dt * 4);
  cam.rad += (cam.tRad - cam.rad) * Math.min(1, dt * 2.4);
  applyCam();

  if (!focus) pick();
  pin(camera, !!focus);
  landmarks?.update(!!focus);
  telemetry(t, cam, camera);

  composer.render(t);
}

addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
  composer.resize();
});

router.start();
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
