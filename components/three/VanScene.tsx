"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Grid, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import Van from "./Van";

const VOLT = "#f5c400";
const FOG_DARK = "#0c0b09";
const FOG_LIGHT = "#e7e3d3";

/** Scrolls the floor backwards so the parked-in-frame van reads as driving. */
function MovingFloor({ light, moving }: { light: boolean; moving: boolean }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current || !moving) return;
    // wrap within one section so the shader pattern loops seamlessly
    ref.current.position.x = -((state.clock.elapsedTime * 2.6) % 3.2);
  });

  return (
    <group ref={ref}>
      <Grid
        position={[0, 0, 0]}
        args={[40, 40]}
        cellSize={0.8}
        cellThickness={0.45}
        cellColor={light ? "#b9b29a" : "#2a281f"}
        sectionSize={3.2}
        sectionThickness={1}
        sectionColor={light ? "#c79b00" : VOLT}
        fadeDistance={18}
        fadeStrength={2.5}
        infiniteGrid
      />
    </group>
  );
}

function Rig({ moving }: { moving: boolean }) {
  useFrame((state) => {
    if (!moving) return;
    const { camera, pointer } = state;
    camera.position.x += (3.4 + pointer.x * 0.7 - camera.position.x) * 0.05;
    camera.position.y += (1.6 + pointer.y * 0.4 - camera.position.y) * 0.05;
    camera.lookAt(0, 0.55, 0);
  });
  return null;
}

export default function VanScene({
  reduced = false,
  light = false,
}: {
  reduced?: boolean;
  light?: boolean;
}) {
  return (
    <Canvas
      camera={{ position: [3.4, 1.6, 4.6], fov: 36 }}
      dpr={[1, 1.75]}
      frameloop={reduced ? "demand" : "always"}
      gl={{ antialias: true, alpha: true }}
      aria-hidden
    >
      <fog attach="fog" args={[light ? FOG_LIGHT : FOG_DARK, 8, 16]} />
      <ambientLight intensity={light ? 0.9 : 0.55} />
      <directionalLight position={[5, 7, 4]} intensity={1.2} color="#fff7df" />
      <pointLight position={[-4, 2.5, -3]} intensity={12} color={VOLT} />

      <group rotation={[0, -0.5, 0]}>
        <Van spin={!reduced} />
      </group>

      <MovingFloor light={light} moving={!reduced} />

      <Sparkles
        count={45}
        scale={[12, 4, 8]}
        position={[0, 1.4, 0]}
        size={1.4}
        speed={reduced ? 0 : 0.3}
        opacity={light ? 0.8 : 0.45}
        color={light ? "#9a7a00" : VOLT}
      />

      <Rig moving={!reduced} />
    </Canvas>
  );
}
