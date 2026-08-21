"use client";

/**
 * THE ORBIT-TO-SURFACE JOURNEY
 *
 * One continuous scroll from high orbit down to the horizon and back out
 * again. The page's five acts are declared here as scroll bands so the camera
 * rig, the terrain and the copy all agree on where in the descent the reader
 * currently is.
 *
 * Bands are document-scroll fractions. They are *measured*, not guessed: each
 * edge below is the scroll fraction at which that section's top reaches the
 * top of the viewport, read off the built page at 1440x900. Re-measure them
 * whenever the page gains or loses a section, or the descent starts happening
 * against the wrong copy.
 */
export const ACTS = {
  /** High orbit. The hero and the genre line. */
  orbit: [0.0, 0.117],
  /** The dive: through the cloud deck, planet dissolving into haze. */
  descent: [0.117, 0.281],
  /** Low pass over the ground. The pillars, and KYRAX. */
  flyover: [0.281, 0.565],
  /** Settled at the horizon: the living planet, research, the transfer. */
  horizon: [0.565, 0.865],
  /** Back out to orbit for the stat wall, platforms, gallery, invitation. */
  ascent: [0.865, 1.0],
} as const;

export function clamp01(v: number) {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

/** Progress through a scroll band, 0 before it and 1 after. */
export function band(t: number, range: readonly [number, number]) {
  return clamp01((t - range[0]) / (range[1] - range[0]));
}

export function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

/**
 * How much of the frame belongs to the surface rather than to orbit.
 *
 * The camera does not actually fly a sphere down to a landing — the planet
 * fades out and a terrain tile fades in while the screen is full of cloud.
 * This is the crossfade, and the haze veil peaks exactly where it moves so the
 * cut is never visible.
 *
 * Each smoothstep pair is centred on the veil peak below — that alignment is
 * the whole trick, so if one moves the other has to move with it. The exit
 * edges follow `ascent`, which the KYRAX and Target Platforms sections pushed
 * from 0.80 out to 0.865; the entry edges are unchanged because `descent`
 * barely shifted.
 */
export function surfaceBlend(t: number) {
  return smoothstep(0.14, 0.24, t) * (1 - smoothstep(0.86, 0.93, t));
}

/** Alpha of the amber veil that hides both ends of that crossfade. */
export function veilAlpha(t: number) {
  const down = smoothstep(0.11, 0.185, t) * (1 - smoothstep(0.185, 0.26, t));
  const up = smoothstep(0.845, 0.895, t) * (1 - smoothstep(0.895, 0.95, t));
  return Math.max(down, up);
}

/**
 * The terrain tile sits well below the planet rather than on it. The camera
 * never travels between the two — it cuts, behind the veil — so the only thing
 * that matters is that the two worlds cannot be in frame at once.
 */
export const SURFACE_Y = -160;

/**
 * How far the ground has flowed past by a given point in the journey.
 *
 * It accelerates into the flyover and all but stops once the camera settles at
 * the horizon — otherwise the monoliths would be standing still on a landscape
 * that was visibly sliding out from under them.
 */
export function terrainAdvance(t: number) {
  return (
    // The dive and the run in.
    smoothstep(0.14, 0.3, t) * 1200 +
    // All but held through the flyover, so the ground settles under the camera
    // rather than continuing to tear past at descent speed.
    smoothstep(0.3, 0.46, t) * 60 +
    // A drift, for the long settled middle of the page.
    band(t, [0.46, 1.0]) * 260
  );
}
