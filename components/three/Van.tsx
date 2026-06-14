"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

const VOLT = "#f5c400";
const WHITE = "#eceef0";
const DARK = "#17160f"; // black cladding / stripes / text
const GLASS = "#14151a";
const STEEL = "#c3c3bc";
const TIRE = "#0c0b09";

// white/yellow split line on the side profile (front at +X): the seam
// slants forward toward the roof, like the reference's hazard divider.
const SEAM_TOP = new THREE.Vector2(0.18, 1.41);
const SEAM_BOT = new THREE.Vector2(-0.4, 0.42);

/** Black "RAPIDOSS / Delivery" wordmark on transparent, for the yellow panels. */
function makeWordmark(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = 768;
  c.height = 384;
  const ctx = c.getContext("2d")!;
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.fillStyle = DARK;
  ctx.textBaseline = "alphabetic";
  ctx.font = "800 132px 'Space Grotesk', Arial, sans-serif";
  ctx.fillText("RAPIDOSS", 40, 190);
  const w = ctx.measureText("RAPIDOSS").width;
  ctx.font = "600 58px 'Space Grotesk', Arial, sans-serif";
  ctx.fillText("Delivery", 40 + w - ctx.measureText("Delivery").width, 250);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

const EXTRUDE = {
  depth: 1.12,
  curveSegments: 24,
  bevelEnabled: true,
  bevelThickness: 0.09,
  bevelSize: 0.08,
  bevelSegments: 6,
} as const;

function Wheel({ position, spin }: { position: [number, number, number]; spin: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (spin && ref.current) ref.current.rotation.y -= delta * 9;
  });
  return (
    <group position={position} rotation={[0, 0, Math.PI / 2]}>
      <mesh ref={ref}>
        <cylinderGeometry args={[0.3, 0.3, 0.22, 26]} />
        <meshStandardMaterial color={TIRE} roughness={0.85} />
      </mesh>
      {/* steel face + hub */}
      <mesh position={[0, 0.115, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.02, 24]} />
        <meshStandardMaterial color={STEEL} metalness={0.7} roughness={0.35} />
      </mesh>
      <mesh position={[0, 0.126, 0]}>
        <cylinderGeometry args={[0.055, 0.055, 0.02, 16]} />
        <meshStandardMaterial color={DARK} roughness={0.6} />
      </mesh>
    </group>
  );
}

function Arch({ x, z }: { x: number; z: number }) {
  return (
    <mesh position={[x, 0.3, z]}>
      <torusGeometry args={[0.42, 0.07, 10, 28]} />
      <meshStandardMaterial color={DARK} roughness={0.8} />
    </mesh>
  );
}

/** One black hazard stripe straddling the seam, on a flank or the roof. */
function Stripe({
  width,
  offset,
  z,
}: {
  width: number;
  offset: number;
  z: number;
}) {
  const dir = SEAM_BOT.clone().sub(SEAM_TOP);
  const angle = Math.atan2(dir.y, dir.x);
  const nrm = new THREE.Vector2(-dir.y, dir.x).normalize();
  const mid = SEAM_TOP.clone().add(SEAM_BOT).multiplyScalar(0.5).addScaledVector(nrm, offset);
  const len = dir.length() + 0.4;
  return (
    <mesh position={[mid.x, mid.y, z]} rotation={[0, 0, angle]}>
      <boxGeometry args={[len, width, 0.04]} />
      <meshStandardMaterial
        color={DARK}
        roughness={0.6}
        polygonOffset
        polygonOffsetFactor={-4}
        polygonOffsetUnits={-4}
      />
    </mesh>
  );
}

/**
 * RAPIDOSS Delivery van — stylised two-tone Citroën Berlingo-class panel
 * van: white cab/front, yellow rear cargo split by a bold black diagonal
 * hazard stripe, with the wordmark on the yellow side and rear doors.
 * Front faces +X.
 */
