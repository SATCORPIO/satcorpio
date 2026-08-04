import { Vector3 } from 'three';
import { PR } from '../core/config.js';

/*
 * Callouts are placed with the individual `translate`, `rotate` and `scale`
 * properties rather than with left/top/width.
 *
 * Every pin on screen is repositioned on every frame. Writing left/top puts
 * that on the layout path — a full style recalculation and reflow per pin, per
 * frame, for elements that are only ever moving. translate/rotate/scale are
 * composited instead, and because they are separate properties from `transform`
 * the stylesheet keeps `transform` free for the centring offsets and hover
 * states that need their own transitions. The leader line is a 1px element
 * scaled to length for the same reason: width is layout, scale is not.
 */
export function place(el, x, y) {
  el.style.translate = `${x}px ${y}px`;
}

/** Places a leader line from an anchor point to a label box. */
function lead(dotEl, lnEl, bxEl, ax, ay, ex, ey) {
  place(dotEl, ax, ay);
  place(lnEl, ax, ay);
  lnEl.style.rotate = `${Math.atan2(ey - ay, ex - ax)}rad`;
  lnEl.style.scale = `${Math.hypot(ex - ax, ey - ay)} 1`;
  place(bxEl, ex, ey);
}

/** Target-lock reticle that follows the hovered craft. */
export function createTag() {
  const tag = document.getElementById('tag');
  const dot = tag.querySelector('.dot');
  const ln = tag.querySelector('.ln');
  const bx = tag.querySelector('.bx');
  const lock = tag.querySelector('.lock');
  const ring = tag.querySelector('.ring');
  const proj = new Vector3();

  return {
    lock(data) {
      tag.style.setProperty('--tagc', data.color);
      bx.innerHTML = `${data.name.toUpperCase()}<u>${data.call} · LOCK ACQUIRED</u>`;
      tag.classList.add('on');
    },
    clear() { tag.classList.remove('on'); },
    place(worldPos, camera) {
      proj.copy(worldPos).project(camera);
      const sx = (proj.x * 0.5 + 0.5) * innerWidth;
      const sy = (-proj.y * 0.5 + 0.5) * innerHeight;
      place(lock, sx, sy);
      place(ring, sx, sy);
      lead(dot, ln, bx, sx, sy, sx + 72, sy - 62);
    },
  };
}

/**
 * Namtar's limb callout. It anchors to the planet's projected radius rather
 * than to a fixed offset, so the leader line stays attached to the limb at any
 * zoom level instead of drifting off into space.
 */
export function createPin() {
  const pin = document.getElementById('pin');
  const dot = pin.querySelector('.dot');
  const ln = pin.querySelector('.ln');
  const bx = pin.querySelector('.bx');
  const centre = new Vector3();
  const edge = new Vector3();

  return function update(camera, focused) {
    if (focused) { pin.classList.remove('on'); return; }
    centre.set(0, 0, 0).project(camera);
    if (centre.z > 1) { pin.classList.remove('on'); return; }      // behind the camera
    const cx = (centre.x * 0.5 + 0.5) * innerWidth;
    const cy = (-centre.y * 0.5 + 0.5) * innerHeight;
    // A point one radius to camera-right, projected, gives the on-screen radius.
    edge.setFromMatrixColumn(camera.matrixWorld, 0).multiplyScalar(PR).project(camera);
    const r = Math.hypot((edge.x * 0.5 + 0.5) * innerWidth - cx,
                         (-edge.y * 0.5 + 0.5) * innerHeight - cy);
    const ax = cx - r * 0.72;
    const ay = cy - r * 0.72;
    lead(dot, ln, bx, ax, ay, Math.max(54, ax - 58), Math.max(132, ay - 46));
    pin.classList.add('on');
  };
}
