import { initPage } from '../shared/page.js';
import { mountStage } from '../shared/stage.js';

initPage();

const stage = document.getElementById('pl-stage');
const now = document.getElementById('pl-now');
const chans = [...document.querySelectorAll('[data-channel]')];

/* Reading a channel section puts that screen on air, and the ON AIR strip
   names it. Driven from an observer rather than the scroll position so the
   readout can never disagree with what is actually on screen. */
if (chans.length && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      const i = Number(e.target.dataset.channel);
      for (const c of chans) c.classList.toggle('live', c === e.target);
      if (now) now.textContent = `CH 0${i + 1} · ON AIR`;
      stage?.dispatchEvent(new CustomEvent('channel:go', { detail: i }));
    }
  }, { rootMargin: '-40% 0px -40% 0px' });
  for (const c of chans) io.observe(c);
}

/* Clicking a screen on the wall is the other direction: the page goes to that
   channel's section, and the observer above then does the rest. */
stage?.addEventListener('channel', (e) => {
  chans[e.detail]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

mountStage({
  canvas: '#pl-canvas',
  load: () => import('./scene.js'),
});
