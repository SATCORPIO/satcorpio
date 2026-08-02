import {
  Group, Points, BufferGeometry, BufferAttribute, ShaderMaterial, AdditiveBlending,
  Mesh, SphereGeometry, MeshBasicMaterial, BackSide,
} from 'three';
import { MOBILE } from '../core/config.js';

const SHELL_IN = 1200;
const SHELL_OUT = 2100;
const BAND_TILT = (24 * Math.PI) / 180;      // matches build_starfield

/* Blackbody temperature to linear RGB, ported from blender_rebuild.blackbody_rgb.
   Uniform white dots at uniform brightness are the classic CG tell; real fields
   have a wide colour spread driven by stellar temperature. */
function blackbody(kelvin) {
  const t = Math.min(30000, Math.max(1800, kelvin)) / 100;
  let r, g, b;
  if (t <= 66) {
    r = 255;
    g = 99.4708025861 * Math.log(t) - 161.1195681661;
  } else {
    r = 329.698727446 * Math.pow(t - 60, -0.1332047592);
    g = 288.1221695283 * Math.pow(t - 60, -0.0755148492);
  }
  if (t >= 66) b = 255;
  else if (t <= 19) b = 0;
  else b = 138.5177312231 * Math.log(t - 10) - 305.0447927307;
  const f = (v) => Math.pow(Math.min(1, Math.max(0, v / 255)), 2.2);   // sRGB -> linear
  return [f(r), f(g), f(b)];
}

/** Box–Muller, for the log-normal temperature spread. */
function gauss(rand) {
  let u = 0, v = 0;
  while (u === 0) u = rand();
  while (v === 0) v = rand();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

/** Deterministic PRNG so the sky is the same on every load. */
function mulberry(seed) {
  return function rand() {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * The starfield.
 *
 * Blender bakes this to a 100 MB float EXR. That is a backdrop for a still; for
 * a scene the camera orbits, points are both smaller and better — they hold
 * parallax, stay sharp at any zoom, and cost nothing to ship. The magnitude
 * distribution, colour spread and Milky Way density boost are the same maths
 * build_starfield uses, evaluated at load instead of bake time.
 */
export function createStars(tex) {
  const group = new Group();
  const count = MOBILE ? 3500 : 6500;
  const rand = mulberry(7);

  const pos = [];
  const col = [];
  const size = [];

  for (let i = 0; i < count; i++) {
    // Uniform on the sphere: acos(2u-1) avoids the polar clustering that a
    // naive latitude pick produces.
    const theta = rand() * Math.PI * 2;
    const phi = Math.acos(2 * rand() - 1);
    const dir = [
      Math.sin(phi) * Math.cos(theta),
      Math.cos(phi),
      Math.sin(phi) * Math.sin(theta),
    ];

    /* Density boost toward the galactic plane. Perpendicular distance from a
       band tilted 24 degrees, matching the EXR's geometry. */
    const perp = dir[1] * Math.cos(BAND_TILT) - dir[2] * Math.sin(BAND_TILT);
    if (rand() >= 0.45 + 0.55 * Math.exp(-((perp / 0.42) ** 2))) continue;

    // Magnitude distribution, heavily weighted to the faint end.
    const flux = 0.0035 * Math.pow(260, Math.pow(rand(), 3.1));
    const temp = Math.exp(Math.log(5200) + 0.42 * gauss(rand));
    const [r, g, b] = blackbody(temp);

    const radius = SHELL_IN + rand() * (SHELL_OUT - SHELL_IN);
    pos.push(dir[0] * radius, dir[1] * radius, dir[2] * radius);

    // Brightness rides on the colour; the shader treats it as pre-scaled flux.
    const amp = Math.min(1.6, 0.35 + Math.log10(flux / 0.0035 + 1) * 0.85);
    col.push(r * amp, g * amp, b * amp);
    size.push(0.62 + 0.42 * Math.min(1.4, Math.log10(flux / 0.0035 + 1) / 2.4) * 4.2);
  }

  const geo = new BufferGeometry();
  geo.setAttribute('position', new BufferAttribute(new Float32Array(pos), 3));
  geo.setAttribute('color', new BufferAttribute(new Float32Array(col), 3));
  geo.setAttribute('asz', new BufferAttribute(new Float32Array(size), 1));

  const points = new Points(geo, new ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
    vertexColors: true,
    vertexShader: /* glsl */ `
      attribute float asz;
      varying vec3 vC;
      void main(){
        vC = color;
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = asz * (700.0 / -mv.z);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      varying vec3 vC;
      void main(){
        float d = length(gl_PointCoord - 0.5);
        if (d > 0.5) discard;
        float a = smoothstep(0.5, 0.0, d);
        gl_FragColor = vec4(vC, a * a);
      }
    `,
  }));
  points.frustumCulled = false;
  group.add(points);

  /* The diffuse band itself stays an image — it is smooth, so points cannot
     express it, and at 1024x512 it costs 10 KB. */
  const band = new Mesh(
    new SphereGeometry(SHELL_OUT + 300, 48, 32),
    new MeshBasicMaterial({
      map: tex.milkyway,
      side: BackSide,
      transparent: true,
      /* Additive over the whole sky adds up fast. Anything above roughly 0.05
         stops reading as a distant band and starts acting as a grey scrim over
         the entire frame, lifting the black of space and flattening the planet. */
      opacity: 0.035,
      depthWrite: false,
      blending: AdditiveBlending,
    })
  );
  band.rotation.z = BAND_TILT;
  band.frustumCulled = false;
  group.add(band);

  group.renderOrder = -1;      // always behind everything else
  return group;
}
