import WebTraderMt4Demo from "./Widget";
import { Metadata } from "next";
import { getRequestLocale } from "@/lib/locale/getRequestLocale";
import { buildHreflangMap, toOgLocale } from "@/lib/seo/metadata";
import { localizeHref } from "@/lib/locale/localizeHref";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const canonicalPath = "/webtrader-mt4-demo";
  const canonicalUrl = `https://afterprime.com${localizeHref(canonicalPath, locale)}`;

  return {
    title: "Afterprime MT4 Demo WebTrader | Practice Trading Online",
    description:
      "Open and use an Afterprime MT4 demo account in your browser. Test strategies with real market data, full MT4 functionality, and zero risk, no installation needed.",
    alternates: {
      canonical: canonicalUrl,
      languages: buildHreflangMap("webtrader-mt4-demo", canonicalPath),
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
      <WebTraderMt4Demo />
    </div>
  );
}
