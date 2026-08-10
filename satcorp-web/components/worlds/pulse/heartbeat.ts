"use client";

/**
 * THE SIGNAL   PULSE's heartbeat, as shared state.
 *
 * The trace reads `surge` every frame and React does not own the render loop,
 * so this is a plain mutable box for the same reason `scrollProgress` is:
 * pushing a value through useState sixty times a second to move a waveform
 * would re-render the page to animate something React is not drawing.
 */

export const signal = { surge: 0 };

/** Ceiling on how much a burst of entering sections can stack up. */
const MAX_SURGE = 1.6;

/** A section arrived. The heart notices. */
export function bumpSignal(amount = 1): void {
  signal.surge = Math.min(MAX_SURGE, signal.surge + amount);
}

/**
 * One beat of a PQRST complex, over 0..1.
 *
 * Deliberately written twice   once here in TypeScript and once in GLSL inside
 * `Signal.tsx`. The shader cannot call this, and the lite tier cannot call the
 * shader, so the alternative to duplicating five gaussians is a lite-tier
 * fallback that draws a *different* waveform to the one everyone else sees.
 * If either copy changes, change both.
 *
 * (This file is `heartbeat.ts` rather than the obvious `signal.ts` because
 * `Signal.tsx` sits beside it, and two modules differing only in case break
 * outright on a case-insensitive filesystem.)
 */
export function beatAt(p: number): number {
  const t = p - Math.floor(p);
  const g = (centre: number, width: number) =>
    Math.exp(-Math.pow((t - centre) * width, 2));

  return (
    0.1 * g(0.16, 26) - // P wave
    0.16 * g(0.3, 90) + // Q
    1.0 * g(0.34, 80) - // R   the spike
    0.34 * g(0.385, 70) + // S
    0.26 * g(0.56, 18) // T wave
  );
}

/**
 * The same trace as an SVG polyline, for the lite tier and for anything that
 * needs the waveform without a WebGL context.
 */
export function tracePath(
  width: number,
  height: number,
  beats: number,
  samples = 480,
): string {
  const mid = height / 2;
  const amplitude = height * 0.38;
  const points: string[] = [];

  for (let i = 0; i <= samples; i++) {
    const t = i / samples;
    const x = t * width;
    const y = mid - beatAt(t * beats) * amplitude;
    points.push(`${x.toFixed(2)},${y.toFixed(2)}`);
  }

  return `M${points.join(" L")}`;
}
