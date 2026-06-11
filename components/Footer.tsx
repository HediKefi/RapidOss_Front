import Link from "next/link";
import Logo from "./Logo";
import Marquee from "./Marquee";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export default function Footer({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary["footer"];
}) {
  const links = [
    [dict.links.services, `/${locale}/services`],
    [dict.links.network, `/${locale}/network`],
    [dict.links.track, `/${locale}/track`],
    [dict.links.quote, `/${locale}/contact`],
  ];

  return (
    <footer className="border-t border-edge bg-carbon">
      <Marquee
        items={dict.cities}
        className="border-b border-edge py-3 font-mono text-[11px] tracking-[0.3em] text-smoke"
      />

      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo locale={locale} label="RAPIDOSS" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-ash">{dict.blurb}</p>
          <p className="mt-6 font-mono text-[10px] tracking-[0.25em] text-smoke uppercase">
            {dict.dispatch}
          </p>
        </div>

        <nav aria-label="Footer">
          <h3 className="font-mono text-[10px] tracking-[0.3em] text-volt uppercase">
            {dict.navigate}
          </h3>
          <ul className="mt-5 space-y-3 text-sm">
            {links.map(([label, href]) => (
              <li key={href}>
                <Link href={href} className="text-ash transition-colors hover:text-volt">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="font-mono text-[10px] tracking-[0.3em] text-volt uppercase">
            {dict.hq}
          </h3>
          <p className="mt-5 text-sm leading-relaxed text-ash">
            {dict.address1}
            <br />
            {dict.address2}
            <br />
            <span className="text-smoke">{dict.email}</span>
          </p>
        </div>
      </div>

      <div className="overflow-hidden px-5 sm:px-8" aria-hidden>
        <p className="text-center text-[18vw] leading-[0.78] font-bold tracking-tighter text-stroke-faint select-none md:text-[13vw]">
          RAPIDOSS
        </p>
      </div>

      <div className="border-t border-edge">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-5 py-4 font-mono text-[10px] tracking-[0.2em] text-smoke uppercase sm:px-8">
          <span>{dict.copyright}</span>
          <span>{dict.tagline}</span>
        </div>
      </div>
      <div className="hazard h-2" />
    </footer>
  );
}
