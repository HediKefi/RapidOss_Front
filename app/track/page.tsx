import type { Metadata } from "next";
import { dictionaries } from "@/lib/i18n/dictionaries";
import { getServerLocale } from "@/lib/i18n/server";
import TrackPageClient from "./TrackPageClient";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return dictionaries[locale].trackPage.meta;
}

export default function Page() {
  return <TrackPageClient />;
}
