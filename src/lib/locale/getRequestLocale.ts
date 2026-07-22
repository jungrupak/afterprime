import { headers } from "next/headers";
import { DEFAULT_LOCALE } from "@/config/locales";

// Reads the locale that proxy.ts attached to the request (see x-locale
// header set on the rewritten request for /es/... URLs). Next.js's
// dynamic APIs are async, so this must be awaited in Server Components.
export async function getRequestLocale(): Promise<string> {
  const h = await headers();
  return h.get("x-locale") ?? DEFAULT_LOCALE;
}
