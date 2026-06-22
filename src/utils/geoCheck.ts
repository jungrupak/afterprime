const TRACE_URL = "https://afterprime.com/cdn-cgi/trace";
const CACHE_KEY = "ap_geo_loc";
const TARGET_COUNTRIES = ["SG", "IT", "NP","AU"];

export async function fetchGeoCountry(): Promise<string | null> {
  const cached = sessionStorage.getItem(CACHE_KEY);
  if (cached !== null) return cached || null;

  try {
    const res = await fetch(TRACE_URL);
    const text = await res.text();
    const match = text.match(/^loc=([A-Z]{2})$/m);
    const loc = match ? match[1] : null;
    sessionStorage.setItem(CACHE_KEY, loc ?? "");
    return loc;
  } catch {
    return null;
  }
}

export function isTargetGeo(loc: string | null): boolean {
  return loc !== null && TARGET_COUNTRIES.includes(loc);
}
