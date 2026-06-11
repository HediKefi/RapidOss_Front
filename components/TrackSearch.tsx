"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Dictionary } from "@/lib/i18n/dictionaries";

/** Inline tracking-code input — validates RX-###### and routes to the locale's /track. */
export default function TrackSearch({
  locale,
  dict,
  autoFocus = false,
}: {
  locale: string;
  dict: Dictionary["trackPage"]["search"];
  autoFocus?: boolean;
}) {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = value.trim().toUpperCase();
    if (!/^RX-?\d{6}$/.test(cleaned)) {
      setError(true);
      return;
    }
    router.push(`/${locale}/track?id=${encodeURIComponent(cleaned)}`);
  };

  return (
    <form onSubmit={submit} className="w-full max-w-xl" noValidate>
      <div
        className={`flex items-stretch border bg-carbon transition-colors duration-300 clip-tag ${
          error ? "border-volt" : "border-edge-hi focus-within:border-volt"
        }`}
      >
        <span className="hidden items-center border-e border-edge px-4 font-mono text-[10px] tracking-[0.25em] text-smoke uppercase sm:flex">
          {dict.waybill}
        </span>
        <input
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError(false);
          }}
          autoFocus={autoFocus}
          placeholder={dict.placeholder}
          aria-label={dict.ariaLabel}
          dir="ltr"
          className="min-w-0 flex-1 bg-transparent px-4 py-4 font-mono text-sm tracking-[0.18em] text-bone uppercase placeholder:text-smoke focus:outline-none rtl:text-end"
        />
        <button
          type="submit"
          className="bg-volt px-5 font-mono text-xs font-semibold tracking-[0.2em] text-black uppercase transition-colors hover:bg-volt-hot sm:px-7"
        >
          {dict.button}
        </button>
      </div>
      <p
        className={`mt-2 font-mono text-[10px] tracking-[0.2em] uppercase transition-opacity duration-300 ${
          error ? "text-volt opacity-100" : "text-smoke opacity-60"
        }`}
        role={error ? "alert" : undefined}
      >
        {error ? dict.error : dict.hint}
      </p>
    </form>
  );
}
