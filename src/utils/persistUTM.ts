const UTM_COOKIE_MAP = {
  utm_campaign: "_gpfx_utm_campaign",
  utm_source: "_gpfx_utm_source",
  utm_medium: "_gpfx_utm_medium",
  utm_term: "_gpfx_utm_term",
  utm_content: "_gpfx_utm_content",
} as const;

type UTMKey = keyof typeof UTM_COOKIE_MAP;

const DEFAULT_UTM_VALUE = "direct";

const VID_COOKIE = "_ap_vid";
const VID_PARAM = "vid";

const getCookie = (cookieStore: string, name: string) => {
  const match = cookieStore.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  if (!match) return null;
  try {
    return decodeURIComponent(match[1]);
  } catch {
    return null; // malformed encoding: treat as missing
  }
};

// Cookies are populated from URL params, so anyone can stuff arbitrary text
// into them by crafting a link. Everything we forward to Typeform / the signup
// app goes through these guards: allowlisted charset, hard length cap.
const UTM_MAX_LENGTH = 100;
const UTM_DISALLOWED_CHARS = /[^a-z0-9 _.\-+/:|]/g;
const VID_PATTERN = /^[A-Za-z0-9_-]{8,64}$/;

export const sanitizeUTMValue = (value: string | null | undefined): string | null => {
  if (!value) return null;
  const clean = value
    .toLowerCase()
    .replace(UTM_DISALLOWED_CHARS, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, UTM_MAX_LENGTH);
  return clean || null;
};

export const sanitizeVisitorId = (value: string | null | undefined): string | null => {
  const v = value?.trim();
  return v && VID_PATTERN.test(v) ? v : null;
};

export const parseStoredUTMs = (cookieStore: string): Record<UTMKey, string> => {
  const utms = {} as Record<UTMKey, string>;

  (Object.entries(UTM_COOKIE_MAP) as [UTMKey, string][]).forEach(
    ([utmKey, cookieKey]) => {
      utms[utmKey] =
        sanitizeUTMValue(getCookie(cookieStore, cookieKey)) || DEFAULT_UTM_VALUE;
    },
  );

  return utms;
};

export const getStoredUTMs = (): Record<UTMKey, string> => {
  return parseStoredUTMs(document.cookie);
};

// First-party visitor ID set by https://afterprime.com/_ap/ap.js
export const getVisitorId = (): string | null =>
  sanitizeVisitorId(getCookie(document.cookie, VID_COOKIE));

// Allowlisted params for the Typeform popup URL: utm_* + vid only. Built from
// scratch so nothing else (page query string, other cookies) can leak through.
export const buildTypeformParams = (): URLSearchParams => {
  const params = new URLSearchParams();
  Object.entries(getStoredUTMs()).forEach(([key, value]) => {
    params.set(key, value);
  });
  const vid = getVisitorId();
  if (vid) params.set(VID_PARAM, vid);
  return params;
};

export const SIGNUP_APP_URL = "https://app.afterprime.com/live";

export const isSignupAppUrl = (url: string): boolean =>
  url.startsWith(SIGNUP_APP_URL);

// Adds persisted UTMs and the visitor ID to a URL. Params already present in
// the URL win; cookies only fill the gaps. "direct" placeholders are skipped
// so a direct visitor's URL is never seen as a new UTM touch by the
// destination. vid is skipped when the _ap_vid cookie is missing.
export const appendStoredUTMs = (url: string): string => {
  const target = new URL(url);
  Object.entries(getStoredUTMs()).forEach(([key, value]) => {
    if (value === DEFAULT_UTM_VALUE) return;
    if (!target.searchParams.get(key)) target.searchParams.set(key, value);
  });

  const vid = getVisitorId();
  if (vid && !target.searchParams.get(VID_PARAM)) {
    target.searchParams.set(VID_PARAM, vid);
  }

  return target.toString();
};