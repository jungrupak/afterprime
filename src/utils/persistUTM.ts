const UTM_KEYS = [
  //pass these values to typeform
  //?utm_campaign=(value of _gpfx_utm_campaign)
  "_gpfx_utm_campaign",
  "_gpfx_utm_source",
  "_gpfx_utm_medium",
  "_gpfx_utm_term",
  "_gpfx_utm_content",
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
