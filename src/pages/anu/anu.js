import { initPage } from '../shared/page.js';
import { mountStage, REDUCED } from '../shared/stage.js';

initPage();

const rack = document.getElementById('an-rack');
const pillars = [...document.querySelectorAll('[data-pillar]')];

const openPillar = (i) => {
  pillars.forEach((p, n) => p.classList.toggle('on', n === i));
};

/* Clicking a unit in the rack opens its pillar and scrolls to it. The rack is
   a shortcut into the page, never the only way to reach something: all three
   pillars are plain sections that read fine on their own. */
rack?.addEventListener('unit', (e) => {
  openPillar(e.detail);
  pillars[e.detail]?.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth', block: 'start' });
});

/* And reading a pillar pulls its unit out of the rack, so the two stay in
   agreement whichever one the visitor drove. */
if (pillars.length && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      const i = Number(e.target.dataset.pillar);
      openPillar(i);
      rack?.dispatchEvent(new CustomEvent('unit:go', { detail: i }));
    }
  }, { rootMargin: '-35% 0px -45% 0px' });
  for (const p of pillars) io.observe(p);
}

mountStage({
  canvas: '#an-canvas',
  load: () => import('./scene.js'),
});

/* The prompt types itself. Progressive by construction: the command is already
   in the markup and this only replays it, so with JS off   or with reduced
   motion   the terminal simply shows a finished command. */
const cmd = document.querySelector('[data-type]');
if (cmd && !REDUCED) {
  const text = cmd.dataset.type;
  cmd.textContent = '';
  let i = 0;
  const tick = () => {
    cmd.textContent = text.slice(0, ++i);
    if (i < text.length) setTimeout(tick, 38 + Math.random() * 45);
  };
  setTimeout(tick, 420);
}
