"use client";

import { usePathname } from "next/navigation";
import {
  DEFAULT_LOCALE,
  LOCALE_CONFIG,
  type SupportedLocale,
} from "@/config/locales";

/**
 * Detects the active locale from the current URL path.
 * Returns "en" for unprefixed paths, or the matching locale code.
 */
export function useLocale(): SupportedLocale {
  const pathname = usePathname();
  const firstSegment = pathname.split("/").filter(Boolean)[0];
  if (firstSegment && firstSegment in LOCALE_CONFIG) {
    return firstSegment as SupportedLocale;
  }
  return DEFAULT_LOCALE;
}
