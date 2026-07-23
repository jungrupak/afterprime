"use client";
import { PricesObjects, useLivePrices } from "@/hooks/useLivePrices";
import { useState } from "react";
import styles from "./style.module.scss";
import Image from "next/image";
import Link from "next/link";
import { Loader } from "../Loading/Loading";
import { Disconnected } from "../disconnected/Disconnected";
import { Retrying } from "../retrying/Retry";
import { useLocale } from "@/lib/locale/useLocale";
import { localizeHref } from "@/lib/locale/localizeHref";
import type { LivePricingTradingHoursContent } from "./livePricingTradingHoursContent";
import { livePricingTradingHoursContent } from "./livePricingTradingHoursContent";

interface LivePricingTradingHoursProps {
  initialPrices?: PricesObjects[];
  content?: LivePricingTradingHoursContent;
}

export function LivePricingTradingHours({
  initialPrices = [],
  content: c = livePricingTradingHoursContent,
}: LivePricingTradingHoursProps) {
  const { categories, status } = useLivePrices(initialPrices);
  const locale = useLocale();
  const [activeTabContentID, setActiveTabContentID] = useState("Popular");
  const [activeTabNav, setActiveTabNav] = useState(0);

  const pricingCatLists = [
    categories.forex,
    categories.crypto,
    categories.commodities,
    categories.metals,
    categories.indices,
    //categories.stocks,
  ];

  const tabNavs = c.tabLabels;

  const visibleRows = pricingCatLists[activeTabNav].filter(
    (item) => !["CA60", "SA40", "NOR25", "XCUUSD"].includes(item.symbol),
  );
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
                  <caption className={`hidden`}>
                    {c.caption}
                  </caption>
                  <thead>
                    <tr className="">
                      <th scope="col" className="px-4 py-2">
                        {c.tableHeaders.symbol}
                      </th>
                      <th scope="col" className="px-4 py-2">
                        {c.tableHeaders.bid}
                      </th>
                      <th scope="col" className="px-4 py-2">
                        {c.tableHeaders.ask}
                      </th>
                      <th scope="col" className="px-4 py-2">
                        {c.tableHeaders.spread}
                      </th>
                      <th scope="col" className="px-4 py-2">
                        {c.tableHeaders.marketHours}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleRows.map((item, index) => (
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
                                href={localizeHref("/forex/" + item.symbol.toLowerCase(), locale)}
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

                              {item.symbol === "XAUUSD" ? (
                                <a
                                  href={localizeHref("/trade/xauusd", locale)}
                                  className={`underline decoration-dotted decoration-2 underline-offset-4`}
                                >
                                  {item.symbol}
                                </a>
                              ) : (
                                item.symbol
                              )}
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

                              {item.symbol === "XAUUSD" ? (
                                <a
                                  href={localizeHref("/trade/xauusd", locale)}
                                  className={`underline decoration-dotted decoration-2 underline-offset-4`}
                                >
                                  {item.symbol}
                                </a>
                              ) : (
                                item.symbol
                              )}
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
          <p className="opacity-80 mt-5">
            {c.readyToCompare.split(c.readyToCompareLinkText)[0]}
            <Link href={localizeHref("/calculators/cost-savings-calculator", locale)}>
              <u>{c.readyToCompareLinkText}</u>
            </Link>
            {c.readyToCompare.split(c.readyToCompareLinkText)[1]}
          </p>
        </div>
      )}

      {status === "disconnected" && !hasInitialTableData && <Retrying />}
      {status === "error" && !hasInitialTableData && <Disconnected />}
    </div>
  );
}
