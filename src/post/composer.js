import { WebGLRenderTarget, HalfFloatType, Vector2 } from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { MOBILE } from '../core/config.js';

/**
 * Optics and sensor artefacts, applied after bloom and before tone mapping.
 *
 * Everything here is the imaging chain the HUD implies rather than anything
 * physical about Namtar: lens dispersion toward the frame edges, the slow
 * refresh band of a CRT downlink monitor, vignetting, and sensor grain. Grain in
 * particular replaces a 25 MB float EXR that the Blender compositor used for the
 * same effect.
 */
const FinalShader = {
  uniforms: {
    tDiffuse: { value: null },
    uTime: { value: 0 },
    uAberration: { value: 0.55 },
    /* Slightly stronger than it was, because this is now the only grain on the
       page   the DOM overlay that used to sit on top of the canvas is gone. */
    uGrain: { value: 0.045 },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
  `,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform float uTime, uAberration, uGrain;
    varying vec2 vUv;

    void main(){
      vec2 d = vUv - 0.5;
      float r2 = dot(d, d);

      // Lens dispersion grows with distance from the axis, as in a real lens.
      vec2 off = d * uAberration * r2 * 0.06;
      vec3 c;
      c.r = texture2D(tDiffuse, vUv - off).r;
      c.g = texture2D(tDiffuse, vUv).g;
      c.b = texture2D(tDiffuse, vUv + off).b;

      float roll = pow(fract(vUv.y * 0.5 - uTime * 0.05), 26.0);
      c *= 1.0 + roll * 0.06;
      c *= 1.0 - smoothstep(0.16, 1.0, r2) * 0.55;

      // Sensor grain, scaled by luminance so it sits in the mid-tones rather
      // than crawling all over the black of space.
      float n = fract(sin(dot(vUv * vec2(1.0, 1.3) + uTime * 0.61, vec2(127.1, 311.7))) * 43758.5453);
      float lum = dot(c, vec3(0.2126, 0.7152, 0.0722));
      c += (n - 0.5) * uGrain * smoothstep(0.0, 0.35, lum);

      gl_FragColor = vec4(max(c, 0.0), 1.0);
    }
  `,
};

export function createComposer(renderer, scene, camera) {
  const size = renderer.getDrawingBufferSize(new Vector2());
  /* UnrealBloomPass is five downsample/upsample pairs. Running the chain at half
     linear resolution on mobile quarters every one of those fills, and bloom is
     a blur   there is nothing in it sharp enough to miss.

     Not a constant: the frame-time governor in main.js can drop a desktop that
     is struggling onto the same reduced chain rather than going straight to a
     softer framebuffer. See setQuality below. */
  let bloomScale = MOBILE ? 0.5 : 1;

  /* Half float keeps the scene linear and over-range until OutputPass, which is
     what lets bloom pick out genuinely bright things (the star glint, the rift
     glow) instead of everything pale. */
  const target = new WebGLRenderTarget(size.x, size.y, {
    type: HalfFloatType,
    samples: MOBILE ? 0 : 4,
  });

  const composer = new EffectComposer(renderer, target);
  composer.addPass(new RenderPass(scene, camera));

  /* Namtar is a dark world   the albedo map averages about 10% reflectance,
     because open ocean is genuinely almost black. Bloom tuned for the old
     procedural planet swamped it, so the threshold sits high enough that only
     genuinely bright things glow: sun glint off water, cloud tops, the rift,
     and craft beacons. */
  const bloom = new UnrealBloomPass(
    new Vector2(size.x * bloomScale, size.y * bloomScale),
    0.30,    // strength
    0.35,    // radius   a wide radius smears cloud white across the whole disc
    0.72     // threshold
  );
  composer.addPass(bloom);

  const final = new ShaderPass(FinalShader);
  composer.addPass(final);

  // Tone mapping and sRGB encoding both happen here, once. three disables tone
  // mapping inside materials whenever the target is a render target, so nothing
  // upstream of this pass has already applied it.
  composer.addPass(new OutputPass());

  composer.setPixelRatio(renderer.getPixelRatio());

  function resize() {
    composer.setPixelRatio(renderer.getPixelRatio());
    composer.setSize(innerWidth, innerHeight);
    /* composer.setSize has just handed every pass the full drawing-buffer
       size; put bloom back on its own reduced chain. */
    renderer.getDrawingBufferSize(size);
    bloom.setSize(size.x * bloomScale, size.y * bloomScale);
  }

  return {
    render(t) {
      final.uniforms.uTime.value = t;
      composer.render();
    },
    resize,

    /*
     * Cheapen the post chain before the governor reaches for resolution.
     *
     * Dropping the framebuffer is the blunt instrument: it softens the whole
     * image, including the type. Bloom is already a blur, so halving its
     * resolution costs almost nothing anyone can point at   and a full-screen
     * five-tap pyramid is the most expensive thing in the chain, so it buys
     * the most. This is the step to spend first.
     *
     * Only ever called with a lower tier than the current one, for the same
     * reason the resolution governor only steps down: quality that oscillates
     * is more distracting than quality that is merely lower.
     */
    setQuality(tier) {
      if (tier === 'reduced' && bloomScale > 0.5) {
        bloomScale = 0.5;
        resize();
        return true;
      }
      return false;
    },

    // Exposed for console tuning; the look here was art-directed by eye.
    bloom,
    final,
  };
}
