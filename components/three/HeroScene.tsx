"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Edges, Float, Grid, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import Van from "./Van";

const VOLT = "#f5c400";
const BOX = "#e8b40a"; // kraft-yellow parcel
const FOG_DARK = "#0c0b09";
const FOG_LIGHT = "#e7e3d3";
const FLOOR_Y = -1.75;

/** The fleet van — star of the scene, driving in place with a road sway. */
function FleetVan({ moving }: { moving: boolean }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current || !moving) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = -0.85 + Math.sin(t * 0.3) * 0.05;
    ref.current.position.z = 0.4 + Math.sin(t * 0.45) * 0.1;
  });
  return (
    <group ref={ref} position={[1.55, FLOOR_Y, 0.4]} rotation={[0, -0.85, 0]} scale={1.22}>
      <Van spin={moving} />
    </group>
  );
}

/** Yellow parcels tumbling in the backdrop (secondary to the van). */
function Parcels() {
  const items = useMemo(
    () =>
      [
        { pos: [-3.7, 1.5, -1.6], size: 0.42, wire: false, speed: 1.6 },
        { pos: [-2.3, 2.2, -0.9], size: 0.26, wire: true, speed: 2.2 },
        { pos: [-4.6, 0.6, -2.2], size: 0.5, wire: false, speed: 0.9 },
        { pos: [3.8, 2.0, -1.8], size: 0.32, wire: false, speed: 1.3 },
        { pos: [4.7, 0.9, -2.4], size: 0.44, wire: true, speed: 1.1 },
        { pos: [-1.0, 2.5, -1.2], size: 0.22, wire: false, speed: 2.4 },
        { pos: [2.4, 2.4, -1.1], size: 0.3, wire: false, speed: 1.5 },
        { pos: [-5.2, 1.9, -2.6], size: 0.36, wire: true, speed: 1.0 },
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
          floatIntensity={1.6}
          position={it.pos as unknown as THREE.Vector3}
        >
          <mesh>
            <boxGeometry args={[it.size, it.size, it.size]} />
            {it.wire ? (
              <meshBasicMaterial color={VOLT} wireframe transparent opacity={0.45} />
            ) : (
              <>
                <meshStandardMaterial color={BOX} roughness={0.75} />
                <Edges scale={1.002} color="#7a5a00" />
              </>
            )}
          </mesh>
        </Float>
      ))}
    </>
  );
}

// generated once at module load so render stays pure
const SPEED_LINES = Array.from({ length: 11 }, () => ({
  y: -1.45 + Math.random() * 3.0,
  z: -2.4 + Math.random() * 4.4,
  len: 1.6 + Math.random() * 2.8,
  speed: 6 + Math.random() * 7,
  x: -7 + Math.random() * 14,
  w: 0.012 + Math.random() * 0.03,
  volt: Math.random() > 0.6,
}));

/** Horizontal light streaks that read as speed behind the van. */
function SpeedLines({ moving }: { moving: boolean }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!ref.current || !moving) return;
    ref.current.children.forEach((c, i) => {
      c.position.x -= SPEED_LINES[i].speed * delta;
      if (c.position.x < -8) c.position.x = 8;
    });
  });

  return (
    <group ref={ref}>
      {SPEED_LINES.map((l, i) => (
        <mesh key={i} position={[l.x, l.y, l.z]}>
          <planeGeometry args={[l.len, l.w]} />
          <meshBasicMaterial
            color={l.volt ? VOLT : "#fff7e0"}
            transparent
            opacity={0.18}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

function makeStar(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.25, "rgba(255,247,210,0.7)");
  g.addColorStop(1, "rgba(255,247,210,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  ctx.strokeStyle = "rgba(255,255,255,0.9)";
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(64, 6); ctx.lineTo(64, 122);
  ctx.moveTo(6, 64); ctx.lineTo(122, 64);
  ctx.stroke();
  return new THREE.CanvasTexture(c);
}

/** A glinting sparkle on the van roof, like the reference's lens flare. */
function RoofSparkle() {
  const tex = useMemo(() => makeStar(), []);
  const ref = useRef<THREE.Sprite>(null);
  useEffect(() => () => tex.dispose(), [tex]);
  useFrame((state) => {
    if (!ref.current) return;
    const p = 0.65 + Math.sin(state.clock.elapsedTime * 2.6) * 0.35;
    ref.current.scale.setScalar(0.7 * p);
    (ref.current.material as THREE.SpriteMaterial).opacity = p;
  });
  return (
    <sprite ref={ref} position={[1.35, 0.05, 0.6]}>
      <spriteMaterial
        map={tex}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </sprite>
  );
}

function MovingFloor({ light, moving }: { light: boolean; moving: boolean }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current || !moving) return;
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
      <ambientLight intensity={light ? 0.95 : 0.7} />
      <directionalLight position={[4, 6, 5]} intensity={1.5} color="#fff7df" />
      <directionalLight position={[2, 3, 7]} intensity={0.5} color="#ffffff" />
      <pointLight position={[-5, 2, -3]} intensity={14} color={VOLT} />

      <FleetVan moving={!reduced} />
      <Parcels />
      {!reduced && <SpeedLines moving />}
      {!reduced && <RoofSparkle />}

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
