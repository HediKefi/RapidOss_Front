import type { Metadata } from "next";
import { dictionaries } from "@/lib/i18n/dictionaries";
import { getServerLocale } from "@/lib/i18n/server";
import CourierPageClient from "./CourierPageClient";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return dictionaries[locale].courierPage.meta;
}

export default function Page() {
  return <CourierPageClient />;
}
