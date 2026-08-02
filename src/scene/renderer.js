import {
  WebGLRenderer, Scene, PerspectiveCamera, PMREMGenerator, CanvasTexture,
  EquirectangularReflectionMapping, SRGBColorSpace, AgXToneMapping,
  DirectionalLight, HemisphereLight, PCFSoftShadowMap,
} from 'three';
import { SUNDIR, RIM_LAYER, MOBILE } from '../core/config.js';

function canvas(w, h) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return c;
}

/* Dim starlit space plus a sun, used for real reflections on the craft. The
   planet deliberately takes almost none of this (envMapIntensity ~0.14) — a
   world lit by its environment map loses the hard terminator. */
function envTexture() {
  const c = canvas(1024, 512);
  const x = c.getContext('2d');
  const g = x.createLinearGradient(0, 0, 0, 512);
  g.addColorStop(0, '#05070c');
  g.addColorStop(0.5, '#0a1018');
  g.addColorStop(1, '#04060a');
  x.fillStyle = g;
  x.fillRect(0, 0, 1024, 512);
  // planet-side bounce: a large soft amber mass for the hull to catch
  const p = x.createRadialGradient(300, 430, 0, 300, 430, 340);
  p.addColorStop(0, 'rgba(190,130,60,.55)');
  p.addColorStop(1, 'rgba(190,130,60,0)');
  x.fillStyle = p;
  x.fillRect(0, 0, 1024, 512);
  const s = x.createRadialGradient(790, 150, 0, 790, 150, 120);
  s.addColorStop(0, '#fffdf5');
  s.addColorStop(0.16, '#fff2d0');
  s.addColorStop(1, 'rgba(255,225,170,0)');
  x.fillStyle = s;
  x.fillRect(0, 0, 1024, 512);
  for (let i = 0; i < 700; i++) {
    x.fillStyle = `rgba(255,255,255,${Math.random() * 0.5})`;
    x.fillRect(Math.random() * 1024, Math.random() * 512, 1, 1);
  }
  const t = new CanvasTexture(c);
  t.mapping = EquirectangularReflectionMapping;
  t.colorSpace = SRGBColorSpace;
  return t;
}

export function createRenderer() {
  const renderer = new WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, MOBILE ? 1.5 : 1.6));
  renderer.setSize(innerWidth, innerHeight);
  /* AgX is what the Blender renders were tone-mapped with, so matching it here
     is what keeps the limb and the terminator looking like the stills. */
  renderer.toneMapping = AgXToneMapping;
  /* Namtar's oceans sit near the bottom of the range — the albedo map is only
     about 10% reflectance — so the exposure is pushed well past 1 to lift them
     into a readable teal. AgX holds the highlights while that happens, which is
     why the cloud tops do not blow out at this setting. */
  renderer.toneMappingExposure = 1.75;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFSoftShadowMap;
  document.body.appendChild(renderer.domElement);

  const scene = new Scene();
  const camera = new PerspectiveCamera(34, innerWidth / innerHeight, 0.5, 6000);

  const pmrem = new PMREMGenerator(renderer);
  const env = envTexture();
  scene.environment = pmrem.fromEquirectangular(env).texture;
  env.dispose();
  pmrem.dispose();

  return { renderer, scene, camera };
}

export function createLights(scene) {
  const sun = new DirectionalLight(0xfff4e2, 3.1);
  sun.position.copy(SUNDIR).multiplyScalar(300);
  sun.castShadow = true;
  sun.shadow.mapSize.set(MOBILE ? 1024 : 2048, MOBILE ? 1024 : 2048);
  const sc = sun.shadow.camera;
  sc.near = 170;
  sc.far = 470;
  sc.left = -110;
  sc.right = 110;
  sc.top = 110;
  sc.bottom = -110;
  scene.add(sun);
  scene.add(sun.target);

  // low on purpose: the unlit hemisphere should read as genuinely dark
  scene.add(new HemisphereLight(0x4e7c8c, 0x0a0e14, 0.12));

  const rim = new DirectionalLight(0x6fd8ff, 0.42);
  rim.position.set(-1, -0.35, -0.7);
  rim.layers.set(RIM_LAYER);
  scene.add(rim);

  return { sun, shadowCam: sc };
}
