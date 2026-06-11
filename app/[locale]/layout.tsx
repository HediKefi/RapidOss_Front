import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Space_Grotesk, IBM_Plex_Mono, IBM_Plex_Sans_Arabic } from "next/font/google";
import "../globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { locales, localeDir, isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const plexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-plex-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    title: dict.meta.title,
    description: dict.meta.description,
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);

  return (
    <html
      lang={locale}
      dir={localeDir[locale]}
      className={`${grotesk.variable} ${plexMono.variable} ${plexArabic.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <Nav locale={locale} dict={dict.nav} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale} dict={dict.footer} />
      </body>
    </html>
  );
}
