/**
 * Checks the built tiers actually carry data.
 *
 * This exists because a silently-zeroed channel is invisible until it reaches a
 * shader: the mask's water channel was destroyed once already by sharp's
 * alpha premultiplication, and the failure looked like a 0.04 MB file rather
 * than an error. Coverage is cos(lat)-weighted   an equirect grid devotes as
 * many texels to the poles as to the equator, so an unweighted mean overstates
 * anything polar (ice) and understates everything else.
 *
 *   node scripts/verify-textures.mjs
 */
import path from 'node:path';
import sharp from 'sharp';

const OUT = path.resolve(import.meta.dirname, '../public/tex');

/* Channel names, plus an expected coverage for channel 0 where the generators
   report one. `at` is the threshold the generator used to define coverage  
   clouds count density > 0.10, not > 0.5, so checking them at 0.5 would flag a
   correct map. */
const FILES = [
  { f: 'albedo', ch: ['R', 'G', 'B'] },
  { f: 'normal', ch: ['X', 'Y', 'Z'] },
  { f: 'mask', ch: ['water', 'ice', 'veg'],
    expect: { ch: 0, at: 0.5, min: 45, max: 70, of: 'spec sec.4   58% ocean' } },
  { f: 'clouds', ch: ['cover', 'top', 'convect'],
    expect: { ch: 0, at: 0.1, min: 25, max: 50, of: 'gen_cloud_moon_maps   38.5% coverage' } },
  { f: 'night', ch: ['lights', 'rift', ' '],
    expect: { ch: 0, at: 0.05, min: 0.02, max: 3, of: 'gen_planet_maps   0.13% of surface lit' } },
  { f: 'talos_albedo', ch: ['R', 'G', 'B'] },
  { f: 'talos_normal', ch: ['X', 'Y', 'Z'] },
  { f: 'milkyway', ch: ['R', 'G', 'B'] },
];

let bad = 0;

for (const { f, ch, expect } of FILES) {
  const img = sharp(path.join(OUT, `${f}.webp`));
  const meta = await img.metadata();
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });

  if (meta.hasAlpha) {
    console.log(`${f}: FAIL   has an alpha channel; packed masks must be alpha-free`);
    bad++;
    continue;
  }

  const n = info.channels;
  const at = expect?.at ?? 0.5;
  const stats = [];
  for (let c = 0; c < n; c++) {
    let sum = 0, wsum = 0, over = 0, max = 0;
    for (let y = 0; y < info.height; y++) {
      const w = Math.cos(((y + 0.5) / info.height - 0.5) * Math.PI);
      for (let x = 0; x < info.width; x++) {
        const v = data[(y * info.width + x) * n + c] / 255;
        sum += v * w; wsum += w;
        if (v > at) over += w;
        if (v > max) max = v;
      }
    }
    stats.push({ mean: sum / wsum, cov: (over / wsum) * 100, max });
  }

  const line = stats
    .map((s, i) => `${(ch[i] ?? i)} μ${s.mean.toFixed(2)} max${s.max.toFixed(2)} ${s.cov.toFixed(1)}%`)
    .join('  ');
  let note = '';
  if (expect) {
    const cov = stats[expect.ch].cov;
    const ok = cov >= expect.min && cov <= expect.max;
    if (!ok) bad++;
    note = ok
      ? `  ok (${expect.of})`
      : `  FAIL: ${cov.toFixed(2)}% above ${at} is outside ${expect.min}-${expect.max}% (${expect.of})`;
  }
  if (stats.every((s) => s.max < 0.02)) {
    note += '  FAIL: image is blank';
    bad++;
  }
  console.log(`${f.padEnd(13)} ${String(info.width).padStart(4)}×${info.height} ${line}${note}`);
}

console.log(bad ? `\n${bad} problem(s) found.` : '\nAll maps carry data.');
process.exit(bad ? 1 : 0);
