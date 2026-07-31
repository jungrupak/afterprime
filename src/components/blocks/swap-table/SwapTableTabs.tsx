"use client";
import { useState } from "react";
import Image from "next/image";
import lpStyles from "@/components/live-pricing/style.module.scss";
import { localizeHref } from "@/lib/locale/localizeHref";
import type { SwapTableContent } from "./swapTableContent";

interface InstrumentDataType {
  symbol?: string;
  path?: string;
  swapLong?: number;
  swapShort?: number;
}

export interface SwapTab {
  key: string;
  label: string;
  icon: string;
  rows: InstrumentDataType[];
}

interface SwapTableTabsProps {
  tabs: SwapTab[];
  locale: string;
  content: SwapTableContent;
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

function symbolHref(row: InstrumentDataType, locale: string): string {
  return row.path?.startsWith("Forex") || row.symbol?.toLowerCase() === "xauusd"
    ? localizeHref(`/trade/${row.symbol?.toLowerCase()}`, locale)
    : localizeHref(`/swaps/${row.symbol?.toLowerCase()}`, locale);
}

export function SwapTableTabs({ tabs, locale, content: t }: SwapTableTabsProps) {
  const [activeTabNav, setActiveTabNav] = useState(0);
  const rows = tabs[activeTabNav]?.rows ?? [];

  return (
    <div className={`${lpStyles.ap_tab}`}>
      <div className={`${lpStyles.ap_tab_nav}`}>
        {tabs.map((tab, index) => (
          <button
            key={tab.key}
            type="button"
            className={`${index === activeTabNav ? lpStyles.active : ""}`}
            onClick={() => setActiveTabNav(index)}
          >
            <Image
              src={tab.icon}
              alt={tab.label}
              width={14}
              height={14}
              className="inline-block mr-2"
            />
            {tab.label}
          </button>
        ))}
      </div>

      <div className={`${lpStyles.ap_tab_container}`}>
        {rows.length === 0 ? (
          <p>{t.noDataAvailable}</p>
        ) : (
          <div
            className={`${lpStyles.livepricing_table_wrapper} ${lpStyles.trading_hours_table}`}
          >
            <table className="">
              <thead>
                <tr className="">
                  <th className="px-4 py-2">{t.colInstrument}</th>
                  <th className="px-4 py-2">{t.colLong}</th>
                  <th className="px-4 py-2">{t.colShort}</th>
                  <th className="px-4 py-2">{t.colMarketHours}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => {
                  const isForex = row.path?.startsWith("Forex");
                  return (
                    <tr key={row.symbol ?? `${row.path}-${index}`} className="">
                      <td className="px-4 py-2" t-name="Instrument">
                        {isForex ? (
                          <div className={`${lpStyles.forexIcons}`}>
                            <div className={`${lpStyles.icon_wrap}`}>
                              <Image
                                width={40}
                                height={40}
                                src={`https://cdn.afterprime.com/symbols/${row.symbol
                                  ?.toLowerCase()
                                  .slice(0, 3)}.svg`}
                                alt={row.symbol ?? ""}
                              />
                              <Image
                                width={40}
                                height={40}
                                src={`https://cdn.afterprime.com/symbols/${row.symbol
                                  ?.toLowerCase()
                                  .slice(3)}.svg`}
                                alt={row.symbol ?? ""}
                              />
                            </div>
                            <a
                              href={symbolHref(row, locale)}
                              className="underline decoration-dotted decoration-2 underline-offset-4"
                            >
                              {row.symbol ?? "-"}
                            </a>
                            <TradeArrowIcon />
                          </div>
                        ) : (
                          <div className={`${lpStyles.instrumentIcons}`}>
                            <div className={`${lpStyles.icon_wrap}`}>
                              <Image
                                width={40}
                                height={40}
                                src={`https://cdn.afterprime.com/symbols/${row.symbol?.toLocaleLowerCase()}.svg`}
                                alt={row.symbol ?? ""}
                              />
                            </div>
                            <a
                              href={symbolHref(row, locale)}
                              className="underline decoration-dotted decoration-2 underline-offset-4"
                            >
                              {row.symbol ?? "-"}
                            </a>
                            <TradeArrowIcon />
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-2" t-name="Long">
                        {row.swapLong ?? "-"}
                      </td>
                      <td className="px-4 py-2" t-name="Short">
                        {row.swapShort ?? "-"}
                      </td>
                      <td className="px-4 py-2" t-name="Market Hours">
                        <div className="flex md:justify-end text-[16px] items-center">
                          <a
                            href={localizeHref(
                              `/trading-hours/${row.symbol?.toLowerCase()}`,
                              locale,
                            )}
                          >
                            <span className="text-[14px] underline decoration-dotted decoration-2 underline-offset-4 opacity-65">
                              {t.tradingHoursLink}
                            </span>
                          </a>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
