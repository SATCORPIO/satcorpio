"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { ScreenQuad } from "@react-three/drei";
import * as THREE from "three";
import { Stage } from "@/components/system/Stage";
import { RedThread } from "@/components/fingerprints/RedThread";
import { HorizontalFov } from "@/components/system/HorizontalFov";
import { useCapabilities, useReducedMotion } from "@/lib/tier";
import { scrollProgress, useDocumentScrollProgress } from "@/lib/scroll-progress";
import { mulberry32 } from "@/lib/rng";
import { Planet } from "./Planet";
import { Terrain } from "./Terrain";
import { Monoliths } from "./Monoliths";
import {
  MONOLITH_X,
  SURFACE_Y,
  band,
  pillarFocus,
  smoothstep,
  surfaceBlend,
  veilAlpha,
} from "./journey";

/**
 * NAMTAR'S WORLD   ORBIT TO SURFACE
 *
 * One canvas behind the whole page, scrubbed by document scroll: high orbit,
 * a dive through the cloud deck, a low pass over the ground, a long settle at
 * the horizon, and back out to orbit for the closing invitation.
 *
 * Where ANU's camera circles a room and KYRAX's flies through an archive, this
 * one *descends*. The page is the descent   which is why every section of copy
 * is written to land at a particular altitude.
 */

function Journey() {
  const target = useRef(new THREE.Vector3());
  const spacePos = useRef(new THREE.Vector3());
  const surfacePos = useRef(new THREE.Vector3());
  const spaceAim = useRef(new THREE.Vector3());
  const surfaceAim = useRef(new THREE.Vector3());
  const lateral = useRef(0);
  const held = useRef(0);
  const elapsed = useRef(0);

  useFrame((state, delta) => {
    const t = scrollProgress.value;
    elapsed.current += delta;
    const blend = surfaceBlend(t);

    /* --- in orbit --- */

    // Falling toward the planet, then pulling back out for the closing act.
    const inbound = smoothstep(0.0, 0.2, t);
    const outbound = smoothstep(0.82, 0.95, t);
    const radius = THREE.MathUtils.lerp(
      THREE.MathUtils.lerp(30, 9.6, inbound),
      26,
      outbound,
    );
    // Azimuth keeps drifting the whole way, so the face of the planet you
    // leave is not the face you come back to.
    const az = 0.7 + t * 1.5 + elapsed.current * 0.008;
    const el = THREE.MathUtils.lerp(0.34, 0.08, inbound);

    spacePos.current.set(
      Math.cos(el) * Math.cos(az) * radius,
      Math.sin(el) * radius,
      Math.cos(el) * Math.sin(az) * radius,
    );
    // In the hero the camera aims high and left of the planet, which puts the
    // planet low and right   out from under the wordmark. The aim straightens
    // onto the planet as the descent starts.
    spaceAim.current.set(
      THREE.MathUtils.lerp(-2.4, 0, inbound),
      THREE.MathUtils.lerp(3.1, 0, inbound),
      0,
    );

    /* --- on the surface --- */

    // Chosen pillar pulls the camera off centre. Damped, because a cut would
    // read as a page jump rather than a camera move.
    const focused = pillarFocus.value;
    lateral.current = THREE.MathUtils.damp(
      lateral.current,
      focused >= 0 ? MONOLITH_X[focused] : 0,
      2.6,
      delta,
    );
    // While one is held, the aim sits left of it, so the monolith lands in the
    // right of frame   the half of the screen the pillar list is not using.
    held.current = THREE.MathUtils.damp(
      held.current,
      focused >= 0 ? 1 : 0,
      2.6,
      delta,
    );

    const descend = band(t, [0.18, 0.34]);
    const settle = band(t, [0.34, 0.58]);
    // Low enough that the monoliths stand over the camera rather than under
    // it   a hundred-metre slab seen from above is just a rectangle.
    const height =
      THREE.MathUtils.lerp(170, 72, 1 - Math.pow(1 - descend, 3)) - settle * 10;
    const back = THREE.MathUtils.lerp(130, 26, descend) - settle * 8;

    surfacePos.current.set(
      lateral.current * 0.45 - held.current * 8,
      SURFACE_Y + height,
      back,
    );
    surfaceAim.current.set(
      lateral.current * 0.9 - held.current * 22,
      SURFACE_Y + THREE.MathUtils.lerp(60, 22, descend) + settle * 6,
      -190,
    );

    /* --- one camera --- */

    state.camera.position.lerpVectors(
      spacePos.current,
      surfacePos.current,
      blend,
    );
    target.current.lerpVectors(spaceAim.current, surfaceAim.current, blend);
    state.camera.lookAt(target.current);
  });

  return null;
}

/* --- the veil that hides both ends of the crossfade --- */

const veilVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = position.xy * 0.5 + 0.5;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const veilFragment = /* glsl */ `
  uniform float uAlpha;
  uniform vec3  uColor;
  varying vec2 vUv;

  void main() {
    // Heavier at the edges than the centre, so it reads as cloud closing in
    // around the viewer rather than a dip to a flat colour.
    float d = distance(vUv, vec2(0.5, 0.52));
    float weight = 0.72 + smoothstep(0.15, 0.85, d) * 0.55;
    gl_FragColor = vec4(uColor, clamp(uAlpha * weight, 0.0, 1.0));
  }
`;

