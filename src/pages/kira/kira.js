import { initPage } from '../shared/page.js';
import { mountStage } from '../shared/stage.js';

initPage();

/* The reel's controls are a plain tab list that works with or without the rail:
   they are the only way to change project when there is no WebGL, and the
   remote control for the rail when there is. The 3D never becomes the sole
   route to a piece of content. */
const stage = document.getElementById('kr-stage');
const tabs = [...document.querySelectorAll('[data-go]')];
const panels = [...document.querySelectorAll('.kr-panel')];

function show(index) {
  tabs.forEach((t, i) => t.setAttribute('aria-selected', String(i === index)));
  panels.forEach((p, i) => {
    p.hidden = i !== index;
    p.classList.toggle('on', i === index);
  });
}

tabs.forEach((tab, i) => {
  tab.addEventListener('click', () => {
    show(i);
    /* Tell the rail, if there is one. The scene answers with its own `rail`
       event once it has actually moved, which is what keeps the two in step
       when the visitor drags instead of clicking. */
    stage?.dispatchEvent(new CustomEvent('rail:go', { detail: i }));
  });
});

/* Arrow keys along the tab list, since it is a real tablist. */
document.querySelector('.kr-ctrl')?.addEventListener('keydown', (e) => {
  const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
  if (!dir) return;
  e.preventDefault();
  const at = tabs.findIndex((t) => t.getAttribute('aria-selected') === 'true');
  const next = (at + dir + tabs.length) % tabs.length;
  tabs[next].focus();
  tabs[next].click();
});

/* The rail is authoritative once it exists: dragging it past a slab changes the
   panel without anything being clicked. */
stage?.addEventListener('rail', (e) => show(e.detail.index));

mountStage({
  canvas: '#kr-canvas',
  load: () => import('./scene.js'),
});
