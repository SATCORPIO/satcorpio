import { Mesh, SphereGeometry, ShaderMaterial, Vector3, DoubleSide } from 'three';
import { PR, CLOUD_TOP, SEG, REDUCED } from '../core/config.js';

/**
 * The cloud deck.
 *
 * Blender runs this as a true volumetric shell with a Principled Volume and a
 * vertical density profile (build_clouds). A browser cannot raymarch that at
 * 60fps alongside everything else, so it collapses to a single shell whose
 * opacity is driven by the same coverage map.
 *
 * The failure mode of a 2D shell is that it reads as a hard eggshell around the
 * planet, because the geometry has a crisp silhouette the volume never had.
 * Two things fix that: opacity scales with the slant path through the shell so
 * the limb thickens the way real cloud does, and the last sliver at exactly
 * grazing incidence is faded out so the shell never draws its own outline.
 */
export function createClouds(tex) {
  const uniforms = {
    uMap: { value: tex.clouds },
    uSun: { value: new Vector3(1, 0, 0) },   // world space
    uTime: { value: 0 },
    uOpacity: { value: 1 },
    /* Storm lightning is the one thing on the planet that flashes. It is set
       once at build rather than per frame   the preference does not change
       mid-session, and a uniform costs nothing to leave at 1. */
    uStrike: { value: REDUCED ? 0 : 1 },
  };

  const material = new ShaderMaterial({
    uniforms,
    transparent: true,
    depthWrite: false,
    side: DoubleSide,
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      varying vec3 vN;
      varying vec3 vView;
      void main(){
        vUv = uv;
        vN = normalize(mat3(modelMatrix) * normal);
        vec4 world = modelMatrix * vec4(position, 1.0);
        vView = normalize(cameraPosition - world.xyz);
        gl_Position = projectionMatrix * viewMatrix * world;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform sampler2D uMap;
      uniform vec3 uSun;
      uniform float uTime;
      uniform float uOpacity;
      uniform float uStrike;
      varying vec2 vUv;
      varying vec3 vN;
      varying vec3 vView;

      float hash12(vec2 p){
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      void main(){
        /* R coverage, G cloud-top height, B convective intensity.
           The map was authored to drive a volume where density 62 x a vertical
           profile decides opacity, so reading it straight as alpha puts cloud
           everywhere the map is merely non-zero. Thresholding well up the range
           is what restores the gaps between systems that the reference render
           has   the deck should cover roughly a third of the disc, not all of
           it. */
        vec3 c = texture2D(uMap, vUv).rgb;
        /* Feathered wide and then gamma'd rather than thresholded tight. A
           volume fades out over its own depth, so its edges are soft; a shell
           with a narrow ramp turns the map's cumulus granulation into torn
           white paper. */
        float cover = pow(smoothstep(0.26, 0.98, c.r), 1.35);
        if (cover <= 0.002) discard;

        vec3 N = normalize(vN);
        vec3 V = normalize(vView);
        float ndv = abs(dot(N, V));
        float sdot = dot(N, uSun);

        // Wrap lighting: a cloud deck is dense enough to scatter light well past
        // the geometric terminator, so a plain lambert term ends it too abruptly.
        float lit = clamp(0.55 + 0.45 * sdot, 0.0, 1.0);

        // Tall convective tops catch the light before anything around them.
        float top = 0.86 + 0.28 * c.g;

        /* Thin cloud is not just more transparent, it is duller: less depth to
           scatter through means less light comes back out. Without this the
           feathered edges stay at full white and the softening is wasted. */
        float depth = 0.62 + 0.38 * cover;

        vec3 col = vec3(0.930, 0.945, 0.975) * lit * top * depth;

        // Silver lining: cloud seen edge-on near the limb, still sunlit.
        float rim = pow(1.0 - ndv, 2.5);
        col += vec3(1.0, 0.985, 0.96) * rim * smoothstep(-0.15, 0.45, sdot) * 0.5;

        /* Lightning inside convective cores, night side only (spec sec.7).

           Three things keep this readable as weather rather than as a fault in
           the display. The cells fire at roughly half the old rate, so a single
           strike has room to register before the next one. Only about half the
           cells ever fire at all: the gate term retires the rest permanently,
           which is what breaks up the even carpet of flashes that made the
           night side shimmer. And the amplitude is halved, so a strike reads as
           a storm lighting its own cloud top rather than as a white pinprick.

           The exponent stays at 220: the sharpness is the whole character of a
           lightning flash, and softening it would give a pulsing glow instead.
           uStrike is the reduced-motion switch   flashing is exactly what that
           setting is asking about, so it turns the term off entirely. */
        float night = smoothstep(0.06, -0.16, sdot);
        vec2 cell = floor(vUv * vec2(220.0, 110.0));
        float phase = hash12(cell) * 20.0;
        float gate = step(0.55, hash12(cell + 7.31));
        float strike = pow(max(sin(uTime * 0.9 + phase), 0.0), 220.0) * gate;
        col += vec3(0.72, 0.82, 1.0) * strike * c.b * night * 1.2 * uStrike;

        /* Slant path: a ray crossing the shell near the limb travels further
           through it than one hitting it head-on, so the limb should thicken.
           The edge fade is what stops that from drawing a hard circle. */
        float thickness = mix(1.0, 1.45, pow(1.0 - ndv, 1.5));
        float edgeFade = smoothstep(0.0, 0.14, ndv);

        /* Capped below 1: a real deck is not opaque, and letting the ocean read
           faintly through thin cloud is what stops it looking like white paint
           on a globe. */
        float alpha = clamp(cover * thickness, 0.0, 0.92) * edgeFade * uOpacity;
        gl_FragColor = vec4(col, alpha);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
  });

  const mesh = new Mesh(new SphereGeometry(PR * CLOUD_TOP, ...SEG.shell), material);
  mesh.userData.uniforms = uniforms;
  return mesh;
}
