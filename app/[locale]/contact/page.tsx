import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import QuoteForm from "@/components/QuoteForm";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return dict.contactPage.meta;
}

export default async function ContactPage({ params }: Params) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = (await getDictionary(locale)).contactPage;

  return (
    <>
      <PageHeader index={t.index} kicker={t.kicker} title={t.title} lede={t.lede} />

      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 md:grid-cols-[1fr_1.6fr] md:py-28">
        <Reveal>
          <div className="space-y-10 md:sticky md:top-28">
            <div>
              <h2 className="font-mono text-[10px] tracking-[0.3em] text-volt uppercase">
                {t.nextHeading}
              </h2>
              <ol className="mt-5 space-y-5">
                {t.nextSteps.map(([time, body]) => (
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
            </div>

            <div className="border border-edge bg-panel p-6 clip-tag">
              <p className="font-mono text-[10px] tracking-[0.3em] text-volt uppercase">
                {t.urgentKicker}
              </p>
              <p className="mt-3 text-sm text-ash">{t.urgentBody}</p>
              <p className="mt-4 font-mono text-lg font-semibold tracking-wider text-bone" dir="ltr">
                {t.phone}
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <QuoteForm dict={t.form} />
        </Reveal>
      </div>
    </>
  );
}
