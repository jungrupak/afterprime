"use client";
import { PricesObjects, useLivePrices } from "@/hooks/useLivePrices";
import { useState } from "react";
import styles from "./style.module.scss";
import Image from "next/image";
import Link from "@/components/ui/Link";
import { Loader } from "../Loading/Loading";
import { Retrying } from "../retrying/Retry";
import { Disconnected } from "../disconnected/Disconnected";

interface LivePricingForexProps {
  initialPrices?: PricesObjects[];
}

export function LivePricingForex({
  initialPrices = [],
}: LivePricingForexProps) {
  const { categories, status } = useLivePrices(initialPrices);
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
          Lowest <span>Verified Forex</span> Pricing
        </h2>
        <p className="paragraph mb-20 max-md:mb-10 opacity-90">
          Raw spreads. Zero commissions. A-Book execution across all precious metals. Plus Flow
          Rewards™. We pay you on your volume.
        </p>
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
                      <th className="px-4 py-2">Symbol</th>
                      <th className="px-4 py-2">Bid</th>
                      <th className="px-4 py-2">Ask</th>
                      <th className="px-4 py-2">Spread</th>
                      <th className="px-4 py-2">Market Hours</th>
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
                                href={"/trade/" + item.symbol.toLowerCase()}
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
                              href={
                                "/trading-hours/" + item.symbol.toLowerCase()
                              }
                            >
                              <span className="text-[14px] underline decoration-dotted decoration-2 underline-offset-4 opacity-65">
                                Trading Hours
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
            Explore detailed pricing for{" "}
            <Link href="/trade/eurusd">
              <u>EUR/USD with zero commissions</u>
            </Link>
            ,{" "}
            <Link href="/trade/gbpusd">
              <u>GBP/USD trading conditions</u>
            </Link>
            , and{" "}
            <Link href="/trade/audusd">
              <u>AUD/USD low-cost execution</u>
            </Link>{" "}
            or{" "}
            <Link href="/live-spreads">
              <u>live forex spreads</u>
            </Link>{" "}
            and other instruments.
          </p>

          <p className="opacity-80 mt-2">
            Ready to compare?{" "}
            <Link href="/calculators/cost-savings-calculator">
              <u>Calculate your trading costs</u>
            </Link>{" "}
            across your typical trading volume to see the total savings or{" "}
            <Link href="/vs">
              <u>compare broker costs</u>
            </Link>{" "}
            across 10+ brokers.
          </p>
        </div>
      )}

      {status === "disconnected" && !hasInitialTableData && <Retrying />}
      {status === "error" && !hasInitialTableData && <Disconnected />}

      {/* <div className="text-center mt-10 text-[20px]">
        At 100 lots/month, that’s $480 saved vs{" "}
        <span
          className={`${styles.indAverageCompareOpen} inline-flex ml-1 mr-2 items-center gap-1`}
        >
          {" "}
          Industry Average{" "}
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask id="path-1-inside-1_733_115" fill="white">
              <path d="M5.98633 0L11.9727 5.98633L5.98633 11.9727L2.62032e-07 5.98633L5.98633 0Z" />
            </mask>
            <path
              d="M5.98633 11.9727L4.92567 13.0333L5.98633 14.094L7.04699 13.0333L5.98633 11.9727ZM11.9727 5.98633L10.912 4.92567L4.92567 10.912L5.98633 11.9727L7.04699 13.0333L13.0333 7.04699L11.9727 5.98633ZM5.98633 11.9727L7.04699 10.912L1.06066 4.92567L2.62032e-07 5.98633L-1.06066 7.04699L4.92567 13.0333L5.98633 11.9727Z"
              fill="var(--secondary-color)"
              mask="url(#path-1-inside-1_733_115)"
            />
          </svg>{" "}
        </span>
        plus $220 back in your pocket on flow.
      </div> */}
    </div>
  );
}
