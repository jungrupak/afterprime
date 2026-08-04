// Adding a language later = one entry here (plus confirming Weglot supports
// the pair) — no route files, components, or pipeline code change.
export const SUPPORTED_LOCALES = ["en", "es", "de", "id", "zh","cn", "tr","ar","ms"] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: SupportedLocale = "en";

export interface LocaleConfig {
  /** Weglot API language code (may differ from URL prefix). */
  weglotCode: string;
  /** Human-readable English label. */
  label: string;
  /** Native-language name (shown in the language selector dropdown). */
  nativeName: string;
  /** Two-letter uppercase country / region code for display. */
  regionCode: string;
  /** Country flag emoji. */
  flag: string;
  /** BCP 47 value for the `<html lang>` attribute (may differ from URL prefix). */
  htmlLang: string;
  /** Text direction for the `<html dir>` attribute. */
  dir: "ltr" | "rtl";
}

export const LOCALE_CONFIG: Record<SupportedLocale, LocaleConfig> = {
  en: { weglotCode: "en", label: "English", nativeName: "English", regionCode: "EN", flag: "🇬🇧", htmlLang: "en", dir: "ltr" },
  es: { weglotCode: "es", label: "Spanish", nativeName: "Español", regionCode: "ES", flag: "🇪🇸", htmlLang: "es", dir: "ltr" },
  de: { weglotCode: "de", label: "German", nativeName: "Deutsch", regionCode: "DE", flag: "🇩🇪", htmlLang: "de", dir: "ltr" },
  id: { weglotCode: "id", label: "Indonesian", nativeName: "Bahasa Indonesia", regionCode: "ID", flag: "🇮🇩", htmlLang: "id", dir: "ltr" },
  zh: { weglotCode: "zh-TW", label: "Traditional Chinese", nativeName: "繁體中文", regionCode: "ZH", flag: "🇹🇼", htmlLang: "zh", dir: "ltr" },
  cn: { weglotCode: "zh", label: "Simplified Chinese", nativeName: "简体中文", regionCode: "CN", flag: "🇨🇳", htmlLang: "zh-cn", dir: "ltr" },
  tr: { weglotCode: "tr", label: "Turkish", nativeName: "Türkçe", regionCode: "TR", flag: "🇹🇷", htmlLang: "tr", dir: "ltr" },
  ar: { weglotCode: "ar", label: "Arabic", nativeName: "العربية", regionCode: "AR", flag: "🇸🇦", htmlLang: "ar", dir: "rtl" },
  ms: { weglotCode: "ms", label: "Malay", nativeName: "Bahasa Melayu", regionCode: "MS", flag: "🇲🇾", htmlLang: "ms", dir: "ltr" },
};

/** Returns the Weglot language code for a given URL locale prefix. */
export function getWeglotCode(locale: string): string {
  if (locale in LOCALE_CONFIG) {
    return LOCALE_CONFIG[locale as SupportedLocale].weglotCode;
  }
  return locale;
}

/** Returns the display config for a locale, or undefined if not configured. */
export function getLocaleDisplay(locale: string): LocaleConfig | undefined {
  if (locale in LOCALE_CONFIG) {
    return LOCALE_CONFIG[locale as SupportedLocale];
  }
  return undefined;
}

export function isSupportedLocale(value: string): value is SupportedLocale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(value);
}

/** Returns `{ lang, dir }` for the `<html>` tag, given a URL locale prefix. */
export function getHtmlAttrs(locale: string): { lang: string; dir: "ltr" | "rtl" } {
  if (locale in LOCALE_CONFIG) {
    const { htmlLang, dir } = LOCALE_CONFIG[locale as SupportedLocale];
    return { lang: htmlLang, dir };
  }
  return { lang: DEFAULT_LOCALE, dir: "ltr" };
}
