"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  SUPPORTED_LOCALES,
  DEFAULT_LOCALE,
  LOCALE_CONFIG,
  type SupportedLocale,
} from "@/config/locales";
import styles from "./LanguageSelector.module.scss";

function GlobeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg
      className={styles.chevron}
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 4.5L6 7.5L9 4.5" />
    </svg>
  );
}

/**
 * Detects the current locale from the URL path.
 * "/" → "en", "/es/forex" → "es", "/de" → "de", etc.
 */
function detectLocaleFromPath(pathname: string): SupportedLocale {
  const firstSegment = pathname.split("/").filter(Boolean)[0];
  if (firstSegment && firstSegment in LOCALE_CONFIG) {
    return firstSegment as SupportedLocale;
  }
  return DEFAULT_LOCALE;
}

/**
 * Builds a localized href by swapping the locale prefix in the current path.
 * English always maps to "/" (no prefix).
 */
function buildLocalizedHref(
  pathname: string,
  targetLocale: SupportedLocale,
): string {
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];

  // Strip current locale prefix if present
  const isCurrentLocalePrefixed =
    firstSegment && firstSegment in LOCALE_CONFIG;
  const pathSegments = isCurrentLocalePrefixed ? segments.slice(1) : segments;
  const basePath = "/" + pathSegments.join("/");

  if (targetLocale === DEFAULT_LOCALE) {
    return basePath === "/" ? "/" : basePath;
  }
  return `/${targetLocale}${basePath === "/" ? "" : basePath}`;
}

export default function LanguageSelector() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  const currentLocale = detectLocaleFromPath(pathname);
  const currentConfig = LOCALE_CONFIG[currentLocale];

  // Close dropdown on outside click
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  function handleSelect(locale: SupportedLocale) {
    const href = buildLocalizedHref(pathname, locale);
    setOpen(false);
    window.location.href = href;
  }

  return (
    <div ref={ref} className={styles.wrapper}>
      <button
        className={`${styles.trigger} ${open ? styles.triggerOpen : ""}`}
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Select language"
        aria-expanded={open}
      >
        <GlobeIcon />
        <span className={styles.regionCode}>{currentConfig.regionCode}</span>
        <ChevronIcon />
      </button>

      <div className={`${styles.dropdown} ${open ? styles.dropdownOpen : ""}`}>
        {SUPPORTED_LOCALES.map((locale) => {
          const config = LOCALE_CONFIG[locale];
          const isActive = locale === currentLocale;
          return (
            <button
              key={locale}
              className={`${styles.option} ${isActive ? styles.optionActive : ""}`}
              onClick={() => handleSelect(locale)}
            >
              <span className={styles.optionLeft}>
                <span className={styles.optionFlag}>{config.flag}</span>
                <span>{config.label}</span>
              </span>
              <span className={styles.optionNative}>{config.nativeName}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
