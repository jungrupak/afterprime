"use client";
import { useLivePrices } from "@/hooks/useLivePrices";
import { useState } from "react";
import styles from "./style.module.scss";
import Btn from "@/components/ui/Button";
import Image from "next/image";
import { Loader } from "../Loading/Loading";
import { Retrying } from "../retrying/Retry";
import { Disconnected } from "../disconnected/Disconnected";

export function LivePricingForex() {
  const { categories, status } = useLivePrices();
  const [activeTabContentID, setActiveTabContentID] = useState("Popular");
  const [activeTabNav, setActiveTabNav] = useState(0);

  const pricingCatLists = [
    categories.forexMajor,
    categories.forexMinor,
    categories.forexExotic,
  ];

  const tabNavs = ["Majors", "Minors", "Exotics"];

  return (
    <div>
      <div className="max-w-[700px] mx-auto text-center">
        <h2 className="h2-size mb-6">
          Keep More, <span>Earn More.</span>
        </h2>
        <p className="paragraph max-w-2xl mx-auto mb-20 max-md:mb-10 opacity-90">
          Lowest verified all-in costs worldwide + Flow Rewards<sup>TM</sup> up to $3/lot on every trade.
        </p>
      </div>

      {status === "connecting" && <Loader />}

      {status === "connected" && (
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
              <div className={`${styles.livepricing_table_wrapper}`}>
                <table className="">
                  <thead>
                    <tr className="">
                      <th className="px-4 py-2">Symbol</th>
                      <th className="px-4 py-2">Bid</th>
                      <th className="px-4 py-2">Ask</th>
                      <th className="px-4 py-2">Spread</th>
                      <th className="px-4 py-2">Market</th>
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
                              {item.symbol}
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
                        <td className="px-4 py-2 " t-name="Market">
                          {item.market}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <p className="opacity-80">
          Explore detailed pricing for <a href="/trade/eurusd"><u>EUR/USD with zero commissions</u></a>, <a href="/trade/gbpusd"><u>GBP/USD trading conditions</u></a>, and <a href="/trade/audusd"><u>AUD/USD low-cost execution</u></a>.</p>

          <p className="opacity-80">Ready to compare? <a href="/calculators/cost-savings-calculator"><u>Calculate your trading costs</u></a> across your typical trading volume to see the total savings.</p>
        </div>
      )}

      {status === "disconnected" && <Retrying />}
      {status === "error" && <Disconnected />}

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
