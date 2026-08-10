"use client";

/**
 * THE ORBIT-TO-SURFACE JOURNEY
 *
 * One continuous scroll from high orbit down to the horizon and back out
 * again. The page's five acts are declared here as scroll bands so the camera
 * rig, the terrain, the monoliths and the copy all agree on where in the
 * descent the reader currently is.
 *
 * Bands are document-scroll fractions, matched by eye to the section flow in
 * build plan §8: hero in orbit, "what is NAMTAR" through the cloud deck, the
 * pillars during the flyover, the long middle at the horizon, the closing
 * call to action back in orbit.
 */
export const ACTS = {
  /** High orbit. The hero and "what is NAMTAR". */
  orbit: [0.0, 0.13],
  /** The dive: through the cloud deck, planet dissolving into haze. */
  descent: [0.13, 0.28],
  /** Low pass over the ground. The pillars section; the monoliths rise. */
  flyover: [0.28, 0.5],
  /** Settled at the horizon, through the research and the transfer. */
  horizon: [0.5, 0.8],
  /** Back out to orbit for the stat wall, the gallery and the invitation. */
  ascent: [0.8, 1.0],
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
 * The camera does not actually fly a sphere down to a landing   the planet
 * fades out and a terrain tile fades in while the screen is full of cloud.
 * This is the crossfade, and the haze veil peaks exactly where it moves so the
 * cut is never visible.
 */
export function surfaceBlend(t: number) {
  return smoothstep(0.14, 0.24, t) * (1 - smoothstep(0.8, 0.875, t));
}

/** Alpha of the amber veil that hides both ends of that crossfade. */
export function veilAlpha(t: number) {
  const down = smoothstep(0.11, 0.185, t) * (1 - smoothstep(0.185, 0.26, t));
  const up = smoothstep(0.78, 0.838, t) * (1 - smoothstep(0.838, 0.9, t));
  return Math.max(down, up);
}

/**
 * Which pillar the reader has asked to look at, or -1.
 *
 * Deliberately not React state, for the same reason as `scrollProgress`: the
 * camera reads it every frame and React does not own the camera. The DOM list
 * keeps its own state for what to underline and writes the number here.
 */
export const pillarFocus = { value: -1 };

export function setPillarFocus(index: number) {
  pillarFocus.value = index;
}

/** Where the five monoliths stand on the terrain tile, in world units. */
export const MONOLITH_X = [-26, -13, 0, 13, 26];

/**
 * The terrain tile sits well below the planet rather than on it. The camera
 * never travels between the two   it cuts, behind the veil   so the only thing
 * that matters is that the two worlds cannot be in frame at once.
 */
export const SURFACE_Y = -160;

/**
 * How far the ground has flowed past by a given point in the journey.
 *
 * It accelerates into the flyover and all but stops once the camera settles at
 * the horizon   otherwise the monoliths would be standing still on a landscape
 * that was visibly sliding out from under them.
 */
export function terrainAdvance(t: number) {
  return (
    // The dive and the run in.
    smoothstep(0.14, 0.3, t) * 1200 +
    // Held, while the monoliths come up. A landscape sliding out from under
    // five things that are standing still would give the trick away.
    smoothstep(0.3, 0.46, t) * 60 +
    // A drift, for the long settled middle of the page.
    band(t, [0.46, 1.0]) * 260
  );
}
