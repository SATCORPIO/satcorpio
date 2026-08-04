import { Object3D, Vector3 } from 'three';
import { PR, TEX_DIR, RING_IN, RING_OUT } from '../core/config.js';
import { LANDMARKS } from '../content/data.js';
import { place } from './callouts.js';
import { scramble } from './scramble.js';

/**
 * Longitude/latitude to a direction in the planet's local frame.
 *
 * This has to agree with three's SphereGeometry, which is what the equirect maps
 * are wrapped onto: its u=0 edge sits at longitude -180 (the seam the generators
 * report as seam_lon 180) and v=0 at the north pole. Working that through gives
 * the same handedness as namtar_lib.sphere_dirs with Blender's Z-up swapped for
 * three's Y-up, so a landmark lands on the feature it names without a fudge
 * factor.
 */
export function lonLatToDirection(lonDeg, latDeg) {
  const lon = (lonDeg * Math.PI) / 180;
  const lat = (latDeg * Math.PI) / 180;
  return new Vector3(
    Math.cos(lat) * Math.cos(lon),
    Math.sin(lat),
    -Math.cos(lat) * Math.sin(lon)
  );
}

/**
 * Surface feature pins.
 *
 * Anchors are parented to the rotating planet (or to the ring) so they track
 * whatever they label. Each frame the anchor is projected to screen space and a
 * DOM callout is placed on it; pins on the far side of the globe are hidden, and
 * pins near the limb fade rather than popping.
 */
export async function createLandmarks({ planet, ring, camera, onOpen }) {
  const root = document.getElementById('lmroot');
  const card = document.getElementById('card');

  let coords = {};
  try {
    coords = await fetch(`${TEX_DIR}namtar_landmarks.json`).then((r) => r.json());
  } catch (err) {
    console.warn('landmark coordinates unavailable', err);
  }

  const items = [];
  for (const spec of LANDMARKS) {
    const anchor = new Object3D();

    if (spec.id === 'ring') {
      /* Not a surface feature: it is pinned to the middle of the brightest span
         of the debris arc, in the ring's own plane, so it tilts with the ring. */
      const a = 0.30 * Math.PI * 2 - Math.PI;
      const r = (RING_IN + RING_OUT) * 0.5;
      anchor.position.set(Math.cos(a) * r, Math.sin(a) * r, 0);
      ring.add(anchor);
    } else {
      const ll = coords[spec.key];
      if (!ll) continue;                      // no coordinates, no pin
      anchor.position.copy(lonLatToDirection(ll[0], ll[1]).multiplyScalar(PR * 1.004));
      planet.add(anchor);
    }

    const el = document.createElement('div');
    el.className = 'lm';
    el.innerHTML = '<i class="dot" role="button" tabindex="0"></i><i class="ln"></i><div class="bx"></div>';
    el.querySelector('.bx').textContent = spec.label;
    const dot = el.querySelector('.dot');
    dot.setAttribute('aria-label', `${spec.label}   ${spec.kind}`);
    root.appendChild(el);

    const item = { spec, anchor, el, dot, ln: el.querySelector('.ln'), bx: el.querySelector('.bx') };
    const open = () => show(item);
    dot.addEventListener('click', open);
    dot.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
    });
    dot.addEventListener('pointerenter', () => el.classList.add('hot'));
    dot.addEventListener('pointerleave', () => el.classList.remove('hot'));
    items.push(item);
  }

  let openId = null;

  function show(item) {
    openId = item.spec.id;
    const d = item.spec;
    card.innerHTML = `
      <button class="x" aria-label="Close">✕</button>
      <div class="eyebrow"><span id="c-eye">${d.kind}</span></div>
      <h4 id="c-title">${d.label}</h4>
      <p>${d.text}</p>
      <dl>${d.stats.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('')}</dl>`;
    card.classList.add('on');
    card.querySelector('.x').onclick = hide;
    scramble(document.getElementById('c-eye'), d.kind, 360);
    scramble(document.getElementById('c-title'), d.label, 520);
    onOpen?.(d);
  }

  function hide() {
    openId = null;
    card.classList.remove('on');
  }

  addEventListener('keydown', (e) => { if (e.key === 'Escape' && openId) hide(); });

  const world = new Vector3();
  const toCam = new Vector3();
  /** Fade in over the last few degrees before a pin rounds the limb. */
  const smooth = (f) => Math.min(1, Math.max(0, (f - 0.12) / 0.22));

  function update(focused) {
    if (focused) {
      for (const it of items) it.el.classList.remove('on');
      if (openId) hide();
      return;
    }
    for (const it of items) {
      it.anchor.getWorldPosition(world);

      /* Surface pins on the far hemisphere have to be culled: the planet is
         opaque, but DOM sits on top of the canvas and would happily draw a pin
         through it. The ring pin is exempt   it is genuinely visible from both
         faces of the arc. */
      let facing = 1;
      if (it.spec.id !== 'ring') {
        toCam.copy(camera.position).sub(world).normalize();
        facing = world.clone().normalize().dot(toCam);
        if (facing <= 0.12) { it.el.classList.remove('on'); continue; }
      }

      const p = world.clone().project(camera);
      if (p.z > 1) { it.el.classList.remove('on'); continue; }
      const sx = (p.x * 0.5 + 0.5) * innerWidth;
      const sy = (-p.y * 0.5 + 0.5) * innerHeight;
      const ex = sx + 34;
      const ey = sy - 26;

      /* Composited placement, as in callouts.js   these run every frame. */
      place(it.dot, sx, sy);
      place(it.ln, sx, sy);
      it.ln.style.rotate = `${Math.atan2(ey - sy, ex - sx)}rad`;
      it.ln.style.scale = `${Math.hypot(ex - sx, ey - sy)} 1`;
      place(it.bx, ex, ey);
      // fade out as the pin approaches the limb rather than snapping off
      it.el.style.setProperty('--lmf', it.spec.id === 'ring' ? '1' : smooth(facing).toFixed(3));
      it.el.classList.add('on');
    }
  }

  return { update, hide, count: items.length };
}
