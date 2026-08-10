"use client";

/**
 * Samples point clouds from SVG artwork.
 *
 * The artwork is drawn once into an offscreen 2D canvas, then every opaque
 * pixel becomes a candidate position. This keeps a particle mark and its SVG
 * counterpart the same drawing   change the path in one place and both follow.
 */

export interface StrokeSpec {
  /** SVG path data, authored against a 0 0 100 100 viewBox. */
  d: string;
  /** Stroke weight. Ignored when `fill` is set. */
  width?: number;
  /**
   * Fill the path rather than stroke it. Strokes give limbs of even thickness;
   * fills give masses that taper, which an outline cannot do without coming
   * out hollow.
   */
  fill?: boolean;
  /** Round caps make a stroke a capsule   the right shape for a limb. */
  cap?: CanvasLineCap;
  join?: CanvasLineJoin;
}

/** Draws the artwork and hands back its pixels. Null when there is no DOM. */
function rasterise(specs: StrokeSpec[], resolution: number): Uint8ClampedArray | null {
  if (typeof document === "undefined") return null;

  const canvas = document.createElement("canvas");
  canvas.width = resolution;
  canvas.height = resolution;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;

  ctx.scale(resolution / 100, resolution / 100);
  ctx.fillStyle = "#ffffff";
  ctx.strokeStyle = "#ffffff";

  for (const spec of specs) {
    const path = new Path2D(spec.d);
    if (spec.fill) {
      ctx.fill(path);
      continue;
    }
    ctx.lineWidth = spec.width ?? 1;
    ctx.lineCap = spec.cap ?? "square";
    ctx.lineJoin = spec.join ?? "miter";
    ctx.stroke(path);
  }

  return ctx.getImageData(0, 0, resolution, resolution).data;
}

/**
 * A flat cloud   every point on the plane of the drawing.
 *
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
  const data = rasterise(specs, resolution);
  if (!data) return out;

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

/**
 * A cloud with depth, inferred from the silhouette itself.
 *
 * A flat sample of a figure is a decal: rotate it a few degrees and it folds
 * into a line. This wraps the drawing onto an elliptical cross-section instead,
 * so the cloud holds up as a body when the camera moves.
 *
 * Depth is taken per *run* of opaque pixels on each scanline rather than per
 * row, which is the whole trick: a row crossing both legs is two runs, so each
 * leg gets the depth of a leg instead of both being smeared into one slab the
 * width of the stance. Points are placed near the shell of each run rather than
 * filling it, which keeps the silhouette crisp under additive blending.
 *
 * @param depthRatio Depth as a fraction of half-width. Human bodies are
 *   flatter front-to-back than they are wide, so this sits below 1.
 */
export function sampleStrokeVolume(
  specs: StrokeSpec[],
  count: number,
  rng: () => number,
  depthRatio = 0.62,
  resolution = 240,
): Float32Array {
  const out = new Float32Array(count * 3);
  const data = rasterise(specs, resolution);
  if (!data) return out;

  // Per opaque pixel: its position, and the centre and half-width of the run
  // it belongs to.
  const px: number[] = [];
  const py: number[] = [];
  const centre: number[] = [];
  const half: number[] = [];

  const opaque = (x: number, y: number) =>
    data[(y * resolution + x) * 4 + 3] > 128;

  for (let y = 0; y < resolution; y++) {
    let x = 0;
    while (x < resolution) {
      if (!opaque(x, y)) {
        x++;
        continue;
      }
      const start = x;
      while (x < resolution && opaque(x, y)) x++;
      const end = x - 1;

      const c = (start + end) / 2;
      const h = (end - start) / 2 + 0.5;
      for (let k = start; k <= end; k++) {
        px.push(k);
        py.push(y);
        centre.push(c);
        half.push(h);
      }
    }
  }

  const hitCount = px.length;
  if (hitCount === 0) return out;

  // Pixel distances become world distances at this scale.
  const unit = 2 / resolution;

  for (let i = 0; i < count; i++) {
    const j = (rng() * hitCount) | 0;
    const x = (px[j] + rng()) / resolution;
    const y = (py[j] + rng()) / resolution;

    // How far across its run this point sits, -1 at one edge and 1 at the other.
    const t = (px[j] - centre[j]) / half[j];
    const shell = Math.sqrt(Math.max(0, 1 - t * t));
    const extent = half[j] * unit * depthRatio * shell;

    out[i * 3] = x * 2 - 1;
    out[i * 3 + 1] = -(y * 2 - 1);
    // Near the shell, both sides, with enough scatter to avoid two clean sheets.
    out[i * 3 + 2] =
      extent * (rng() < 0.5 ? -1 : 1) * (0.68 + rng() * 0.32);
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
