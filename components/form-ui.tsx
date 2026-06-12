"use client";

import { motion } from "framer-motion";

export const inputCls =
  "w-full border border-edge-hi bg-carbon px-4 py-3.5 text-sm text-bone placeholder:text-smoke transition-colors duration-300 focus:border-volt focus:outline-none";
export const labelCls =
  "mb-2 block font-mono text-[10px] tracking-[0.25em] text-ash uppercase";

export function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <motion.p
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-2 font-mono text-[10px] tracking-[0.2em] text-volt uppercase"
      role="alert"
    >
      {`// ${message}`}
    </motion.p>
  );
}

export function SendingBar({ label }: { label: string }) {
  return (
    <span className="flex items-center justify-center gap-3">
      <span className="relative inline-block h-1 w-20 overflow-hidden bg-black/20" dir="ltr">
        <span className="animate-scan absolute inset-y-0 w-1/3 bg-black" />
      </span>
      {label}
    </span>
  );
}

export function SuccessPanel({
  title,
  body1,
  reference,
  body2,
  note,
}: {
  title: string;
  body1: string;
  reference: string;
  body2: string;
  note: string;
}) {
  return (
    <motion.div
      key="done"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="border border-volt/40 bg-panel p-10 text-center clip-notch md:p-16"
    >
      <motion.svg width="72" height="72" viewBox="0 0 72 72" fill="none" className="mx-auto" aria-hidden>
        <motion.path
          d="M8 8h44l12 12v44H8z"
          stroke="#f5c400"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
        <motion.path
          d="M22 38l10 10 20-22"
          stroke="#f5c400"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
        />
      </motion.svg>
      <h3 className="mt-7 text-2xl font-bold tracking-tighter uppercase md:text-3xl">{title}</h3>
      <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ash">
        {body1} <span className="font-mono text-volt">{reference}</span>
        {body2}
      </p>
      <p className="mt-6 font-mono text-[10px] tracking-[0.25em] text-smoke uppercase">{note}</p>
    </motion.div>
  );
}

export const PHONE_RE = /^(\+?216)?[\s.-]?\d{2}[\s.-]?\d{3}[\s.-]?\d{3}$/;
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
