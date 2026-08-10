"use client";

/**
 * Samples a point cloud from SVG stroke paths.
 *
 * The monogram is drawn once into an offscreen 2D canvas, then every opaque
 * pixel becomes a candidate position. This keeps the particle mark and the SVG
 * mark the same artwork — change the path in one place and both follow.
 */

export interface StrokeSpec {
  /** SVG path data, authored against a 0 0 100 100 viewBox. */
  d: string;
  width: number;
}

/**
 * @param rng Seeded generator, so the same mark samples the same cloud.
 * @returns Positions normalised to roughly [-1, 1], y pointing up, packed xyz.
 */
export function sampleStrokePoints(
  specs: StrokeSpec[],
  count: number,
  rng: () => number,
  resolution = 240,
): Float32Array {
  const out = new Float32Array(count * 3);
  if (typeof document === "undefined") return out;

  const canvas = document.createElement("canvas");
  canvas.width = resolution;
  canvas.height = resolution;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return out;

  const scale = resolution / 100;
  ctx.scale(scale, scale);
  ctx.strokeStyle = "#ffffff";
  ctx.lineCap = "square";
  ctx.lineJoin = "miter";

  for (const spec of specs) {
    ctx.lineWidth = spec.width;
    ctx.stroke(new Path2D(spec.d));
  }

  const { data } = ctx.getImageData(0, 0, resolution, resolution);
  const hits: number[] = [];
  for (let y = 0; y < resolution; y++) {
    for (let x = 0; x < resolution; x++) {
      if (data[(y * resolution + x) * 4 + 3] > 128) hits.push(x, y);
    }
  }

  const hitCount = hits.length / 2;
  if (hitCount === 0) return out;

  for (let i = 0; i < count; i++) {
    const j = (rng() * hitCount) | 0;
    // Jitter within the pixel so the cloud never reads as a grid.
    const x = (hits[j * 2] + rng()) / resolution;
    const y = (hits[j * 2 + 1] + rng()) / resolution;
    out[i * 3] = x * 2 - 1;
    out[i * 3 + 1] = -(y * 2 - 1);
    out[i * 3 + 2] = (rng() - 0.5) * 0.05;
  }

  return out;
}

/** The monogram, as strokes. Mirrors components/fingerprints/Monogram.tsx. */
export const MONOGRAM_STROKES: StrokeSpec[] = [
  {
    d: "M29 2 L71 2 L98 29 L98 71 L71 98 L29 98 L2 71 L2 29 Z",
    width: 3,
  },
  {
    d: "M65 37 C65 29 53 26 45 28.5 C34 32 32.5 44 44.5 48 L56 52 C68.5 56 67 68 56.5 71 C48 73.5 35.5 70.5 35.5 62",
    width: 6,
  },
];
