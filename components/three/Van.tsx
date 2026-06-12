"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

const VOLT = "#f5c400";
const DARK = "#16140f";
const TIRE = "#0c0b09";
const GLASS = "#22201a";

function Wheel({
  position,
  spin,
}: {
  position: [number, number, number];
  spin: boolean;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (spin && ref.current) ref.current.rotation.y -= delta * 9;
  });
  return (
    // parent lays the cylinder on its side so its local Y spin
    // becomes a roll around the world X axis
    <group position={position} rotation={[0, 0, Math.PI / 2]}>
      <mesh ref={ref}>
        <cylinderGeometry args={[0.29, 0.29, 0.22, 24]} />
        <meshStandardMaterial color={TIRE} roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.115, 0]}>
        <cylinderGeometry args={[0.11, 0.11, 0.02, 16]} />
        <meshStandardMaterial color={VOLT} emissive={VOLT} emissiveIntensity={0.15} />
      </mesh>
    </group>
  );
}

/** One ">" chevron of the side livery, pointing toward the front (+X). */
function Chevron({ x, side }: { x: number; side: 1 | -1 }) {
  return (
    <group position={[x, 0.82, side * 0.6]}>
      <mesh position={[0, 0.08, 0]} rotation={[0, 0, -0.7]}>
        <boxGeometry args={[0.22, 0.06, 0.012]} />
        <meshStandardMaterial color={DARK} roughness={0.6} />
      </mesh>
      <mesh position={[0, -0.08, 0]} rotation={[0, 0, 0.7]}>
        <boxGeometry args={[0.22, 0.06, 0.012]} />
        <meshStandardMaterial color={DARK} roughness={0.6} />
      </mesh>
    </group>
  );
}

/**
 * Partner-class ludospace — the RAPIDOSS fleet car. A single smooth
 * monovolume: the side profile (short rounded nose, raked windshield,
 * gently curved roof, upright tail) is extruded with a deep bevel so
 * every edge stays soft. Front faces +X.
 */
export default function Van({ spin = true }: { spin?: boolean }) {
  const body = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!body.current) return;
    // suspension bob
    body.current.position.y = Math.sin(state.clock.elapsedTime * 7) * 0.012;
  });

  const bodyGeometry = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-1.28, 0.3);
    // upright tail with a rounded roof corner
    s.lineTo(-1.28, 0.98);
    s.quadraticCurveTo(-1.28, 1.16, -1.0, 1.17);
    // gently curved roof
    s.quadraticCurveTo(-0.2, 1.22, 0.38, 1.16);
    // long raked windshield flowing into the nose (monovolume, no step)
    s.quadraticCurveTo(0.75, 1.08, 1.02, 0.72);
    // short rounded nose
    s.quadraticCurveTo(1.3, 0.52, 1.4, 0.42);
    s.quadraticCurveTo(1.46, 0.36, 1.44, 0.3);
    s.lineTo(-1.28, 0.3);

    const g = new THREE.ExtrudeGeometry(s, {
      depth: 0.96,
      curveSegments: 24,
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 0.09,
      bevelSegments: 6,
    });
    g.translate(0, 0, -0.48);
    return g;
  }, []);

  return (
    <group>
      <group ref={body}>
        {/* monovolume body shell */}
        <mesh geometry={bodyGeometry}>
          <meshStandardMaterial color={VOLT} roughness={0.35} metalness={0.2} />
        </mesh>

        {/* windshield following the rake */}
        <mesh position={[0.78, 0.92, 0]} rotation={[0, 0, -0.74]}>
          <boxGeometry args={[0.04, 0.52, 0.94]} />
          <meshStandardMaterial color={GLASS} roughness={0.12} metalness={0.7} />
        </mesh>
        {/* cab side windows, rounded */}
        <RoundedBox args={[0.78, 0.3, 1.18]} radius={0.05} smoothness={3} position={[0.18, 0.9, 0]}>
          <meshStandardMaterial color={GLASS} roughness={0.12} metalness={0.7} />
        </RoundedBox>
        {/* rear window */}
        <RoundedBox args={[0.06, 0.26, 0.68]} radius={0.025} smoothness={3} position={[-1.31, 0.92, 0]}>
          <meshStandardMaterial color={GLASS} roughness={0.12} metalness={0.7} />
        </RoundedBox>

        {/* black livery band low on the body */}
        <RoundedBox args={[2.52, 0.18, 1.21]} radius={0.04} smoothness={3} position={[-0.08, 0.43, 0]}>
          <meshStandardMaterial color={DARK} roughness={0.7} />
        </RoundedBox>
        {/* double chevron brand mark on the rear panels */}
        {([1, -1] as const).map((side) => (
          <group key={side}>
            <Chevron x={-0.78} side={side} />
            <Chevron x={-0.5} side={side} />
          </group>
        ))}

        {/* plastic bumpers, rounded */}
        <RoundedBox args={[0.2, 0.2, 1.06]} radius={0.06} smoothness={3} position={[1.42, 0.34, 0]}>
          <meshStandardMaterial color={TIRE} roughness={0.85} />
        </RoundedBox>
        <RoundedBox args={[0.16, 0.2, 1.06]} radius={0.06} smoothness={3} position={[-1.32, 0.34, 0]}>
          <meshStandardMaterial color={TIRE} roughness={0.85} />
        </RoundedBox>

        {/* swept-back headlights on the nose corners */}
        {([1, -1] as const).map((side) => (
          <mesh
            key={side}
            position={[1.28, 0.52, side * 0.42]}
            rotation={[0, side * -0.5, -0.25]}
          >
            <boxGeometry args={[0.05, 0.09, 0.26]} />
            <meshStandardMaterial color="#fff6cf" emissive="#ffe88a" emissiveIntensity={2.2} />
          </mesh>
        ))}
        {/* tail lights, vertical like the Partner's */}
        {([1, -1] as const).map((side) => (
          <mesh key={side} position={[-1.33, 0.72, side * 0.46]}>
            <boxGeometry args={[0.03, 0.3, 0.09]} />
            <meshStandardMaterial color="#5c1410" emissive="#e03c2a" emissiveIntensity={1.4} />
          </mesh>
        ))}
        {/* mirrors */}
        {([1, -1] as const).map((side) => (
          <RoundedBox
            key={side}
            args={[0.05, 0.09, 0.07]}
            radius={0.02}
            smoothness={2}
            position={[0.66, 0.95, side * 0.62]}
          >
            <meshStandardMaterial color={DARK} roughness={0.6} />
          </RoundedBox>
        ))}
      </group>

      <Wheel position={[0.9, 0.29, 0.52]} spin={spin} />
      <Wheel position={[0.9, 0.29, -0.52]} spin={spin} />
      <Wheel position={[-0.82, 0.29, 0.52]} spin={spin} />
      <Wheel position={[-0.82, 0.29, -0.52]} spin={spin} />
    </group>
  );
}
