"use client";

import { Suspense } from "react";
import PageHeader from "@/components/PageHeader";
import TrackClient from "@/components/TrackClient";
import { useI18n, usePageTitle } from "@/lib/i18n/I18nProvider";

export default function TrackPageClient() {
  const { dict } = useI18n();
  const t = dict.trackPage;
  usePageTitle(t.meta.title);

  return (
    <>
      <PageHeader index={t.index} kicker={t.kicker} title={t.title} lede={t.lede} />
      <Suspense>
        <TrackClient />
      </Suspense>
    </>
  );
}
