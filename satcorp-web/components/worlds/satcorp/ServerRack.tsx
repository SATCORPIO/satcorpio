"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Stage } from "@/components/system/Stage";
import { mulberry32 } from "@/lib/rng";

/**
 * THE IRON
 *
 * The in-house infrastructure section, rendered literally: a rack of blades
 * turning slowly in the dark, status LEDs breathing out of phase. Two instanced
 * meshes and nothing else   this sits behind text, so it must cost almost
 * nothing.
 */

const ROWS = 14;
const COLUMNS = 3;
const LED_PER_BLADE = 4;

function Rack() {
  const blades = useRef<THREE.InstancedMesh>(null);
  const leds = useRef<THREE.InstancedMesh>(null);
  const group = useRef<THREE.Group>(null);

  const bladeCount = ROWS * COLUMNS;
  const ledCount = bladeCount * LED_PER_BLADE;

  // Per-LED phase, decided once and identically on every visit.
  const ledSeeds = useMemo(() => {
    const rng = mulberry32(0x1704e5);
    return Array.from({ length: ledCount }, () => rng());
  }, [ledCount]);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const color = useMemo(() => new THREE.Color(), []);

  useFrame((state, delta) => {
    const bladeMesh = blades.current;
    const ledMesh = leds.current;
    if (!bladeMesh || !ledMesh) return;

    if (!bladeMesh.userData.laid) {
      let b = 0;
      let l = 0;
      for (let col = 0; col < COLUMNS; col++) {
        for (let row = 0; row < ROWS; row++) {
          const x = (col - (COLUMNS - 1) / 2) * 1.65;
          const y = (row - (ROWS - 1) / 2) * 0.28;

          dummy.position.set(x, y, 0);
          dummy.scale.set(1.5, 0.2, 0.9);
          dummy.updateMatrix();
          bladeMesh.setMatrixAt(b++, dummy.matrix);

          for (let k = 0; k < LED_PER_BLADE; k++) {
            dummy.position.set(x - 0.56 + k * 0.075, y, 0.47);
            dummy.scale.setScalar(0.035);
            dummy.updateMatrix();
            ledMesh.setMatrixAt(l++, dummy.matrix);
          }
        }
      }
      bladeMesh.instanceMatrix.needsUpdate = true;
      ledMesh.instanceMatrix.needsUpdate = true;
      bladeMesh.userData.laid = true;
    }

    const t = state.clock.elapsedTime;
    for (let i = 0; i < ledCount; i++) {
      const seed = ledSeeds[i];
      // Most LEDs idle green-ish amber; a few flicker red as traffic lands.
      const activity = Math.sin(t * (0.6 + seed * 3.4) + seed * 40) * 0.5 + 0.5;
      const hot = seed > 0.82;
      color.setRGB(
        hot ? 0.65 + activity * 0.35 : 0.18 + activity * 0.16,
        hot ? 0.06 : 0.05 + activity * 0.05,
        hot ? 0.1 : 0.05,
      );
      ledMesh.setColorAt(i, color);
    }
    if (ledMesh.instanceColor) ledMesh.instanceColor.needsUpdate = true;

    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.14) * 0.42;
      group.current.rotation.x = THREE.MathUtils.damp(
        group.current.rotation.x,
        -state.pointer.y * 0.12,
        3,
        delta,
      );
    }
  });

  return (
    <group ref={group}>
      <instancedMesh
        ref={blades}
        args={[undefined, undefined, bladeCount]}
        frustumCulled={false}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#16171a"
          roughness={0.72}
          metalness={0.55}
        />
      </instancedMesh>

      <instancedMesh
        ref={leds}
        args={[undefined, undefined, ledCount]}
        frustumCulled={false}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>

      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 4, 6]} intensity={1.5} color="#ffd9c9" />
      <pointLight position={[-2, -1, 3]} intensity={12} color="#a6192e" />
    </group>
  );
}

/** The caller owns positioning and size   see the note in HeroMark. */
export function ServerRackScene({ className = "" }: { className?: string }) {
  return (
    <div className={className} aria-hidden>
      <Stage interactive={false} camera={{ position: [0, 0, 6.2], fov: 42 }}>
        <Rack />
      </Stage>
    </div>
  );
}