function Veil() {
  const material = useRef<THREE.ShaderMaterial>(null);
  const mesh = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uAlpha: { value: 0 },
      uColor: { value: new THREE.Color("#c98a4e") },
    }),
    [],
  );

  useFrame(() => {
    const alpha = veilAlpha(scrollProgress.value);
    if (mesh.current) mesh.current.visible = alpha > 0.002;
    if (material.current) material.current.uniforms.uAlpha.value = alpha;
  });

  return (
    <ScreenQuad ref={mesh} renderOrder={100} visible={false}>
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={veilVertex}
        fragmentShader={veilFragment}
        transparent
        depthTest={false}
        depthWrite={false}
      />
    </ScreenQuad>
  );
}

/* --- the sky you see it from --- */

const starVertex = /* glsl */ `
  uniform float uDpr;
  attribute float aSize;
  varying float vSize;
  void main() {
    vSize = aSize;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * uDpr;
  }
`;

const starFragment = /* glsl */ `
  uniform float uOpacity;
  varying float vSize;
  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float falloff = smoothstep(0.5, 0.0, d);
    // Cool white, with the brighter stars running warm.
    vec3 color = mix(vec3(0.72, 0.78, 0.88), vec3(1.0, 0.90, 0.78), vSize * 0.25);
    gl_FragColor = vec4(color, falloff * uOpacity * (0.35 + vSize * 0.25));
  }
`;

function Stars({ count = 1400, dpr = 1.5 }: { count?: number; dpr?: number }) {
  const points = useRef<THREE.Points>(null);
  const material = useRef<THREE.ShaderMaterial>(null);

  const geometry = useMemo(() => {
    const rng = mulberry32(0x9a13f7);
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Even over the sphere   clustering here would read as a texture seam.
      const theta = rng() * Math.PI * 2;
      const z = rng() * 2 - 1;
      const r = Math.sqrt(1 - z * z);
      const radius = 300;
      positions[i * 3] = Math.cos(theta) * r * radius;
      positions[i * 3 + 1] = z * radius;
      positions[i * 3 + 2] = Math.sin(theta) * r * radius;
      sizes[i] = 0.6 + Math.pow(rng(), 3) * 3.4;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 320);
    return geo;
  }, [count]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  const uniforms = useMemo(
    () => ({ uOpacity: { value: 1 }, uDpr: { value: dpr } }),
    [dpr],
  );

  useFrame((state) => {
    const blend = surfaceBlend(scrollProgress.value);
    if (points.current) {
      // The shell travels with the viewer; stars are not somewhere you get to.
      points.current.position.copy(state.camera.position);
      points.current.visible = blend < 0.99;
    }
    if (material.current) {
      material.current.uniforms.uOpacity.value = 1 - blend;
    }
  });

  return (
    <points ref={points} geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={starVertex}
        fragmentShader={starFragment}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* --- the thread, as an orbit line --- */

/** A ring around the planet, tilted out of the equator so it crosses the disc. */
const ORBIT_LINE: [number, number, number][] = Array.from(
  { length: 15 },
  (_, i) => {
    const a = (i / 14) * Math.PI * 2;
    const r = 7.4;
    return [
      Math.cos(a) * r,
      Math.sin(a) * r * 0.34 + 1.1,
      Math.sin(a) * r * 0.86,
    ];
  },
);

function OrbitThread() {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    const blend = surfaceBlend(scrollProgress.value);
    if (!group.current) return;
    group.current.visible = blend < 0.9;
    group.current.rotation.y += delta * 0.02;
  });

  return (
    <group ref={group} rotation={[0.2, 0, 0.14]}>
      <RedThread
        points={ORBIT_LINE}
        radius={0.028}
        speed={0.22}
        wave={0}
        intensity={1.25}
        tubularSegments={280}
      />
    </group>
  );
}

/* --- the scene --- */

export function PlanetScene() {
  const caps = useCapabilities();
  const reducedMotion = useReducedMotion();

  useDocumentScrollProgress(!reducedMotion);

  const full = caps.tier === "full";

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <Stage
        interactive={false}
        camera={{ position: [0, 6, 30], fov: 45, near: 0.5, far: 900 }}
        fallback={<OrbitStill />}
      >
        {/* Framed for a cinema screen; tall windows see more sky, they do not
            crop the planet. */}
        <HorizontalFov degrees={70} />

        <Journey />
        <Stars count={full ? 2200 : 1100} dpr={caps.maxDpr} />
        <Planet detail={full ? 96 : 56} />

        <group position={[0, SURFACE_Y, 0]}>
          <Terrain segments={full ? 160 : 110} />
          <Monoliths />
        </group>

        {/* Fingerprint 2.3   on NAMTAR the red thread is an orbit line. */}
        <OrbitThread />

        <Veil />
      </Stage>

      {/* The copy runs down the centre, so the scrim is a vignette rather than
          a one-sided wash: the planet stays visible at the edges of frame. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(5,6,10,0.24)_0%,rgba(5,6,10,0.60)_58%,rgba(5,6,10,0.92)_100%)]" />
    </div>
  );
}

/**
 * Lite tier. The build plan calls for a pre-rendered scroll-scrub of the same
 * journey; until that video exists this is the honest stand-in   the same
 * composition, drawn in two gradients and costing nothing.
 */
function OrbitStill() {
  return (
    <div className="size-full bg-[radial-gradient(circle_at_50%_120%,rgba(217,126,47,0.26),transparent_45%),radial-gradient(circle_at_50%_130%,rgba(233,225,211,0.10),transparent_38%),radial-gradient(ellipse_at_50%_-10%,rgba(30,52,74,0.35),transparent_55%)]" />
  );
}
