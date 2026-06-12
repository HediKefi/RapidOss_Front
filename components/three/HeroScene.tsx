"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Edges, Float, Grid, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import Van from "./Van";

const VOLT = "#f5c400";
const CARDBOARD = "#191712";
const FOG_DARK = "#0c0b09";
const FOG_LIGHT = "#e7e3d3";

/** The hero parcel: dark carton with two volt straps and glowing edges. */
function Parcel() {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.25;
    group.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.4) * 0.06 + 0.12;
  });

  return (
    <Float speed={1.6} rotationIntensity={0.25} floatIntensity={0.9}>
      <group ref={group}>
        {/* carton */}
        <mesh>
          <boxGeometry args={[2.1, 1.4, 1.4]} />
          <meshStandardMaterial color={CARDBOARD} roughness={0.85} metalness={0.1} />
          <Edges scale={1.001} color={VOLT} />
        </mesh>
        {/* straps */}
        <mesh>
          <boxGeometry args={[2.12, 1.42, 0.22]} />
          <meshStandardMaterial
            color={VOLT}
            emissive={VOLT}
            emissiveIntensity={0.25}
            roughness={0.5}
          />
        </mesh>
        <mesh>
          <boxGeometry args={[0.22, 1.42, 1.42]} />
          <meshStandardMaterial
            color={VOLT}
            emissive={VOLT}
            emissiveIntensity={0.25}
            roughness={0.5}
          />
        </mesh>
        {/* shipping label */}
        <mesh position={[0.55, 0.3, 0.701]}>
          <planeGeometry args={[0.7, 0.42]} />
          <meshStandardMaterial color="#e8e4d8" roughness={0.9} />
        </mesh>
      </group>
    </Float>
  );
}

/** Small satellite boxes drifting around the hero parcel. */
function Satellites() {
  const items = useMemo(
    () =>
      [
        { pos: [-3.2, 1.1, -1.2], size: 0.42, wire: false, speed: 2.2 },
        { pos: [3.4, 0.4, -0.8], size: 0.3, wire: true, speed: 1.4 },
        { pos: [-2.6, -1.0, 0.6], size: 0.26, wire: true, speed: 1.8 },
        { pos: [2.7, 1.6, 0.4], size: 0.34, wire: false, speed: 1.2 },
        { pos: [4.3, -0.9, -1.6], size: 0.5, wire: false, speed: 1.0 },
        { pos: [-4.4, 0.2, -2.0], size: 0.56, wire: true, speed: 0.8 },
        { pos: [1.6, -1.5, 1.1], size: 0.2, wire: true, speed: 2.6 },
        { pos: [-1.4, 2.0, -0.4], size: 0.24, wire: false, speed: 2.0 },
      ] as const,
    []
  );

  return (
    <>
      {items.map((it, i) => (
        <Float
          key={i}
          speed={it.speed}
          rotationIntensity={1.4}
          floatIntensity={1.6}
          position={it.pos as unknown as THREE.Vector3}
        >
          <mesh>
            <boxGeometry args={[it.size, it.size, it.size]} />
            {it.wire ? (
              <meshBasicMaterial color={VOLT} wireframe transparent opacity={0.55} />
            ) : (
              <>
                <meshStandardMaterial color={CARDBOARD} roughness={0.9} />
                <Edges scale={1.002} color={VOLT} />
              </>
            )}
          </mesh>
        </Float>
      ))}
    </>
  );
}

/** The fleet van crossing the grid floor on a loop. */
function DrivingVan({ moving }: { moving: boolean }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current || !moving) return;
    // -12 → +12 loop; fog swallows it at both ends
    ref.current.position.x = ((state.clock.elapsedTime * 3.2) % 24) - 12;
  });

  return (
    <group ref={ref} position={[-3.5, -2.1, 1.7]} scale={0.62}>
      <Van spin={moving} />
    </group>
  );
}

/** Eases the camera toward the pointer for a parallax feel. */
function CameraRig() {
  useFrame((state) => {
    const { camera, pointer } = state;
    camera.position.x += (pointer.x * 1.1 - camera.position.x) * 0.04;
    camera.position.y += (0.7 + pointer.y * 0.5 - camera.position.y) * 0.04;
    camera.lookAt(0, 0.1, 0);
  });
  return null;
}

export default function HeroScene({
  reduced = false,
  light = false,
}: {
  reduced?: boolean;
  light?: boolean;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0.7, 7.2], fov: 38 }}
      dpr={[1, 1.75]}
      frameloop={reduced ? "demand" : "always"}
      gl={{ antialias: true, alpha: true }}
      aria-hidden
    >
      <fog attach="fog" args={[light ? FOG_LIGHT : FOG_DARK, 9, 18]} />
      <ambientLight intensity={light ? 0.9 : 0.5} />
      <directionalLight position={[4, 6, 5]} intensity={1.1} color="#fff7df" />
      <pointLight position={[-5, 2, -3]} intensity={14} color={VOLT} />

      <group position={[1.1, 0.25, 0]}>
        <Parcel />
      </group>
      <Satellites />
      <DrivingVan moving={!reduced} />

      <Sparkles
        count={70}
        scale={[14, 6, 8]}
        size={1.6}
        speed={reduced ? 0 : 0.35}
        opacity={light ? 0.8 : 0.5}
        color={light ? "#9a7a00" : VOLT}
      />

      <Grid
        position={[0, -2.1, 0]}
        args={[30, 30]}
        cellSize={0.8}
        cellThickness={0.45}
        cellColor={light ? "#b9b29a" : "#2a281f"}
        sectionSize={4}
        sectionThickness={1}
        sectionColor={light ? "#c79b00" : VOLT}
        fadeDistance={22}
        fadeStrength={2.5}
        infiniteGrid
      />

      {!reduced && <CameraRig />}
    </Canvas>
  );
}
