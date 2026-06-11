"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "./Logo";
import { locales, localeNames, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

function LangSwitcher({ locale, className = "" }: { locale: Locale; className?: string }) {
  const pathname = usePathname();
  // swap the locale prefix, keep the rest of the path
  const rest = pathname.replace(/^\/(en|fr|ar)(?=\/|$)/, "") || "";

  return (
    <div className={`flex items-center border border-edge font-mono text-[10px] tracking-[0.15em] ${className}`}>
      {locales.map((l) => (
        <Link
          key={l}
          href={`/${l}${rest}`}
          aria-current={l === locale ? "true" : undefined}
          className={`px-2.5 py-1.5 uppercase transition-colors ${
            l === locale ? "bg-volt text-black" : "text-ash hover:text-volt"
          }`}
        >
          {localeNames[l]}
        </Link>
      ))}
    </div>
  );
}

export default function Nav({ locale, dict }: { locale: Locale; dict: Dictionary["nav"] }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: `/${locale}/services`, label: dict.services, index: "01" },
    { href: `/${locale}/network`, label: dict.network, index: "02" },
    { href: `/${locale}/track`, label: dict.track, index: "03" },
    { href: `/${locale}/contact`, label: dict.quote, index: "04" },
  ];

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
          <Logo locale={locale} label={dict.home} />

          <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group relative font-mono text-[11px] font-medium tracking-[0.22em] uppercase transition-colors ${
                    active ? "text-volt" : "text-ash hover:text-bone"
                  }`}
                >
                  <span className="me-1.5 text-volt/60">{link.index}</span>
                  {link.label}
                  <span
                    className={`absolute -bottom-1.5 start-0 h-px bg-volt transition-all duration-300 ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
            <LangSwitcher locale={locale} />
          </nav>

          <button
            onClick={() => setOpen(!open)}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-label={open ? dict.closeMenu : dict.openMenu}
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
              {links.map((link, i) => (
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
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 flex items-center justify-between gap-4"
              >
                <p className="font-mono text-[10px] tracking-[0.3em] text-smoke uppercase">
                  {dict.tagline}
                </p>
                <LangSwitcher locale={locale} />
              </motion.div>
            </nav>
            <div className="hazard h-2" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
