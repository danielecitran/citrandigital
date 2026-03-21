import type { Metadata } from "next";
import { headers } from "next/headers";

import { NotFoundPage } from "@/components/not-found-page";
import { getDictionary } from "@/lib/get-dictionary";
import { defaultLocale, isLocale, LOCALE_HEADER, type Locale } from "@/lib/i18n";

async function localeForGlobalNotFound(): Promise<Locale> {
  const headersList = await headers();
  const fromHeader = headersList.get(LOCALE_HEADER);
  if (fromHeader && isLocale(fromHeader)) return fromHeader;
  return defaultLocale;
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await localeForGlobalNotFound();
  const dict = await getDictionary(locale);
  return {
    title: dict.meta.notFound.title,
    description: dict.meta.notFound.description,
  };
}

export default async function GlobalNotFound() {
  const locale = await localeForGlobalNotFound();
  const dict = await getDictionary(locale);
  return <NotFoundPage locale={locale} copy={dict.notFound} />;
}
