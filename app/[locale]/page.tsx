import Link from "next/link";
import { notFound } from "next/navigation";
import RouteCanvas from "@/components/RouteCanvas";
import ScrambleText from "@/components/ScrambleText";
import Counter from "@/components/Counter";
import Reveal from "@/components/Reveal";
import Marquee from "@/components/Marquee";
import MagneticButton from "@/components/MagneticButton";
import TrackSearch from "@/components/TrackSearch";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);

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
              <span className="animate-blink me-2 inline-block h-2 w-2 bg-volt align-middle" />
              {dict.hero.status}
            </p>
          </Reveal>

          <h1 className="mt-6 text-[13vw] leading-[0.95] font-bold tracking-tighter uppercase sm:text-7xl md:text-8xl lg:text-[7rem]">
            <ScrambleText text={dict.hero.line1} delay={300} as="span" className="block" />
            <ScrambleText
              text={dict.hero.line2}
              delay={650}
              as="span"
              className="block text-stroke-volt"
            />
            <ScrambleText text={dict.hero.line3} delay={1000} as="span" className="block" />
          </h1>

          <div className="mt-10 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <Reveal delay={0.5} className="max-w-md">
              <p className="text-base leading-relaxed text-ash md:text-lg">{dict.hero.lede}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <MagneticButton href={`/${locale}/contact`}>{dict.hero.cta1}</MagneticButton>
                <MagneticButton href={`/${locale}/track`} variant="ghost">
                  {dict.hero.cta2}
                </MagneticButton>
              </div>
            </Reveal>

            <Reveal delay={0.7}>
              <dl className="grid grid-cols-3 divide-x divide-edge border border-edge bg-carbon/70 backdrop-blur-sm">
                {dict.hero.stats.map((s) => (
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
        items={dict.marquee}
        className="border-b border-edge bg-carbon py-5 text-xl font-bold tracking-tight text-bone/80 uppercase"
      />

      {/* ---------- SERVICES ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-36">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="max-w-xl text-4xl font-bold tracking-tighter uppercase md:text-6xl">
              {dict.homeServices.heading1}{" "}
              <span className="text-volt">{dict.homeServices.heading2}</span>
            </h2>
            <Link
              href={`/${locale}/services`}
              className="group font-mono text-[11px] tracking-[0.25em] text-ash uppercase transition-colors hover:text-volt"
            >
              {dict.homeServices.all}{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-1.5">
                →
              </span>
            </Link>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-px border border-edge bg-edge md:grid-cols-2">
          {dict.homeServices.cards.map((s, i) => (
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
                <h3 className="mt-6 text-2xl font-bold tracking-tight uppercase transition-transform duration-500 group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5">
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
              {dict.steps.kicker}
            </p>
            <h2 className="mt-4 max-w-2xl text-4xl font-bold tracking-tighter uppercase md:text-5xl">
              {dict.steps.heading}
            </h2>
          </Reveal>

          <ol className="mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
            {dict.steps.items.map((step, i) => (
              <Reveal key={step.n} delay={i * 0.12}>
                <li className="relative border-s-2 border-edge ps-7 transition-colors duration-500 hover:border-volt">
                  <span className="absolute -start-[1.35rem] top-0 grid h-10 w-10 place-items-center border border-edge bg-void font-mono text-sm font-semibold text-volt clip-tag">
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
                {dict.statsBand.heading1}{" "}
                <span className="text-stroke-volt">{dict.statsBand.heading2}</span>
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-ash">
                {dict.statsBand.body}
              </p>
              <div className="mt-9">
                <MagneticButton href={`/${locale}/network`} variant="ghost">
                  {dict.statsBand.cta}
                </MagneticButton>
              </div>
            </Reveal>

            <div className="grid grid-cols-2 gap-px border border-edge bg-edge">
              {dict.statsBand.stats.map((s, i) => (
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
                {dict.teaser.kicker}
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tighter uppercase md:text-4xl">
                {dict.teaser.heading}
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-ash">
                {dict.teaser.body}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <TrackSearch locale={locale} dict={dict.trackPage.search} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- QUOTE ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
        <Reveal>
          <figure className="relative border border-edge bg-panel p-10 clip-notch md:p-16">
            <span className="absolute top-0 start-0 h-1.5 w-24 bg-volt" aria-hidden />
            <blockquote className="max-w-3xl text-2xl leading-snug font-medium tracking-tight md:text-4xl">
              “{dict.quote.text1}
              <span className="text-volt">{dict.quote.highlight}</span>
              {dict.quote.text2}”
            </blockquote>
            <figcaption className="mt-8 font-mono text-[11px] tracking-[0.25em] text-smoke uppercase">
              {dict.quote.author}
            </figcaption>
          </figure>
        </Reveal>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="relative overflow-hidden border-t border-edge">
        <div className="hazard absolute inset-y-0 start-0 w-3 md:w-6" aria-hidden />
        <div className="hazard absolute inset-y-0 end-0 w-3 md:w-6" aria-hidden />
        <div className="mx-auto max-w-7xl px-10 py-24 text-center md:py-36">
          <Reveal>
            <h2 className="mx-auto max-w-3xl text-5xl font-bold tracking-tighter uppercase md:text-7xl">
              {dict.cta.heading1}{" "}
              <span className="text-stroke-volt">{dict.cta.heading2}</span>
              <br />
              {dict.cta.heading3} <span className="text-volt">{dict.cta.heading4}</span>
            </h2>
            <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-ash">
              {dict.cta.body}
            </p>
            <div className="mt-10 flex justify-center">
              <MagneticButton href={`/${locale}/contact`}>{dict.cta.button}</MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
