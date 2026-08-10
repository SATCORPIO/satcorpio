"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { mulberry32 } from "@/lib/rng";

/**
 * THE PROJECTION ROOM
 *
 * A private screening. The beam comes over your shoulder, dust turns in the
 * light, and the screen is deliberately still waiting   the reel has not been
 * cut yet. That is the honest state of the studio, and it is a far better look
 * than a placeholder apologising for itself.
 *
 * The dust does the work. The cone is kept faint; a hard-edged light shaft
 * reads as geometry, and motes catching the light read as a room.
 */

/**
 * Seen from the audience, so the screen is the anchor of the frame and the
 * beam arrives over your shoulder. The cone is kept narrow and faint on
 * purpose: looking straight up a wide bright cone reads as a ball of fog, not
 * as a projection. The rectangle is what tells the eye it is watching a film.
 */
const LENS = new THREE.Vector3(0, 3.0, 8.4);
const SCREEN = new THREE.Vector3(0, 1.3, -7.0);
const LENS_R = 0.14;
const SCREEN_R = 4.9;
const SCREEN_SIZE: [number, number] = [11.4, 6.4];

/* ------------------------------ the beam ------------------------------ */

const beamVertex = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vViewDir;
  void main() {
    vUv = uv;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vViewDir = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

const beamFragment = /* glsl */ `
  uniform vec3  uColor;
  uniform float uTime;
  uniform float uIntensity;
  varying vec2 vUv;
  varying vec3 vViewDir;

  void main() {
    // Cylinder uv: y runs lens (0) to screen (1) after the geometry flip.
    float along = vUv.y;

    // Light thins as it spreads.
    float falloff = mix(1.0, 0.06, pow(along, 0.7));

    // The projector flickers, because they always do.
    float flicker = 0.94 + 0.06 * sin(uTime * 41.0) * sin(uTime * 13.7);

    // Soft the silhouette so the cone never reads as a solid object.
    float edge = pow(abs(dot(normalize(vViewDir), vec3(0.0, 0.0, 1.0))), 0.6);

    float a = falloff * flicker * uIntensity * mix(0.35, 1.0, edge) * 0.028;
    gl_FragColor = vec4(uColor * (0.6 + falloff), a);
  }
`;

function Beam() {
  const material = useRef<THREE.ShaderMaterial>(null);

  const { geometry, position, quaternion } = useMemo(() => {
    const axis = new THREE.Vector3().subVectors(SCREEN, LENS);
    const length = axis.length();
    // Cylinder is built along +Y; point it down the beam axis.
    const geo = new THREE.CylinderGeometry(
      LENS_R,
      SCREEN_R,
      length,
      48,
      1,
      true,
    );
    geo.translate(0, -length / 2, 0);
    const quat = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, -1, 0),
      axis.clone().normalize(),
    );
    return { geometry: geo, position: LENS.clone(), quaternion: quat };
  }, []);

  useEffect(() => () => geometry.dispose(), [geometry]);

  const uniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color("#cfe6e4") },
      uTime: { value: 0 },
      uIntensity: { value: 1 },
    }),
    [],
  );

  useFrame((_, delta) => {
    if (material.current) material.current.uniforms.uTime.value += delta;
  });

  return (
    <mesh
      geometry={geometry}
      position={position}
      quaternion={quaternion}
      frustumCulled={false}
    >
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={beamVertex}
        fragmentShader={beamFragment}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

/* ------------------------------ the dust ------------------------------ */

const dustVertex = /* glsl */ `
  uniform float uTime;
  uniform vec3  uLens;
  uniform vec3  uScreen;
  uniform float uLensR;
  uniform float uScreenR;
  uniform float uDpr;

  attribute float aSeed;
  attribute float aSize;

  varying float vLit;

  void main() {
    vec3 p = position;

    // Motes turn slowly in the room's air.
    p.x += sin(uTime * 0.12 + aSeed * 44.0) * 0.5;
    p.y += cos(uTime * 0.09 + aSeed * 31.0) * 0.35 + sin(uTime * 0.05 + aSeed) * 0.2;
    p.z += sin(uTime * 0.07 + aSeed * 19.0) * 0.45;

    // How far inside the beam is this mote?
    vec3 axis = uScreen - uLens;
    float len = length(axis);
    vec3 dir = axis / len;
    float t = clamp(dot(p - uLens, dir) / len, 0.0, 1.0);
    vec3 onAxis = uLens + dir * (t * len);
    float radial = distance(p, onAxis);
    float beamR = mix(uLensR, uScreenR, t);

    float inside = 1.0 - smoothstep(beamR * 0.62, beamR, radial);
    // Brighter close to the lens, where the light is still concentrated.
    vLit = inside * mix(1.0, 0.35, t);

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * uDpr * (1.0 + vLit * 2.2) * (9.0 / -mv.z);
  }
`;

const dustFragment = /* glsl */ `
  uniform vec3 uColor;
  varying float vLit;

  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float soft = smoothstep(0.5, 0.0, d);
    // Motes outside the beam are all but invisible. Give the unlit air any
    // real presence and thousands of faint additive sprites pile up into a
    // ball of fog that hides the shaft entirely.
    float a = soft * (0.004 + vLit * 0.95);
    gl_FragColor = vec4(uColor * (0.35 + vLit), a);
  }
`;

function Dust({ count }: { count: number }) {
  const material = useRef<THREE.ShaderMaterial>(null);

  const geometry = useMemo(() => {
    const rng = mulberry32(0xd057);
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // A room full of air, not a ball of fog. The motes fill a slab between
      // the lens and the screen; the shader decides which ones are in the
      // light, so the beam is described by what it illuminates.
      const depth = rng();
      const z = THREE.MathUtils.lerp(8.6, -6.8, depth);
      // The cone widens toward the screen, so seed more width down there.
      const width = THREE.MathUtils.lerp(2.2, 7.4, depth);
      positions[i * 3] = (rng() * 2 - 1) * width;
      positions[i * 3 + 1] =
        THREE.MathUtils.lerp(3.0, 1.2, depth) + (rng() * 2 - 1) * width * 0.52;
      positions[i * 3 + 2] = z;
      seeds[i] = rng();
      sizes[i] = 0.7 + rng() * 1.9;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), 22);
    return geo;
  }, [count]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uLens: { value: LENS.clone() },
      uScreen: { value: SCREEN.clone() },
      uLensR: { value: LENS_R },
      uScreenR: { value: SCREEN_R },
      uDpr: { value: 1.5 },
      uColor: { value: new THREE.Color("#e6f2f0") },
    }),
    [],
  );

  useFrame((state, delta) => {
    if (!material.current) return;
    material.current.uniforms.uTime.value += delta;
    material.current.uniforms.uDpr.value = state.viewport.dpr;
  });

  return (
    <points geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={dustVertex}
        fragmentShader={dustFragment}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ----------------------------- the screen ----------------------------- */

const screenFragment = /* glsl */ `
  uniform float uTime;
  uniform vec3  uTint;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(41.3, 289.1))) * 43758.5453);
  }

  void main() {
    // Unexposed stock: the lamp is on, the reel is not cut.
    vec2 c = vUv - 0.5;
    float vig = 1.0 - smoothstep(0.28, 0.72, length(c * vec2(1.0, 1.25)));

    // Slow drifting grain, plus the horizontal bloom of a hot lamp.
    float g = hash(floor(vUv * 320.0) + floor(uTime * 18.0));
    float bloom = exp(-pow(c.y * 2.6, 2.0));

    // Academy leader: the frame edge stays visibly brighter than the room, so
    // the eye reads a screen rather than a glow.
    float edge = max(
      step(0.978, abs(c.x) * 2.0),
      step(0.978, abs(c.y) * 2.0)
    );

    float lum = vig * (0.30 + bloom * 0.34) + g * 0.05 * vig;
    lum += edge * 0.35;
    gl_FragColor = vec4(uTint * lum, lum * 1.5);
  }
`;

const screenVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

function Screen() {
  const material = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uTint: { value: new THREE.Color("#9fd4cd") },
    }),
    [],
  );

  useFrame((_, delta) => {
    if (material.current) material.current.uniforms.uTime.value += delta;
  });

  return (
    <mesh position={SCREEN.toArray()}>
      <planeGeometry args={SCREEN_SIZE} />
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={screenVertex}
        fragmentShader={screenFragment}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

/* ------------------------------ assembly ------------------------------ */

/**
 * Three-quarter from the side and slightly under the beam. Head-on from the
 * audience, a projector shaft is just haze in front of you; from here it reads
 * as a shaft of light crossing a dark room to a screen   and it leaves the
 * left of frame clear for the writing.
 */
const EYE = new THREE.Vector3(-6.6, 1.15, 5.4);
// Aimed to the left of the beam axis, which throws the whole assembly  
// shaft and screen   into the right of frame and leaves the left column dark
// for the programme text.
const EYE_TARGET = new THREE.Vector3(-3.1, 2.1, -1.6);

export function ProjectionRoom({ dustCount = 4200 }: { dustCount?: number }) {
  const rig = useRef<THREE.Group>(null);
  const aim = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    const g = rig.current;
    if (!g) return;
    const t = state.clock.elapsedTime;

    // Settle the seat, then lean a little with the pointer.
    state.camera.position.set(
      EYE.x + state.pointer.x * 0.35,
      EYE.y - state.pointer.y * 0.2,
      EYE.z,
    );
    aim.lerp(EYE_TARGET, 0.08);
    state.camera.lookAt(aim);

    // Gate weave. Real film never sits perfectly still in the gate, and the
    // eye reads this as celluloid long before it notices why.
    g.position.x = Math.sin(t * 8.3) * 0.004 + Math.sin(t * 2.1) * 0.006;
    g.position.y = Math.cos(t * 6.7) * 0.003;
  });

  return (
    <group ref={rig}>
      <Screen />
      <Beam />
      <Dust count={dustCount} />
    </group>
  );
}
