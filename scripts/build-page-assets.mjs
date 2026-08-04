/**
 * Converts the NAMTAR Blender renders into the responsive images the section
 * pages load.
 *
 * The sources are 1–10 MB PNGs written for print-size inspection. Nothing on a
 * section page is ever displayed wider than the viewport, so each one is emitted
 * as WebP at the three or two widths the markup actually asks for.
 *
 *   npm run page-assets
 *
 * Re-run only when the renders change; the outputs are committed with the site.
 */
import { mkdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const SRC = 'D:/NAMTAR Planet/renders';
const OUT = path.resolve(import.meta.dirname, '../public/img');

/* name → source file, output folder, widths, encoder quality.
   Heroes get three widths because they are drawn edge to edge; gallery frames
   are never more than half a viewport wide, so two is enough. */
const JOBS = [
  { src: 'NAMTAR_hero_v002_crimson.png', dir: 'namtar', name: 'hero', widths: [2560, 1600, 960], q: 80 },
  { src: 'NAMTAR_hero_v001.png', dir: 'kira', name: 'hero', widths: [2560, 1600, 960], q: 80 },

  { src: 'phase03_surface_v3.png', dir: 'namtar', name: 'surface', widths: [1280, 640], q: 76 },
  { src: 'phase04_clouds_v3.png', dir: 'namtar', name: 'clouds', widths: [1280, 640], q: 76 },
  { src: 'phase05_atmosphere_v2.png', dir: 'namtar', name: 'atmosphere', widths: [1280, 640], q: 76 },
  { src: 'phase06_night_v4.png', dir: 'namtar', name: 'night', widths: [1280, 640], q: 76 },
  { src: 'phase07_system_v4.png', dir: 'namtar', name: 'system', widths: [1280, 640], q: 76 },
  /* This one is a 768px square composition test, not a wide render — asking for
     1280 would only upscale it, so it ships at the sizes it actually has. */
  { src: 'phase08_compose_v4.png', dir: 'namtar', name: 'orbit', widths: [768, 512], q: 76 },
];

const kb = (b) => (b / 1024).toFixed(0) + ' KB';

async function emit(job, width) {
  const dir = path.join(OUT, job.dir);
  const dst = path.join(dir, `${job.name}-${width}.webp`);
  const img = sharp(path.join(SRC, job.src));
  const meta = await img.metadata();
  await img
    .resize(width, null, { kernel: 'lanczos3', withoutEnlargement: true })
    .webp({ quality: job.q, effort: 5 })
    .toFile(dst);
  const { size } = await stat(dst);
  console.log(
    `  ${path.relative(OUT, dst).padEnd(30)} ${String(meta.width).padStart(5)}px \u2192 ${String(width).padStart(4)}px  ${kb(size).padStart(8)}`
  );
  return size;
}

async function main() {
  if (!existsSync(SRC)) {
    console.error(`Renders not found at ${SRC}.`);
    process.exit(1);
  }
  const missing = JOBS.filter((j) => !existsSync(path.join(SRC, j.src)));
  if (missing.length) {
    console.error('Missing renders:', [...new Set(missing.map((j) => j.src))].join(', '));
    process.exit(1);
  }

  for (const d of new Set(JOBS.map((j) => j.dir))) {
    await mkdir(path.join(OUT, d), { recursive: true });
  }

  let total = 0;
  for (const job of JOBS) {
    for (const w of job.widths) total += await emit(job, w);
  }
  console.log(`\ntotal ${kb(total)} across ${JOBS.length} sources`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
