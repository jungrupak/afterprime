const UTM_COOKIE_MAP = {
  utm_campaign: "_gpfx_utm_campaign",
  utm_source: "_gpfx_utm_source",
  utm_medium: "_gpfx_utm_medium",
  utm_term: "_gpfx_utm_term",
  utm_content: "_gpfx_utm_content",
} as const;

type UTMKey = keyof typeof UTM_COOKIE_MAP;

const DEFAULT_UTM_VALUE = "direct";

const getCookie = (cookieStore: string, name: string) => {
  const match = cookieStore.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
};

export const parseStoredUTMs = (cookieStore: string): Record<UTMKey, string> => {
  const utms = {} as Record<UTMKey, string>;

  (Object.entries(UTM_COOKIE_MAP) as [UTMKey, string][]).forEach(
    ([utmKey, cookieKey]) => {
      const cookieValue = getCookie(cookieStore, cookieKey)?.trim();
      utms[utmKey] = cookieValue || DEFAULT_UTM_VALUE;
    },
  );

  return utms;
};

export const getStoredUTMs = (): Record<UTMKey, string> => {
  return parseStoredUTMs(document.cookie);
};

export const SIGNUP_APP_URL = "https://app.afterprime.com/live";

export const isSignupAppUrl = (url: string): boolean =>
  url.startsWith(SIGNUP_APP_URL);

// Adds persisted UTMs to a URL. UTMs already present in the URL win;
// cookies only fill the gaps. "direct" placeholders are skipped so a direct
// visitor's URL is never seen as a new UTM touch by the destination.
export const appendStoredUTMs = (url: string): string => {
  const target = new URL(url);
  Object.entries(getStoredUTMs()).forEach(([key, value]) => {
    if (value === DEFAULT_UTM_VALUE) return;
    if (!target.searchParams.get(key)) target.searchParams.set(key, value);
  });
  return target.toString();
};
