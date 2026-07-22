import WebTraderMt4Widget from "./Widget";
import { Metadata } from "next";
import { getRequestLocale } from "@/lib/locale/getRequestLocale";
import { buildHreflangMap, toOgLocale } from "@/lib/seo/metadata";
import { localizeHref } from "@/lib/locale/localizeHref";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const canonicalPath = "/webtrader-mt4";
  const canonicalUrl = `https://afterprime.com${localizeHref(canonicalPath, locale)}`;

  return {
    title: "Afterprime MT4 Live WebTrader | Trade Live Online",
    description:
      "Access your live Afterprime MT4 account directly from your browser. Trade forex, indices, commodities, and more with real time pricing.",
    alternates: {
      canonical: canonicalUrl,
      languages: buildHreflangMap("webtrader-mt4", canonicalPath),
    },
    openGraph: {
      locale: toOgLocale(locale),
      url: canonicalUrl,
    },
  };
}

export default function Page() {
  return (
    <div className="relative" style={{ zIndex: 99 }}>
      <WebTraderMt4Widget />
    </div>
  );
}
