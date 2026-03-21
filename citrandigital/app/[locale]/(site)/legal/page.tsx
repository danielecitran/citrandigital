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
    title: dict.meta.impressum.title,
    description: dict.meta.impressum.description,
  };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return null;
  const dict = await getDictionary(raw);

  return (
    <div className="flex flex-1 flex-col bg-black">
      <main className="container mx-auto flex flex-1 flex-col items-center px-4 py-16 text-center md:px-6 md:py-24">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
          {dict.impressum.heading}
        </h1>

        <address className="mt-12 max-w-md text-base not-italic text-zinc-400">
          <p className="mb-6 leading-relaxed text-zinc-300">
            Daniele Citran
            <br />
            Pfruendhofstrasse 54
            <br />
            8910 Affoltern am Albis
          </p>
          <p className="leading-relaxed text-zinc-300">
            <a
              href="mailto:contact@citran.digital"
              className="rounded-sm underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              contact@citran.digital
            </a>
            <br />
            <a
              href="https://citran.digital"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              citran.digital
            </a>
          </p>
        </address>
      </main>
    </div>
  );
}
