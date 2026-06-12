"use client";

import { useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { useTheme } from "@/lib/theme";

const VanScene = dynamic(() => import("./three/VanScene"), {
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

/** Client mount point for the fleet-van WebGL scene. */
export default function Van3D({ className = "" }: { className?: string }) {
  const reduced = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const theme = useTheme();

  return (
    <div className={className} aria-hidden>
      <VanScene reduced={reduced} light={theme === "light"} />
    </div>
  );
}
