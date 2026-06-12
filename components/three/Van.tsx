"use client";

import { useRef } from "react";
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
        <cylinderGeometry args={[0.27, 0.27, 0.2, 20]} />
        <meshStandardMaterial color={TIRE} roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.105, 0]}>
        <cylinderGeometry args={[0.11, 0.11, 0.02, 12]} />
        <meshStandardMaterial color={VOLT} emissive={VOLT} emissiveIntensity={0.15} />
      </mesh>
    </group>
  );
}

/** One ">" chevron of the side livery, pointing toward the front (+X). */
function Chevron({ x, side }: { x: number; side: 1 | -1 }) {
  return (
    <group position={[x, 0.78, side * 0.532]}>
      <mesh position={[0, 0.09, 0]} rotation={[0, 0, -0.7]}>
        <boxGeometry args={[0.26, 0.07, 0.012]} />
        <meshStandardMaterial color={DARK} roughness={0.6} />
      </mesh>
      <mesh position={[0, -0.09, 0]} rotation={[0, 0, 0.7]}>
        <boxGeometry args={[0.26, 0.07, 0.012]} />
        <meshStandardMaterial color={DARK} roughness={0.6} />
      </mesh>
    </group>
  );
}

/**
 * Partner-class panel van — the RAPIDOSS fleet car. One-piece volt body
 * with a sloped hood and windshield, black livery band with double
 * chevrons, glass cab, rolling wheels. Front faces +X.
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
        {/* main body — continuous roofline like a small panel van */}
        <RoundedBox args={[2.3, 1.0, 1.05]} radius={0.07} smoothness={3} position={[-0.15, 0.78, 0]}>
          <meshStandardMaterial color={VOLT} roughness={0.45} metalness={0.15} />
        </RoundedBox>
        {/* hood, dropped and shorter */}
        <RoundedBox args={[0.62, 0.42, 0.98]} radius={0.06} smoothness={3} position={[1.18, 0.5, 0]}>
          <meshStandardMaterial color={VOLT} roughness={0.45} metalness={0.15} />
        </RoundedBox>
        {/* windshield slope joining hood to roof */}
        <mesh position={[0.97, 0.93, 0]} rotation={[0, 0, -0.55]}>
          <boxGeometry args={[0.05, 0.5, 0.9]} />
          <meshStandardMaterial color={GLASS} roughness={0.15} metalness={0.7} />
        </mesh>
        {/* cab side windows */}
        <mesh position={[0.62, 0.98, 0]}>
          <boxGeometry args={[0.62, 0.34, 1.06]} />
          <meshStandardMaterial color={GLASS} roughness={0.15} metalness={0.7} />
        </mesh>
        {/* black livery band along the lower body */}
        <mesh position={[-0.15, 0.42, 0]}>
          <boxGeometry args={[2.31, 0.22, 1.06]} />
          <meshStandardMaterial color={DARK} roughness={0.7} />
        </mesh>
        {/* double chevron brand mark on both panel sides */}
        {([1, -1] as const).map((side) => (
          <group key={side}>
            <Chevron x={-0.62} side={side} />
            <Chevron x={-0.32} side={side} />
          </group>
        ))}
        {/* sliding-door seam */}
        {([1, -1] as const).map((side) => (
          <mesh key={side} position={[0.18, 0.78, side * 0.528]}>
            <boxGeometry args={[0.015, 0.62, 0.01]} />
            <meshStandardMaterial color={DARK} roughness={0.6} />
          </mesh>
        ))}
        {/* rear door seam */}
        <mesh position={[-1.305, 0.78, 0]}>
          <boxGeometry args={[0.012, 0.8, 0.96]} />
          <meshStandardMaterial color={DARK} roughness={0.6} />
        </mesh>
        {/* front fascia + grille */}
        <mesh position={[1.5, 0.42, 0]}>
          <boxGeometry args={[0.06, 0.34, 0.96]} />
          <meshStandardMaterial color={DARK} roughness={0.7} />
        </mesh>
        {/* chassis skirt */}
        <mesh position={[0.05, 0.22, 0]}>
          <boxGeometry args={[2.85, 0.18, 0.98]} />
          <meshStandardMaterial color={TIRE} roughness={0.9} />
        </mesh>
        {/* headlights */}
        {([-0.36, 0.36] as const).map((z) => (
          <mesh key={z} position={[1.51, 0.58, z]}>
            <boxGeometry args={[0.05, 0.09, 0.18]} />
            <meshStandardMaterial color="#fff6cf" emissive="#ffe88a" emissiveIntensity={2.2} />
          </mesh>
        ))}
        {/* tail lights */}
        {([-0.4, 0.4] as const).map((z) => (
          <mesh key={z} position={[-1.31, 0.6, z]}>
            <boxGeometry args={[0.03, 0.16, 0.1]} />
            <meshStandardMaterial color="#5c1410" emissive="#e03c2a" emissiveIntensity={1.4} />
          </mesh>
        ))}
        {/* mirrors */}
        {([1, -1] as const).map((side) => (
          <mesh key={side} position={[0.95, 0.95, side * 0.58]}>
            <boxGeometry args={[0.05, 0.1, 0.08]} />
            <meshStandardMaterial color={DARK} roughness={0.6} />
          </mesh>
        ))}
      </group>

      <Wheel position={[0.95, 0.27, 0.52]} spin={spin} />
      <Wheel position={[0.95, 0.27, -0.52]} spin={spin} />
      <Wheel position={[-0.85, 0.27, 0.52]} spin={spin} />
      <Wheel position={[-0.85, 0.27, -0.52]} spin={spin} />
    </group>
  );
}