export default function Van({ spin = true }: { spin?: boolean }) {
  const wordmark = useMemo(() => makeWordmark(), []);
  useEffect(() => () => wordmark.dispose(), [wordmark]);

  // full silhouette → white shell
  const whiteGeo = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-1.5, 0.42);
    s.lineTo(1.42, 0.42);
    s.lineTo(1.5, 0.66);
    s.quadraticCurveTo(1.54, 0.84, 1.4, 0.94);
    s.lineTo(1.04, 0.99);
    s.quadraticCurveTo(0.82, 1.03, 0.76, 1.3);
    s.quadraticCurveTo(0.74, 1.4, 0.5, 1.41);
    s.lineTo(-1.32, 1.41);
    s.quadraticCurveTo(-1.5, 1.4, -1.5, 1.18);
    s.lineTo(-1.5, 0.42);
    const g = new THREE.ExtrudeGeometry(s, EXTRUDE);
    g.translate(0, 0, -0.56);
    return g;
  }, []);

  // rear sub-shape with a diagonal front edge → yellow shell (drawn over
  // the white one via polygon offset so it wins the shared rear surface)
  const yellowGeo = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(SEAM_BOT.x, SEAM_BOT.y);
    s.lineTo(-1.5, 0.42);
    s.lineTo(-1.5, 1.18);
    s.quadraticCurveTo(-1.5, 1.4, -1.32, 1.41);
    s.lineTo(SEAM_TOP.x, SEAM_TOP.y);
    s.lineTo(SEAM_BOT.x, SEAM_BOT.y);
    const g = new THREE.ExtrudeGeometry(s, EXTRUDE);
    g.translate(0, 0, -0.56);
    return g;
  }, []);

  return (
    <group>
      {/* ---- body ---- */}
      <mesh geometry={whiteGeo}>
        <meshStandardMaterial color={WHITE} roughness={0.4} metalness={0.05} />
      </mesh>
      <mesh geometry={yellowGeo}>
        <meshStandardMaterial
          color={VOLT}
          roughness={0.42}
          metalness={0.05}
          polygonOffset
          polygonOffsetFactor={-2}
          polygonOffsetUnits={-2}
        />
      </mesh>

      {/* black hazard stripes across the seam, both flanks + roof */}
      {([0.66, -0.66] as const).map((z) => (
        <group key={z}>
          <Stripe width={0.28} offset={0} z={z} />
          <Stripe width={0.11} offset={-0.4} z={z} />
        </group>
      ))}
      <mesh position={[0.06, 1.47, 0]} rotation={[0, 0, 0.5]}>
        <boxGeometry args={[0.26, 0.04, 1.16]} />
        <meshStandardMaterial color={DARK} roughness={0.6} polygonOffset polygonOffsetFactor={-4} polygonOffsetUnits={-4} />
      </mesh>

      {/* RAPIDOSS wordmark on the yellow flanks + rear doors */}
      {([0.685, -0.685] as const).map((z) => (
        <mesh key={z} position={[-0.98, 1.0, z]} rotation={[0, z > 0 ? 0 : Math.PI, 0]}>
          <planeGeometry args={[1.05, 0.52]} />
          <meshBasicMaterial
            map={wordmark}
            transparent
            depthWrite={false}
            toneMapped={false}
            polygonOffset
            polygonOffsetFactor={-6}
            polygonOffsetUnits={-6}
          />
        </mesh>
      ))}
      <mesh position={[-1.62, 0.96, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[0.82, 0.46]} />
        <meshBasicMaterial
          map={wordmark}
          transparent
          depthWrite={false}
          toneMapped={false}
          polygonOffset
          polygonOffsetFactor={-6}
          polygonOffsetUnits={-6}
        />
      </mesh>

      {/* ---- glass ---- */}
      <mesh position={[0.82, 1.0, 0]} rotation={[0, 0, -0.62]}>
        <boxGeometry args={[0.04, 0.5, 0.92]} />
        <meshStandardMaterial color={GLASS} roughness={0.1} metalness={0.6} />
      </mesh>
      <RoundedBox args={[0.66, 0.32, 1.16]} radius={0.05} smoothness={3} position={[0.5, 1.02, 0]}>
        <meshStandardMaterial color={GLASS} roughness={0.1} metalness={0.6} />
      </RoundedBox>
      <mesh position={[0.2, 1.04, 0]}>
        <boxGeometry args={[0.04, 0.3, 1.04]} />
        <meshStandardMaterial color={WHITE} roughness={0.4} />
      </mesh>

      {/* ---- black cladding + bumpers ---- */}
      <RoundedBox args={[2.96, 0.2, 1.2]} radius={0.05} smoothness={3} position={[0, 0.34, 0]}>
        <meshStandardMaterial color={DARK} roughness={0.8} />
      </RoundedBox>
      <RoundedBox args={[0.18, 0.26, 1.12]} radius={0.06} smoothness={3} position={[1.5, 0.4, 0]}>
        <meshStandardMaterial color={DARK} roughness={0.8} />
      </RoundedBox>
      {/* side rubbing strips (black, like the reference doors) */}
      {([0.62, -0.62] as const).map((z) => (
        <RoundedBox key={z} args={[1.4, 0.07, 0.03]} radius={0.02} smoothness={2} position={[0.55, 0.62, z]}>
          <meshStandardMaterial color={DARK} roughness={0.7} />
        </RoundedBox>
      ))}

      {/* ---- front: Citroën chevron grille bar + lights ---- */}
      <mesh position={[1.53, 0.72, 0]}>
        <boxGeometry args={[0.05, 0.06, 0.86]} />
        <meshStandardMaterial color="#cfd2d6" metalness={0.9} roughness={0.25} />
      </mesh>
      <mesh position={[1.55, 0.72, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.11, 0.16, 4]} />
        <meshStandardMaterial color="#cfd2d6" metalness={0.9} roughness={0.25} />
      </mesh>
      {([1, -1] as const).map((side) => (
        <mesh key={side} position={[1.5, 0.82, side * 0.4]} rotation={[0, side * -0.4, 0]}>
          <boxGeometry args={[0.05, 0.14, 0.24]} />
          <meshStandardMaterial color="#fff6cf" emissive="#ffe88a" emissiveIntensity={2} />
        </mesh>
      ))}
      {([1, -1] as const).map((side) => (
        <mesh key={side} position={[-1.5, 0.86, side * 0.48]}>
          <boxGeometry args={[0.04, 0.34, 0.12]} />
          <meshStandardMaterial color="#5c1410" emissive="#e03c2a" emissiveIntensity={1.3} />
        </mesh>
      ))}
      {([1, -1] as const).map((side) => (
        <RoundedBox key={side} args={[0.06, 0.1, 0.08]} radius={0.02} smoothness={2} position={[0.74, 1.0, side * 0.66]}>
          <meshStandardMaterial color={DARK} roughness={0.6} />
        </RoundedBox>
      ))}

      {/* ---- wheels + arches ---- */}
      {([0.95, -1.0] as const).map((x) =>
        ([0.56, -0.56] as const).map((z) => <Arch key={`${x}:${z}`} x={x} z={z} />)
      )}
      <Wheel position={[0.95, 0.3, 0.56]} spin={spin} />
      <Wheel position={[0.95, 0.3, -0.56]} spin={spin} />
      <Wheel position={[-1.0, 0.3, 0.56]} spin={spin} />
      <Wheel position={[-1.0, 0.3, -0.56]} spin={spin} />
    </group>
  );
}
