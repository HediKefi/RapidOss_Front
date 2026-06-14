"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

const VOLT = "#f5c400";
const BODY = "#eceef0"; // white panel
const CLAD = "#1b1a16"; // black plastic cladding / bumpers
const GLASS = "#14151a";
const STEEL = "#b9b9b2"; // steel wheel face
const TIRE = "#0c0b09";

/**
 * Side-panel livery decal — yellow/black sweeping stripes plus the
 * RAPIDOSS Delivery wordmark, drawn to a canvas and mapped onto each
 * flank (canvas left = rear of van, right = cab).
 */
function makeLiveryTexture(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = 1024;
  c.height = 512;
  const ctx = c.getContext("2d")!;
  ctx.clearRect(0, 0, c.width, c.height);

  // sweeping diagonal stripes across the lower half, toward the rear wheel
  const A = new THREE.Vector2(210, 470);
  const B = new THREE.Vector2(820, 300);
  const dir = B.clone().sub(A).normalize();
  const nrm = new THREE.Vector2(-dir.y, dir.x);
  const stripes: [string, number, number][] = [
    [VOLT, 60, -14],
    [CLAD, 34, 40],
    [VOLT, 22, 82],
    ["#9a958a", 12, 116],
  ];
  ctx.lineCap = "round";
  for (const [col, w, off] of stripes) {
    const a = A.clone().addScaledVector(nrm, off);
    const b = B.clone().addScaledVector(nrm, off);
    ctx.strokeStyle = col;
    ctx.lineWidth = w;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  }

  // wordmark: RAPID (dark) + OSS (volt), Delivery beneath — upper rear panel
  ctx.textBaseline = "alphabetic";
  ctx.font = "800 82px 'Space Grotesk', Arial, sans-serif";
  const x0 = 560;
  const y0 = 178;
  ctx.fillStyle = "#15140f";
  ctx.fillText("RAPID", x0, y0);
  const rapidW = ctx.measureText("RAPID").width;
  ctx.fillStyle = VOLT;
  ctx.fillText("OSS", x0 + rapidW, y0);
  ctx.font = "600 30px 'Space Grotesk', Arial, sans-serif";
  ctx.fillStyle = "#15140f";
  ctx.fillText("Delivery", x0 + rapidW + 6, y0 + 34);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

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
    // parent lays the cylinder on its side so its local Y spin becomes a
    // roll around the world X axis
    <group position={position} rotation={[0, 0, Math.PI / 2]}>
      <mesh ref={ref}>
        <cylinderGeometry args={[0.3, 0.3, 0.22, 26]} />
        <meshStandardMaterial color={TIRE} roughness={0.85} />
      </mesh>
      {/* steel hub face */}
      <mesh position={[0, 0.115, 0]}>
        <cylinderGeometry args={[0.19, 0.19, 0.02, 22]} />
        <meshStandardMaterial color={STEEL} metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.125, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.02, 16]} />
        <meshStandardMaterial color={CLAD} roughness={0.6} />
      </mesh>
    </group>
  );
}

/** Black wheel-arch trim ring around a wheel. */
function Arch({ x, z }: { x: number; z: number }) {
  return (
    <mesh position={[x, 0.3, z]}>
      <torusGeometry args={[0.42, 0.07, 10, 28]} />
      <meshStandardMaterial color={CLAD} roughness={0.8} />
    </mesh>
  );
}

/**
 * RAPIDOSS fleet van — a stylised white Citroën Berlingo-class panel van:
 * tall rounded monovolume body, upright cab glass, black lower cladding
 * and wheel arches, steel wheels, and the yellow/black livery decal.
 * Front faces +X.
 */
