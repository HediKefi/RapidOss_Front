"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "./Logo";

const LINKS = [
  { href: "/services", label: "Services", index: "01" },
  { href: "/network", label: "Network", index: "02" },
  { href: "/track", label: "Track", index: "03" },
  { href: "/contact", label: "Get a quote", index: "04" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${
          scrolled
            ? "border-edge bg-void/85 backdrop-blur-md"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Logo />

          <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
            {LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group relative font-mono text-[11px] font-medium tracking-[0.22em] uppercase transition-colors ${
                    active ? "text-volt" : "text-ash hover:text-bone"
                  }`}
                >
                  <span className="mr-1.5 text-volt/60">{link.index}</span>
                  {link.label}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-px bg-volt transition-all duration-300 ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <button
            onClick={() => setOpen(!open)}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <motion.span
              animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
              className="h-0.5 w-6 bg-volt"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
              className="h-0.5 w-6 bg-volt"
            />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-end bg-carbon md:hidden"
          >
            <div className="grid-lines pointer-events-none absolute inset-0" />
            <nav className="relative px-6 pb-24" aria-label="Mobile">
              {LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -32 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.18 + i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="border-b border-edge"
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 py-5 text-4xl font-bold tracking-tight"
                  >
                    <span className="font-mono text-xs text-volt">{link.index}</span>
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55 }}
                className="mt-8 font-mono text-[10px] tracking-[0.3em] text-smoke uppercase"
              >
                Delivery infrastructure — EST. 2019
              </motion.p>
            </nav>
            <div className="hazard h-2" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
