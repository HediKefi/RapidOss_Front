import Link from "next/link";
import RouteCanvas from "@/components/RouteCanvas";
import ScrambleText from "@/components/ScrambleText";
import Counter from "@/components/Counter";
import Reveal from "@/components/Reveal";
import Marquee from "@/components/Marquee";
import MagneticButton from "@/components/MagneticButton";
import TrackSearch from "@/components/TrackSearch";

const SERVICES = [
  {
    index: "01",
    name: "Flash Same-Day",
    desc: "Pickup within 45 minutes, delivered across the metro area before close of business. Built for spare parts, legal and medical.",
    spec: "CUT-OFF 17:30 · METRO RADIUS 40KM",
  },
  {
    index: "02",
    name: "Night Line-Haul",
    desc: "Your freight moves while your competitors sleep. Hub-to-hub trunk routes with 04:00 arrival for next-morning dispatch.",
    spec: "12 TRUNK ROUTES · DEPARTS 22:00",
  },
  {
    index: "03",
    name: "Cold Chain",
    desc: "Validated 2–8°C and −20°C transport with live temperature telemetry on every parcel. Pharma-grade, GDP compliant.",
    spec: "±0.5°C TOLERANCE · FULL AUDIT TRAIL",
  },
  {
    index: "04",
    name: "Heavy Freight",
    desc: "Palletised and out-of-gauge loads up to 24 tonnes, tail-lift fleets and two-man delivery teams for installation jobs.",
    spec: "UP TO 24T · TAIL-LIFT & 2-MAN CREWS",
  },
];

const STEPS = [
  {
    n: "A",
    title: "Plug in",
    body: "Connect your OMS or warehouse system to our API in an afternoon — or just forward us a CSV. We meet your stack where it is.",
  },
  {
    n: "B",
    title: "We dispatch",
    body: "Our control tower assigns every order to the optimal carrier, route and vehicle class. Algorithms propose, dispatchers decide.",
  },
  {
    n: "C",
    title: "You watch it land",
    body: "Live waypoints, proof of delivery and exception alerts stream back into your tools. No black holes between pickup and signature.",
  },
];

