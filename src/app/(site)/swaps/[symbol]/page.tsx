import styles from "./Page.module.scss";
import { getSwapsData } from "@/data/getSwapData";
import { notFound } from "next/navigation";
import { useTodayDate } from "@/hooks/useTodayDate";
import SwapCalculatorInline from "./SwapCalculatorInline";
import Accordion from "@/utils/accordion/Accordion";
import Link from "next/link";
import { getRequestLocale } from "@/lib/locale/getRequestLocale";
import { getTranslatedStatic } from "@/lib/content/getTranslatedStatic";
import { swapCalculatorInlineContent } from "./SwapCalculatorInlineContent";
import { swapFaqContent } from "./SwapFaqContent";
import { swapPageContent } from "./swapPageContent";
import { buildHreflangMap, toOgLocale } from "@/lib/seo/metadata";
import { localizeHref } from "@/lib/locale/localizeHref";

//####
type PageProps = {
  params: Promise<{ symbol: string }>;
};
//####

export async function generateMetadata({ params }: PageProps) {
  const { symbol } = await params;
  const locale = await getRequestLocale();
  const instrymentData = await getSwapsData(symbol);
  if (!instrymentData) {
    return notFound();
  }
  const canonicalPath = `/swaps/${symbol}`;
  const canonicalUrl = `https://afterprime.com${localizeHref(canonicalPath, locale)}`;
  return {
    title: `${instrymentData.description} Swap Rate - Long & Short Overnight Fee`,

    description: `${instrymentData.symbol} swap rates at Afterprime:
              Long ${instrymentData.swapLong} ${instrymentData.currencyProfit}
              , Short ${instrymentData.swapShort} ${instrymentData.currencyProfit}
              per standard lot.`,
    alternates: {
      canonical: canonicalUrl,
      languages: buildHreflangMap(symbol, canonicalPath),
    },
    openGraph: {
      locale: toOgLocale(locale),
      url: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
      maxImagePreview: "large",
    },
  };
}

