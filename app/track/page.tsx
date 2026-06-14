import type { Metadata } from "next";
import { dictionaries } from "@/lib/i18n/dictionaries";
import { defaultLocale } from "@/lib/i18n/config";
import TrackPageClient from "./TrackPageClient";

// Default-language baseline for SSR/crawlers; the client updates the
// title to the visitor's chosen language.
export const metadata: Metadata = dictionaries[defaultLocale].trackPage.meta;

export default function Page() {
  return <TrackPageClient />;
}
