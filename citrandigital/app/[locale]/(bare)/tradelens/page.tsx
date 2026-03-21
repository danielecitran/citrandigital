import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getDictionary } from "@/lib/get-dictionary";
import { isLocale, type Locale } from "@/lib/i18n";
import { TradeLensPage } from "@/components/tradelens/tradelens-page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale: Locale = raw;
  const dict = await getDictionary(locale);
  return {
    title: dict.meta.tradelens.title,
    description: dict.meta.tradelens.description,
    openGraph: {
      title: dict.meta.tradelens.title,
      description: dict.meta.tradelens.description,
      type: "website",
    },
    other: {
      "apple-itunes-app": "app-id=6753321240",
    },
  };
}

export default async function TradelensPageRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  return (
    <main style={{ flex: 1 }}>
      <TradeLensPage locale={locale} />
    </main>
  );
}
