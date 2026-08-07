"use client";
import { PricesObjects, useLivePrices } from "@/hooks/useLivePrices";
import { useMemo } from "react";
import Link from "next/link";
import styles from "./style.module.scss";
import Image from "next/image";
import { Loader } from "../Loading/Loading";
import { Retrying } from "../retrying/Retry";
import { Disconnected } from "../disconnected/Disconnected";
import { useLocale } from "@/lib/locale/useLocale";
import { localizeHref } from "@/lib/locale/localizeHref";
import type { LivePricingStocksContent } from "./livePricingStocksContent";
import { livePricingStocksContent } from "./livePricingStocksContent";
import { useMarketStatus } from "@/hooks/useMarketStatus";

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

interface LivePricingStocksProps {
  initialPrices?: PricesObjects[];
  content?: LivePricingStocksContent;
}

export function LivePricingStocks({
  initialPrices = [],
  content: c = livePricingStocksContent,
}: LivePricingStocksProps) {
  const locale = useLocale();
  const { categories, status } = useLivePrices(initialPrices);
  const pricingCatLists = [categories.stocks];
  const visibleRows = pricingCatLists[0];
  const visibleSymbols = useMemo(
    () => visibleRows.map((item: any) => item.symbol),
    [visibleRows],
  );
  const { getStatus } = useMarketStatus(visibleSymbols, c.marketStatus);
  const hasInitialTableData = pricingCatLists.some((items) => items.length > 0);

  return (
    <div>
      <div className="w-full text-left max-md:px-6">
        <h2 className="h2-size mb-6">
          {c.headingBefore}
          <span>{c.headingHighlight}</span>
          {c.headingAfter}
        </h2>
        <p
          className="paragraph max-w-2xl mx-auto mb-20 max-md:mb-10 opacity-90"
          dangerouslySetInnerHTML={{ __html: c.description }}
        />
      </div>

      {status === "connecting" && !hasInitialTableData && <Loader />}

      {hasInitialTableData && (
        <div className={`${styles.ap_tab}`}>
          <div className={`${styles.ap_tab_container}`}>
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
                    <th className="px-4 py-2">{c.tableHeaders.marketStatus}</th>
                    <th className="px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {visibleRows.map((item, index) => (
                    <tr key={index} className="">
                      <td className="px-4 py-2 " t-name="Symbol">
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
                      </td>
                      <td className="px-4 py-2 " t-name="Bid">
                        {item.bestBid}
                      </td>
                      <td className="px-4 py-2 " t-name="Ask">
                        {item.bestAsk}
                      </td>
                      <td className="px-4 py-2 " t-name="Spread">
                        <div className={`max-md:opacity-50`}>{item.spread}</div>
                      </td>
                      <td className="px-4 py-2" t-name="Status">
                        {(() => {
                          const marketStatus = getStatus(item.symbol);
                          const statusStyles = {
                            open: "bg-[rgba(34,197,94,0.12)] text-[#22C55E]",
                            break: "bg-[rgba(245,158,11,0.12)] text-[#F59E0B]",
                            closed: "bg-[rgba(255,48,29,0.12)] text-[#FF301D]",
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
                        <div
                          className={`flex md:justify-end text-[length:var(--font-size-note)] items-center`}
                        >
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
          </div>
        </div>
      )}

      {status === "disconnected" && !hasInitialTableData && <Retrying />}
      {status === "error" && !hasInitialTableData && <Disconnected />}
    </div>
  );
}
