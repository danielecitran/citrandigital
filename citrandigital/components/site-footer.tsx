import Link from "next/link";
import * as React from "react";

import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/lib/i18n";

const CONTACT_EMAIL = "contact@citran.digital";

export async function SiteFooter({ locale }: { locale: Locale }) {
  const year = new Date().getFullYear();
  const dict = await getDictionary(locale);

  return (
    <footer
      className="mt-auto border-t border-zinc-800/80 bg-black text-zinc-400"
      role="contentinfo"
    >
      <div className="container mx-auto max-w-5xl px-4 py-14 md:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          <div className="space-y-3">
            <p className="text-base font-semibold tracking-tight text-white">
              {dict.footer.brandTitle}
            </p>
            <p className="max-w-sm text-sm leading-relaxed text-zinc-400">
              {dict.footer.brandTagline}
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-base font-semibold tracking-tight text-white">
              {dict.footer.legalHeading}
            </p>
            <nav aria-label={dict.footer.legalNavAria}>
              <ul className="flex flex-col gap-2 text-sm">
                <li>
                  <Link
                    href={`/${locale}/legal`}
                    className="rounded-sm text-zinc-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  >
                    {dict.footer.impressum}
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="space-y-3">
            <p className="text-base font-semibold tracking-tight text-white">
              {dict.footer.contactHeading}
            </p>
            <p className="text-sm leading-relaxed text-zinc-400">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="rounded-sm transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-zinc-800 pt-8 text-center text-xs text-zinc-500">
          {dict.footer.copyright.replace("{year}", String(year))}
        </div>
      </div>
    </footer>
  );
}
