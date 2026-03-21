import type { Metadata } from "next";
import { Geist_Mono, Instrument_Sans } from "next/font/google";
import { headers } from "next/headers";

import { LOCALE_HEADER, defaultLocale, isLocale } from "@/lib/i18n";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-instrument-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Citran Digital Solutions",
  description: "Citran Digital Solutions",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const raw = headersList.get(LOCALE_HEADER);
  const lang = raw && isLocale(raw) ? raw : defaultLocale;

  return (
    <html
      lang={lang}
      className={`${instrumentSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body
        className={`${instrumentSans.className} min-h-full flex flex-col antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
