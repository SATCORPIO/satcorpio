import { Vector3 } from 'three';
import { PR } from '../core/config.js';

/** Places a leader line from an anchor point to a label box. */
function lead(dotEl, lnEl, bxEl, ax, ay, ex, ey) {
  dotEl.style.left = `${ax}px`;
  dotEl.style.top = `${ay}px`;
  const len = Math.hypot(ex - ax, ey - ay);
  const ang = Math.atan2(ey - ay, ex - ax);
  lnEl.style.left = `${ax}px`;
  lnEl.style.top = `${ay}px`;
  lnEl.style.width = `${len}px`;
  lnEl.style.transform = `rotate(${ang}rad)`;
  bxEl.style.left = `${ex}px`;
  bxEl.style.top = `${ey}px`;
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
      lock.style.left = `${sx}px`;
      lock.style.top = `${sy}px`;
      ring.style.left = `${sx}px`;
      ring.style.top = `${sy}px`;
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
