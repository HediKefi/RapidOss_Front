"use client";

import { motion, type Variants } from "framer-motion";

const fade: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(4px)" },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

// perspective entrance: the block swings up like a panel being racked in
const swing: Variants = {
  hidden: { opacity: 0, y: 48, rotateX: 14, transformPerspective: 900 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transformPerspective: 900,
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Reveal({
  children,
  delay = 0,
  className,
  variant = "fade",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  variant?: "fade" | "swing";
}) {
  return (
    <motion.div
      className={className}
      style={variant === "swing" ? { transformOrigin: "center bottom" } : undefined}
      variants={variant === "swing" ? swing : fade}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-12% 0px" }}
    >
      {children}
    </motion.div>
  );
}
