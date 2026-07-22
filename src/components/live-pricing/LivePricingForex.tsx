"use client";
import { PricesObjects, useLivePrices } from "@/hooks/useLivePrices";
import { useState } from "react";
import styles from "./style.module.scss";
import Image from "next/image";
import Link from "next/link";
import { Loader } from "../Loading/Loading";
import { Retrying } from "../retrying/Retry";
import { Disconnected } from "../disconnected/Disconnected";
import { useLocale } from "@/lib/locale/useLocale";
import { localizeHref } from "@/lib/locale/localizeHref";
import type { LivePricingForexContent } from "./livePricingForexContent";
import { livePricingForexContent } from "./livePricingForexContent";

interface LivePricingForexProps {
  initialPrices?: PricesObjects[];
  content?: LivePricingForexContent;
}

export function LivePricingForex({
  initialPrices = [],
  content: c = livePricingForexContent,
}: LivePricingForexProps) {
  const { categories, status } = useLivePrices(initialPrices);
  const locale = useLocale();
  const [activeTabContentID, setActiveTabContentID] = useState("Popular");
  const [activeTabNav, setActiveTabNav] = useState(0);

  const pricingCatLists = [
    categories.forexMajor,
    categories.forexMinor,
    categories.forexExotic,
  ];

  const tabNavs = ["Majors", "Minors", "Exotics"];
  const hasInitialTableData = pricingCatLists.some((items) => items.length > 0);

  return (
    <div>
      <div className="w-full text-center px-6">
        <h2 className="h2-size mb-6">
          {c.headingBefore}
          <span>{c.headingHighlight}</span>
          {c.headingAfter}
        </h2>
        <p
          className="paragraph mb-20 max-md:mb-10 opacity-90"
          dangerouslySetInnerHTML={{ __html: c.description }}
        />
      </div>

      {status === "connecting" && !hasInitialTableData && <Loader />}

      {hasInitialTableData && (
        <div className={`${styles.ap_tab}`}>
          <div className={`${styles.ap_tab_nav}`}>
            {tabNavs.map((nav, index) => (
              <button
                key={index}
                className={`${index === activeTabNav ? styles.active : ""}`}
                onClick={() => {
                  setActiveTabNav(index);
                  setActiveTabContentID(tabNavs[index]);
                }}
              >
                {nav}
              </button>
            ))}
          </div>
          <div className={`${styles.ap_tab_container}`}>
            {activeTabContentID === activeTabContentID && (
              <div
                className={`${styles.livepricing_table_wrapper} ${styles.trading_hours_table}`}
              >
                <table className="">
                  <thead>
                    <tr className="">
                      <th className="px-4 py-2">{c.tableHeaders.symbol}</th>
                      <th className="px-4 py-2">{c.tableHeaders.bid}</th>
                      <th className="px-4 py-2">{c.tableHeaders.ask}</th>
                      <th className="px-4 py-2">{c.tableHeaders.spread}</th>
                      <th className="px-4 py-2">{c.tableHeaders.marketHours}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pricingCatLists[activeTabNav].map((item, index) => (
                      <tr key={index} className="">
                        <td className="px-4 py-2 " t-name="Symbol">
                          {item.group.startsWith("Forex") ? (
                            <div className={`${styles.forexIcons}`}>
                              <div className={`${styles.icon_wrap}`}>
                                <Image
                                  width={40}
                                  height={40}
                                  src={`https://cdn.afterprime.com/symbols/${item.symbol
                                    .toLowerCase()
                                    .slice(0, 3)}.svg`}
                                  alt={`${item.symbol} ${item.group}`}
                                />
                                <Image
                                  width={40}
                                  height={40}
                                  src={`https://cdn.afterprime.com/symbols/${item.symbol
                                    .toLowerCase()
                                    .slice(3)}.svg`}
                                  alt={`${item.symbol} ${item.group}`}
                                />
                              </div>
                              <a
                                href={localizeHref("/trade/" + item.symbol.toLowerCase(), locale)}
                                className={`underline decoration-dotted decoration-2 underline-offset-4`}
                              >
                                {item.symbol}
                              </a>
                            </div>
                          ) : item.group.startsWith("Stocks") ? (
                            <div className={`${styles.instrumentIcons}`}>
                              <div className={`${styles.icon_wrap}`}>
                                <Image
                                  width={40}
                                  height={40}
                                  src={`https://cdn.afterprime.com/symbols/${item.symbol
                                    .split("_")[1]
                                    .toLocaleLowerCase()}.svg`}
                                  alt={`${item.symbol} ${item.group}`}
                                />
                              </div>

                              {item.symbol}
                            </div>
                          ) : (
                            <div className={`${styles.instrumentIcons}`}>
                              <div className={`${styles.icon_wrap}`}>
                                <Image
                                  width={40}
                                  height={40}
                                  src={`https://cdn.afterprime.com/symbols/${item.symbol.toLocaleLowerCase()}.svg`}
                                  alt={`${item.symbol} ${item.group}`}
                                />
                              </div>

                              {item.symbol}
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-2 " t-name="Bid">
                          {item.bestBid}
                        </td>
                        <td className="px-4 py-2 " t-name="Ask">
                          {item.bestAsk}
                        </td>
                        <td className="px-4 py-2 " t-name="Spread">
                          {item.spread}
                        </td>
                        <td className="px-4 py-2 " t-name="Market Hours">
                          <div
                            className={`flex md:justify-end text-[16px] items-center`}
                          >
                            <Link
                              href={localizeHref(
                                "/trading-hours/" + item.symbol.toLowerCase(), locale
                              )}
                            >
                              <span className="text-[14px] underline decoration-dotted decoration-2 underline-offset-4 opacity-65">
                                {c.tableHeaders.tradingHoursLink}
                              </span>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <p className="opacity-80 mt-8">
            {c.cta1BeforeEurusd}
            <Link href={localizeHref("/trade/eurusd", locale)}>
              <u>{c.eurusdLinkText}</u>
            </Link>
            {c.cta1Comma1}
            <Link href={localizeHref("/trade/gbpusd", locale)}>
              <u>{c.gbpusdLinkText}</u>
            </Link>
            {c.cta1And}
            <Link href={localizeHref("/trade/audusd", locale)}>
              <u>{c.audusdLinkText}</u>
            </Link>
            {c.cta1Or}
            <Link href={localizeHref("/live-spreads", locale)}>
              <u>{c.liveSpreadsLinkText}</u>
            </Link>
            {c.cta1Suffix}
          </p>

          <p className="opacity-80 mt-2">
            {c.readyToComparePrefix}
            <Link href={localizeHref("/calculators/cost-savings-calculator", locale)}>
              <u>{c.calculatorLinkText}</u>
            </Link>
            {c.readyToCompareMiddle}
            <Link href={localizeHref("/vs", locale)}>
              <u>{c.compareLinkText}</u>
            </Link>
            {c.readyToCompareSuffix}
          </p>
        </div>
      )}

      {status === "disconnected" && !hasInitialTableData && <Retrying />}
      {status === "error" && !hasInitialTableData && <Disconnected />}
    </div>
  );
}
