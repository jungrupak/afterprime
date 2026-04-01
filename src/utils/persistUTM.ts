const UTM_KEYS = [
  "utm_campaign",
  "utm_source",
  "utm_medium",
  "utm_term",
  "utm_content"
];

// GET cookie VALUES

/*
utm_campaign = _gpfx_utm_campaign.value
utm_source = _gpfx_utm_source.value
utm_medium = _gpfx_utm_medium.value
utm_term = _gpfx_utm_term.value
utm_content = _gpfx_utm_content.value
*/
//

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
