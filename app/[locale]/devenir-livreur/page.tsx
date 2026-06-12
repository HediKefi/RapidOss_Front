import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import CourierForm from "@/components/CourierForm";
import Van3D from "@/components/Van3D";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return dict.courierPage.meta;
}

export default async function CourierPage({ params }: Params) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = (await getDictionary(locale)).courierPage;

  return (
    <>
      <PageHeader index={t.index} kicker={t.kicker} title={t.title} lede={t.lede} />

      {/* fleet cam — 3D van */}
      <section className="mx-auto max-w-7xl px-5 pt-16 sm:px-8">
        <Reveal variant="swing">
          <div className="relative h-[340px] overflow-hidden border border-edge bg-carbon clip-notch md:h-[440px]">
            <div className="grid-lines absolute inset-0" />
            <Van3D className="absolute inset-0 h-full w-full" />
            <div className="vignette pointer-events-none absolute inset-0" />
            <p className="absolute top-5 start-6 font-mono text-[10px] tracking-[0.25em] text-volt uppercase">
              <span className="animate-blink me-2 inline-block h-1.5 w-1.5 bg-volt align-middle" />
              {t.fleetCam}
            </p>
          </div>
        </Reveal>
      </section>

      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 md:grid-cols-[1fr_1.6fr] md:py-28">
        <Reveal>
          <dl className="grid gap-px border border-edge bg-edge md:sticky md:top-28">
            {t.perks.map(([k, v]) => (
              <div key={k} className="bg-panel px-6 py-5">
                <dt className="font-mono text-[10px] tracking-[0.25em] text-volt uppercase">{k}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-ash">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={0.15} variant="swing">
          <CourierForm dict={t.form} villes={(await getDictionary(locale)).villes} />
        </Reveal>
      </div>
    </>
  );
}
