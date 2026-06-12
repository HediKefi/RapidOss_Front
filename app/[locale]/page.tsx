import Link from "next/link";
import { notFound } from "next/navigation";
import Hero3D from "@/components/Hero3D";
import ScrambleText from "@/components/ScrambleText";
import Counter from "@/components/Counter";
import Reveal from "@/components/Reveal";
import Marquee from "@/components/Marquee";
import MagneticButton from "@/components/MagneticButton";
import TiltCard from "@/components/TiltCard";
import TrackSearch from "@/components/TrackSearch";
import RouteCanvas from "@/components/RouteCanvas";
import DevisForm from "@/components/DevisForm";
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
      {/* ---------- HERO — "Simplement. Rapidement. Livré chez vous." ---------- */}
      <section className="relative flex min-h-svh flex-col justify-end overflow-hidden border-b border-edge">
        <div className="grid-lines absolute inset-0" />
        <Hero3D className="absolute inset-0 h-full w-full" />
        <div className="vignette pointer-events-none absolute inset-0" />

        <div className="pointer-events-none relative mx-auto w-full max-w-7xl px-5 pb-14 sm:px-8 md:pb-20">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.32em] text-volt uppercase">
              <span className="animate-blink me-2 inline-block h-2 w-2 bg-volt align-middle" />
              {dict.hero.status}
            </p>
          </Reveal>

          <h1 className="mt-6 max-w-4xl text-[12vw] leading-[0.98] font-bold tracking-tighter uppercase sm:text-6xl md:text-7xl lg:text-8xl">
            <ScrambleText text={dict.hero.line1} delay={300} as="span" className="block" />
            <ScrambleText
              text={dict.hero.line2}
              delay={650}
              as="span"
              className="block text-stroke-volt"
            />
            <ScrambleText text={dict.hero.line3} delay={1000} as="span" className="block" />
          </h1>

          <div className="pointer-events-auto mt-8 flex max-w-xl flex-col gap-8">
            <Reveal delay={0.5}>
              <p className="text-base leading-relaxed text-ash md:text-lg">{dict.hero.lede}</p>
            </Reveal>
            <Reveal delay={0.65}>
              <div className="flex flex-wrap gap-4">
                <MagneticButton href={`/${locale}#devis`}>{dict.hero.ctaClient}</MagneticButton>
                <MagneticButton href={`/${locale}/devenir-livreur`} variant="ghost">
                  {dict.hero.ctaCourier}
                </MagneticButton>
              </div>
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

      {/* ---------- SERVICES — Pickups / Livraison / Paiement / Marketing ---------- */}
      <section id={dict.services.id} className="scroll-mt-20">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-36">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.3em] text-volt uppercase">
              {dict.services.kicker}
            </p>
            <h2 className="mt-4 max-w-2xl text-4xl font-bold tracking-tighter uppercase md:text-6xl">
              {dict.services.heading1}{" "}
              <span className="text-volt">{dict.services.heading2}</span>
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {dict.services.cards.map((s, i) => (
              <Reveal key={s.index} delay={i * 0.08} variant="swing">
                <TiltCard className="group">
                  <article className="relative flex h-full flex-col overflow-hidden border border-edge bg-panel p-7 transition-colors duration-500 group-hover:border-volt/50">
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
                    <h3 className="mt-6 text-2xl font-bold tracking-tight uppercase">{s.name}</h3>
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-ash">{s.desc}</p>
                    <p className="mt-6 font-mono text-[9px] tracking-[0.2em] text-smoke uppercase transition-colors duration-500 group-hover:text-volt">
                      {s.spec}
                    </p>
                    <Link
                      href={`/${locale}#devis`}
                      className="mt-5 inline-flex items-center gap-2 font-mono text-[10px] font-semibold tracking-[0.22em] text-volt uppercase"
                    >
                      {dict.services.cta}
                      <span className="inline-block transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1">
                        →
                      </span>
                    </Link>
                  </article>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- ENGAGEMENTS — Plateforme / Délai garanti / Sécurisée ---------- */}
      <section id={dict.engagements.id} className="scroll-mt-20 border-y border-edge bg-carbon">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.3em] text-volt uppercase">
              {dict.engagements.kicker}
            </p>
            <h2 className="mt-4 max-w-2xl text-4xl font-bold tracking-tighter uppercase md:text-5xl">
              {dict.engagements.heading}
            </h2>
          </Reveal>

          <ol className="mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
            {dict.engagements.items.map((item, i) => (
              <Reveal key={item.n} delay={i * 0.12} variant="swing">
                <li className="relative h-full border-s-2 border-edge ps-7 transition-colors duration-500 hover:border-volt">
                  <span className="absolute -start-[1.35rem] top-0 grid h-10 w-10 place-items-center border border-edge bg-void font-mono text-sm font-semibold text-volt clip-tag">
                    {item.n}
                  </span>
                  <h3 className="pt-1.5 text-xl font-bold tracking-tight uppercase">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ash">{item.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- À PROPOS — "Plus qu'une société, une famille !" ---------- */}
      <section id={dict.about.id} className="relative scroll-mt-20 overflow-hidden">
        <div className="grid-lines absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
          <div className="grid gap-12 md:grid-cols-[1.1fr_1fr] md:items-center">
            <Reveal>
              <p className="font-mono text-[11px] tracking-[0.3em] text-volt uppercase">
                {dict.about.kicker}
              </p>
              <h2 className="mt-4 text-4xl font-bold tracking-tighter uppercase md:text-6xl">
                {dict.about.heading1}
                <br />
                <span className="text-stroke-volt">{dict.about.heading2}</span>
              </h2>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-ash md:text-base">
                {dict.about.body}
              </p>
              <div className="mt-9">
                <MagneticButton href={`/${locale}#devis`}>{dict.about.cta}</MagneticButton>
              </div>
            </Reveal>

            <div className="space-y-px">
              {dict.about.messages.map((msg, i) => (
                <Reveal key={msg} delay={0.15 + i * 0.1} variant="swing">
                  <figure className="group relative overflow-hidden border border-edge bg-panel p-7 transition-colors duration-500 hover:border-volt/40">
                    <span className="absolute inset-y-0 start-0 w-1 bg-volt opacity-40 transition-opacity duration-500 group-hover:opacity-100" />
                    <blockquote className="text-lg leading-snug font-bold tracking-tight uppercase md:text-xl">
                      “{msg}”
                    </blockquote>
                    <span className="mt-3 block font-mono text-[10px] tracking-[0.25em] text-smoke">
                      0{i + 1} / RAPIDOSS FAMILY
                    </span>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- ACCOMPAGNEMENT MARKETING ---------- */}
      <section id={dict.marketing.id} className="scroll-mt-20 border-y border-edge bg-carbon">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.3em] text-volt uppercase">
              {dict.marketing.kicker}
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tighter uppercase md:text-5xl">
              {dict.marketing.heading1} <span className="text-volt">{dict.marketing.heading2}</span>
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-ash">{dict.marketing.body}</p>
          </Reveal>

          <div className="mt-14 grid gap-px border border-edge bg-edge md:grid-cols-3">
            {dict.marketing.items.map((item, i) => (
              <Reveal key={item.n} delay={i * 0.1} variant="swing">
                <article className="group h-full bg-panel p-8 transition-colors duration-500 hover:bg-void md:p-10">
                  <span className="font-mono text-xs text-volt">/{item.n}</span>
                  <h3 className="mt-5 text-xl font-bold tracking-tight uppercase">{item.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-ash">{item.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- DEVIS — "Commencer à livrer ?" ---------- */}
      <section id={dict.devis.id} className="scroll-mt-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:grid-cols-[1fr_1.6fr] md:py-32">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.3em] text-volt uppercase">
              {dict.devis.kicker}
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tighter uppercase md:text-5xl">
              {dict.devis.heading1} <span className="text-volt">{dict.devis.heading2}</span>
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ash">{dict.devis.lede}</p>

            <ol className="mt-10 space-y-5">
              {dict.devis.nextSteps.map(([time, body]) => (
                <li
                  key={time}
                  className="flex gap-4 border-s-2 border-edge ps-4 transition-colors hover:border-volt"
                >
                  <span className="shrink-0 font-mono text-xs font-semibold text-volt" dir="ltr">
                    {time}
                  </span>
                  <span className="text-sm leading-relaxed text-ash">{body}</span>
                </li>
              ))}
            </ol>

            <div className="mt-10 border border-edge bg-panel p-6 clip-tag">
              <p className="font-mono text-[10px] tracking-[0.3em] text-volt uppercase">
                {dict.devis.urgentKicker}
              </p>
              <p className="mt-3 text-sm text-ash">{dict.devis.urgentBody}</p>
              <p className="mt-4 font-mono text-lg font-semibold tracking-wider text-bone" dir="ltr">
                {dict.devis.phone}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15} variant="swing">
            <DevisForm dict={dict.devis.form} villes={dict.villes} />
          </Reveal>
        </div>
      </section>

      {/* ---------- STATS — 24H / +150 / 92% ---------- */}
      <section className="relative overflow-hidden border-y border-edge bg-carbon">
        <RouteCanvas className="absolute inset-0 h-full w-full opacity-50" />
        <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.3em] text-volt uppercase">
              {dict.stats.kicker}
            </p>
            <h2 className="mt-4 max-w-2xl text-4xl font-bold tracking-tighter uppercase md:text-5xl">
              {dict.stats.heading}
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-px border border-edge bg-edge md:grid-cols-3">
            {dict.stats.items.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.1} variant="swing">
                <div className="h-full bg-panel/90 px-8 py-12 backdrop-blur-sm">
                  <p className="text-6xl font-bold text-volt md:text-7xl">
                    <Counter to={s.value} prefix={s.prefix} suffix={s.suffix} />
                  </p>
                  <p className="mt-4 max-w-xs text-sm leading-relaxed text-ash">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- PARTNERS ---------- */}
      <section className="border-b border-edge">
        <div className="mx-auto max-w-7xl px-5 pt-14 sm:px-8">
          <Reveal>
            <p className="text-center font-mono text-[11px] tracking-[0.3em] text-smoke uppercase">
              {dict.partners.kicker}
            </p>
          </Reveal>
        </div>
        <Marquee
          items={dict.partners.names}
          className="py-10 text-2xl font-bold tracking-tight text-smoke uppercase [&_span:hover]:text-volt"
        />
      </section>

      {/* ---------- SUIVRE MON COLIS ---------- */}
      <section className="bg-carbon">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
          <div className="grid items-center gap-10 md:grid-cols-[1fr_1.2fr]">
            <Reveal>
              <p className="font-mono text-[11px] tracking-[0.3em] text-volt uppercase">
                {dict.teaser.kicker}
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tighter uppercase md:text-4xl">
                {dict.teaser.heading}
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-ash">{dict.teaser.body}</p>
            </Reveal>
            <Reveal delay={0.15}>
              <TrackSearch locale={locale} dict={dict.trackPage.search} />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
