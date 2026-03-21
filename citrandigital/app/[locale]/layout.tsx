import { notFound } from "next/navigation";

import { GlassScrollHeader } from "@/components/glass-scroll-header";
import { SiteFooter } from "@/components/site-footer";
import { getDictionary } from "@/lib/get-dictionary";
import { isLocale, locales, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const dict = await getDictionary(locale);

  return (
    <>
      <GlassScrollHeader
        logoHref={`/${locale}`}
        projectsHref={`/${locale}/projekte`}
        homeAriaLabel={dict.nav.homeAria}
        projectsLabel={dict.nav.projects}
      />
      <div className="flex min-h-0 flex-1 flex-col">{children}</div>
      <SiteFooter locale={locale} />
    </>
  );
}
