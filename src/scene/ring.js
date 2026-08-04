import { Mesh, RingGeometry, ShaderMaterial, Vector3, DoubleSide } from 'three';
import { RING_IN, RING_OUT, RING_TILT, RING_SPIN, SEG } from '../core/config.js';
import { VALUE_NOISE_3D } from '../shaders/noise.js';

/**
 * The debris ring.
 *
 * Not a closed annulus: spec sec.8 has this as the remains of a moon that came
 * apart, so it holds a broken arc. Blender builds the structure from colour
 * ramps over a 1536x32 mesh (build_rings); the same ramps are evaluated in the
 * shader here against a SEG.ring-segment annulus, which costs one draw call and
 * keeps the ringlets crisp at any zoom instead of baking them to a texture.
 */
export function createRing() {
  const uniforms = {
    uSun: { value: new Vector3(1, 0, 0) },
    uIn: { value: RING_IN },
    uOut: { value: RING_OUT },
  };

  const material = new ShaderMaterial({
    uniforms,
    transparent: true,
    depthWrite: false,
    side: DoubleSide,
    vertexShader: /* glsl */ `
      varying vec2 vLocal;
      varying vec3 vWorld;
      varying vec3 vNormalW;
      void main(){
        vLocal = position.xy;                       // RingGeometry lies in local XY
        vec4 world = modelMatrix * vec4(position, 1.0);
        vWorld = world.xyz;
        vNormalW = normalize(mat3(modelMatrix) * vec3(0.0, 0.0, 1.0));
        gl_Position = projectionMatrix * viewMatrix * world;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uSun;
      uniform float uIn, uOut;
      varying vec2 vLocal;
      varying vec3 vWorld;
      varying vec3 vNormalW;

      ${VALUE_NOISE_3D}

      float ramp(float x, float a, float b, float ya, float yb){
        return mix(ya, yb, clamp((x - a) / (b - a), 0.0, 1.0));
      }

      /* RING_ENVELOPE: inner and outer falloff plus two clean divisions  
         the gaps are what stop it reading as a flat washer. */
      float envelope(float t){
        if (t < 0.055) return ramp(t, 0.0,   0.055, 0.0,  1.0);
        if (t < 0.300) return ramp(t, 0.055, 0.300, 1.0,  0.18);
        if (t < 0.345) return ramp(t, 0.300, 0.345, 0.18, 1.0);
        if (t < 0.640) return ramp(t, 0.345, 0.640, 1.0,  0.32);
        if (t < 0.685) return ramp(t, 0.640, 0.685, 0.32, 1.0);
        if (t < 0.945) return 1.0;
        return ramp(t, 0.945, 1.0, 1.0, 0.0);
      }

      /* RING_ARC, eased: the debris never closed into a full ring. */
      float arc(float a){
        if (a < 0.20) return mix(0.62, 1.0,  smoothstep(0.0,  0.20, a));
        if (a < 0.40) return 1.0;
        if (a < 0.52) return mix(1.0,  0.06, smoothstep(0.40, 0.52, a));
        if (a < 0.63) return mix(0.06, 0.10, smoothstep(0.52, 0.63, a));
        if (a < 0.74) return mix(0.10, 0.95, smoothstep(0.63, 0.74, a));
        return mix(0.95, 0.55, smoothstep(0.74, 1.0, a));
      }

      void main(){
        float r = length(vLocal);
        float t = (r - uIn) / (uOut - uIn);
        if (t < 0.0 || t > 1.0) discard;

        float a = (atan(vLocal.y, vLocal.x) + 3.14159265) / 6.28318531;

        // Radial density structure, read purely along the radius so the bands
        // stay concentric the way real ringlets do.
        float fine = smoothstep(0.24, 0.82, fbm3(vec3(t * 46.0, 0.0, 0.0), 5));
        float coarse = smoothstep(0.30, 0.75, fbm3(vec3(t * 7.0, 0.0, 0.0), 4));
        float density = envelope(t) * mix(0.06, 1.0, fine) * mix(0.10, 1.0, coarse) * arc(a);
        if (density <= 0.002) discard;

        /* Dusty ice scatters mostly forward, so the arc flares when the star is
           on the far side of it and goes dull when we share a side with the sun.
           Blender expresses this as a 0.70 mix of translucent over diffuse. */
        vec3 n = normalize(vNormalW);
        vec3 V = normalize(cameraPosition - vWorld);
        float ls = dot(n, uSun);
        bool backlit = (dot(n, V) * ls) < 0.0;
        vec3 tint = backlit ? vec3(0.780, 0.760, 0.720) : vec3(0.560, 0.545, 0.520);
        float gain = backlit ? 1.35 : 1.0;

        // A ring lit edge-on receives very little light per particle.
        float illum = clamp(abs(ls), 0.10, 1.0);

        gl_FragColor = vec4(tint * gain * illum, density * 0.80);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
  });

  const mesh = new Mesh(new RingGeometry(RING_IN, RING_OUT, SEG.ring, 4), material);
  /* Flat in XY as generated; laid into the orbital plane and then tilted off it.
     The ring spans 47–64 units and the kira (46) and pulse (62) craft orbit
     inside that range   tilting the plane means they cross the arc at a visible
     angle instead of swimming through it. */
  mesh.rotation.x = -Math.PI / 2 + RING_TILT;
  mesh.rotation.y = RING_SPIN;
  mesh.renderOrder = 1;
  mesh.userData.uniforms = uniforms;
  return mesh;
}
