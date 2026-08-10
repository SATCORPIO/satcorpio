"use client";

import { useSyncExternalStore } from "react";

/**
 * PERFORMANCE TIERING
 *
 * Every 3D world ships in three grades. Content is identical at all three —
 * only the fidelity of how it is drawn changes.
 *
 *   full     — WebGPU available, discrete-class GPU. Everything on.
 *   standard — WebGL2. Reduced particle counts, no post-processing.
 *   lite     — reduced-motion, software rendering, or a weak device.
 *              Pre-rendered stills and video stand in for live 3D.
 *
 * These are all browser facts, not React state, so they are read through
 * useSyncExternalStore: the server snapshot keeps hydration honest and the
 * client snapshot arrives without a cascading render.
 */
export type Tier = "full" | "standard" | "lite";

export interface Capabilities {
  tier: Tier;
  webgpu: boolean;
  webgl2: boolean;
  reducedMotion: boolean;
  /** Device pixel ratio ceiling for the renderer. */
  maxDpr: number;
  /** Resolved once on the client; `null` while still unknown. */
  renderer: string | null;
}

export const SERVER_CAPABILITIES: Capabilities = {
  tier: "standard",
  webgpu: false,
  webgl2: false,
  reducedMotion: false,
  maxDpr: 1.5,
  renderer: null,
};

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const FINE_POINTER = "(pointer: fine)";

/** Renderers that report as GPU but run on the CPU. Always demoted to lite. */
const SOFTWARE_RENDERERS =
  /swiftshader|llvmpipe|softwarerasterizer|basic render/i;

function probeWebGL(): { webgl2: boolean; renderer: string | null } {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2");
    if (!gl) return { webgl2: false, renderer: null };
    const ext = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = ext
      ? String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL))
      : String(gl.getParameter(gl.RENDERER));
    // Free the context immediately; browsers cap how many may exist at once.
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return { webgl2: true, renderer };
  } catch {
    return { webgl2: false, renderer: null };
  }
}

export function detectCapabilities(): Capabilities {
  if (typeof window === "undefined") return SERVER_CAPABILITIES;

  const reducedMotion = window.matchMedia(REDUCED_MOTION).matches;
  const { webgl2, renderer } = probeWebGL();
  const webgpu = "gpu" in navigator;

  const memory =
    (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
  const cores = navigator.hardwareConcurrency ?? 4;
  const coarsePointer = !window.matchMedia(FINE_POINTER).matches;
  const software = renderer ? SOFTWARE_RENDERERS.test(renderer) : false;

  let tier: Tier;
  if (reducedMotion || !webgl2 || software || memory <= 2 || cores <= 2) {
    tier = "lite";
  } else if (webgpu && !coarsePointer && memory >= 8 && cores >= 8) {
    tier = "full";
  } else {
    tier = "standard";
  }

  const maxDpr = tier === "full" ? 2 : tier === "standard" ? 1.5 : 1;

  return { tier, webgpu, webgl2, reducedMotion, maxDpr, renderer };
}

/* --- media query plumbing --- */

function subscribeToMedia(query: string) {
  return (onChange: () => void) => {
    const mql = window.matchMedia(query);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  };
}

const subscribeReducedMotion = subscribeToMedia(REDUCED_MOTION);
const subscribeFinePointer = subscribeToMedia(FINE_POINTER);

/* --- capabilities --- */

// Probing costs a WebGL context, so the result is held until something that
// feeds into it actually changes.
let cached: Capabilities | null = null;

function getCapabilitiesSnapshot(): Capabilities {
  cached ??= detectCapabilities();
  return cached;
}

function subscribeToCapabilities(onChange: () => void) {
  return subscribeReducedMotion(() => {
    cached = null;
    onChange();
  });
}

/**
 * Capabilities resolve on the client only. The first render always assumes
 * `standard` so server and client markup agree; the real tier arrives
 * immediately after hydration.
 */
export function useCapabilities(): Capabilities {
  return useSyncExternalStore(
    subscribeToCapabilities,
    getCapabilitiesSnapshot,
    () => SERVER_CAPABILITIES,
  );
}

export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
}

/** True on devices with a real pointer — the only ones that get a cursor. */
export function useFinePointer(): boolean {
  return useSyncExternalStore(
    subscribeFinePointer,
    () => window.matchMedia(FINE_POINTER).matches,
    () => false,
  );
}
