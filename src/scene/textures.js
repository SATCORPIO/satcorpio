import {
  LoadingManager, TextureLoader, RepeatWrapping, ClampToEdgeWrapping,
  SRGBColorSpace, LinearFilter, LinearMipmapLinearFilter,
} from 'three';
import { TEX_DIR, TEX_TIER, TEX_ONLY_DESKTOP } from '../core/config.js';

/* srgb: colour the eye reads directly. Everything else is data sampled by a
   shader (masks, normals, coverage) and must stay linear, which is the default
   for textures in three, so only the colour maps are tagged. */
const MAPS = [
  { name: 'albedo', srgb: true },
  { name: 'normal' },
  { name: 'mask' },              // R water  G ice  B vegetation
  { name: 'clouds' },            // R coverage  G top height  B convection
  { name: 'night' },             // R settlement glow  G rift heat
  { name: 'talos_albedo', srgb: true },
  { name: 'talos_normal' },
  { name: 'milkyway', srgb: true },
];

/**
 * Loads the planet maps for the active tier.
 * @param {number} maxAnisotropy renderer.capabilities.getMaxAnisotropy()
 * @param {(loaded:number, total:number)=>void} [onProgress]
 */
export function loadTextures(maxAnisotropy, onProgress) {
  const manager = new LoadingManager();
  if (onProgress) {
    manager.onProgress = (_url, loaded, total) => onProgress(loaded, total);
  }
  const loader = new TextureLoader(manager);
  const aniso = Math.min(maxAnisotropy, 8);
  const tex = {};

  for (const { name, srgb } of MAPS) {
    const dir = TEX_ONLY_DESKTOP.has(name) ? TEX_DIR : TEX_TIER;
    const t = loader.load(`${dir}${name}.webp`);
    if (srgb) t.colorSpace = SRGBColorSpace;
    /* Equirect maps wrap in longitude and must not in latitude: repeating V
       would fold the north pole onto the south. */
    t.wrapS = RepeatWrapping;
    t.wrapT = ClampToEdgeWrapping;
    t.anisotropy = aniso;
    t.minFilter = LinearMipmapLinearFilter;
    t.magFilter = LinearFilter;
    tex[name] = t;
  }

  const ready = new Promise((resolve, reject) => {
    manager.onLoad = () => resolve(tex);
    manager.onError = (url) => reject(new Error(`failed to load ${url}`));
  });

  return { tex, ready };
}

/**
 * Veyra's relief is 1.2x its own radius, so its silhouette cannot be faked with
 * a normal map — the height field is read back through a canvas and used to
 * move vertices instead. Returns {data, width, height} with height in [0,1].
 */
export async function loadHeightField(url) {
  const img = new Image();
  img.src = url;
  await img.decode();
  const c = document.createElement('canvas');
  c.width = img.width;
  c.height = img.height;
  const ctx = c.getContext('2d', { willReadFrequently: true });
  ctx.drawImage(img, 0, 0);
  const { data } = ctx.getImageData(0, 0, img.width, img.height);
  const out = new Float32Array(img.width * img.height);
  for (let i = 0; i < out.length; i++) out[i] = data[i * 4] / 255;
  return { data: out, width: img.width, height: img.height };
}
