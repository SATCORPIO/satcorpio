import { Mesh, SphereGeometry, ShaderMaterial, Vector3, FrontSide, AdditiveBlending } from 'three';
import { PR, SEG } from '../core/config.js';
import { VALUE_NOISE_3D } from '../shaders/noise.js';

/* Blender's scale heights are fractions of the planet radius: 0.0042 is the
   ~35 km Rayleigh column the spec asks for, and 0.00135 the Mie haze. At this
   scene's size that is 0.13 and 0.04 scene units   one or two pixels on screen,
   which renders a limb nobody can see. Cycles got away with it by raymarching a
   real volume at high resolution; here the column is stretched by EXAGGERATION
   so the glow occupies a readable band, keeping the ratio between the two media
   intact so the blue-green Rayleigh limb and the tight white Mie arc stay
   distinguishable. */
const EXAGGERATION = 3.5;
const H_RAYLEIGH = 0.0042 * PR * EXAGGERATION;
const H_MIE = 0.00135 * PR * EXAGGERATION;

/* The geometry has to contain the stretched column: four Rayleigh scale heights
   above the surface, rather than the 1.032 the Blender scene uses. */
const SHELL = 1 + (4.0 * H_RAYLEIGH) / PR;

/**
 * The atmospheric limb.
 *
 * Cycles models this as two nested volumes with independent scale heights
 * (build_atmosphere)   isotropic Rayleigh for the coloured limb, forward-
 * scattering Mie for the bright sunward arc. Rather than raymarch that, this
 * shader solves the view ray against the shell analytically: how far the ray
 * travels through the air, and how low it gets, are the only two quantities the
 * look depends on.
 *
 * Doing it by ray rather than by fresnel is what produces a limb whose colour
 * changes with altitude   emerald at the deck through cyan to deep blue at the
 * top, per spec sec.6   instead of a flat glow ring.
 */
