import { DATA, MENU } from '../content/data.js';
import { COARSE } from '../core/config.js';

/**
 * The section menu on the orbital view.
 *
 * Two ways into a division: fly into the object, or pick it off this list. The
 * list exists because the objects are discoverable but not obvious — a visitor
 * who does not want to hunt for a 12-pixel spacecraft should not have to. It is
 * also the accessible route, which is why the entries are real anchors: they
 * work with a keyboard, they work from the context menu, and they work with
 * scripting off. The click handler only intercepts a plain left click, so
 * ctrl/cmd-click still opens a tab like any other link.
 *
 * The whole rail can be dismissed. The scene is the point of this page, and
 * someone who wants to look at it should be able to clear the furniture out of
 * the way — the choice is remembered.
 */
const KEY = 'satcorp.menu';

export function createMenu({ onEnter, onPreview }) {
  const navEl = document.getElementById('nav');
  const toggle = document.getElementById('navtoggle');
  const base = import.meta.env.BASE_URL;

  for (const id of MENU) {
    const d = DATA[id];
    const a = document.createElement('a');
    a.href = `${base}${id}/`;
    a.dataset.id = id;
    a.textContent = `${d.call} · ${d.name.toUpperCase()}`;
    a.style.setProperty('--item', d.color);

    a.addEventListener('click', (e) => {
      // Let the browser handle anything that is not a plain left click.
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      onEnter(id);
    });
    /* Hovering a menu entry lights its craft in the scene, so the list and the
       objects read as the same set of things rather than two parallel menus. */
    a.addEventListener('pointerenter', () => onPreview?.(id));
    a.addEventListener('pointerleave', () => onPreview?.(null));
    a.addEventListener('focus', () => onPreview?.(id));
    a.addEventListener('blur', () => onPreview?.(null));

    navEl.appendChild(a);
  }

  /* Warm the destinations while the visitor is still orbiting. The section
     pages are small and static, so by the time anyone has finished looking
     around, the page behind the warp is already in cache and the transition
     lands on rendered content instead of on a spinner.

     Built here rather than written into the document head: Vite resolves
     `link[href]` in HTML as a build asset, and these point at directories. */
  const prefetch = document.createDocumentFragment();
  for (const id of MENU) {
    const l = document.createElement('link');
    l.rel = 'prefetch';
    l.href = `${base}${id}/`;
    prefetch.appendChild(l);
  }
  document.head.appendChild(prefetch);

  /* Open on a desktop, closed on a phone — where the rail becomes a bottom bar
     that would otherwise cover the planet on the smallest screens. A stored
     preference beats both. */
  const stored = localStorage.getItem(KEY);
  let open = stored === null ? !COARSE : stored === 'open';

  function apply() {
    document.body.classList.toggle('nav-off', !open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Hide section menu' : 'Show section menu');
    toggle.textContent = open ? 'MENU ◂' : 'MENU ▸';
  }
  apply();

  toggle.addEventListener('click', () => {
    open = !open;
    try { localStorage.setItem(KEY, open ? 'open' : 'closed'); } catch { /* private mode */ }
    apply();
  });

  return {
    /** Marks the entry whose object is currently under the cursor. */
    highlight(id) {
      for (const a of navEl.children) a.classList.toggle('on', a.dataset.id === id);
    },
  };
}
