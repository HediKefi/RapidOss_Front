"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import ScrambleText from "@/components/ScrambleText";
import { isLocale, defaultLocale } from "@/lib/i18n/config";
import en from "@/lib/i18n/en";
import fr from "@/lib/i18n/fr";
import ar from "@/lib/i18n/ar";

const dicts = { en, fr, ar };

export default function NotFound() {
  // not-found pages receive no params from Next, so resolve the
  // locale client-side from the URL
  const params = useParams<{ locale?: string }>();
  const locale = params?.locale && isLocale(params.locale) ? params.locale : defaultLocale;
  const t = dicts[locale].notFound;

  return (
    <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-5 text-center">
      <div className="grid-lines absolute inset-0" />
      <div className="relative">
        <p className="font-mono text-[11px] tracking-[0.35em] text-volt uppercase">
          {t.kicker}
        </p>
        <ScrambleText
          as="h1"
          text="404"
          className="mt-4 block text-[28vw] leading-none font-bold tracking-tighter text-stroke-volt md:text-[14rem]"
        />
        <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-ash">{t.body}</p>
        <Link
          href={`/${locale}`}
          className="mt-10 inline-block bg-volt px-8 py-4 font-mono text-xs font-semibold tracking-[0.25em] text-black uppercase clip-tag transition-colors hover:bg-volt-hot"
        >
          {t.cta} <span className="inline-block rtl:-scale-x-100">→</span>
        </Link>
      </div>
      <div className="hazard absolute inset-x-0 bottom-0 h-2" />
    </section>
  );
}
