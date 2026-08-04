/* ==========================================================================
   SATCORP — SECTION PAGE 3D STAGE

   The mount harness every section page's scene runs inside. It is the section
   pages' equivalent of what main.js does for the orbital view, minus everything
   that only a planet needs: capability gate, deferred three.js load, RAF loop,
   pause discipline, debounced resize, a one-way quality governor, teardown.

   Deliberately imports nothing at module scope — not three, not core/config —
   so a page that never mounts a stage pays nothing for having asked. three is
   fetched by dynamic import after first paint, which also means Vite emits it
   as one shared chunk every section page and the orbital view can reuse from
   cache rather than five copies of the same library.

   A scene module is a default-free module exporting:

     export function create(ctx) -> { update(dt, t), resize(w, h), dispose() }

   with ctx = { THREE, renderer, canvas, host, mobile, coarse, width, height }.
   The scene owns its own camera and calls ctx.renderer.render() itself, because
   some of these want more than one pass and a stage that owned the camera would
   have to grow options for all of them.
   ========================================================================== */

export const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
export const MOBILE = matchMedia('(max-width: 900px)').matches;
export const COARSE = matchMedia('(pointer: coarse)').matches;

/* Same ceilings as the orbital view. A phone reporting DPR 3 is nine times the
   fragments of a CSS pixel for a difference nobody can see on a 6-inch panel. */
const MAX_DPR = MOBILE ? 1.25 : 1.6;
const MIN_DPR = MOBILE ? 0.75 : 1;

/* ------------------------------------------------------------- capability */
/* Three independent reasons not to run a scene, all of them meaning "this
   visitor gets the static document", which every page is designed to be.
   Reduced motion is a stated preference, not a guess, so it wins outright —
   these scenes are ambient and continuous, and there is no honest way to show
   one "without motion". */
export function capable() {
  if (REDUCED) return false;
  if (navigator.connection?.saveData) return false;
  try {
    const c = document.createElement('canvas');
    const gl = c.getContext('webgl2');
    if (!gl) return false;
    /* Free the probe immediately; browsers cap live contexts per document and
       the real renderer is about to ask for one. */
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return true;
  } catch {
    return false;
  }
}

/* ------------------------------------------------------------------ maths */
export const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
export const lerp = (a, b, t) => a + (b - a) * t;
/* Frame-rate independent approach. The naive `x += (target - x) * k` moves
   further per second the faster the display, which makes every eased motion on
   these pages faster on a 144 Hz panel than the one they were tuned on. */
export const damp = (a, b, lambda, dt) => lerp(a, b, 1 - Math.exp(-lambda * dt));

/* ---------------------------------------------------------------- pointer */
/**
 * Normalised pointer state for a host element. Every scene here wants some of
 * this and none of them want all of it, so it is one tracker with fields rather
 * than five slightly different listener sets.
 *
 * .x/.y   -1..1 across the host, y up (three's convention, not the DOM's)
 * .sx/.sy the same, smoothed — what scenes actually parallax against
 * .inside whether the pointer is over the host
 * .down   whether a drag is in progress
 * .dx/.dy drag delta since the last read, consumed by reading
 */
