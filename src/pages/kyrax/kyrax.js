import { initPage } from '../shared/page.js';
import { mountStage } from '../shared/stage.js';

initPage();

mountStage({
  canvas: '#kx-canvas',
  load: () => import('./scene.js'),
});

/* The formation rail. It reads the same section markers the scene does, so the
   label and the shape behind it can never disagree — and it is driven from an
   observer rather than a scroll handler so it costs nothing while idle. */
const rail = [...document.querySelectorAll('[data-rail]')];
const stages = [...document.querySelectorAll('[data-stage]')];

if (rail.length && stages.length && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      const i = stages.indexOf(e.target);
      for (const li of rail) li.classList.toggle('on', Number(li.dataset.rail) === i);
    }
  }, { rootMargin: '-45% 0px -45% 0px' });
  for (const s of stages) io.observe(s);
}
