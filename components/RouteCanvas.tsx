"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number; // 0..1
  y: number;
  r: number;
  hub: boolean;
  phase: number;
}

interface Route {
  a: number;
  b: number;
  bend: number;
}

interface Packet {
  route: number;
  t: number;
  speed: number;
  dir: 1 | -1;
}

const NODES: Node[] = [
  { x: 0.08, y: 0.62, r: 3.2, hub: true, phase: 0.1 },
  { x: 0.18, y: 0.28, r: 2.2, hub: false, phase: 1.7 },
  { x: 0.30, y: 0.74, r: 2.4, hub: false, phase: 3.2 },
  { x: 0.38, y: 0.42, r: 3.6, hub: true, phase: 0.9 },
  { x: 0.52, y: 0.18, r: 2.2, hub: false, phase: 2.4 },
  { x: 0.55, y: 0.66, r: 2.6, hub: false, phase: 4.6 },
  { x: 0.66, y: 0.38, r: 3.8, hub: true, phase: 1.3 },
  { x: 0.78, y: 0.72, r: 2.3, hub: false, phase: 5.1 },
  { x: 0.86, y: 0.24, r: 2.5, hub: false, phase: 0.4 },
  { x: 0.94, y: 0.55, r: 3.0, hub: true, phase: 2.9 },
];

const ROUTES: Route[] = [
  { a: 0, b: 3, bend: -0.06 },
  { a: 1, b: 3, bend: 0.05 },
  { a: 2, b: 3, bend: 0.04 },
  { a: 3, b: 6, bend: -0.08 },
  { a: 4, b: 6, bend: 0.05 },
  { a: 5, b: 6, bend: 0.06 },
  { a: 6, b: 9, bend: -0.07 },
  { a: 7, b: 9, bend: 0.05 },
  { a: 8, b: 9, bend: -0.04 },
  { a: 0, b: 2, bend: 0.05 },
  { a: 6, b: 8, bend: -0.05 },
];

const VOLT = "#f5c400";

export default function RouteCanvas({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let dpr = 1;
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };

    const packets: Packet[] = Array.from({ length: 22 }, (_, i) => ({
      route: i % ROUTES.length,
      t: Math.random(),
      speed: 0.0012 + Math.random() * 0.0026,
      dir: Math.random() > 0.5 ? 1 : -1,
    }));

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMouse = (e: MouseEvent) => {
      mouse.tx = e.clientX / window.innerWidth;
      mouse.ty = e.clientY / window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouse);

    // parallax-adjusted node position
    const pos = (n: Node, depth: number) => {
      const px = (mouse.x - 0.5) * depth * 26;
      const py = (mouse.y - 0.5) * depth * 18;
      return { x: n.x * w + px, y: n.y * h + py };
    };

    const bezier = (route: Route, t: number) => {
      const a = pos(NODES[route.a], NODES[route.a].hub ? 0.6 : 1);
      const b = pos(NODES[route.b], NODES[route.b].hub ? 0.6 : 1);
      const mx = (a.x + b.x) / 2;
      const my = (a.y + b.y) / 2 + route.bend * h * 2.2;
      const u = 1 - t;
      return {
        x: u * u * a.x + 2 * u * t * mx + t * t * b.x,
        y: u * u * a.y + 2 * u * t * my + t * t * b.y,
      };
    };

    let raf = 0;
    let time = 0;

    const draw = () => {
      time += 0.016;
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;

      ctx.clearRect(0, 0, w, h);

      // routes
      ctx.lineWidth = 1;
      for (const route of ROUTES) {
        const a = pos(NODES[route.a], NODES[route.a].hub ? 0.6 : 1);
        const b = pos(NODES[route.b], NODES[route.b].hub ? 0.6 : 1);
        const mx = (a.x + b.x) / 2;
        const my = (a.y + b.y) / 2 + route.bend * h * 2.2;
        ctx.strokeStyle = "rgba(237,234,223,0.07)";
        ctx.setLineDash([3, 7]);
        ctx.lineDashOffset = reduced ? 0 : -time * 14;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.quadraticCurveTo(mx, my, b.x, b.y);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // packets with short trails
      if (!reduced) {
        for (const p of packets) {
          p.t += p.speed * p.dir;
          if (p.t > 1) { p.t = 1; p.dir = -1; }
          if (p.t < 0) { p.t = 0; p.dir = 1; }
          const head = bezier(ROUTES[p.route], p.t);
          const tail = bezier(
            ROUTES[p.route],
            Math.max(0, Math.min(1, p.t - p.dir * 0.045))
          );
          const grad = ctx.createLinearGradient(tail.x, tail.y, head.x, head.y);
          grad.addColorStop(0, "rgba(245,196,0,0)");
          grad.addColorStop(1, "rgba(245,196,0,0.85)");
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(tail.x, tail.y);
          ctx.lineTo(head.x, head.y);
          ctx.stroke();

          ctx.fillStyle = VOLT;
          ctx.beginPath();
          ctx.arc(head.x, head.y, 1.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // nodes
      for (const n of NODES) {
        const { x, y } = pos(n, n.hub ? 0.6 : 1);
        if (n.hub) {
          // breathing ring on hubs
          const pulse = reduced ? 0.5 : (Math.sin(time * 1.6 + n.phase) + 1) / 2;
          ctx.strokeStyle = `rgba(245,196,0,${0.06 + pulse * 0.2})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(x, y, n.r + 5 + pulse * 6, 0, Math.PI * 2);
          ctx.stroke();
          ctx.fillStyle = VOLT;
        } else {
          ctx.fillStyle = "rgba(237,234,223,0.45)";
        }
        ctx.beginPath();
        ctx.arc(x, y, n.r, 0, Math.PI * 2);
        ctx.fill();
        if (n.hub) {
          // crosshair ticks
          ctx.strokeStyle = "rgba(245,196,0,0.5)";
          ctx.beginPath();
          for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]] as const) {
            ctx.moveTo(x + dx * (n.r + 9), y + dy * (n.r + 9));
            ctx.lineTo(x + dx * (n.r + 13), y + dy * (n.r + 13));
          }
          ctx.stroke();
        }
      }

      raf = requestAnimationFrame(draw);
    };

    if (reduced) {
      draw();
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
}
