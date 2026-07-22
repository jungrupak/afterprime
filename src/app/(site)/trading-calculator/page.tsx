import type { Metadata } from "next";
import TradingCalculatorClient from "@/components/trading-calculator-client/TradingCalculatorClient";
import { getRequestLocale } from "@/lib/locale/getRequestLocale";
import { getTranslatedStatic } from "@/lib/content/getTranslatedStatic";
import { tradingCalculatorClientContent } from "@/components/trading-calculator-client/TradingCalculatorClientContent";
import { tradingProfitCalculatorContent } from "@/components/trading-calculator/tradingProfitCalculatorContent";
import { buildHreflangMap, toOgLocale } from "@/lib/seo/metadata";
import { localizeHref } from "@/lib/locale/localizeHref";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const canonicalPath = "/trading-calculator";
  const canonicalUrl = `https://afterprime.com${localizeHref(canonicalPath, locale)}`;

  const title =
    locale === "en"
      ? "Afterprime | Get Paid to Trade"
      : "Afterprime | Obtén Pagos por Operar";
  const description =
    locale === "en"
      ? "Lowest costs, transparent execution, shared rewards. Value you won't find anywhere else."
      : "Los costos más bajos, ejecución transparente, recompensas compartidas. Valor que no encontrarás en ningún otro lugar.";

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: buildHreflangMap("trading-calculator", canonicalPath),
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      locale: toOgLocale(locale),
    },
  };
}

export default async function Page() {
  const locale = await getRequestLocale();
  const [content, formContent] = await Promise.all([
    getTranslatedStatic(
      "trading-calculator-client-shell",
      locale,
      tradingCalculatorClientContent,
    ),
    getTranslatedStatic(
      "trading-profit-calculator",
      locale,
      tradingProfitCalculatorContent,
    ),
  ]);

  return (
    <TradingCalculatorClient content={content} formContent={formContent} />
  );
}
