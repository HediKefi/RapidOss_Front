import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import MagneticButton from "@/components/MagneticButton";
import Marquee from "@/components/Marquee";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return dict.servicesPage.meta;
}

export default async function ServicesPage({ params }: Params) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = (await getDictionary(locale)).servicesPage;

  return (
    <>
      <PageHeader index={t.index} kicker={t.kicker} title={t.title} lede={t.lede} />

      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
        <div className="space-y-px">
          {t.items.map((s, i) => (
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
            {t.customKicker}
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tighter uppercase md:text-4xl">
            {t.customHeading}
          </h2>
          <div className="mt-8 flex justify-center">
            <MagneticButton href={`/${locale}/contact`}>{t.customCta}</MagneticButton>
          </div>
        </Reveal>
      </div>

      <Marquee
        items={t.flowMarquee}
        fast
        className="border-t border-edge bg-carbon py-4 font-mono text-xs tracking-[0.3em] text-smoke uppercase"
      />
    </>
  );
}
