import { REDUCED } from '../core/config.js';

const GLYPH = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&/\\<>*+=·';

/** Decode-in effect: text resolves left to right out of random glyphs. */
export function scramble(el, text, ms) {
  if (!el) return;
  if (REDUCED) {
    el.textContent = text;
    return;
  }
  const t0 = performance.now();
  if (el._raf) cancelAnimationFrame(el._raf);
  (function step() {
    const p = Math.min(1, (performance.now() - t0) / ms);
    const cut = Math.floor(p * text.length);
    let out = '';
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      out += (i < cut || ch === ' ') ? ch : GLYPH[(Math.random() * GLYPH.length) | 0];
    }
    el.textContent = out;
    if (p < 1) el._raf = requestAnimationFrame(step);
    else el.textContent = text;
  })();
}