export function createAtmosphere() {
  const uniforms = {
    uSun: { value: new Vector3(1, 0, 0) },     // world space
    uPlanetR: { value: PR },
    uTopR: { value: PR * SHELL },
    uHRayleigh: { value: H_RAYLEIGH },
    uHMie: { value: H_MIE },
    uRayleigh: { value: 2.6 },                 // matches RAYLEIGH_DENSITY
    uMie: { value: 1.3 },                      // matches MIE_DENSITY
    uDisc: { value: 0.040 },                   // haze looking down through the column
    uLimb: { value: 0.030 },                   // glow looking along it
    uAurora: { value: 0.85 },
    uTime: { value: 0 },
  };

  const material = new ShaderMaterial({
    uniforms,
    transparent: true,
    /* Front side, not back. A back-facing shell only ever draws where the planet
       does not occlude it, which yields a rim and nothing else   the haze over
       the disc, which is what gives near-black oceans their teal cast, is depth
       rejected before it can composite. The near face sits in front of the
       planet and covers both cases; the ray maths below solves the full column
       regardless of which face was hit. */
    side: FrontSide,
    depthWrite: false,
    blending: AdditiveBlending,
    vertexShader: /* glsl */ `
      varying vec3 vWorld;
      void main(){
        vec4 world = modelMatrix * vec4(position, 1.0);
        vWorld = world.xyz;
        gl_Position = projectionMatrix * viewMatrix * world;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uSun;
      uniform float uPlanetR, uTopR, uHRayleigh, uHMie;
      uniform float uRayleigh, uMie, uDisc, uLimb, uAurora, uTime;
      varying vec3 vWorld;

      ${VALUE_NOISE_3D}

      /* Altitude tint, from the LIMB_TINT ramp in build_atmosphere: emerald at
         the deck, cyan, pale blue, deep blue at the top of the column. */
      vec3 limbTint(float t){
        if (t < 0.20) return mix(vec3(0.105, 0.430, 0.395), vec3(0.130, 0.560, 0.640), t / 0.20);
        if (t < 0.48) return mix(vec3(0.130, 0.560, 0.640), vec3(0.255, 0.510, 0.860), (t - 0.20) / 0.28);
        return mix(vec3(0.255, 0.510, 0.860), vec3(0.230, 0.360, 0.820), (t - 0.48) / 0.52);
      }

      void main(){
        // The planet sits at the world origin, so the ray maths is all relative
        // to the origin and needs no centre uniform.
        vec3 C = cameraPosition;
        vec3 D = normalize(vWorld - C);

        float tca = dot(-C, D);
        float b2 = dot(C, C) - tca * tca;       // squared impact parameter
        float top2 = uTopR * uTopR;
        if (b2 >= top2) discard;                // ray misses the atmosphere

        float b = sqrt(max(b2, 0.0));
        float halfChord = sqrt(top2 - b2);
        float tEnter = max(tca - halfChord, 0.0);   // clamp: camera may be inside
        float tExit = tca + halfChord;
        if (tExit <= tEnter) discard;           // atmosphere is entirely behind us

        // Ground occlusion: a ray that reaches the surface stops there, which is
        // what keeps the disc dim and concentrates the glow on the limb.
        float p2 = uPlanetR * uPlanetR;
        bool hitsGround = b2 < p2 && tca > 0.0;
        if (hitsGround) tExit = min(tExit, tca - sqrt(p2 - b2));
        float path = max(tExit - tEnter, 0.0);
        if (path <= 0.0) discard;

        /* Optical depth, not geometric path length. Density falls off
           exponentially, so a ray crossing the shell does most of its
           scattering in the lowest scale height   using the chord length would
           make the whole disc as bright as the limb, which is what washes a
           planet out. Two closed forms cover the cases:

             looking down  tau ~ H / cos(zenith)      (airmass)
             grazing       tau ~ sqrt(2*pi*R*H) * exp(-h/H)

           Their ratio, ~sqrt(2*pi*R/H), is exactly why a real limb is a bright
           thin arc against a barely-hazed disc. */
        float hMin = max(b, uPlanetR) - uPlanetR;
        float od, odMie;
        bool grazing = !hitsGround;
        if (hitsGround) {
          float cosz = sqrt(max(1.0 - b2 / p2, 0.0));
          od = 1.0 / max(cosz, 0.12);
          odMie = od;
        } else {
          od = sqrt(6.2831853 * uPlanetR / uHRayleigh) * exp(-hMin / uHRayleigh);
          odMie = sqrt(6.2831853 * uPlanetR / uHMie) * exp(-hMin / uHMie);
        }

        // Illumination at the point the ray grazes.
        vec3 graze = normalize(C + D * clamp(tca, tEnter, tExit));
        float sdot = dot(graze, uSun);
        float lit = smoothstep(-0.28, 0.32, sdot);

        float t = clamp(hMin / (uTopR - uPlanetR), 0.0, 1.0);
        vec3 col = limbTint(t);

        /* Grazing light travels a long way through the column before it reaches
           us, and comes out warm   this is the band that turns the terminator
           orange and gives the hero render its crimson limb. */
        float term = smoothstep(0.0, 0.30, sdot) * (1.0 - smoothstep(0.30, 0.72, sdot));
        col = mix(col, vec3(0.94, 0.52, 0.26), term * 0.45);

        /* Disc and limb are separated because they are doing different jobs and
           the physical ratio between them (~sqrt(2*pi*R/H), about 20:1) is not
           what the reference render shows. Over the disc this is the thin haze
           that gives Namtar's near-black oceans their teal cast; at the limb it
           is the bright arc. Tuned as one term, whichever end is right leaves
           the other either invisible or blown out. Saturating keeps a deep limb
           from running away. */
        float rayleigh = (1.0 - exp(-od * uRayleigh * (grazing ? uLimb : uDisc))) * lit;

        /* Mie forward scattering. A photon reaches the camera travelling along
           -D after arriving along -uSun, so the scattering angle is
           dot(uSun, D)   near 1 when we look toward the star through the limb,
           which is exactly where the bright white arc appears. */
        float forward = pow(max(dot(D, uSun), 0.0), 30.0);
        vec3 mie = vec3(0.860, 0.895, 0.920)
                 * (1.0 - exp(-odMie * uMie * uLimb)) * forward * lit * 1.6;

        /* Aurora: curtains in a band around the magnetic poles, night side only
           (spec sec.7). The altitude window and oval latitudes are the ones
           build_atmosphere uses, rescaled to the exaggerated column. */
        float night = smoothstep(0.06, -0.22, sdot);
        float lat = abs(graze.y);
        float oval = smoothstep(0.80, 0.87, lat) * (1.0 - smoothstep(0.945, 0.985, lat));
        float aBand = smoothstep(0.20, 0.34, t) * (1.0 - smoothstep(0.62, 1.0, t));
        float curtain = smoothstep(0.52, 0.80, fbm3(graze * 26.0 + vec3(0.0, uTime * 0.02, 0.0), 4));
        vec3 aurora = vec3(0.180, 1.0, 0.430) * oval * aBand * curtain * night * uAurora;

        vec3 outCol = col * rayleigh + mie + aurora;

        // Sub-pixel slivers at the very outer edge alias badly against black space.
        outCol *= smoothstep(0.0, 0.015, path / uTopR);

        gl_FragColor = vec4(outCol, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
  });

  const mesh = new Mesh(new SphereGeometry(PR * SHELL, ...SEG.shell), material);
  mesh.userData.uniforms = uniforms;
  mesh.renderOrder = 2;      // after the surface and the cloud deck
  return mesh;
}
