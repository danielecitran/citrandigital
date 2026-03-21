import type { Metadata } from "next";
import { headers } from "next/headers";

import { NotFoundPage } from "@/components/not-found-page";
import { getDictionary } from "@/lib/get-dictionary";
import {
  defaultLocale,
  isLocale,
  LOCALE_HEADER,
  type Locale,
} from "@/lib/i18n";

/** not-found.tsx erhält in der App Router oft keine params — Locale kommt von der Middleware (x-locale). */
async function localeFromRequest(
  params: Promise<{ locale: string }> | undefined
): Promise<Locale> {
  const headersList = await headers();
  const fromHeader = headersList.get(LOCALE_HEADER);
  if (fromHeader && isLocale(fromHeader)) return fromHeader;

  if (params) {
    const { locale: raw } = await params;
    if (isLocale(raw)) return raw;
  }

  return defaultLocale;
}

export async function generateMetadata({
  params,
}: {
  params?: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = await localeFromRequest(params);
  const dict = await getDictionary(locale);
  return {
    title: dict.meta.notFound.title,
    description: dict.meta.notFound.description,
  };
}

export default async function LocaleNotFound({
  params,
}: {
  params?: Promise<{ locale: string }>;
}) {
  const locale = await localeFromRequest(params);
  const dict = await getDictionary(locale);

  return <NotFoundPage locale={locale} copy={dict.notFound} />;
}
