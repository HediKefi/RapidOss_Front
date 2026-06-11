import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import TrackClient from "@/components/TrackClient";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return dict.trackPage.meta;
}

export default async function TrackPage({ params }: Params) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = (await getDictionary(locale)).trackPage;

  return (
    <>
      <PageHeader index={t.index} kicker={t.kicker} title={t.title} lede={t.lede} />
      <Suspense>
        <TrackClient locale={locale} dict={t} />
      </Suspense>
    </>
  );
}