export default function Van({ spin = true }: { spin?: boolean }) {
  const body = useRef<THREE.Group>(null);
  const livery = useMemo(() => makeLiveryTexture(), []);
  useEffect(() => () => livery.dispose(), [livery]);

  const bodyGeometry = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-1.5, 0.42); // rear bottom
    s.lineTo(1.42, 0.42); // front bottom
    s.lineTo(1.5, 0.66); // front fascia
    s.quadraticCurveTo(1.54, 0.84, 1.4, 0.94); // hood lip
    s.lineTo(1.04, 0.99); // short hood
    s.quadraticCurveTo(0.82, 1.03, 0.76, 1.3); // steep windshield
    s.quadraticCurveTo(0.74, 1.4, 0.5, 1.41); // roof front corner
    s.lineTo(-1.32, 1.41); // long tall roof
    s.quadraticCurveTo(-1.5, 1.4, -1.5, 1.18); // rear roof corner
    s.lineTo(-1.5, 0.42);

    const g = new THREE.ExtrudeGeometry(s, {
      depth: 1.12,
      curveSegments: 24,
      bevelEnabled: true,
      bevelThickness: 0.09,
      bevelSize: 0.08,
      bevelSegments: 6,
    });
    g.translate(0, 0, -0.56);
    return g;
  }, []);

  return (
    <group>
      <group ref={body}>
        {/* white monovolume shell */}
        <mesh geometry={bodyGeometry}>
          <meshStandardMaterial color={BODY} roughness={0.42} metalness={0.05} />
        </mesh>

        {/* livery decals on both flanks (rear-2/3 of the side), pushed
            just past the body's bevel crown so they sit on the surface */}
        <mesh position={[-0.3, 0.84, 0.662]}>
          <planeGeometry args={[1.86, 0.7]} />
          <meshBasicMaterial map={livery} transparent depthWrite={false} toneMapped={false} />
        </mesh>
        <mesh position={[-0.3, 0.84, -0.662]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[1.86, 0.7]} />
          <meshBasicMaterial map={livery} transparent depthWrite={false} toneMapped={false} />
        </mesh>
        {/* thin volt accent along the lower body so the brand reads even
            when the decal is edge-on */}
        {([1, -1] as const).map((side) => (
          <mesh key={side} position={[0.05, 0.5, side * 0.61]} rotation={[0, 0, -0.04]}>
            <boxGeometry args={[2.5, 0.05, 0.02]} />
            <meshStandardMaterial color={VOLT} emissive={VOLT} emissiveIntensity={0.25} roughness={0.5} />
          </mesh>
        ))}

        {/* windshield */}
        <mesh position={[0.82, 1.0, 0]} rotation={[0, 0, -0.62]}>
          <boxGeometry args={[0.04, 0.5, 0.92]} />
          <meshStandardMaterial color={GLASS} roughness={0.1} metalness={0.6} />
        </mesh>
        {/* cab side windows */}
        <RoundedBox args={[0.66, 0.32, 1.16]} radius={0.05} smoothness={3} position={[0.5, 1.02, 0]}>
          <meshStandardMaterial color={GLASS} roughness={0.1} metalness={0.6} />
        </RoundedBox>
        {/* A-pillar gap filler so glass doesn't float */}
        <mesh position={[0.2, 1.04, 0]}>
          <boxGeometry args={[0.04, 0.3, 1.04]} />
          <meshStandardMaterial color={BODY} roughness={0.42} />
        </mesh>

        {/* black lower cladding band */}
        <RoundedBox args={[2.96, 0.2, 1.2]} radius={0.05} smoothness={3} position={[0, 0.34, 0]}>
          <meshStandardMaterial color={CLAD} roughness={0.8} />
        </RoundedBox>
        {/* front + rear bumpers */}
        <RoundedBox args={[0.18, 0.26, 1.12]} radius={0.06} smoothness={3} position={[1.5, 0.4, 0]}>
          <meshStandardMaterial color={CLAD} roughness={0.8} />
        </RoundedBox>
        <RoundedBox args={[0.14, 0.26, 1.14]} radius={0.06} smoothness={3} position={[-1.52, 0.42, 0]}>
          <meshStandardMaterial color={CLAD} roughness={0.8} />
        </RoundedBox>

        {/* front fascia: chrome bar + headlights */}
        <mesh position={[1.53, 0.66, 0]}>
          <boxGeometry args={[0.05, 0.05, 0.78]} />
          <meshStandardMaterial color="#cfd2d6" metalness={0.9} roughness={0.25} />
        </mesh>
        {([1, -1] as const).map((side) => (
          <mesh key={side} position={[1.5, 0.74, side * 0.4]} rotation={[0, side * -0.4, 0]}>
            <boxGeometry args={[0.05, 0.13, 0.22]} />
            <meshStandardMaterial color="#fff6cf" emissive="#ffe88a" emissiveIntensity={2} />
          </mesh>
        ))}
        {/* tail lights */}
        {([1, -1] as const).map((side) => (
          <mesh key={side} position={[-1.5, 0.78, side * 0.48]}>
            <boxGeometry args={[0.04, 0.34, 0.12]} />
            <meshStandardMaterial color="#5c1410" emissive="#e03c2a" emissiveIntensity={1.3} />
          </mesh>
        ))}
        {/* mirrors */}
        {([1, -1] as const).map((side) => (
          <RoundedBox
            key={side}
            args={[0.06, 0.1, 0.08]}
            radius={0.02}
            smoothness={2}
            position={[0.74, 1.0, side * 0.66]}
          >
            <meshStandardMaterial color={CLAD} roughness={0.6} />
          </RoundedBox>
        ))}
      </group>

      {/* wheel arches + wheels */}
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
