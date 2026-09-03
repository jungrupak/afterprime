"use client";
import { PricesObjects, useLivePrices } from "@/hooks/useLivePrices";
import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./style.module.scss";
import Image from "next/image";
import { Loader } from "../Loading/Loading";
import { Disconnected } from "../disconnected/Disconnected";
import { Retrying } from "../retrying/Retry";
import { useLocale } from "@/lib/locale/useLocale";
import { localizeHref } from "@/lib/locale/localizeHref";
import { useMarketStatus } from "@/hooks/useMarketStatus";
import type { InstrumentSpecLite } from "@/lib/getAllInstrumentSpecs";
import { buildInstrumentSpecMap, calcSpread } from "@/lib/calcSpread";
import type { LivePricingMetalsContent } from "./livePricingMetalsContent";
import { livePricingMetalsContent } from "./livePricingMetalsContent";

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

interface LivePricingMetalsProps {
  initialPrices?: PricesObjects[];
  instrumentSpecs?: InstrumentSpecLite[];
  content?: LivePricingMetalsContent;
}

// Gold instruments are any XAU-quoted pair (XAUUSD, XAUEUR, XAUGBP, XAUAUD, etc.)
const isGoldSymbol = (symbol: string) => symbol.toUpperCase().startsWith("XAU");

export function LivePricingMetals({
  initialPrices = [],
  instrumentSpecs: specs = [],
  content: c = livePricingMetalsContent,
}: LivePricingMetalsProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const { prices, categories, status } = useLivePrices(initialPrices);
  const instrumentSpecs = useMemo(() => buildInstrumentSpecMap(specs), [specs]);
  const [activeTabContentID, setActiveTabContentID] = useState("Popular");
  const [activeTabNav, setActiveTabNav] = useState(0);
  const isGoldPage = pathname?.includes("/gold") ?? false;
  // Override the heading suffix on gold pages, content object itself stays generic
  const headingAfter = isGoldPage ? " Gold Pricing" : c.headingAfter;
  const descriptionAfter = isGoldPage ? "Zero commissions. A-Book execution across all gold pairs." : c.description;
  const metalsRows = useMemo(() => {
  return isGoldPage
    ? categories.metals.filter((item: any) => isGoldSymbol(item.symbol))
    : categories.metals;
  }, [categories.metals, isGoldPage])

  const pricingCatLists = [metalsRows];

  const tabNavs = ["Metals"];

  // Tick coloring — mirrors LivePricingAll (LivePricing.tsx): green on an
  // up-tick, red on a down-tick, holds the last direction on no change.
  type TickDirection = "up" | "down" | null;
  type TickSnapshot = {
    bid: number;
    ask: number;
    bidDir: TickDirection;
    askDir: TickDirection;
  };
  const prevTickRef = useRef<Record<string, TickSnapshot>>({});
  const tickDirections = useMemo(() => {
    const dirs: Record<string, { bid: TickDirection; ask: TickDirection }> =
      {};
    for (const item of prices) {
      const prev = prevTickRef.current[item.symbol];
      const bidDir: TickDirection = !prev
        ? null
        : item.bestBid > prev.bid
          ? "up"
          : item.bestBid < prev.bid
            ? "down"
            : prev.bidDir;
      const askDir: TickDirection = !prev
        ? null
        : item.bestAsk > prev.ask
          ? "up"
          : item.bestAsk < prev.ask
            ? "down"
            : prev.askDir;
      dirs[item.symbol] = { bid: bidDir, ask: askDir };
    }
    return dirs;
  }, [prices]);

  useEffect(() => {
    const snapshot: Record<string, TickSnapshot> = {};
    for (const item of prices) {
      const dir = tickDirections[item.symbol];
      snapshot[item.symbol] = {
        bid: item.bestBid,
        ask: item.bestAsk,
        bidDir: dir?.bid ?? null,
        askDir: dir?.ask ?? null,
      };
    }
    prevTickRef.current = snapshot;
  }, [prices, tickDirections]);

  const tickColorClass = (direction: TickDirection) =>
    direction === "up"
      ? "text-[#22C55E]"
      : direction === "down"
        ? "text-[var(--vermillion)]"
        : "";

  const visibleRows = pricingCatLists[activeTabNav];
  const visibleSymbols = useMemo(
    () => visibleRows.map((item: any) => item.symbol),
    [visibleRows],
  );
  const { getStatus } = useMarketStatus(visibleSymbols, c.marketStatus);

  const hasInitialTableData = pricingCatLists.some((items) => items.length > 0);

  return (
    <div>
      <div className="w-full text-left max-md:px-6">
        <h2 className="font-size-heading-md mb-4 md:mb-6 font-semibold">
          {c.headingBefore}
          {c.headingHighlight}
          {headingAfter}
        </h2>
        <p
          className="reading-text-md mb-8 md:mb-12"
          dangerouslySetInnerHTML={{ __html: descriptionAfter }}
        />
      </div>

      {status === "connecting" && !hasInitialTableData && <Loader />}

      {hasInitialTableData && (
        <div className={`${styles.ap_tab}`}>
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
                      <th className="px-4 py-2">
                        {c.tableHeaders.marketStatus}
                      </th>
                      <th className="px-4 py-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {pricingCatLists[activeTabNav].map((item, index) => (
                      <tr key={index} className="">
                        <td className="px-4 py-2 " t-name="Symbol">
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
                                  href={localizeHref("/metals/xauusd", locale)}
                                  className={`underline decoration-dotted decoration-2 underline-offset-4`}
                                >
                                  {item.symbol}
                                </a>
                                <TradeArrowIcon />
                                <Link
                                  href={localizeHref(
                                    "/trade/xauusd#sectionSpec",
                                    locale,
                                  )}
                                  className={styles.specsLink}
                                >
                                  {c.tableHeaders.specsLink}
                                </Link>
                              </>
                            ) : (
                              item.symbol
                            )}
                          </div>
                        </td>
                        <td
                          className={`px-4 py-2 ${tickColorClass(tickDirections[item.symbol]?.bid ?? null)}`}
                          t-name="Bid"
                        >
                          {item.bestBid}
                        </td>
                        <td
                          className={`px-4 py-2 ${tickColorClass(tickDirections[item.symbol]?.ask ?? null)}`}
                          t-name="Ask"
                        >
                          {item.bestAsk}
                        </td>
                        <td className="px-4 py-2 " t-name="Spread">
                          <div className="max-md:opacity-50">
                            {calcSpread(
                              item.bestBid,
                              item.bestAsk,
                              item.symbol,
                              item.group,
                              instrumentSpecs,
                            )}
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
                                className={`inline-flex items-center px-2.5 py-1 rounded-xs text-[length:var(--font-size-tiny)] font-medium ${statusStyles[marketStatus.state]}`}
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
            )}
          </div>
        </div>
      )}

      {status === "disconnected" && !hasInitialTableData && <Retrying />}
      {status === "error" && !hasInitialTableData && <Disconnected />}
    </div>
  );
}
