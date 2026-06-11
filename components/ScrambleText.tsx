"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = "▮▯/\\|<>+=#01245789XKWZ";
const GLYPHS_AR = "▮▯|=#٠١٢٤٥٧٨٩×؋";
const ARABIC = /[؀-ۿ]/;

/**
 * Decodes text character-by-character through a scramble of glyphs,
 * like a freight terminal split-flap board settling.
 */
export default function ScrambleText({
  text,
  className,
  delay = 0,
  speed = 28,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
  as?: "span" | "h1" | "h2" | "p" | "div";
}) {
  const [output, setOutput] = useState(text);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    // initial state already renders the plain text — nothing to animate
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const glyphs = ARABIC.test(text) ? GLYPHS_AR : GLYPHS;
    let frame = 0;
    let raf = 0;
    let last = 0;
    // each character locks in after (its index * 2.2) scramble frames
    const tick = (now: number) => {
      if (now - last >= speed) {
        last = now;
        frame++;
        let out = "";
        let settled = true;
        for (let i = 0; i < text.length; i++) {
          const ch = text[i];
          if (ch === " " || frame > i * 2.2 + 4) {
            out += ch;
          } else {
            settled = false;
            out += glyphs[Math.floor(Math.random() * glyphs.length)];
          }
        }
        setOutput(out);
        if (settled) return;
      }
      raf = requestAnimationFrame(tick);
    };

    const timer = setTimeout(() => {
      raf = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [text, delay, speed]);

  return (
    <Tag className={className} aria-label={text}>
      {output}
    </Tag>
  );
}
