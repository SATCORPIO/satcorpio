import { DATA, ORDER, CONTACT } from '../content/data.js';
import { scramble } from './scramble.js';

/**
 * Hash router over the five views. There are no separate pages: selecting a
 * division retints the HUD through the animatable --accent property, swaps the
 * panel, and hands the id back so the scene can fly the camera.
 */
export function createRouter({ onSelect }) {
  const panel = document.getElementById('panel');
  const navEl = document.getElementById('nav');
  const nodeEl = document.getElementById('s-node');
  const viewEl = document.getElementById('t-view');

  ORDER.forEach((id) => {
    const b = document.createElement('button');
    b.textContent = `${DATA[id].call} · ${DATA[id].name.toUpperCase()}`;
    b.dataset.id = id;
    b.onclick = () => go(id);
    navEl.appendChild(b);
  });

  function renderPanel(id) {
    const d = DATA[id];
    const subject = encodeURIComponent(`${d.name} — ${d.cta}`);
    panel.innerHTML = `<i class="edge"></i><i class="wipe"></i>
      <div class="eyebrow"><span id="p-eye">${d.call} — ${d.name.toUpperCase()}</span></div>
      <h2 id="p-title">${d.title}</h2><p class="lede">${d.lede}</p>
      ${d.groups.map((g) => `<div class="grp"><h3>${g.h}</h3><dl class="rows">
        ${g.rows.map((r) => `<div class="row"><dt>${r[0]}</dt><dd>${r[1]}<em>${r[2]}</em></dd></div>`).join('')}
      </dl></div>`).join('')}
      <div class="grp"><div class="chips">${d.chips.map((c) => `<span class="chip">${c}</span>`).join('')}</div></div>
      <a class="cta" href="mailto:${CONTACT}?subject=${subject}">${d.cta} →</a>`;
    panel.scrollTop = 0;
    panel.classList.remove('sw');
    void panel.offsetWidth;                       // restart the wipe animation
    panel.classList.add('sw');
    scramble(document.getElementById('p-eye'), `${d.call} — ${d.name.toUpperCase()}`, 420);
    scramble(document.getElementById('p-title'), d.title, 620);
  }

  let current = 'satcorp';

  function go(id) {
    const d = DATA[id];
    if (!d) return;
    current = id;
    document.documentElement.style.setProperty('--accent', d.color);
    nodeEl.textContent = d.call;
    viewEl.textContent = `VIEW · ${id === 'satcorp' ? 'ORBITAL' : d.name.toUpperCase()}`;
    [...navEl.children].forEach((b) => {
      const on = b.dataset.id === id;
      b.classList.toggle('on', on);
      b.setAttribute('aria-current', on ? 'true' : 'false');
    });
    location.hash = id === 'satcorp' ? '' : `/${id}`;

    if (id === 'satcorp') {
      document.body.classList.remove('focused');
    } else {
      renderPanel(id);
      document.body.classList.add('focused');
    }
    onSelect(id);
  }

  document.getElementById('home').onclick = () => go('satcorp');
  document.getElementById('back').onclick = () => go('satcorp');

  addEventListener('keydown', (e) => {
    // The Namtar briefing owns the keyboard while it is up.
    if (document.body.classList.contains('modal-up')) return;
    if (e.key === 'Escape' && current !== 'satcorp') { go('satcorp'); return; }
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    if (/^(INPUT|TEXTAREA)$/.test(document.activeElement?.tagName ?? '')) return;
    e.preventDefault();
    const cur = ORDER.indexOf(current);
    go(ORDER[(cur + (e.key === 'ArrowDown' ? 1 : ORDER.length - 1)) % ORDER.length]);
  });

  // Browser back/forward and pasted deep links.
  addEventListener('hashchange', () => {
    const id = (location.hash || '').replace('#/', '') || 'satcorp';
    if (id !== current && DATA[id]) go(id);
  });

  return {
    go,
    start() {
      const id = (location.hash || '').replace('#/', '');
      go(DATA[id] ? id : 'satcorp');
    },
    get current() { return current; },
  };
}
