import {
  BufferGeometry, BufferAttribute, Line, LineSegments, ShaderMaterial, Color,
  AdditiveBlending, WireframeGeometry, IcosahedronGeometry,
} from 'three';
import { PR } from '../core/config.js';

/** Orbit path: a dashed hologram with a comet trail riding behind the craft. */
export function orbitRing(rad, inc, color) {
  const N = 240;
  const pos = new Float32Array((N + 1) * 3);
  const at = new Float32Array(N + 1);
  for (let i = 0; i <= N; i++) {
    const a = (i / N) * Math.PI * 2;
    pos[i * 3] = Math.cos(a) * rad;
    pos[i * 3 + 1] = Math.sin(a) * rad * Math.sin(inc);
    pos[i * 3 + 2] = Math.sin(a) * rad * Math.cos(inc);
    at[i] = i / N;
  }
  const g = new BufferGeometry();
  g.setAttribute('position', new BufferAttribute(pos, 3));
  g.setAttribute('aT', new BufferAttribute(at, 1));
  const m = new ShaderMaterial({
    transparent: true, depthWrite: false, blending: AdditiveBlending,
    uniforms: { uCol: { value: new Color(color) }, uHead: { value: 0 }, uAct: { value: 0 } },
    vertexShader: /* glsl */ `
      attribute float aT; varying float vT;
      void main(){ vT = aT; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
    `,
    fragmentShader: /* glsl */ `
      varying float vT; uniform vec3 uCol; uniform float uHead, uAct;
      void main(){
        float dash = mix(0.45, 1.0, step(0.42, fract(vT * 110.0)));
        float base = mix(0.055, 0.17, uAct) * dash;
        float q = fract(uHead - vT);
        float trail = pow(1.0 - smoothstep(0.0, 0.16, q), 2.6);
        float a = base + trail * mix(0.55, 1.0, uAct);
        gl_FragColor = vec4(uCol * (1.0 + trail * 2.2), a);
      }
    `,
  });
  return new Line(g, m);
}

/** Downlink beam: Namtar's surface to the craft, with travelling packets. */
export function beam(color) {
  const g = new BufferGeometry();
  g.setAttribute('position', new BufferAttribute(new Float32Array(6), 3));
  g.setAttribute('aT', new BufferAttribute(new Float32Array([0, 1]), 1));
  const m = new ShaderMaterial({
    transparent: true, depthWrite: false, blending: AdditiveBlending,
    uniforms: { uCol: { value: new Color(color) }, uT: { value: 0 }, uOn: { value: 1 } },
    vertexShader: /* glsl */ `
      attribute float aT; varying float vT;
      void main(){ vT = aT; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
    `,
    fragmentShader: /* glsl */ `
      varying float vT; uniform vec3 uCol; uniform float uT, uOn;
      void main(){
        float p = fract(vT * 3.0 - uT);
        float pk = pow(1.0 - smoothstep(0.0, 0.10, p), 3.0);
        gl_FragColor = vec4(uCol, (0.035 + pk * 0.42) * uOn);
      }
    `,
  });
  return new Line(g, m);
}

/**
 * Survey lattice: a hologram wireframe with a wave sweeping pole to pole.
 * This is HUD language rather than planetary science — it belongs to the
 * mission-control frame, not to Namtar, so it keeps its own look.
 */
export function surveyLattice() {
  const R = PR * 1.09;
  return new LineSegments(
    new WireframeGeometry(new IcosahedronGeometry(R, 3)),
    new ShaderMaterial({
      transparent: true, depthWrite: false, blending: AdditiveBlending,
      uniforms: { uScan: { value: -1.4 }, uR: { value: R } },
      vertexShader: /* glsl */ `
        varying float vF; varying float vY; uniform float uR;
        void main(){
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          vec3 n = normalize(mat3(modelViewMatrix) * normalize(position));
          vF = smoothstep(-0.15, 0.55, dot(n, normalize(-mv.xyz)));
          vY = position.y / uR;
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: /* glsl */ `
        varying float vF; varying float vY; uniform float uScan;
        void main(){
          float band = exp(-pow((vY - uScan) * 7.0, 2.0));
          float a = vF * (0.05 + band * 0.45);
          gl_FragColor = vec4(mix(vec3(0.28, 0.66, 0.80), vec3(0.80, 0.95, 1.0), band), a);
        }
      `,
    })
  );
}