export function pointerTracker(host, { drag = true } = {}) {
  const p = {
    x: 0, y: 0, sx: 0, sy: 0, inside: false, down: false, dx: 0, dy: 0,
    pinch: 0, hasMoved: false,
  };
  let px = 0, py = 0;
  let pinchStart = 0;
  const touches = new Map();

  const norm = (e) => {
    const r = host.getBoundingClientRect();
    p.x = clamp(((e.clientX - r.left) / r.width) * 2 - 1, -1, 1);
    p.y = clamp(-(((e.clientY - r.top) / r.height) * 2 - 1), -1, 1);
    p.inside = e.clientX >= r.left && e.clientX <= r.right
            && e.clientY >= r.top && e.clientY <= r.bottom;
  };

  const onMove = (e) => {
    norm(e);
    p.hasMoved = true;
    if (p.down) {
      p.dx += e.clientX - px;
      p.dy += e.clientY - py;
    }
    px = e.clientX;
    py = e.clientY;
    if (touches.has(e.pointerId)) {
      touches.set(e.pointerId, [e.clientX, e.clientY]);
      if (touches.size === 2) {
        const [[ax, ay], [bx, by]] = [...touches.values()];
        const d = Math.hypot(bx - ax, by - ay);
        if (pinchStart) p.pinch = d / pinchStart;
        else pinchStart = d;
      }
    }
  };

  const onDown = (e) => {
    if (!drag) return;
    touches.set(e.pointerId, [e.clientX, e.clientY]);
    px = e.clientX;
    py = e.clientY;
    p.down = true;
    /* Pointer capture keeps a drag alive when it leaves the canvas, which for a
       full-bleed background canvas is most of the time. */
    host.setPointerCapture?.(e.pointerId);
  };

  const onUp = (e) => {
    touches.delete(e.pointerId);
    if (touches.size < 2) { pinchStart = 0; p.pinch = 0; }
    if (!touches.size) p.down = false;
    host.releasePointerCapture?.(e.pointerId);
  };

  const onLeave = () => { p.inside = false; };

  host.addEventListener('pointermove', onMove, { passive: true });
  host.addEventListener('pointerdown', onDown, { passive: true });
  addEventListener('pointerup', onUp, { passive: true });
  addEventListener('pointercancel', onUp, { passive: true });
  host.addEventListener('pointerleave', onLeave, { passive: true });

  p.smooth = (dt, lambda = 6) => {
    p.sx = damp(p.sx, p.inside || COARSE ? p.x : 0, lambda, dt);
    p.sy = damp(p.sy, p.inside || COARSE ? p.y : 0, lambda, dt);
  };
  /* Reading a drag consumes it — a scene that forgets to read simply does not
     move, rather than lurching when it remembers. */
  p.takeDrag = () => {
    const d = [p.dx, p.dy];
    p.dx = 0;
    p.dy = 0;
    return d;
  };
  p.dispose = () => {
    host.removeEventListener('pointermove', onMove);
    host.removeEventListener('pointerdown', onDown);
    removeEventListener('pointerup', onUp);
    removeEventListener('pointercancel', onUp);
    host.removeEventListener('pointerleave', onLeave);
  };
  return p;
}

/* ----------------------------------------------------------------- scroll */
/**
 * Document scroll as a 0..1 progress value, plus per-element progress for the
 * scenes that are driven section by section. Read on demand from a value the
 * scroll listener caches, so a scene sampling it every frame never touches
 * layout — getBoundingClientRect on every marker on every frame is exactly the
 * thing that makes scroll-driven 3D stutter.
 */
export function scrollTracker(markers = []) {
  const els = markers.map((m) => (typeof m === 'string' ? document.querySelector(m) : m));
  const state = { p: 0, section: 0, index: 0 };
  let raf = 0;

  const measure = () => {
    raf = 0;
    const doc = document.documentElement;
    const max = doc.scrollHeight - innerHeight;
    state.p = max > 0 ? clamp(scrollY / max, 0, 1) : 0;

    /* Which marker is nearest the middle of the viewport, and how far between
       it and the next one the page has travelled. That pair is what a morphing
       or descending scene keys off. */
    if (els.length) {
      const mid = innerHeight * 0.5;
      let i = 0;
      for (let k = 0; k < els.length; k++) {
        const el = els[k];
        if (el && el.getBoundingClientRect().top <= mid) i = k;
      }
      state.index = i;
      const a = els[i];
      const b = els[i + 1];
      if (a && b) {
        const at = a.getBoundingClientRect().top - mid;
        const bt = b.getBoundingClientRect().top - mid;
        state.section = clamp(at / (at - bt || 1), 0, 1);
      } else {
        state.section = 0;
      }
    }
  };

  const onScroll = () => { if (!raf) raf = requestAnimationFrame(measure); };
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll, { passive: true });
  measure();

  state.dispose = () => {
    removeEventListener('scroll', onScroll);
    removeEventListener('resize', onScroll);
    if (raf) cancelAnimationFrame(raf);
  };
  return state;
}

/* ------------------------------------------------------------------ mount */
/**
 * @param {object}   o
 * @param {string|HTMLElement} o.canvas  the <canvas> (or its selector)
 * @param {()=>Promise<{create:Function}>} o.load  dynamic import of the scene
 * @param {boolean}  [o.alpha]  transparent drawing buffer (default true, so the
 *                              page background shows through and the scene never
 *                              has to restate a colour base.css already owns)
 * @returns {Promise<{dispose:Function}|null>} null when the stage did not mount
 */