//####
export default async function Page({ params }: PageProps) {
  const { symbol } = await params;
  const locale = await getRequestLocale();
  const instrymentData = await getSwapsData(symbol);
  if (!instrymentData) {
    return notFound();
  }
  const swapCalculatorInlineT = await getTranslatedStatic(
    "swap-calculator-inline",
    locale,
    swapCalculatorInlineContent,
  );
  const swapFaqT = await getTranslatedStatic("swap-faq", locale, swapFaqContent);
  const swapPageT = await getTranslatedStatic(
    "swap-page",
    locale,
    swapPageContent,
  );
  const symbolName = instrymentData.symbol ?? undefined;
  const assetClass = instrymentData.path ?? undefined;
  const symbolCategory = assetClass.split("\\")[0];
  const currencyProfit = instrymentData.currencyProfit ?? "-";
  const swapLong = instrymentData.swapLong ?? 0;
  const swapShort = instrymentData.swapShort ?? 0;
  const todayDate = useTodayDate();
  const longPerLot = swapLong * 1;
  const shortPerLot = swapShort * 1;

  const symUpper = symbolName.toUpperCase();
  const exampleCost = swapLong * 2 * 3;

  const FAQ_DATA = [
    {
      question: swapFaqT.q1.replace("{symbol}", symUpper),
      answer: swapFaqT.a1
        .replace(/{symbol}/g, symUpper)
        .replace("{swapLong}", String(swapLong))
        .replace("{swapShort}", String(swapShort))
        .replace("{currencyProfit}", currencyProfit),
    },
    {
      question: swapFaqT.q2.replace("{symbol}", symUpper),
      answer: swapFaqT.a2,
    },
    {
      question: swapFaqT.q3.replace("{symbol}", symUpper),
      answer: swapFaqT.a3
        .replace("{exampleCost}", String(exampleCost))
        .replace("{currencyProfit}", currencyProfit),
    },
    {
      question: swapFaqT.q4.replace("{symbol}", symUpper),
      answer: swapFaqT.a4
        .replace("{symbol}", symUpper)
        .replace("{swapLong}", String(swapLong))
        .replace("{currencyProfit}", currencyProfit),
    },
  ];

  //Faq Schema
  const FAQ_SCHEMA = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_DATA.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      {/* Banner Section */}
      <section
        className={`${styles.innerBannerSection} h-auto! compact-innerpage-banner`}
      >
        <div className="ap_container_small flex items-center h-full">
          <div className="apBannerContent md:max-w-[800px]">
            <h1 className="h1-size mt-10 lg:mt-15 ">
              <span className="font-[600]">{symbolName.toUpperCase()}</span>{" "}
              {swapPageT.h1Suffix}
            </h1>
            <div
              className="paragraph max-lg:mx-auto lg:mt-8 opacity-80"
              style={{ fontWeight: "300" }}
            >
              {instrymentData.description} {swapPageT.sublineSuffix}
              <br />
              {swapPageT.sublineLong}{" "}
              <span className={`font-semibold`}>
                {swapLong} {currencyProfit}
              </span>
              , {swapPageT.sublineShort}{" "}
              <span className={`font-semibold`}>
                {swapShort} {currencyProfit}
              </span>{" "}
              {swapPageT.sublinePerLot} <br />
              <br />
              {swapPageT.sublineCta}{" "}
              {symbolName.toUpperCase()}.
            </div>
          </div>
        </div>
      </section>
      {/* Banner Section Ends */}

      {/* Table Section */}
      <section className="compact-section">
        <div className="ap_container_small">
          <div
            className={`genericTable table-wrapper ${styles.swapTableSection}`}
          >
            <table>
              <thead>
                <tr>
                  <th aria-hidden="true"></th>
                  <th>{swapPageT.colLongBuy}</th>
                  <th>{swapPageT.colShortSell}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{swapPageT.rowSwapRate}</td>
                  <td>
                    <span className={styles.valueAccent}>{swapLong}</span>
                  </td>
                  <td>
                    <span className={styles.valueAccent}>{swapShort}</span>
                  </td>
                </tr>
                <tr>
                  <td>{swapPageT.rowPerStandardLot}</td>
                  <td>
                    <span>{longPerLot}</span> {currencyProfit}
                  </td>
                  <td>
                    <span>{shortPerLot}</span> {currencyProfit}
                  </td>
                </tr>
                <tr>
                  <td>{swapPageT.rowTripleSwapDay}</td>
                  <td>
                    {["Forex", "Metals"].includes(symbolCategory)
                      ? swapPageT.dayWednesday
                      : swapPageT.dayFriday}
                  </td>
                  <td>
                    {["Forex", "Metals"].includes(symbolCategory)
                      ? swapPageT.dayWednesday
                      : swapPageT.dayFriday}
                  </td>
                </tr>
              </tbody>
            </table>
            <span className={`block mt-4 opacity-65`}>
              {swapPageT.lastUpdatedPrefix} {todayDate}. {swapPageT.lastUpdatedSuffix}
            </span>
          </div>
          <SwapCalculatorInline
            symbol={symbolName ?? symbol}
            currencyProfit={currencyProfit}
            swapLong={swapLong}
            swapShort={swapShort}
            content={swapCalculatorInlineT}
          />

          <div className="flex flex-wrap gap-3 mt-5 md:mt-10">
            <Link
              href={localizeHref(`/forex/${symbolName.toLowerCase()}`, locale)}
              className="rounded-full px-5 py-2 text-sm border transition-opacity hover:opacity-100 opacity-70"
              style={{ borderColor: "rgba(255,255,255,0.15)" }}
            >
              {symbolName.toUpperCase()} {swapPageT.specificationsLinkText} {""} →
            </Link>

            <Link
              href={localizeHref(`/trading-hours/${symbolName.toLowerCase()}`, locale)}
              className="rounded-full px-5 py-2 text-sm border transition-opacity hover:opacity-100 opacity-70"
              style={{ borderColor: "rgba(255,255,255,0.15)" }}
            >
              {symbolName.toUpperCase()} {swapPageT.tradingHoursLinkText} {""}→
            </Link>
          </div>

          <div className={`${styles.faq_block} mb-0! mt-10 md:mt-20`}>
            <h2 className="text-[34px] font-[700] mb-10">
              {symbolName.toUpperCase()} {swapPageT.faqHeading}
            </h2>
            <Accordion faqObjects={FAQ_DATA} />
          </div>
          {/*  */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(FAQ_SCHEMA),
            }}
          />
        </div>
      </section>
      {/* INtro sectio Ends */}
    </>
  );
}
