"use client";

import { useSyncExternalStore } from "react";
import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("./three/HeroScene"), {
  ssr: false,
  loading: () => null,
});

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

const getSnapshot = () => window.matchMedia(QUERY).matches;
const getServerSnapshot = () => false;

/** Client-side mount point for the WebGL hero — keeps three.js out of SSR. */
export default function Hero3D({ className = "" }: { className?: string }) {
  const reduced = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <div className={className} aria-hidden>
      <HeroScene reduced={reduced} />
    </div>
  );
}
