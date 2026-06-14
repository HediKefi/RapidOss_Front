"use client";

import { motion } from "framer-motion";

/**
 * Route transition: a yellow shutter wipes up off the incoming page
 * while content rises into place. Remounts on every navigation.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
        style={{ originY: 0 }}
        className="pointer-events-none fixed inset-0 z-[90] bg-volt"
        aria-hidden
      />
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
