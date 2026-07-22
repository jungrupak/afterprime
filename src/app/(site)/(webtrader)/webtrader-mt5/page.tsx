import { redirect } from "next/navigation";
import { Metadata } from "next";
import { getRequestLocale } from "@/lib/locale/getRequestLocale";
import { buildHreflangMap, toOgLocale } from "@/lib/seo/metadata";
import { localizeHref } from "@/lib/locale/localizeHref";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const canonicalPath = "/webtrader-mt5";
  const canonicalUrl = `https://afterprime.com${localizeHref(canonicalPath, locale)}`;

  return {
    title: "Afterprime MT5 WebTrader | Advanced Trading Platform",
    description:
      "Trade on Afterprime MT5 WebTrader with powerful charting, fast execution, and expanded market access.",
    alternates: {
      canonical: canonicalUrl,
      languages: buildHreflangMap("webtrader-mt5", canonicalPath),
    },
    openGraph: {
      locale: toOgLocale(locale),
      url: canonicalUrl,
    },
  };
}

export default function Page() {
  redirect("https://mt5web.afterprime.io/terminal");
}
