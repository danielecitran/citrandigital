import type { Locale } from "@/lib/i18n";
import de from "@/messages/de.json";
import en from "@/messages/en.json";

const dictionaries = {
  de,
  en,
} as const;

export type Dictionary = typeof de;

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale];
}
