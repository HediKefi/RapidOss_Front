"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { inputCls, labelCls, FieldError, SendingBar, SuccessPanel, PHONE_RE, EMAIL_RE } from "./form-ui";

interface Fields {
  name: string;
  email: string;
  phone: string;
  ville: string;
  message: string;
}

export default function DevisForm({
  dict,
  villes,
}: {
  dict: Dictionary["devis"]["form"];
  villes: string[];
}) {
  const [fields, setFields] = useState<Fields>({
    name: "",
    email: "",
    phone: "",
    ville: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [reference, setReference] = useState("");

  const set = <K extends keyof Fields>(key: K, value: Fields[K]) => {
    setFields((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (fields.name.trim().length < 2) next.name = dict.errors.name;
    if (!EMAIL_RE.test(fields.email)) next.email = dict.errors.email;
    if (!PHONE_RE.test(fields.phone.trim())) next.phone = dict.errors.phone;
    if (!fields.ville) next.ville = dict.errors.ville;
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    // demo site — simulate the dispatch desk acknowledging the request
    setSending(true);
    setReference(`D-${Date.now().toString().slice(-6)}`);
    setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 1600);
  };

  return (
    <AnimatePresence mode="wait">
      {sent ? (
        <SuccessPanel
          title={dict.successTitle}
          body1={dict.successBody1}
          reference={reference}
          body2={dict.successBody2}
          note={dict.successNote}
        />
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
              <label htmlFor="devis-name" className={labelCls}>
                {dict.name}
              </label>
              <input
                id="devis-name"
                value={fields.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder={dict.namePlaceholder}
                className={inputCls}
              />
              <FieldError message={errors.name} />
            </div>
            <div>
              <label htmlFor="devis-email" className={labelCls}>
                {dict.email}
              </label>
              <input
                id="devis-email"
                type="email"
                value={fields.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder={dict.emailPlaceholder}
                className={inputCls}
              />
              <FieldError message={errors.email} />
            </div>
            <div>
              <label htmlFor="devis-phone" className={labelCls}>
                {dict.phone}
              </label>
              <div
                className={`flex items-stretch border bg-carbon transition-colors duration-300 ${
                  errors.phone ? "border-volt" : "border-edge-hi focus-within:border-volt"
                }`}
                dir="ltr"
              >
                <span className="flex items-center border-e border-edge px-3 font-mono text-xs text-smoke">
                  +216
                </span>
                <input
                  id="devis-phone"
                  type="tel"
                  value={fields.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  placeholder={dict.phonePlaceholder}
                  className="min-w-0 flex-1 bg-transparent px-4 py-3.5 text-sm text-bone placeholder:text-smoke focus:outline-none"
                />
              </div>
              <FieldError message={errors.phone} />
            </div>
            <div>
              <label htmlFor="devis-ville" className={labelCls}>
                {dict.ville}
              </label>
              <select
                id="devis-ville"
                value={fields.ville}
                onChange={(e) => set("ville", e.target.value)}
                className={`${inputCls} appearance-none ${fields.ville ? "" : "text-smoke"}`}
              >
                <option value="" disabled>
                  {dict.villePlaceholder}
                </option>
                {villes.map((v) => (
                  <option key={v} value={v} className="bg-carbon text-bone">
                    {v}
                  </option>
                ))}
              </select>
              <FieldError message={errors.ville} />
            </div>
          </div>

          <div className="mt-8">
            <label htmlFor="devis-message" className={labelCls}>
              {dict.message} <span className="text-smoke">{dict.messageOptional}</span>
            </label>
            <textarea
              id="devis-message"
              value={fields.message}
              onChange={(e) => set("message", e.target.value)}
              rows={4}
              placeholder={dict.messagePlaceholder}
              className={`${inputCls} resize-none`}
            />
          </div>

          <button
            type="submit"
            disabled={sending}
            className="mt-10 w-full overflow-hidden bg-volt py-4.5 font-mono text-xs font-semibold tracking-[0.25em] text-black uppercase transition-colors clip-tag hover:bg-volt-hot disabled:cursor-wait md:w-auto md:px-14"
          >
            {sending ? <SendingBar label={dict.sending} /> : dict.submit}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
