const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
];

// set cookie
const setCookie = (name: string, value: string, days = 30) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);

  const domain =
    window.location.hostname === "localhost"
      ? ""
      : ";domain=.afterprime.com";

  document.cookie = `${name}=${encodeURIComponent(
    value
  )};expires=${date.toUTCString()};path=/${domain}`;
};

// get cookie
const getCookie = (name: string) => {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
};

export const getStoredUTMs = () => {
  const utms: Record<string, string> = {};

  UTM_KEYS.forEach((key) => {
    const cookie = getCookie(`_gpfx_${key}`);
    utms[key] = cookie || "direct";
  });

  return utms;
};