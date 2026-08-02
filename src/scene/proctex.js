import { CanvasTexture, RepeatWrapping, SRGBColorSpace } from 'three';

/* Spacecraft textures stay procedural. They are small, tile, and never need to
   match an authored asset   baking them would add files to the payload for no
   visual gain. */

function canvas(w, h) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return c;
}

function hash(x, y) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return s - Math.floor(s);
}

function vnoise(x, y) {
  const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
  const a = hash(xi, yi), b = hash(xi + 1, yi), c = hash(xi, yi + 1), d = hash(xi + 1, yi + 1);
  return a * (1 - u) * (1 - v) + b * u * (1 - v) + c * (1 - u) * v + d * u * v;
}

function fbm(x, y, oct) {
  let s = 0, a = 0.5, f = 1;
  for (let i = 0; i < oct; i++) { s += a * vnoise(x * f, y * f); f *= 2; a *= 0.5; }
  return s;
}

/** hull: panel lines, greeble hatches and micrometeorite speckle */
function hullTex() {
  const S = 512, c = canvas(S, S), x = c.getContext('2d');
  x.fillStyle = '#8a8a8a';
  x.fillRect(0, 0, S, S);
  for (let i = 0; i < 4200; i++) {
    const v = 190 + Math.random() * 70;
    x.fillStyle = `rgba(${v},${v},${v},.30)`;
    x.fillRect(Math.random() * S, Math.random() * S, 1, 1);
  }
  x.strokeStyle = '#3c3c3c';
  x.lineWidth = 2;
  for (let i = 1; i < 8; i++) { x.beginPath(); x.moveTo(0, i * S / 8); x.lineTo(S, i * S / 8); x.stroke(); }
  for (let i = 1; i < 6; i++) { x.beginPath(); x.moveTo(i * S / 6, 0); x.lineTo(i * S / 6, S); x.stroke(); }
  x.strokeStyle = '#cfcfcf';
  x.lineWidth = 1;
  for (let i = 1; i < 8; i++) { x.beginPath(); x.moveTo(0, i * S / 8 + 2); x.lineTo(S, i * S / 8 + 2); x.stroke(); }
  for (let i = 0; i < 26; i++) {
    const w = 14 + Math.random() * 44, h = 10 + Math.random() * 30;
    const px = Math.random() * (S - w), py = Math.random() * (S - h);
    x.fillStyle = 'rgba(60,60,60,.5)';
    x.fillRect(px, py, w, h);
    x.strokeStyle = 'rgba(210,210,210,.55)';
    x.lineWidth = 1;
    x.strokeRect(px + 0.5, py + 0.5, w, h);
  }
  const t = new CanvasTexture(c);
  t.wrapS = t.wrapT = RepeatWrapping;
  return t;
}

/** solar array: cell grid with busbars */
function solarTex() {
  const W = 256, H = 512, c = canvas(W, H), x = c.getContext('2d');
  x.fillStyle = '#0b1430';
  x.fillRect(0, 0, W, H);
  const cw = W / 4, ch = H / 10;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 10; j++) {
      const g = x.createLinearGradient(i * cw, j * ch, (i + 1) * cw, (j + 1) * ch);
      g.addColorStop(0, '#16244f');
      g.addColorStop(0.5, '#0e1a3c');
      g.addColorStop(1, '#1b2c60');
      x.fillStyle = g;
      x.fillRect(i * cw + 1.5, j * ch + 1.5, cw - 3, ch - 3);
      x.strokeStyle = 'rgba(150,175,220,.30)';
      x.lineWidth = 1;
      for (let k = 1; k < 4; k++) {
        x.beginPath();
        x.moveTo(i * cw + k * cw / 4, j * ch + 2);
        x.lineTo(i * cw + k * cw / 4, j * ch + ch - 2);
        x.stroke();
      }
    }
  }
  x.strokeStyle = '#8d99ad';
  x.lineWidth = 2;
  x.strokeRect(1, 1, W - 2, H - 2);
  const t = new CanvasTexture(c);
  t.colorSpace = SRGBColorSpace;
  return t;
}

/** MLI thermal blanket: crinkled gold foil */
function foilTex() {
  const S = 256, c = canvas(S, S), x = c.getContext('2d'), img = x.createImageData(S, S);
  for (let j = 0; j < S; j++) {
    for (let i = 0; i < S; i++) {
      const n = fbm(i / S * 7, j / S * 7, 4), w = fbm(i / S * 26 + 9, j / S * 26, 2);
      const v = 0.55 + n * 0.5 + w * 0.22, k = (j * S + i) * 4;
      img.data[k] = Math.min(255, 235 * v);
      img.data[k + 1] = Math.min(255, 178 * v);
      img.data[k + 2] = Math.min(255, 84 * v);
      img.data[k + 3] = 255;
    }
  }
  x.putImageData(img, 0, 0);
  const t = new CanvasTexture(c);
  t.wrapS = t.wrapT = RepeatWrapping;
  t.colorSpace = SRGBColorSpace;
  return t;
}

/** soft radial sprite for beacon halos */
function haloTex() {
  const c = canvas(64, 64), x = c.getContext('2d');
  const gr = x.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, 'rgba(255,255,255,1)');
  gr.addColorStop(0.3, 'rgba(255,255,255,.4)');
  gr.addColorStop(1, 'rgba(255,255,255,0)');
  x.fillStyle = gr;
  x.fillRect(0, 0, 64, 64);
  return new CanvasTexture(c);
}

export const HULL = hullTex();
export const SOLAR = solarTex();
export const FOIL = foilTex();
export const HALO = haloTex();