export async function mountStage({ canvas, load, alpha = true, onReady }) {
  const el = typeof canvas === 'string' ? document.querySelector(canvas) : canvas;
  if (!el || !capable()) return null;

  const host = el.parentElement || el;

  let THREE, mod;
  try {
    [THREE, mod] = await Promise.all([import('three'), load()]);
  } catch (err) {
    /* A blocked or failed chunk must not take the page with it: the document is
       already complete and readable without any of this. */
    console.warn('[stage] scene unavailable', err);
    return null;
  }

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas: el,
      alpha,
      antialias: !MOBILE,
      powerPreference: 'high-performance',
    });
  } catch (err) {
    console.warn('[stage] renderer unavailable', err);
    return null;
  }

  let dpr = Math.min(devicePixelRatio || 1, MAX_DPR);
  renderer.setPixelRatio(dpr);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;

  /* Marked live before anything is measured, and deliberately so. Pages hide
     their stage until this class is set — a canvas that will never be drawn
     should not hold a screen's worth of layout — which means measuring first
     reads a display:none host as 0×0 and the scene mounts one pixel wide. */
  el.classList.add('is-live');
  host.classList.add('stage-live');
  document.documentElement.classList.add('sc-3d');

  const size = () => {
    const r = host.getBoundingClientRect();
    return [Math.max(1, Math.round(r.width)), Math.max(1, Math.round(r.height))];
  };
  let [w, h] = size();
  renderer.setSize(w, h, false);

  const scene = mod.create({
    THREE, renderer, canvas: el, host,
    mobile: MOBILE, coarse: COARSE, width: w, height: h,
  });

  onReady?.(scene);

  /* --------------------------------------------------------------- resize */
  /* Mobile browsers fire resize on every pixel of URL-bar travel, and each one
     otherwise reallocates the drawing buffer. */
  let rt = 0;
  const onResize = () => {
    clearTimeout(rt);
    rt = setTimeout(() => {
      [w, h] = size();
      renderer.setSize(w, h, false);
      scene.resize?.(w, h);
    }, 140);
  };
  addEventListener('resize', onResize);

  /* ---------------------------------------------------------------- pause */
  /* Two independent reasons to stop drawing, both of them common: the tab is in
     the background, or the canvas has been scrolled past. A scene nobody can
     see costs the same as one they can. */
  let visible = !document.hidden;
  let onScreen = true;
  const onVis = () => { visible = !document.hidden; if (visible) last = performance.now(); };
  document.addEventListener('visibilitychange', onVis);

  const io = new IntersectionObserver(([e]) => {
    onScreen = e.isIntersecting;
    if (onScreen) last = performance.now();
  }, { rootMargin: '120px' });
  io.observe(host);

  /* ------------------------------------------------------------ governor */
  /* One-way, for the reason main.js documents: a ratio that walks both ways
     oscillates, because lowering quality creates exactly the conditions for
     raising it again. Only the framebuffer is on the table here — these scenes
     have no bloom chain to spend first. */
  let samples = 0;
  let acc = 0;
  let governed = false;

  let last = performance.now();
  let t = 0;
  let raf = requestAnimationFrame(function frame(now) {
    raf = requestAnimationFrame(frame);
    /* A tab restored after a minute must not hand the scene a 60-second delta
       and teleport everything it integrates. */
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    if (!visible || !onScreen) return;
    t += dt;

    scene.update(dt, t);

    if (!governed) {
      acc += dt;
      samples++;
      if (acc > 1) {
        if (samples / acc < 40 && dpr > MIN_DPR) {
          dpr = Math.max(MIN_DPR, dpr - 0.25);
          renderer.setPixelRatio(dpr);
          renderer.setSize(w, h, false);
          scene.resize?.(w, h);
        } else {
          governed = true;
        }
        acc = 0;
        samples = 0;
      }
    }
  });

  const dispose = () => {
    cancelAnimationFrame(raf);
    clearTimeout(rt);
    removeEventListener('resize', onResize);
    document.removeEventListener('visibilitychange', onVis);
    io.disconnect();
    scene.dispose?.();
    renderer.dispose();
  };
  addEventListener('pagehide', dispose, { once: true });

  return { dispose, scene, renderer };
}

/* --------------------------------------------------------------- disposal */
/** Walk a subtree and release everything that holds GPU memory. */
export function disposeTree(root) {
  root.traverse?.((o) => {
    o.geometry?.dispose?.();
    const m = o.material;
    if (!m) return;
    for (const mat of Array.isArray(m) ? m : [m]) {
      for (const k in mat) {
        const v = mat[k];
        if (v && v.isTexture) v.dispose();
      }
      mat.dispose?.();
    }
  });
}
