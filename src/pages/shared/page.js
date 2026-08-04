/* Shared runtime for the section pages. Everything here is progressive: with
   this file blocked the pages are still complete, readable documents. Kept
   dependency-free and deliberately tiny   the whole point of the section pages
   is that they are not the WebGL scene. */

const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ------------------------------------------------------------------ reveal */
/* The hidden state is armed from script, so a visitor without JS never lands on
   a page of invisible sections. */
export function reveal() {
  const targets = document.querySelectorAll('[data-reveal]');
  if (!targets.length) return;
  if (REDUCED || !('IntersectionObserver' in window)) return;

  document.documentElement.classList.add('sc-armed');

  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      /* Stagger within a group so a grid of cards resolves in sequence rather
         than snapping in as one block. */
      const i = Number(e.target.dataset.revealI || 0);
      e.target.style.transitionDelay = `${Math.min(i, 6) * 70}ms`;
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

  targets.forEach((el, i) => {
    if (!el.dataset.revealI) el.dataset.revealI = String(i % 7);
    io.observe(el);
  });
}

/* ----------------------------------------------------------------- contact */
/* The address is assembled at runtime rather than sitting in the markup as a
   harvestable mailto:. Any [data-mail] element gets the link; its text is
   replaced only if it is still showing the obfuscated fallback. */
const USER = 'anu';
const HOST = 'satcorp.io';

export function contact() {
  const addr = `${USER}@${HOST}`;
  for (const el of document.querySelectorAll('[data-mail]')) {
    const subject = el.dataset.mail;
    el.href = `mailto:${addr}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;
    if (el.dataset.mailText !== undefined) el.textContent = addr.toUpperCase();
  }
}

/* -------------------------------------------------------------------- year */
export function year() {
  for (const el of document.querySelectorAll('[data-year]')) {
    el.textContent = String(new Date().getFullYear());
  }
}

/* Every page calls this one function. */
export function initPage() {
  reveal();
  contact();
  year();
}
