/**
 * Seeded pseudo-random numbers.
 *
 * Every scatter, drift and flicker in the 3D worlds runs through one of these
 * rather than Math.random. Two reasons: the layouts become reproducible, so a
 * composition that looks right stays right; and generating them is pure, so it
 * is safe to do during render.
 *
 * mulberry32   small, fast, good enough distribution for visual work.
 */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
