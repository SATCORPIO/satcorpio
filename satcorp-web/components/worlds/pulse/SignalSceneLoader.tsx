"use client";

import dynamic from "next/dynamic";

/**
 * Defers the EKG trace's WebGL stack   three.js plus @react-three/fiber,
 * roughly 230KB gz on their own   out of `/pulse`'s initial bundle.
 *
 * `SignalScene` renders unconditionally from the moment the page mounts, so
 * importing it directly (as the page did before this file existed) is the
 * opposite of build plan §11's "3D worlds are dynamic-imported after LCP":
 * it made three.js the single heaviest dependency on the page, loaded
 * synchronously with everything else. Measured before this fix   519KB gz
 * total route JS for `/pulse`, comfortably over the 300KB budget (phase
 * guide §A5).
 *
 * `ssr: false` because WebGL cannot run on the server regardless   R3F's
 * `<Canvas>` has nothing useful to produce server-side, so skipping that work
 * is free, not a trade-off. No `loading` fallback: the graticule grid behind
 * the trace is plain CSS rendered outside this boundary (see `SignalScene`
 * itself), and the trace is decorative background rather than page content,
 * so a beat of its absence while the chunk loads costs a reader nothing.
 *
 * `SignalTriggers` is deliberately **not** re-exported from here and stays a
 * normal static import at the call site   it wires `[data-signal]` sections
 * to the trace via plain DOM queries and GSAP, with no WebGL dependency of
 * its own, so deferring it would only delay something that costs nothing to
 * load immediately.
 */
export const SignalSceneDeferred = dynamic(
  () => import("./SignalScene").then((mod) => mod.SignalScene),
  { ssr: false },
);
