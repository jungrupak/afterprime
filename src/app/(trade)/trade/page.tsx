import Lists from "@/utils/lists/Lists";
import styles from "./TradePage.module.scss";
import { Metadata } from "next";
import Link from "next/link";
import { CustomMetadata } from "@/utils/CustomMetadata";
import { getRequestLocale } from "@/lib/locale/getRequestLocale";
import { getTranslatedStatic } from "@/lib/content/getTranslatedStatic";
import { localizeHref } from "@/lib/locale/localizeHref";
import { tradePageContent } from "./TradePageContent";

type FxPair = {
  symbol: string;
  url: string;
};

type FxCategory = {
  majors?: FxPair[];
  minors?: FxPair[];
  exotics?: FxPair[];
};

export async function generateMetadata() {
  const seoData = await CustomMetadata("trade");
  return seoData;
}
//##

//Export Dynamic Page Title Tags Ends####

//####
export default async function TradePage() {
  const locale = await getRequestLocale();
  const t = await getTranslatedStatic("trade-page", locale, tradePageContent);
  const { listItems, bottomLists, categoryLabels } = t;

  const STATIC_PAIRS: FxCategory[] = [
    {
      majors: [
        { symbol: "EURUSD", url: "/trade/eurusd" },
        { symbol: "GBPUSD", url: "/trade/gbpusd" },
        { symbol: "USDJPY", url: "/trade/usdjpy" },
        { symbol: "USDCHF", url: "/trade/usdchf" },
        { symbol: "USDCAD", url: "/trade/usdcad" },
        { symbol: "AUDUSD", url: "/trade/audusd" },
        { symbol: "NZDUSD", url: "/trade/nzdusd" },
      ],
    },
    {
      minors: [
        { symbol: "EURGBP", url: "/trade/eurgbp" },
        { symbol: "EURJPY", url: "/trade/eurjpy" },
        { symbol: "EURCHF", url: "/trade/eurchf" },
        { symbol: "EURAUD", url: "/trade/euraud" },
        { symbol: "EURCAD", url: "/trade/eurcad" },
        { symbol: "EURNZD", url: "/trade/eurnzd" },
        { symbol: "GBPJPY", url: "/trade/gbpjpy" },
        { symbol: "GBPCHF", url: "/trade/gbpchf" },
        { symbol: "GBPAUD", url: "/trade/gbpaud" },
        { symbol: "GBPCAD", url: "/trade/gbpcad" },
        { symbol: "GBPNZD", url: "/trade/gbpnzd" },
        { symbol: "AUDJPY", url: "/trade/audjpy" },
        { symbol: "AUDNZD", url: "/trade/audnzd" },
        { symbol: "AUDCAD", url: "/trade/audcad" },
        { symbol: "AUDCHF", url: "/trade/audchf" },
        { symbol: "NZDJPY", url: "/trade/nzdjpy" },
        { symbol: "NZDCAD", url: "/trade/nzdcad" },
        { symbol: "NZDCHF", url: "/trade/nzdchf" },
        { symbol: "CADJPY", url: "/trade/cadjpy" },
        { symbol: "CADCHF", url: "/trade/cadchf" },
        { symbol: "CHFJPY", url: "/trade/chfjpy" },
      ],
    },
    {
      exotics: [
        { symbol: "USDSGD", url: "/trade/usdsgd" },
        { symbol: "USDHKD", url: "/trade/usdhkd" },
        { symbol: "USDCNH", url: "/trade/usdcnh" },
        { symbol: "USDTHB", url: "/trade/usdthb" },
        { symbol: "USDZAR", url: "/trade/usdzar" },
        { symbol: "USDNOK", url: "/trade/usdnok" },
        { symbol: "USDSEK", url: "/trade/usdsek" },
        { symbol: "USDPLN", url: "/trade/usdpln" },
        { symbol: "USDMXN", url: "/trade/usdmxn" },
        { symbol: "USDHUF", url: "/trade/usdhuf" },
        { symbol: "USDCZK", url: "/trade/usdczk" },
        { symbol: "EURSGD", url: "/trade/eursgd" },
        { symbol: "EURHKD", url: "/trade/eurhkd" },
        { symbol: "EURNOK", url: "/trade/eurnok" },
        { symbol: "EURSEK", url: "/trade/eursek" },
        { symbol: "EURPLN", url: "/trade/eurpln" },
        { symbol: "EURHUF", url: "/trade/eurhuf" },
        { symbol: "EURMXN", url: "/trade/eurmxn" },
        { symbol: "EURZAR", url: "/trade/eurzar" },
        { symbol: "GBPSGD", url: "/trade/gbpsgd" },
        { symbol: "GBPNOK", url: "/trade/gbpnok" },
        { symbol: "GBPSEK", url: "/trade/gbpsek" },
        { symbol: "GBPPLN", url: "/trade/gbppln" },
        { symbol: "AUDSGD", url: "/trade/audsgd" },
        { symbol: "NZDSGD", url: "/trade/nzdsgd" },
        { symbol: "CHFSGD", url: "/trade/chfsgd" },
        { symbol: "SGDJPY", url: "/trade/sgdjpy" },
        { symbol: "NOKJPY", url: "/trade/nokjpy" },
        { symbol: "NOKSEK", url: "/trade/noksek" },
        { symbol: "SEKJPY", url: "/trade/sekjpy" },
      ],
    },
  ];

  return (
    <>
      {/* Banner Section */}
      <section
        className={`${styles.innerBannerSection} h-auto! compact-innerpage-banner`}
      >
        <div className="ap_container_small flex items-center h-full">
          <div className="apBannerContent">
            <h1 className="h1-size mt-10 lg:mt-15 md:max-w-[800px]">
              <span className="font-[600]">{t.heroHeading}</span>
            </h1>
            <div
              className="paragraph max-lg:mx-auto lg:mt-8 opacity-80"
              style={{ fontWeight: "300" }}
            >
              {t.heroParagraphBefore}
              <sup>TM</sup>
              {t.heroParagraphAfter}
            </div>
          </div>
        </div>
      </section>
      {/* Banner Section Ends */}

      {/* INtro sectio */}
      <section className="compact-section">
        <div className="ap_container_small">
          <h2>{t.pricingHeading}</h2>
          <Lists bulletStyle="arrow_blue" items={listItems} />
        </div>
      </section>
      {/* INtro sectio Ends */}

      {/* FX Pairs sectio */}
      <section className="compact-section">
        <div className="ap_container_small">
          <h2>{t.pairsHeading}</h2>
          <div>
            <div className={`${styles.instumentLists}`}>
              <div className="">
                {STATIC_PAIRS.map((group, groupIndex) => {
                  const entries = Object.entries(group) as [
                    keyof FxCategory,
                    FxPair[],
                  ][];

                  return entries.map(([categoryName, pairs]) => (
                    <div
                      key={`${categoryName}-${groupIndex}`}
                      className={`mb-8 ${styles.listParent}`}
                    >
                      <h4 className={`font-bold text-[28px] mb-2 md:mb-4`}>
                        {categoryLabels[categoryName].toUpperCase()}
                      </h4>

                      <ul>
                        {pairs.map((pair) => (
                          <li key={pair.symbol}>
                            <Link href={localizeHref(pair.url, locale)}>{pair.symbol}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ));
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* INtro sectio Ends */}

      {/* Bottom section */}
      <section className="compact-section">
        <div className="ap_container_small">
          <h2>{t.compareHeading}</h2>
          <p className={`paragraph`}>{t.compareIntro}</p>
          <p className={`paragraph mt-4 md:mt-8`}>{t.publishesLabel}</p>
          <Lists
            customClass="mt-4 md:mt-8"
            bulletStyle="arrow_blue"
            items={bottomLists}
          />
          <p className={`paragraph mt-4 md:mt-8`}>{t.compareOutro}</p>
        </div>
      </section>
      {/* INtro sectio Ends */}
    </>
  );
}
