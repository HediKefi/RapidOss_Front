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
const FLOOR_Y = -1.75;

/**
 * The fleet van — star of the scene. Driving in place over the
 * scrolling floor, with a gentle road sway.
 */
function FleetVan({ moving }: { moving: boolean }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current || !moving) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = -0.52 + Math.sin(t * 0.3) * 0.05;
    ref.current.position.z = 0.4 + Math.sin(t * 0.45) * 0.1;
  });

  return (
    <group ref={ref} position={[1.7, FLOOR_Y, 0.4]} rotation={[0, -0.52, 0]} scale={1.28}>
      <Van spin={moving} />
    </group>
  );
}

/** Secondary cast: small parcels drifting in the backdrop. */
function Parcels() {
  const items = useMemo(
    () =>
      [
        { pos: [-3.6, 0.9, -1.6], size: 0.34, wire: false, speed: 1.6 },
        { pos: [-2.4, 1.8, -0.8], size: 0.22, wire: true, speed: 2.2 },
        { pos: [-4.5, -0.2, -2.2], size: 0.46, wire: true, speed: 0.9 },
        { pos: [3.9, 1.7, -1.8], size: 0.3, wire: false, speed: 1.3 },
        { pos: [4.6, 0.3, -2.4], size: 0.4, wire: true, speed: 1.1 },
        { pos: [-1.2, 2.2, -1.2], size: 0.2, wire: false, speed: 2.4 },
      ] as const,
    []
  );

  return (
    <>
      {items.map((it, i) => (
        <Float
          key={i}
          speed={it.speed}
          rotationIntensity={1.3}
          floatIntensity={1.5}
          position={it.pos as unknown as THREE.Vector3}
        >
          <mesh>
            <boxGeometry args={[it.size, it.size, it.size]} />
            {it.wire ? (
              <meshBasicMaterial color={VOLT} wireframe transparent opacity={0.45} />
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

/** Scrolls the floor under the van so it reads as driving. */
function MovingFloor({ light, moving }: { light: boolean; moving: boolean }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current || !moving) return;
    // wrap within one grid section so the shader pattern loops seamlessly
    ref.current.position.x = -((state.clock.elapsedTime * 2.8) % 4);
  });

  return (
    <group ref={ref}>
      <Grid
        position={[0, FLOOR_Y, 0]}
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
    </group>
  );
}

/** Eases the camera toward the pointer for a parallax feel. */
function CameraRig() {
  useFrame((state) => {
    const { camera, pointer } = state;
    camera.position.x += (pointer.x * 1.0 - camera.position.x) * 0.04;
    camera.position.y += (0.55 + pointer.y * 0.45 - camera.position.y) * 0.04;
    camera.lookAt(0.7, -0.55, 0);
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
      camera={{ position: [0, 0.55, 7.2], fov: 38 }}
      dpr={[1, 1.75]}
      frameloop={reduced ? "demand" : "always"}
      gl={{ antialias: true, alpha: true }}
      aria-hidden
      onCreated={({ camera }) => camera.lookAt(0.7, -0.55, 0)}
    >
      <fog attach="fog" args={[light ? FOG_LIGHT : FOG_DARK, 9, 18]} />
      <ambientLight intensity={light ? 0.9 : 0.55} />
      <directionalLight position={[4, 6, 5]} intensity={1.2} color="#fff7df" />
      <pointLight position={[-5, 2, -3]} intensity={14} color={VOLT} />

      <FleetVan moving={!reduced} />
      <Parcels />

      <Sparkles
        count={60}
        scale={[14, 6, 8]}
        position={[0, 0.8, -1]}
        size={1.6}
        speed={reduced ? 0 : 0.35}
        opacity={light ? 0.8 : 0.5}
        color={light ? "#9a7a00" : VOLT}
      />

      <MovingFloor light={light} moving={!reduced} />

      {!reduced && <CameraRig />}
    </Canvas>
  );
}
