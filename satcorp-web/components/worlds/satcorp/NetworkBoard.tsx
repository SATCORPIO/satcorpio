"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import { DIVISIONS, type DivisionId } from "@/lib/divisions";
import { RedThread } from "@/components/fingerprints/RedThread";

/**
 * THE NETWORK
 *
 * An evidence-board constellation: the SATCORP monogram at the centre with the
 * five divisions pinned around it, each joined by a length of red thread.
 * Pointer drift parallaxes the board; dragging rotates it; a node lights its
 * thread and offers passage.
 *
 * Decorative by design — the accessible list of divisions lives in the page
 * markup below, so nothing here is load-bearing for keyboard or screen readers.
 */

const NODES = DIVISIONS.filter((d) => d.id !== "satcorp");

/** Pinned positions, deliberately irregular — a board, not a diagram. */
const LAYOUT: Record<string, [number, number, number]> = {
  anu: [-2.9, 1.35, 0.35],
  kyrax: [2.75, 1.6, -0.3],
  kira: [-3.25, -1.5, -0.25],
  namtar: [3.05, -1.2, 0.4],
  pulse: [0.35, -2.35, 0.15],
};

export function NetworkBoard({
  onSelect,
  onHover,
}: {
  onSelect: (id: DivisionId) => void;
  onHover: (id: DivisionId | null) => void;
}) {
  const group = useRef<THREE.Group>(null);
  const drag = useRef({ active: false, x: 0, y: 0 });
  const spin = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const [hovered, setHovered] = useState<DivisionId | null>(null);
  const { size } = useThree();

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;

    if (!drag.current.active) {
      // Idle parallax follows the pointer, gently.
      spin.current.tx = -state.pointer.y * 0.18;
      spin.current.ty = state.pointer.x * 0.28;
    }

    spin.current.x = THREE.MathUtils.damp(
      spin.current.x,
      spin.current.tx,
      4,
      delta,
    );
    spin.current.y = THREE.MathUtils.damp(
      spin.current.y,
      spin.current.ty,
      4,
      delta,
    );

    g.rotation.x = spin.current.x;
    g.rotation.y = spin.current.y;
    // A slow, almost imperceptible sway. The board is hanging, not mounted.
    g.position.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.06;
  });

  // A pin under the pointer is a thing you can take; say so with the cursor.
  useEffect(() => {
    if (!hovered) return;
    document.body.style.cursor = "pointer";
    return () => {
      document.body.style.cursor = "";
    };
  }, [hovered]);

  const setHover = (id: DivisionId | null) => {
    setHovered(id);
    onHover(id);
  };

  return (
    <group
      ref={group}
      onPointerDown={(e: ThreeEvent<PointerEvent>) => {
        drag.current = { active: true, x: e.clientX, y: e.clientY };
      }}
      onPointerUp={() => {
        drag.current.active = false;
      }}
      onPointerMove={(e: ThreeEvent<PointerEvent>) => {
        if (!drag.current.active) return;
        spin.current.ty += ((e.clientX - drag.current.x) / size.width) * 2.4;
        spin.current.tx += ((e.clientY - drag.current.y) / size.height) * 1.6;
        spin.current.tx = THREE.MathUtils.clamp(spin.current.tx, -0.5, 0.5);
        drag.current.x = e.clientX;
        drag.current.y = e.clientY;
      }}
      onPointerLeave={() => {
        drag.current.active = false;
        setHover(null);
      }}
    >
      {/* Threads from the centre out to each pin. */}
      {NODES.map((d) => {
        const [x, y, z] = LAYOUT[d.id];
        return (
          <RedThread
            key={`thread-${d.id}`}
            points={[
              [0, 0, 0],
              [x * 0.45, y * 0.45 + 0.25, z * 0.5 + 0.15],
              [x, y, z],
            ]}
            radius={0.012}
            tubularSegments={64}
            wave={0.012}
            speed={hovered === d.id ? 0.5 : 0.14}
            intensity={hovered === d.id ? 2.1 : 0.75}
          />
        );
      })}

      <CentreMark />

      {NODES.map((d) => {
        const [x, y, z] = LAYOUT[d.id];
        return (
          <Pin
            key={d.id}
            position={[x, y, z]}
            color={d.accent}
            active={hovered === d.id}
            onOver={() => setHover(d.id)}
            onOut={() => setHover(null)}
            onClick={() => onSelect(d.id)}
          />
        );
      })}
    </group>
  );
}

/** The SATCORP mark at the centre of the board: an octagon, slowly turning. */
function CentreMark() {
  const ref = useRef<THREE.Group>(null);

  const octagon = useMemo(() => {
    const points: THREE.Vector3[] = [];
    // lineLoop closes itself, so eight points draw eight sides.
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2 + Math.PI / 8;
      points.push(new THREE.Vector3(Math.cos(a) * 0.62, Math.sin(a) * 0.62, 0));
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  useEffect(() => () => octagon.dispose(), [octagon]);

  useFrame((state) => {
    if (ref.current) ref.current.rotation.z = state.clock.elapsedTime * 0.06;
  });

  return (
    <group ref={ref}>
      <lineLoop geometry={octagon}>
        <lineBasicMaterial color="#a6192e" transparent opacity={0.8} />
      </lineLoop>
      <mesh>
        <circleGeometry args={[0.09, 24]} />
        <meshBasicMaterial color="#e9e1d3" />
      </mesh>
    </group>
  );
}

/** A pinned division: a ring, a core, and a halo that swells on hover. */
function Pin({
  position,
  color,
  active,
  onOver,
  onOut,
  onClick,
}: {
  position: [number, number, number];
  color: string;
  active: boolean;
  onOver: () => void;
  onOut: () => void;
  onClick: () => void;
}) {
  const ring = useRef<THREE.Mesh>(null);
  const halo = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const target = active ? 1.45 : 1;
    if (ring.current) {
      const s = THREE.MathUtils.damp(ring.current.scale.x, target, 8, delta);
      ring.current.scale.setScalar(s);
      ring.current.rotation.z += delta * (active ? 0.9 : 0.2);
    }
    if (halo.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.6) * 0.08;
      halo.current.scale.setScalar((active ? 1.9 : 1.2) * pulse);
      const material = halo.current.material as THREE.MeshBasicMaterial;
      material.opacity = THREE.MathUtils.damp(
        material.opacity,
        active ? 0.28 : 0.1,
        6,
        delta,
      );
    }
  });

  return (
    <group
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        onOver();
      }}
      onPointerOut={onOut}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      {/* Generous invisible hit area — the visible pin is small. */}
      <mesh visible={false}>
        <circleGeometry args={[0.42, 8]} />
      </mesh>

      <mesh ref={halo}>
        <circleGeometry args={[0.3, 24]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.1}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh ref={ring}>
        <ringGeometry args={[0.15, 0.175, 6]} />
        <meshBasicMaterial color={color} transparent opacity={0.9} />
      </mesh>

      <mesh>
        <circleGeometry args={[0.05, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
}
