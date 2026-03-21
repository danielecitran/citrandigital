import type { Metadata } from "next";
import { Geist_Mono, Instrument_Sans, Plus_Jakarta_Sans } from "next/font/google";
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

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Citran Digital Solutions",
  description: "Citran Digital Solutions",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  appleWebApp: {
    capable: true,
    title: "Citran Digital",
    statusBarStyle: "black-translucent",
  },
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
      className={`${instrumentSans.variable} ${geistMono.variable} ${plusJakartaSans.variable} dark h-full antialiased`}
    >
      <body
        className={`${instrumentSans.className} min-h-full flex flex-col antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
