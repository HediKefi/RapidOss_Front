import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Mono, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { defaultLocale } from "@/lib/i18n/config";
import { dictionaries } from "@/lib/i18n/dictionaries";
import { I18nProvider } from "@/lib/i18n/I18nProvider";

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

// Default (French) metadata for the SSR/crawler baseline; the document
// title is updated client-side per page and per chosen language.
export const metadata: Metadata = {
  title: dictionaries[defaultLocale].meta.title,
  description: dictionaries[defaultLocale].meta.description,
};

// Restore theme + language direction before first paint to avoid a flash.
const BOOT_SCRIPT = `try{
if(localStorage.getItem('theme')==='light')document.documentElement.dataset.theme='light';
var l=localStorage.getItem('locale');
if(l==='ar'){document.documentElement.lang='ar';document.documentElement.dir='rtl';}
else if(l==='en'||l==='fr'){document.documentElement.lang=l;}
}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={defaultLocale}
      dir="ltr"
      className={`${grotesk.variable} ${plexMono.variable} ${plexArabic.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }} />
      </head>
      <body className="flex min-h-full flex-col">
        <I18nProvider>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
