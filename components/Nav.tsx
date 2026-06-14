"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "./Logo";
import { locales, localeNames } from "@/lib/i18n/config";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { useTheme, toggleTheme } from "@/lib/theme";

const LOGIN_URL = "https://rapidoss.loxbox.tn";

function ThemeToggle() {
  const { dict } = useI18n();
  const theme = useTheme();
  const label = theme === "dark" ? dict.nav.themeLight : dict.nav.themeDark;

  return (
    <button
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className="grid h-8 w-8 place-items-center border border-edge text-ash transition-colors hover:border-volt hover:text-volt"
    >
      {theme === "dark" ? (
        // sun
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2v2.4M12 19.6V22M2 12h2.4M19.6 12H22M4.9 4.9l1.7 1.7M17.4 17.4l1.7 1.7M19.1 4.9l-1.7 1.7M6.6 17.4l-1.7 1.7" />
        </svg>
      ) : (
        // moon
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5z" />
        </svg>
      )}
    </button>
  );
}

function LangSwitcher({ className = "" }: { className?: string }) {
  const { locale, setLocale } = useI18n();

  return (
    <div className={`flex items-center border border-edge font-mono text-[10px] tracking-[0.15em] ${className}`}>
      {locales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLocale(l)}
          aria-pressed={l === locale}
          className={`px-2.5 py-1.5 uppercase transition-colors ${
            l === locale ? "bg-volt text-black" : "text-ash hover:text-volt"
          }`}
        >
          {localeNames[l]}
        </button>
      ))}
    </div>
  );
}

export default function Nav() {
  const { dict } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // anchors mirror rapidoss.tn's one-page menu; track is a full page
  const links = [
    { href: "/#services", label: dict.nav.services, index: "01" },
    { href: "/#engagements", label: dict.nav.engagements, index: "02" },
    { href: "/#apropos", label: dict.nav.about, index: "03" },
    { href: "/#marketing", label: dict.nav.marketing, index: "04" },
    { href: "/track", label: dict.nav.track, index: "05" },
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
          <Logo label={dict.nav.home} />

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
              href="/#devis"
              className="bg-volt px-4 py-2 font-mono text-[10px] font-semibold tracking-[0.18em] text-black uppercase clip-tag transition-colors hover:bg-volt-hot"
            >
              {dict.nav.devis}
            </Link>
            <a
              href={LOGIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-edge-hi px-4 py-2 font-mono text-[10px] font-semibold tracking-[0.18em] text-ash uppercase clip-tag transition-colors hover:border-volt hover:text-volt"
            >
              {dict.nav.login}
            </a>
            <LangSwitcher />
            <ThemeToggle />
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
            aria-label={open ? dict.nav.closeMenu : dict.nav.openMenu}
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
                { href: "/#devis", label: dict.nav.devis, index: "06" },
                { href: "/devenir-livreur", label: dict.nav.becomeCourier, index: "07" },
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
                  {dict.nav.login}
                </a>
                <div className="flex items-center gap-3">
                  <LangSwitcher />
                  <ThemeToggle />
                </div>
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-6 font-mono text-[10px] tracking-[0.3em] text-smoke uppercase"
              >
                {dict.nav.tagline}
              </motion.p>
            </nav>
            <div className="hazard h-2" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
