import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";
import RouteCanvas from "@/components/RouteCanvas";
import MagneticButton from "@/components/MagneticButton";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return dict.networkPage.meta;
}

export default async function NetworkPage({ params }: Params) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = (await getDictionary(locale)).networkPage;

  return (
    <>
      <PageHeader index={t.index} kicker={t.kicker} title={t.title} lede={t.lede} />

      {/* live map panel */}
      <section className="mx-auto max-w-7xl px-5 pt-16 sm:px-8">
        <Reveal>
          <div className="relative h-[420px] overflow-hidden border border-edge bg-carbon clip-notch md:h-[520px]">
            <div className="grid-lines absolute inset-0" />
            <RouteCanvas className="absolute inset-0 h-full w-full" />
            <div className="absolute top-5 start-6 font-mono text-[10px] tracking-[0.25em] text-volt uppercase">
              <span className="animate-blink me-2 inline-block h-1.5 w-1.5 bg-volt align-middle" />
              {t.telemetry}
            </div>
            <div className="absolute end-6 bottom-5 hidden gap-6 font-mono text-[10px] tracking-[0.2em] text-smoke uppercase sm:flex">
              <span>
                <span className="me-2 inline-block h-2 w-2 rounded-full bg-volt align-middle" />
                {t.legendHub}
              </span>
              <span>
                <span className="me-2 inline-block h-2 w-2 rounded-full bg-bone/40 align-middle" />
                {t.legendRelay}
              </span>
              <span>
                <span className="me-2 inline-block h-px w-5 bg-volt align-middle" />
                {t.legendHaul}
              </span>
            </div>
          </div>
        </Reveal>
      </section>

      {/* aggregate numbers */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid grid-cols-2 gap-px border border-edge bg-edge md:grid-cols-4">
          {t.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <div className="bg-panel px-6 py-8 text-center md:py-10">
                <p className="text-4xl font-bold text-volt md:text-5xl">
                  <Counter to={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-2 font-mono text-[10px] tracking-[0.22em] text-smoke uppercase">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* relay manifest */}
      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 md:pb-32">
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tighter uppercase md:text-4xl">
            {t.manifestHeading}
          </h2>
        </Reveal>

        <div className="mt-8 overflow-x-auto border border-edge">
          <table className="w-full min-w-[640px] border-collapse font-mono text-xs">
            <thead>
              <tr className="border-b border-edge bg-carbon text-start text-[9px] tracking-[0.25em] text-smoke uppercase">
                <th className="px-5 py-3.5 text-start font-medium">{t.tableHeaders.code}</th>
                <th className="px-5 py-3.5 text-start font-medium">{t.tableHeaders.city}</th>
                <th className="px-5 py-3.5 text-start font-medium">{t.tableHeaders.role}</th>
                <th className="px-5 py-3.5 text-start font-medium">{t.tableHeaders.couriers}</th>
                <th className="px-5 py-3.5 text-start font-medium">{t.tableHeaders.sla}</th>
                <th className="px-5 py-3.5 text-start font-medium">{t.tableHeaders.status}</th>
              </tr>
            </thead>
            <tbody>
              {t.hubs.map((hub, i) => (
                <tr
                  key={hub.code}
                  className={`border-b border-edge transition-colors hover:bg-volt/[0.04] ${
                    i % 2 ? "bg-panel" : "bg-void"
                  }`}
                >
                  <td className="px-5 py-4 font-semibold text-volt" dir="ltr">
                    {hub.code}
                  </td>
                  <td className="px-5 py-4 tracking-wider uppercase">{hub.city}</td>
                  <td className="px-5 py-4 text-ash">{hub.role}</td>
                  <td className="px-5 py-4 text-ash">{hub.couriers}</td>
                  <td className="px-5 py-4 text-ash">{hub.sla}</td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] text-bone">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-volt" />
                      {t.online}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Reveal className="mt-16 flex flex-wrap items-center justify-between gap-6 border border-edge bg-panel p-8 clip-notch md:p-10">
          <div>
            <h3 className="text-2xl font-bold tracking-tighter uppercase">
              {t.coverageHeading}
            </h3>
            <p className="mt-2 max-w-md text-sm text-ash">{t.coverageBody}</p>
          </div>
          <MagneticButton href={`/${locale}/contact`}>{t.coverageCta}</MagneticButton>
        </Reveal>
      </section>
    </>
  );
}
