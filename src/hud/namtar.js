import { NAMTAR_GAME, CONTACT } from '../content/data.js';
import { scramble } from './scramble.js';

/**
 * The Namtar briefing.
 *
 * Everything else on this screen is a rail or a callout pinned to something in
 * the scene. This is the one piece of chrome that takes the middle of the frame,
 * because the planet is the only object a viewer can click that is not a craft,
 * and what it opens is about the game rather than a division.
 *
 * The markup is built once   the content is static   so opening is a class
 * toggle and costs nothing on a phone.
 */
export function createNamtarCard() {
  const root = document.getElementById('namtar');
  const body = root.querySelector('.modal-w');
  const g = NAMTAR_GAME;

  body.innerHTML = `
    <i class="edge"></i>
    <button class="x" data-close aria-label="Close">✕</button>
    <div class="eyebrow"><span id="nm-eye">${g.eyebrow}</span></div>
    <h2 id="nm-title">${g.title}</h2>
    <p class="nm-tag">${g.tagline}</p>
    ${g.body.map((p) => `<p class="nm-p">${p}</p>`).join('')}
    <dl class="nm-stats">
      ${g.stats.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('')}
    </dl>
    <a class="cta" href="mailto:${CONTACT}?subject=${encodeURIComponent(g.cta.subject)}">
      ${g.cta.label} →</a>`;

  const closeBtn = body.querySelector('.x');
  let open = false;
  let restoreFocus = null;

  function show() {
    if (open) return;
    open = true;
    restoreFocus = document.activeElement;
    root.classList.add('on');
    root.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-up');
    body.scrollTop = 0;
    closeBtn.focus({ preventScroll: true });
    scramble(document.getElementById('nm-eye'), g.eyebrow, 380);
    scramble(document.getElementById('nm-title'), g.title, 560);
  }

  function hide() {
    if (!open) return;
    open = false;
    root.classList.remove('on');
    root.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-up');
    // Sending focus back to the canvas would scroll nothing and read as nowhere.
    if (restoreFocus instanceof HTMLElement) restoreFocus.focus({ preventScroll: true });
    restoreFocus = null;
  }

  // Backdrop and ✕ both carry data-close, so one listener covers both.
  root.addEventListener('click', (e) => {
    if (e.target.closest('[data-close]')) hide();
  });

  addEventListener('keydown', (e) => {
    if (!open) return;
    if (e.key === 'Escape') { hide(); return; }
    /* Two focusable elements, so the trap is just a wrap between them rather
       than a general tab-order walk. */
    if (e.key !== 'Tab') return;
    const stops = [...body.querySelectorAll('button, a[href]')];
    if (!stops.length) return;
    const first = stops[0];
    const last = stops[stops.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  return { open: show, close: hide, get isOpen() { return open; } };
}
