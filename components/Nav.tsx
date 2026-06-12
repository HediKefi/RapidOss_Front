"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "./Logo";
import { locales, localeNames, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

const LOGIN_URL = "https://rapidoss.loxbox.tn";

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

  // anchors mirror rapidoss.tn's one-page menu; track is our full page
  const links = [
    { href: `/${locale}#services`, label: dict.services, index: "01" },
    { href: `/${locale}#engagements`, label: dict.engagements, index: "02" },
    { href: `/${locale}#apropos`, label: dict.about, index: "03" },
    { href: `/${locale}#marketing`, label: dict.marketing, index: "04" },
    { href: `/${locale}/track`, label: dict.track, index: "05" },
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
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
          <Logo locale={locale} label={dict.home} />

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Main">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group relative font-mono text-[11px] font-medium tracking-[0.18em] uppercase transition-colors ${
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
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href={`/${locale}#devis`}
              className="bg-volt px-4 py-2 font-mono text-[10px] font-semibold tracking-[0.18em] text-black uppercase clip-tag transition-colors hover:bg-volt-hot"
            >
              {dict.devis}
            </Link>
            <a
              href={LOGIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-edge-hi px-4 py-2 font-mono text-[10px] font-semibold tracking-[0.18em] text-ash uppercase clip-tag transition-colors hover:border-volt hover:text-volt"
            >
              {dict.login}
            </a>
            <LangSwitcher locale={locale} />
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
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
            className="fixed inset-0 z-40 flex flex-col justify-end overflow-y-auto bg-carbon lg:hidden"
          >
            <div className="grid-lines pointer-events-none absolute inset-0" />
            <nav className="relative px-6 pb-16" aria-label="Mobile">
              {[
                ...links,
                { href: `/${locale}#devis`, label: dict.devis, index: "06" },
                { href: `/${locale}/devenir-livreur`, label: dict.becomeCourier, index: "07" },
              ].map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -32 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="border-b border-edge"
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 py-4 text-3xl font-bold tracking-tight"
                  >
                    <span className="font-mono text-xs text-volt">{link.index}</span>
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-7 flex flex-wrap items-center justify-between gap-4"
              >
                <a
                  href={LOGIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-edge-hi px-4 py-2 font-mono text-[10px] font-semibold tracking-[0.18em] text-ash uppercase clip-tag"
                >
                  {dict.login}
                </a>
                <LangSwitcher locale={locale} />
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-6 font-mono text-[10px] tracking-[0.3em] text-smoke uppercase"
              >
                {dict.tagline}
              </motion.p>
            </nav>
            <div className="hazard h-2" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
