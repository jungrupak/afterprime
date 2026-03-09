const UTM_KEYS = [
  "_gpfx_initial_utm_campaign",
  "_gpfx_initial_utm_medium",
  "_gpfx_initial_utm_campaign",
  "_gpfx_initial_utm_term",
  "_gpfx_initial_utm_content",
  "_gpfx_utm_campaign",
  "_gpfx_utm_medium",
  "_gpfx_utm_campaign",
  "_gpfx_utm_term",
  "_gpfx_utm_content",
];

// Helper to set a cookie (expires in 30 days)
const setCookie = (name: string, value: string, days = 30) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${date.toUTCString()};path=/`;
};

// Helper to get a cookie by name
const getCookie = (name: string) => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
};

export const persistUTMs = () => {
  const params = new URLSearchParams(window.location.search);

  UTM_KEYS.forEach((key) => {
    const stored = getCookie(key);

    // if already stored, keep original attribution
    if (stored) return;

    const paramValue = params.get(key);
    setCookie(key, paramValue || "direct");
  });
};

export const getStoredUTMs = () => {
  const utms: Record<string, string> = {};

  UTM_KEYS.forEach((key) => {
    utms[key] = getCookie(key) || "direct";
  });

  return utms;
};
