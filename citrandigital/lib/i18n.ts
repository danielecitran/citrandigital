/** Request-Header, den die Middleware setzt; Root-Layout liest `lang` daraus. */
export const LOCALE_HEADER = "x-locale";

export const locales = ["de", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * Browser sendet Accept-Language (z. B. "de-CH,de;q=0.9,en;q=0.8").
 * Alles mit Präfix "de" → Deutsch, sonst Englisch.
 */
export function negotiateLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return defaultLocale;

  const parts = acceptLanguage.split(",").map((part) => {
    const [rawTag, qPart] = part.trim().split(";q=");
    const tag = rawTag.trim().toLowerCase();
    const q = qPart ? Number.parseFloat(qPart) : 1;
    return { tag, q: Number.isFinite(q) ? q : 0 };
  });

  parts.sort((a, b) => b.q - a.q);

  for (const { tag } of parts) {
    if (tag === "de" || tag.startsWith("de-")) return "de";
  }

  return "en";
}
