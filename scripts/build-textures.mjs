/**
 * Converts the NAMTAR source maps into the two web tiers the site loads.
 *
 * The sources are 283 MB of 8K equirect PNGs authored for Cycles. Nothing here
 * is resampled for looks   the planet is never more than ~900 px across on a
 * desktop viewport, so 4K equirect is already oversampled at the limb, and the
 * mask/cloud maps are data that gets smoothstepped in a shader rather than
 * viewed directly.
 *
 *   npm run textures
 *
 * Re-run only when the generators in "D:\NAMTAR Planet\tools" change; the
 * outputs are committed with the site.
 */
import { mkdir, copyFile, stat, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const SRC = 'D:/NAMTAR Planet/textures';
const OUT = path.resolve(import.meta.dirname, '../public/tex');
const OUT_2K = path.join(OUT, '2k');

/** desktop tier, mobile tier (null = not shipped to mobile), encoder options */
const JOBS = [
  // Surface. Albedo is the only sRGB map on the planet; everything else is data.
  { src: 'namtar_albedo.png', name: 'albedo', hi: 4096, lo: 2048, opt: { quality: 82 } },
  // Normals get the most headroom: banding here shows up as terraced coastlines.
  { src: 'namtar_normal.png', name: 'normal', hi: 4096, lo: 2048, opt: { quality: 93, effort: 6 } },
  // R=water G=ice B=vegetation. Drives roughness and the normal fade, so hard
  // coastline edges matter more here than absolute colour accuracy.
  { src: 'namtar_mask_rgb.png', name: 'mask', hi: 2048, lo: 1024, opt: { quality: 90, effort: 6 } },
  // R=coverage G=top height B=convection.
  { src: 'namtar_clouds.png', name: 'clouds', hi: 2048, lo: 1024, opt: { quality: 84, effort: 6 } },
  // R=settlement glow G=rift heat. Only 0.13% of the surface is lit and rift
  // heat covers 0.2%, so both are sparse   downsampling past 1K loses them.
  { src: 'namtar_night.png', name: 'night', hi: 1024, lo: 1024, opt: { quality: 88 } },

  // Moons.
  { src: 'talos_albedo.png', name: 'talos_albedo', hi: 1024, lo: 512, opt: { quality: 80 } },
  { src: 'talos_normal.png', name: 'talos_normal', hi: 1024, lo: null, opt: { quality: 90 } },

  // Sky.
  { src: 'namtar_milkyway.png', name: 'milkyway', hi: 1024, lo: 1024, opt: { quality: 78 } },
];

/* Veyra's height map is read back through a canvas and used to move vertices,
   so it ships as PNG   lossy artefacts here become dents in the silhouette. */
const VERBATIM = ['veyra_height_lo.png', 'namtar_landmarks.json'];

const mb = (b) => (b / 1e6).toFixed(2) + ' MB';

async function emit(job, width, dir) {
  const dst = path.join(dir, `${job.name}.webp`);
  const meta = await sharp(path.join(SRC, job.src)).metadata();
  /* Every source here packs independent data masks into colour channels. sharp
     premultiplies RGB by alpha across a resize, so an RGBA source would have
     its colour channels silently zeroed wherever alpha is ~0   which is most of
     the globe for a rift-heat mask. Fail loudly instead of shipping black maps. */
  if (meta.hasAlpha) {
    throw new Error(
      `${job.src} has an alpha channel. Packed data masks must be alpha-free   ` +
      're-run tools/gen_web_maps.py, which splits them into RGB pairs.'
    );
  }
  await sharp(path.join(SRC, job.src))
    .resize(width, width >> 1, { kernel: 'lanczos3', fit: 'fill' })
    .webp({ effort: 5, ...job.opt })
    .toFile(dst);
  const { size } = await stat(dst);
  console.log(
    `  ${path.relative(OUT, dst).padEnd(22)} ${String(meta.width).padStart(5)}\u00d7${meta.height}` +
    ` \u2192 ${width}\u00d7${width >> 1}  ${mb(size).padStart(9)}`
  );
  return size;
}

async function main() {
  if (!existsSync(SRC)) {
    console.error(`Source maps not found at ${SRC}.`);
    console.error('Run tools/gen_planet_maps.py, gen_cloud_moon_maps.py and gen_web_maps.py first.');
    process.exit(1);
  }
  await mkdir(OUT_2K, { recursive: true });

  const missing = JOBS.filter((j) => !existsSync(path.join(SRC, j.src)));
  if (missing.length) {
    console.error('Missing source maps:', missing.map((j) => j.src).join(', '));
    console.error('Run tools/gen_cloud_moon_maps.py and tools/gen_web_maps.py first.');
    process.exit(1);
  }

  let hi = 0;
  let lo = 0;
  console.log('desktop tier (public/tex)');
  for (const job of JOBS) hi += await emit(job, job.hi, OUT);

  console.log('\nmobile tier (public/tex/2k)');
  for (const job of JOBS) {
    if (job.lo === null) continue;
    lo += await emit(job, job.lo, OUT_2K);
  }

  console.log('\nverbatim');
  for (const f of VERBATIM) {
    await copyFile(path.join(SRC, f), path.join(OUT, f));
    const { size } = await stat(path.join(OUT, f));
    hi += size;
    lo += size;
    console.log(`  ${f.padEnd(22)} ${mb(size).padStart(28)}`);
  }

  // Mobile falls back to the desktop file for anything it does not override.
  const names = new Set((await readdir(OUT_2K)).map((f) => f));
  const fallback = JOBS.filter((j) => !names.has(`${j.name}.webp`)).map((j) => j.name);
  if (fallback.length) console.log(`\nmobile reuses desktop for: ${fallback.join(', ')}`);

  console.log(`\ntotal  desktop ${mb(hi)}   mobile ${mb(lo)}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