export default function Home() {
  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="relative flex min-h-svh flex-col justify-end overflow-hidden border-b border-edge">
        <div className="grid-lines absolute inset-0" />
        <RouteCanvas className="absolute inset-0 h-full w-full" />
        <div className="vignette pointer-events-none absolute inset-0" />

        <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 sm:px-8 md:pb-24">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.32em] text-volt uppercase">
              <span className="animate-blink mr-2 inline-block h-2 w-2 bg-volt align-middle" />
              Control tower live — 1,284 vehicles on the road
            </p>
          </Reveal>

          <h1 className="mt-6 text-[13vw] leading-[0.88] font-bold tracking-tighter uppercase sm:text-7xl md:text-8xl lg:text-[7.5rem]">
            <ScrambleText text="WE MOVE WHAT" delay={300} as="span" className="block" />
            <ScrambleText
              text="MOVES YOUR"
              delay={650}
              as="span"
              className="block text-stroke-volt"
            />
            <ScrambleText text="BUSINESS." delay={1000} as="span" className="block" />
          </h1>

          <div className="mt-10 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <Reveal delay={0.5} className="max-w-md">
              <p className="text-base leading-relaxed text-ash md:text-lg">
                RAPIDOSS runs the delivery operation behind 400+ companies —
                one contract, one API, and a control tower that never blinks.
                You sell. We ship.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <MagneticButton href="/contact">Get a quote</MagneticButton>
                <MagneticButton href="/track" variant="ghost">
                  Track a parcel
                </MagneticButton>
              </div>
            </Reveal>

            <Reveal delay={0.7}>
              <dl className="grid grid-cols-3 divide-x divide-edge border border-edge bg-carbon/70 backdrop-blur-sm">
                {[
                  { value: 98.6, suffix: "%", decimals: 1, label: "On-time" },
                  { value: 41, suffix: "K", decimals: 0, label: "Parcels / day" },
                  { value: 12, suffix: "", decimals: 0, label: "Hubs in EU" },
                ].map((s) => (
                  <div key={s.label} className="px-5 py-4 md:px-7">
                    <dt className="order-last mt-1 font-mono text-[9px] tracking-[0.25em] text-smoke uppercase">
                      {s.label}
                    </dt>
                    <dd className="text-2xl font-bold text-volt md:text-3xl">
                      <Counter to={s.value} suffix={s.suffix} decimals={s.decimals} />
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>

        <div className="hazard relative h-3" />
      </section>

      {/* ---------- MARQUEE ---------- */}
      <Marquee
        items={[
          "SAME-DAY",
          "NIGHT LINE-HAUL",
          "COLD CHAIN",
          "LAST MILE",
          "HEAVY FREIGHT",
          "PROOF OF DELIVERY",
          "LIVE TELEMETRY",
        ]}
        className="border-b border-edge bg-carbon py-5 text-xl font-bold tracking-tight text-bone/80 uppercase"
      />

      {/* ---------- SERVICES ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-36">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="max-w-xl text-4xl font-bold tracking-tighter uppercase md:text-6xl">
              Four ways we <span className="text-volt">carry you</span>
            </h2>
            <Link
              href="/services"
              className="group font-mono text-[11px] tracking-[0.25em] text-ash uppercase transition-colors hover:text-volt"
            >
              All services{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1.5">→</span>
            </Link>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-px border border-edge bg-edge md:grid-cols-2">
          {SERVICES.map((s, i) => (
            <Reveal key={s.index} delay={i * 0.08}>
              <article className="group relative h-full overflow-hidden bg-panel p-8 transition-colors duration-500 md:p-10">
                <span
                  className="absolute inset-x-0 bottom-0 h-0 bg-volt transition-all duration-500 ease-out group-hover:h-1.5"
                  aria-hidden
                />
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-xs text-volt">/{s.index}</span>
                  <span className="text-4xl font-bold tracking-tighter text-edge-hi transition-colors duration-500 group-hover:text-volt/30">
                    {s.index}
                  </span>
                </div>
                <h3 className="mt-6 text-2xl font-bold tracking-tight uppercase transition-transform duration-500 group-hover:translate-x-1.5">
                  {s.name}
                </h3>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-ash">{s.desc}</p>
                <p className="mt-8 font-mono text-[10px] tracking-[0.22em] text-smoke uppercase transition-colors duration-500 group-hover:text-volt">
                  {s.spec}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- HOW IT WORKS ---------- */}
      <section className="border-y border-edge bg-carbon">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.3em] text-volt uppercase">
              How it works
            </p>
            <h2 className="mt-4 max-w-2xl text-4xl font-bold tracking-tighter uppercase md:text-5xl">
              From your dock to their door, in three moves
            </h2>
          </Reveal>

          <ol className="mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
            {STEPS.map((step, i) => (
              <Reveal key={step.n} delay={i * 0.12}>
                <li className="relative border-l-2 border-edge pl-7 transition-colors duration-500 hover:border-volt">
                  <span className="absolute -left-[1.35rem] top-0 grid h-10 w-10 place-items-center border border-edge bg-void font-mono text-sm font-semibold text-volt clip-tag">
                    {step.n}
                  </span>
                  <h3 className="pt-1.5 text-xl font-bold tracking-tight uppercase">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ash">{step.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- STATS BAND ---------- */}
      <section className="relative overflow-hidden">
        <div className="grid-lines absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <Reveal>
              <h2 className="text-4xl font-bold tracking-tighter uppercase md:text-5xl">
                Numbers we are <span className="text-stroke-volt">held to</span>
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-ash">
                Every contract ships with an SLA, and every SLA is public to the
                client. These figures are rolling 90-day actuals across the
                whole network — not a marketing snapshot.
              </p>
              <div className="mt-9">
                <MagneticButton href="/network" variant="ghost">
                  Inspect the network
                </MagneticButton>
              </div>
            </Reveal>

            <div className="grid grid-cols-2 gap-px border border-edge bg-edge">
              {[
                { value: 98.6, suffix: "%", decimals: 1, label: "SLA on-time rate" },
                { value: 6.2, suffix: "M", decimals: 1, label: "Parcels per year" },
                { value: 38, suffix: " min", decimals: 0, label: "Avg pickup response" },
                { value: 0.04, suffix: "%", decimals: 2, label: "Damage rate" },
              ].map((s, i) => (
                <Reveal key={s.label} delay={i * 0.07}>
                  <div className="bg-panel px-7 py-9">
                    <p className="text-4xl font-bold text-volt md:text-5xl">
                      <Counter to={s.value} suffix={s.suffix} decimals={s.decimals} />
                    </p>
                    <p className="mt-2 font-mono text-[10px] tracking-[0.22em] text-smoke uppercase">
                      {s.label}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- TRACKING TEASER ---------- */}
      <section className="border-y border-edge bg-carbon">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
          <div className="grid items-center gap-10 md:grid-cols-[1fr_1.2fr]">
            <Reveal>
              <p className="font-mono text-[11px] tracking-[0.3em] text-volt uppercase">
                Live trace
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tighter uppercase md:text-4xl">
                Where is it right now?
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-ash">
                Drop a waybill number and watch the journey replay —
                every scan, every hub, every handover.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <TrackSearch />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- QUOTE ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
        <Reveal>
          <figure className="relative border border-edge bg-panel p-10 clip-notch md:p-16">
            <span className="absolute top-0 left-0 h-1.5 w-24 bg-volt" aria-hidden />
            <blockquote className="max-w-3xl text-2xl leading-snug font-medium tracking-tight md:text-4xl">
              “We shut down our in-house fleet in March. RAPIDOSS absorbed
              <span className="text-volt"> 11,000 weekly orders </span>
              without our customers noticing the switch. That was the point.”
            </blockquote>
            <figcaption className="mt-8 font-mono text-[11px] tracking-[0.25em] text-smoke uppercase">
              — COO, industrial parts distributor · client since 2022
            </figcaption>
          </figure>
        </Reveal>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="relative overflow-hidden border-t border-edge">
        <div className="hazard absolute inset-y-0 left-0 w-3 md:w-6" aria-hidden />
        <div className="hazard absolute inset-y-0 right-0 w-3 md:w-6" aria-hidden />
        <div className="mx-auto max-w-7xl px-10 py-24 text-center md:py-36">
          <Reveal>
            <h2 className="mx-auto max-w-3xl text-5xl font-bold tracking-tighter uppercase md:text-7xl">
              Stop running <span className="text-stroke-volt">a fleet.</span>
              <br />
              Start running <span className="text-volt">a business.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-ash">
              Tell us what you ship and where. You’ll have a costed proposal
              and an onboarding date within 48 hours.
            </p>
            <div className="mt-10 flex justify-center">
              <MagneticButton href="/contact">Talk to dispatch</MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
