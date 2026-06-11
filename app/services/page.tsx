import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import MagneticButton from "@/components/MagneticButton";
import Marquee from "@/components/Marquee";

export const metadata: Metadata = {
  title: "Services — RAPIDOSS",
  description:
    "Same-day, night line-haul, cold chain and heavy freight — delivery services engineered for B2B operations.",
};

const SERVICES = [
  {
    index: "01",
    name: "Flash Same-Day",
    tagline: "When the line is down and the part is here.",
    body: "A courier is at your dock within 45 minutes of booking. Direct runs, no consolidation, live waypoints from pickup to signature. The service your most impatient customer designed.",
    specs: [
      ["Pickup response", "≤ 45 MIN"],
      ["Coverage", "METRO 40 KM"],
      ["Booking cut-off", "17:30"],
      ["Proof of delivery", "PHOTO + E-SIGN"],
    ],
  },
  {
    index: "02",
    name: "Night Line-Haul",
    tagline: "Your freight moves while everyone sleeps.",
    body: "Twelve trunk routes link our hubs every night. Goods collected before 20:00 are sorted, hauled and staged for 04:00 arrival — ready for first-wave delivery in another city by 09:00.",
    specs: [
      ["Trunk routes", "12 NIGHTLY"],
      ["Departure", "22:00 SHARP"],
      ["Hub arrival", "BY 04:00"],
      ["First delivery", "09:00 NEXT DAY"],
    ],
  },
  {
    index: "03",
    name: "Cold Chain",
    tagline: "Two degrees is a promise, not a target.",
    body: "GDP-compliant transport at 2–8°C and −20°C with sensor telemetry logged every 30 seconds. Excursion alerts reach our duty pharmacist before they reach your inbox.",
    specs: [
      ["Ranges", "2–8°C / −20°C"],
      ["Tolerance", "±0.5°C"],
      ["Telemetry", "30S INTERVALS"],
      ["Compliance", "GDP CERTIFIED"],
    ],
  },
  {
    index: "04",
    name: "Heavy Freight",
    tagline: "If it fits through the door, we install it. If not, we bring the door.",
    body: "Palletised and out-of-gauge loads to 24 tonnes. Tail-lift fleets, two-man crews, room-of-choice delivery, unpacking and waste take-back for installation contracts.",
    specs: [
      ["Max load", "24 TONNES"],
      ["Fleet", "TAIL-LIFT + CRANE"],
      ["Crew", "2-MAN TEAMS"],
      ["Extras", "INSTALL + TAKE-BACK"],
    ],
  },
  {
    index: "05",
    name: "Returns Engine",
    tagline: "The journey back matters as much as the journey out.",
    body: "Scheduled reverse-logistics sweeps, instant label generation and graded triage at the hub. Restock, refurbish or recycle decisions made within 24 hours of collection.",
    specs: [
      ["Label issue", "INSTANT"],
      ["Collection", "NEXT SWEEP"],
      ["Triage", "≤ 24 H"],
      ["Outcomes", "RESTOCK / REFURB / RECYCLE"],
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        index="01"
        kicker="What we run"
        title="Services"
        lede="Five operating modes, one control tower. Mix them per order, per lane, per season — the contract doesn't change."
      />

      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
        <div className="space-y-px">
          {SERVICES.map((s, i) => (
            <Reveal key={s.index} delay={Math.min(i * 0.05, 0.15)}>
              <article className="group grid gap-8 border border-edge bg-panel p-8 transition-colors duration-500 hover:border-volt/40 md:grid-cols-[80px_1.4fr_1fr] md:p-12">
                <span className="text-5xl font-bold tracking-tighter text-edge-hi transition-colors duration-500 group-hover:text-volt md:text-6xl">
                  {s.index}
                </span>

                <div>
                  <h2 className="text-3xl font-bold tracking-tighter uppercase md:text-4xl">
                    {s.name}
                  </h2>
                  <p className="mt-2 font-mono text-[11px] tracking-[0.2em] text-volt uppercase">
                    {s.tagline}
                  </p>
                  <p className="mt-5 max-w-lg text-sm leading-relaxed text-ash">{s.body}</p>
                </div>

                <dl className="grid grid-cols-2 content-start gap-px self-start border border-edge bg-edge">
                  {s.specs.map(([k, v]) => (
                    <div key={k} className="bg-carbon px-4 py-3.5">
                      <dt className="font-mono text-[9px] tracking-[0.2em] text-smoke uppercase">
                        {k}
                      </dt>
                      <dd className="mt-1 font-mono text-xs font-semibold tracking-wider text-bone">
                        {v}
                      </dd>
                    </div>
                  ))}
                </dl>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20 text-center">
          <p className="font-mono text-[11px] tracking-[0.3em] text-smoke uppercase">
            Need a mode we haven&apos;t listed?
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tighter uppercase md:text-4xl">
            We build lanes to order.
          </h2>
          <div className="mt-8 flex justify-center">
            <MagneticButton href="/contact">Design my lane</MagneticButton>
          </div>
        </Reveal>
      </div>

      <Marquee
        items={["PICKUP", "SORT", "LINE-HAUL", "LAST MILE", "SIGNATURE", "SETTLED"]}
        fast
        className="border-t border-edge bg-carbon py-4 font-mono text-xs tracking-[0.3em] text-smoke uppercase"
      />
    </>
  );
}
