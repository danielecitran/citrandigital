import type { Metadata } from "next";

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
    title: dict.meta.projekte.title,
    description: dict.meta.projekte.description,
  };
}

export default async function ProjektePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return null;
  const dict = await getDictionary(raw);

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-4 px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">
        {dict.projekte.heading}
      </h1>
      <p className="text-muted-foreground">{dict.projekte.lead}</p>
    </main>
  );
}
