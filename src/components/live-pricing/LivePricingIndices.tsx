"use client";
import { useLivePrices } from "@/hooks/useLivePrices";
import { useState } from "react";
import styles from "./style.module.scss";
import Btn from "@/components/ui/Button";
import Image from "next/image";

export function LivePricingIndices() {
  const { categories, status } = useLivePrices();
  const [activeTabContentID, setActiveTabContentID] = useState("Popular");
  const [activeTabNav, setActiveTabNav] = useState(0);

  const pricingCatLists = [categories.indices];
  console.log("Indices data:", pricingCatLists);

  return (
    <div>
      <div className="max-w-[700px] mx-auto text-center">
        <h2 className="h2-size mb-6">
          Keep More, <span>Earn More.</span>
        </h2>
        <p className="paragraph max-w-2xl mx-auto mb-20 max-md:mb-10 opacity-90">
          You&apos;re trading on the world&apos;s lowest-cost platform — and
          getting paid for your flow.
        </p>
      </div>

      {status === "connecting" && (
        <h2 className="text-center">🔄 Connecting...</h2>
      )}

      {status === "connected" && (
        <div className={`${styles.ap_tab}`}>
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
                      <th className="px-4 py-2">&nbsp;</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pricingCatLists[0].map((item, index) => (
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
                          {item.spread}
                        </td>
                        <td className="px-4 py-2 " t-name="Market">
                          {item.market}
                        </td>
                        <td>
                          <Btn
                            varient="secondary-ghost"
                            size="x-small"
                            href="/about"
                          >
                            Trade Now
                          </Btn>
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

      {status === "disconnected" && (
        <h2 className="text-center">⚠️ Disconnected. Retrying...</h2>
      )}
      {status === "error" && (
        <h2 className="text-center">❌ Failed to connect.</h2>
      )}

      <div className="text-center mt-10 text-[20px]">
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
      </div>
    </div>
  );
}
