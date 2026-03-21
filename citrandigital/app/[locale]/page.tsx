import type { Metadata } from "next";
import * as React from "react";

import { BackgroundPaths } from "@/components/ui/background-paths";
import { getDictionary } from "@/lib/get-dictionary";
import { isLocale, type Locale } from "@/lib/i18n";

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
    title: dict.meta.home.title,
    description: dict.meta.home.description,
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return null;
  const locale: Locale = raw;
  const dict = await getDictionary(locale);

  return (
    <BackgroundPaths
      title={dict.home.title}
      ctaLabel={dict.home.cta}
      ctaHref={`/${locale}/projekte`}
    />
  );
}
