"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Dictionary } from "@/lib/i18n/dictionaries";

interface Fields {
  company: string;
  email: string;
  volume: string;
  modes: string[];
  notes: string;
}

const inputCls =
  "w-full border border-edge-hi bg-carbon px-4 py-3.5 text-sm text-bone placeholder:text-smoke transition-colors duration-300 focus:border-volt focus:outline-none";
const labelCls = "mb-2 block font-mono text-[10px] tracking-[0.25em] text-ash uppercase";

export default function QuoteForm({ dict }: { dict: Dictionary["contactPage"]["form"] }) {
  const [fields, setFields] = useState<Fields>({
    company: "",
    email: "",
    volume: "",
    modes: [],
    notes: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [reference, setReference] = useState("");

  const set = <K extends keyof Fields>(key: K, value: Fields[K]) => {
    setFields((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const toggleMode = (mode: string) =>
    set(
      "modes",
      fields.modes.includes(mode)
        ? fields.modes.filter((m) => m !== mode)
        : [...fields.modes, mode]
    );

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (fields.company.trim().length < 2) next.company = dict.errors.company;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) next.email = dict.errors.email;
    if (!fields.volume) next.volume = dict.errors.volume;
    if (fields.modes.length === 0) next.modes = dict.errors.modes;
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    // demo site — simulate the dispatch desk acknowledging the request
    setSending(true);
    setReference(`Q-${Date.now().toString().slice(-6)}`);
    setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 1600);
  };

  const fieldError = (key: keyof Fields) =>
    errors[key] && (
      <motion.p
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-2 font-mono text-[10px] tracking-[0.2em] text-volt uppercase"
        role="alert"
      >
        {`// ${errors[key]}`}
      </motion.p>
    );

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="border border-volt/40 bg-panel p-10 text-center clip-notch md:p-16"
          >
            <motion.svg
              width="72"
              height="72"
              viewBox="0 0 72 72"
              fill="none"
              className="mx-auto"
              aria-hidden
            >
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
            <h3 className="mt-7 text-2xl font-bold tracking-tighter uppercase md:text-3xl">
              {dict.successTitle}
            </h3>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ash">
              {dict.successBody1} <span className="font-mono text-volt">{reference}</span>
              {dict.successBody2}
            </p>
            <p className="mt-6 font-mono text-[10px] tracking-[0.25em] text-smoke uppercase">
              {dict.successNote}
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            exit={{ opacity: 0, y: -12 }}
            onSubmit={submit}
            noValidate
            className="border border-edge bg-panel p-7 clip-notch md:p-12"
          >
            <div className="grid gap-7 md:grid-cols-2">
              <div>
                <label htmlFor="company" className={labelCls}>
                  {dict.company}
                </label>
                <input
                  id="company"
                  value={fields.company}
                  onChange={(e) => set("company", e.target.value)}
                  placeholder={dict.companyPlaceholder}
                  className={inputCls}
                />
                {fieldError("company")}
              </div>
              <div>
                <label htmlFor="email" className={labelCls}>
                  {dict.email}
                </label>
                <input
                  id="email"
                  type="email"
                  value={fields.email}
                  onChange={(e) => set("email", e.target.value)}
                  placeholder={dict.emailPlaceholder}
                  className={inputCls}
                />
                {fieldError("email")}
              </div>
            </div>

            <fieldset className="mt-8">
              <legend className={labelCls}>{dict.volume}</legend>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {dict.volumes.map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => set("volume", v)}
                    aria-pressed={fields.volume === v}
                    className={`border px-3 py-3 font-mono text-[10px] tracking-[0.12em] uppercase transition-all duration-300 clip-tag ${
                      fields.volume === v
                        ? "border-volt bg-volt text-black"
                        : "border-edge-hi text-ash hover:border-volt hover:text-bone"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
              {fieldError("volume")}
            </fieldset>

            <fieldset className="mt-8">
              <legend className={labelCls}>{dict.modes}</legend>
              <div className="flex flex-wrap gap-2">
                {dict.modeOptions.map((m) => {
                  const on = fields.modes.includes(m);
                  return (
                    <button
                      key={m}
                      type="button"
                      onClick={() => toggleMode(m)}
                      aria-pressed={on}
                      className={`border px-4 py-2.5 font-mono text-[10px] tracking-[0.15em] uppercase transition-all duration-300 clip-tag ${
                        on
                          ? "border-volt bg-volt/15 text-volt"
                          : "border-edge-hi text-ash hover:border-volt/60 hover:text-bone"
                      }`}
                    >
                      <span className={`me-2 ${on ? "text-volt" : "text-smoke"}`}>
                        {on ? "▣" : "▢"}
                      </span>
                      {m}
                    </button>
                  );
                })}
              </div>
              {fieldError("modes")}
            </fieldset>

            <div className="mt-8">
              <label htmlFor="notes" className={labelCls}>
                {dict.notes} <span className="text-smoke">{dict.notesOptional}</span>
              </label>
              <textarea
                id="notes"
                value={fields.notes}
                onChange={(e) => set("notes", e.target.value)}
                rows={4}
                placeholder={dict.notesPlaceholder}
                className={`${inputCls} resize-none`}
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="group relative mt-10 w-full overflow-hidden bg-volt py-4.5 font-mono text-xs font-semibold tracking-[0.25em] text-black uppercase transition-colors clip-tag hover:bg-volt-hot disabled:cursor-wait md:w-auto md:px-14"
            >
              {sending ? (
                <span className="flex items-center justify-center gap-3">
                  <span className="relative inline-block h-1 w-20 overflow-hidden bg-black/20" dir="ltr">
                    <span className="animate-scan absolute inset-y-0 w-1/3 bg-black" />
                  </span>
                  {dict.sending}
                </span>
              ) : (
                <>{dict.submit}</>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
