import Link from "next/link";
import Logo from "./Logo";
import Marquee from "./Marquee";

const CITIES = [
  "PARIS", "LYON", "MARSEILLE", "LILLE", "BORDEAUX", "TOULOUSE",
  "NANTES", "STRASBOURG", "ROTTERDAM", "MILANO", "BARCELONA", "FRANKFURT",
];

export default function Footer() {
  return (
    <footer className="border-t border-edge bg-carbon">
      <Marquee
        items={CITIES}
        className="border-b border-edge py-3 font-mono text-[11px] tracking-[0.3em] text-smoke"
      />

      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-ash">
            We run the delivery operations of 400+ companies across Europe —
            same-day, line-haul, cold chain and heavy freight, under one
            contract and one control tower.
          </p>
          <p className="mt-6 font-mono text-[10px] tracking-[0.25em] text-smoke uppercase">
            Dispatch desk · 24/7 · +33 1 84 00 26 26
          </p>
        </div>

        <nav aria-label="Footer">
          <h3 className="font-mono text-[10px] tracking-[0.3em] text-volt uppercase">Navigate</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {[
              ["Services", "/services"],
              ["Network", "/network"],
              ["Track a shipment", "/track"],
              ["Get a quote", "/contact"],
            ].map(([label, href]) => (
              <li key={href}>
                <Link href={href} className="text-ash transition-colors hover:text-volt">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="font-mono text-[10px] tracking-[0.3em] text-volt uppercase">HQ</h3>
          <p className="mt-5 text-sm leading-relaxed text-ash">
            14 Quai de la Charente
            <br />
            75019 Paris, France
            <br />
            <span className="text-smoke">ops@rapidoss.example</span>
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
          <span>© 2026 RAPIDOSS LOGISTICS SAS</span>
          <span>EVERY PARCEL ACCOUNTED FOR</span>
        </div>
      </div>
      <div className="hazard h-2" />
    </footer>
  );
}
