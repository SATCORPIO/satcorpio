import { REDUCED } from '../core/config.js';
import { DATA } from '../content/data.js';
import { scramble } from './scramble.js';

const LINES = [
  '> HANDSHAKE · NAMTAR GROUND SEGMENT',
  '> PRIMARY ACQUIRED · NAMTAR',
  '> SURFACE MAPS RESOLVED · 4K EQUIRECT',
  '> ORBITAL ELEMENTS LOADED · 4 CRAFT',
  '> RENDER PIPELINE · PBR + BLOOM',
  '> TELEMETRY SYNC · NOMINAL',
  '> LINK ESTABLISHED',
];

/**
 * Boot overlay. It doubles as the texture-loading screen: the sequence advances
 * on its own timer but will not reach 100% until the maps have actually
 * resolved, so the planet is never revealed half-textured.
 */
export function createBoot(ready) {
  const boot = document.getElementById('boot');
  const log = document.getElementById('bootlog');
  const bar = document.getElementById('bootbar');
  const pct = document.getElementById('bootpct');
  let done = false;
  let assetsReady = false;

  function finish() {
    if (done) return;
    done = true;
    bar.style.width = '100%';
    pct.textContent = '100%';
    boot.classList.add('gone');
    document.body.classList.add('up');
    scramble(document.getElementById('deck-h'), DATA.satcorp.title, 700);
    setTimeout(() => boot.remove(), 900);
  }

  // Click to skip, but only once there is something to look at.
  boot.addEventListener('click', () => { if (assetsReady) finish(); });

  ready.then(() => {
    assetsReady = true;
  }).catch((err) => {
    // A failed map should not trap the viewer behind the overlay forever.
    console.error('asset load failed', err);
    assetsReady = true;
  });

  if (REDUCED) {
    ready.finally(() => setTimeout(finish, 200));
    return;
  }

  let i = 0;
  (function next() {
    if (i >= LINES.length) {
      // Hold on the last line until the maps land.
      const wait = () => (assetsReady ? setTimeout(finish, 260) : setTimeout(wait, 120));
      wait();
      return;
    }
    const d = document.createElement('div');
    d.textContent = LINES[i];
    log.appendChild(d);
    if (log.children.length > 4) log.removeChild(log.firstChild);
    i++;
    const p = Math.round((i / LINES.length) * 100);
    bar.style.width = `${p}%`;
    pct.textContent = `${String(p).padStart(2, '0')}%`;
    setTimeout(next, 230);
  })();
}
