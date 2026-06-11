"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Button that leans toward the cursor while hovered (fine pointers only),
 * with a yellow panel that sweeps in behind the label.
 */
export default function MagneticButton({
  href,
  children,
  variant = "solid",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "ghost";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 18 });
  const sy = useSpring(y, { stiffness: 260, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.28);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.28);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    "group relative inline-flex items-center gap-3 overflow-hidden px-7 py-4 font-mono text-xs font-semibold tracking-[0.2em] uppercase clip-tag transition-colors duration-300";
  const skin =
    variant === "solid"
      ? "bg-volt text-black hover:text-volt"
      : "border border-edge-hi text-bone hover:border-volt hover:text-black";

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className="inline-block"
    >
      <Link href={href} className={`${base} ${skin} ${className}`}>
        <span
          className={`absolute inset-0 -z-0 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0 ${
            variant === "solid" ? "bg-black" : "bg-volt"
          }`}
          aria-hidden
        />
        <span className="relative z-10">{children}</span>
        <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1">
          →
        </span>
      </Link>
    </motion.div>
  );
}
