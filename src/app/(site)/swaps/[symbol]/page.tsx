import styles from "./Page.module.scss";
import { getSwapsData } from "@/data/getSwapData";
import { notFound } from "next/navigation";
import { useTodayDate } from "@/hooks/useTodayDate";
import SwapCalculatorInline from "./SwapCalculatorInline";
import Accordion from "@/utils/accordion/Accordion";

//####
type PageProps = {
  params: Promise<{ symbol: string }>;
};
//####

export async function generateMetadata({ params }: PageProps) {
  const { symbol } = await params;
  const instrymentData = await getSwapsData(symbol);
  if (!instrymentData) {
    return notFound();
  }
  const canonicalUrl = `https://afterprime.com/swaps/${symbol}`;
  return {
    title: `${instrymentData.description} Swap Rate - Long & Short Overnight Fee
`,

    description: `${instrymentData.symbol} swap rates at Afterprime:
              Long ${instrymentData.swapLong} ${instrymentData.currencyProfit}
              , Short ${instrymentData.swapShort} ${instrymentData.currencyProfit}
              per standard lot.`,
    alternates: {
      canonical: canonicalUrl,
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
  const instrymentData = await getSwapsData(symbol);
  if (!instrymentData) {
    return notFound();
  }
  const symbolName = instrymentData.symbol ?? undefined;
  const currencyProfit = instrymentData.currencyProfit ?? "-";
  const swapLong = instrymentData.swapLong ?? 0;
  const swapShort = instrymentData.swapShort ?? 0;
  const todayDate = useTodayDate();
  const longPerLot = swapLong * 1;
  const shortPerLot = swapShort * 1;

  const FAQ_DATA = [
    {
      question: `What is the swap rate for ${symbolName}?`,
      answer: `Afterprime's current ${symbolName} swap rates are ${swapLong} (long) and ${swapShort} (short) per standard lot per night, denominated in ${currencyProfit}.
`,
    },
    {
      question: `When is the triple swap applied to ${symbolName}?`,
      answer: `Triple swap is charged on [Wednesday/Friday] to account for the Saturday and Sunday settlement period.`,
    },
    {
      question: `How do I calculate my ${symbolName} overnight holding cost?`,
      answer: `Multiply the swap rate by your lot size and nights held. Example: 2 lots long for 3 nights = ${swapLong * 2 * 3} ${currencyProfit}.
`,
    },
    {
      question: `Does ${symbolName} have a positive or negative swap?`,
      answer: `The long swap on ${symbolName} is ${swapLong} ${currencyProfit} per lot per night — a cost on overnight buy positions.`,
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

  //forex metals = wednesday else friday

  return (
    <>
      {/* Banner Section */}
      <section
        className={`${styles.innerBannerSection} h-auto! innerpage-banner`}
      >
        <div className="ap_container_small flex items-center h-full">
          <div className="apBannerContent md:max-w-[800px]">
            <h1 className="h1-size mt-10 lg:mt-15 ">
              <span className="font-[600]">{symbolName}</span> Swap Rate
            </h1>
            <div
              className="paragraph max-lg:mx-auto lg:mt-8 opacity-80"
              style={{ fontWeight: "300" }}
            >
              {instrymentData.description} swap rates at Afterprime
              <br />
              Long{" "}
              <span className={`font-semibold`}>
                {swapLong} {currencyProfit}
              </span>
              , Short{" "}
              <span className={`font-semibold`}>
                {swapShort} {currencyProfit}
              </span>{" "}
              per standard lot. <br />
              <br />
              Calculate your overnight holding cost before you trade{" "}
              {symbolName}.
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
                  <th>Long (Buy)</th>
                  <th>Short (Sell)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Swap Rate</td>
                  <td>
                    <span className={styles.valueAccent}>{swapLong}</span>
                  </td>
                  <td>
                    <span className={styles.valueAccent}>{swapShort}</span>
                  </td>
                </tr>
                <tr>
                  <td>Per Standard Lot</td>
                  <td>
                    <span>{longPerLot}</span> {currencyProfit}
                  </td>
                  <td>
                    <span>{shortPerLot}</span> {currencyProfit}
                  </td>
                </tr>
                <tr>
                  <td>Triple Swap Day</td>
                  <td>Wednesday</td>
                  <td>Wednesday</td>
                </tr>
              </tbody>
            </table>
            <span className={`block mt-4 opacity-65`}>
              Last Updated: {todayDate}. Swap rates reflect Afterprime's raw
              interbank cost structure with zero markup.
            </span>
          </div>
          <SwapCalculatorInline
            symbol={symbolName ?? symbol}
            currencyProfit={currencyProfit}
            swapLong={swapLong}
            swapShort={swapShort}
          />

          <div className={`${styles.faq_block} mb-0! mt-10 md:mt-20`}>
            <h2 className="text-[34px] font-[700] mb-10">
              {symbolName} Swaps FAQs.
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
