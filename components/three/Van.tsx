"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Edges } from "@react-three/drei";
import * as THREE from "three";

const VOLT = "#f5c400";
const DARK = "#16140f";
const TIRE = "#0c0b09";

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
        <cylinderGeometry args={[0.3, 0.3, 0.22, 18]} />
        <meshStandardMaterial color={TIRE} roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.115, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.13, 0.13, 0.02, 12]} />
        <meshStandardMaterial color={VOLT} emissive={VOLT} emissiveIntensity={0.15} />
      </mesh>
    </group>
  );
}

/**
 * Low-poly RAPIDOSS delivery van: volt cargo box, dark cab,
 * glowing headlights and rolling wheels. Front faces +X.
 */
export default function Van({ spin = true }: { spin?: boolean }) {
  const body = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!body.current) return;
    // suspension bob
    body.current.position.y = Math.sin(state.clock.elapsedTime * 7) * 0.012;
  });

  return (
    <group>
      <group ref={body}>
        {/* cargo box */}
        <mesh position={[-0.55, 0.78, 0]}>
          <boxGeometry args={[1.9, 1.15, 1.05]} />
          <meshStandardMaterial color={VOLT} roughness={0.55} metalness={0.1} />
          <Edges scale={1.001} color={DARK} />
        </mesh>
        {/* black brand band on the cargo box */}
        <mesh position={[-0.55, 0.62, 0]}>
          <boxGeometry args={[1.91, 0.26, 1.06]} />
          <meshStandardMaterial color={DARK} roughness={0.7} />
        </mesh>
        {/* cab */}
        <mesh position={[0.78, 0.6, 0]}>
          <boxGeometry args={[0.85, 0.78, 1.0]} />
          <meshStandardMaterial color={DARK} roughness={0.65} />
          <Edges scale={1.001} color={VOLT} />
        </mesh>
        {/* windshield */}
        <mesh position={[1.18, 0.7, 0]} rotation={[0, 0, -0.22]}>
          <boxGeometry args={[0.06, 0.45, 0.88]} />
          <meshStandardMaterial color="#2c2a20" roughness={0.2} metalness={0.6} />
        </mesh>
        {/* chassis */}
        <mesh position={[0.1, 0.22, 0]}>
          <boxGeometry args={[2.6, 0.18, 0.95]} />
          <meshStandardMaterial color={TIRE} roughness={0.9} />
        </mesh>
        {/* headlights */}
        {([-0.34, 0.34] as const).map((z) => (
          <mesh key={z} position={[1.225, 0.42, z]}>
            <boxGeometry args={[0.04, 0.1, 0.16]} />
            <meshStandardMaterial
              color="#fff6cf"
              emissive="#ffe88a"
              emissiveIntensity={2.2}
            />
          </mesh>
        ))}
        {/* tail lights */}
        {([-0.36, 0.36] as const).map((z) => (
          <mesh key={z} position={[-1.51, 0.5, z]}>
            <boxGeometry args={[0.03, 0.12, 0.12]} />
            <meshStandardMaterial color="#5c1410" emissive="#e03c2a" emissiveIntensity={1.4} />
          </mesh>
        ))}
      </group>

      <Wheel position={[0.78, 0.3, 0.52]} spin={spin} />
      <Wheel position={[0.78, 0.3, -0.52]} spin={spin} />
      <Wheel position={[-1.0, 0.3, 0.52]} spin={spin} />
      <Wheel position={[-1.0, 0.3, -0.52]} spin={spin} />
    </group>
  );
}
