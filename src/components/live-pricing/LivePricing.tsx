"use client";
import { PricesObjects, useLivePrices } from "@/hooks/useLivePrices";
import { useState, useMemo } from "react";
import styles from "./style.module.scss";
import Image from "next/image";
import Link from "next/link";
import { Loader } from "../Loading/Loading";
import { Disconnected } from "../disconnected/Disconnected";
import { Retrying } from "../retrying/Retry";
import { useLocale } from "@/lib/locale/useLocale";
import { localizeHref } from "@/lib/locale/localizeHref";
import type { LivePricingContent } from "./livePricingContent";
import { livePricingContent } from "./livePricingContent";
import { useMarketStatus } from "@/hooks/useMarketStatus";

interface LivePricingAllProps {
  initialPrices?: PricesObjects[];
  content?: LivePricingContent;
}

function TradeArrowIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block shrink-0"
    >
      <path
        d="M11 0.5C16.799 0.5 21.5 5.20101 21.5 11C21.5 16.799 16.799 21.5 11 21.5C5.20101 21.5 0.5 16.799 0.5 11C0.5 5.20101 5.20101 0.5 11 0.5ZM10.6074 8.35352L12.3945 10.1406H7V11.1406H12.3945L10.6074 12.9277L11.3145 13.6348L14.3086 10.6406L11.3145 7.64648L10.6074 8.35352Z"
        stroke="#9999A1"
      />
    </svg>
  );
}

export function LivePricingAll({
  initialPrices = [],
  content: c = livePricingContent,
}: LivePricingAllProps) {
  const { categories, status } = useLivePrices(initialPrices);
  const locale = useLocale();
  const [activeTabContentID, setActiveTabContentID] = useState("Popular");
  const [activeTabNav, setActiveTabNav] = useState(0);

  const pricingCatLists = [
    categories.popular,
    categories.forex,
    categories.crypto,
    categories.commodities,
    categories.metals,
    categories.indices,
    //categories.stocks,
  ];

  const tabNavs = c.tabLabels;

  // Index-based — order must match pricingCatLists in this file
  const tabIcons = [
    "/img/icons/icon-popular.svg",
    "/img/icons/icon-forex.svg",
    "/img/icons/icon-crypto.svg",
    "/img/icons/icon-commo.svg",
    "/img/icons/icon-metals.svg",
    "/img/icons/icon-indices.svg",
  ];

  const visibleRows = pricingCatLists[activeTabNav].filter(
    (item) => !["CA60", "SA40", "NOR25"].includes(item.symbol),
  );

  // Get all visible symbols for market status lookup
  const visibleSymbols = useMemo(
    () => visibleRows.map((item) => item.symbol),
    [visibleRows],
  );

  const { getStatus } = useMarketStatus(visibleSymbols, c.marketStatus);
  const hasInitialTableData = pricingCatLists.some((items) => items.length > 0);

  return (
    <div>
      <div className="w-full">
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
                {tabIcons[index] && (
                  <Image
                    src={tabIcons[index]}
                    alt={nav}
                    width={14}
                    height={14}
                    className="inline-block me-2"
                  />
                )}
                {nav}
              </button>
            ))}
            <Link
              href={localizeHref("/vs", locale)}
              className={styles.decent_ghost_btn}
            >
              {c.compareTradingCost}
            </Link>
          </div>

          <div className={`${styles.ap_tab_container}`}>
            {activeTabContentID === activeTabContentID && (
              <div
                className={`${styles.livepricing_table_wrapper} ${styles.trading_hours_table}`}
              >
                <table className="">
                  <caption className={`hidden`}>{c.caption}</caption>
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
                        {c.tableHeaders.marketStatus}
                      </th>
                      <th scope="col" className="px-4 py-2"></th>
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
                                href={localizeHref(
                                  "/forex/" + item.symbol.toLowerCase(),
                                  locale,
                                )}
                                className={`underline decoration-dotted decoration-2 underline-offset-4`}
                              >
                                {item.symbol}
                              </a>
                              <TradeArrowIcon />
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
                                <>
                                  <a
                                    href={localizeHref("/trade/xauusd", locale)}
                                    className={`underline decoration-dotted decoration-2 underline-offset-4`}
                                  >
                                    {item.symbol}
                                  </a>
                                  <TradeArrowIcon />
                                </>
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
                                <>
                                  <a
                                    href={localizeHref("/trade/xauusd", locale)}
                                    className={`underline decoration-dotted decoration-2 underline-offset-4`}
                                  >
                                    {item.symbol}
                                  </a>
                                  <TradeArrowIcon />
                                </>
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
                          <div className={`max-md:opacity-50`}>
                            {item.spread}
                          </div>
                        </td>
                        <td className="px-4 py-2" t-name="Status">
                          {(() => {
                            const marketStatus = getStatus(item.symbol);
                            const statusStyles = {
                              open: "bg-[rgba(34,197,94,0.12)] text-[#22C55E]",
                              break:
                                "bg-[rgba(245,158,11,0.12)] text-[#F59E0B]",
                              closed:
                                "bg-[rgba(255,48,29,0.12)] text-[#FF301D]",
                            };
                            return (
                              <span
                                className={`inline-flex items-center px-2.5 py-1 rounded-full text-[length:var(--font-size-tiny)] font-medium ${statusStyles[marketStatus.state]}`}
                              >
                                {marketStatus.label}
                              </span>
                            );
                          })()}
                        </td>
                        <td className="px-4 py-2 " t-name="Market Hours">
                          <div className={`flex md:justify-end text-[length:var(--font-size-note)] items-center`}>
                            <Link
                              href={localizeHref(
                                "/trading-hours/" + item.symbol.toLowerCase(),
                                locale,
                              )}
                            >
                              <span className="text-[length:var(--font-size-note)] underline decoration-dotted decoration-2 underline-offset-4 opacity-65">
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
            <Link
              href={localizeHref(
                "/calculators/cost-savings-calculator",
                locale,
              )}
            >
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
