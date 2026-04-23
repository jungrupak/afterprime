"use client";
import { PricesObjects, useLivePrices } from "@/hooks/useLivePrices";
import { useState } from "react";
import styles from "./style.module.scss";
import Image from "next/image";
import Link from "next/link";
import { Loader } from "../Loading/Loading";
import { Disconnected } from "../disconnected/Disconnected";
import { Retrying } from "../retrying/Retry";

interface LivePricingAllProps {
  initialPrices?: PricesObjects[];
}

export function LivePricingAll({
  initialPrices = [],
}: LivePricingAllProps) {
  const { categories, status } = useLivePrices(initialPrices);
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

  const tabNavs = [
    "Popular",
    "Forex",
    "Crypto",
    "Commodities",
    "Metals",
    "Indices",
    //"Stocks",
  ];

  const visibleRows = pricingCatLists[activeTabNav].filter(
    (item) => !["CA60", "SA40", "NOR25", "XCUUSD"].includes(item.symbol),
  );
  const hasInitialTableData = pricingCatLists.some((items) => items.length > 0);

  return (
    <div>
      <div className="w-full text-center px-6">
        <h2 className="h2-size mb-6">
          Beyond Zero-Commission, <span>Get Paid to Trade.</span>
        </h2>
        <p className="paragraph mb-20 max-md:mb-10 opacity-90">
          Most brokers hide their profit in the spread. We do the opposite. We
          combine the industry’s tightest raw spreads with Flow Rewards
          <sup>TM</sup> paying you up to $3/lot back on your volume. We don't
          just lower your costs; we turn your execution into a revenue stream.
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
              <div className={`${styles.livepricing_table_wrapper}`}>
                <table className="">
                  <caption className={`hidden`}>
                    Beyond Zero-Commission, Get Paid to Trade. Popular
                    Instruments, Forex, Crypto, Commodities, Metals, Indices
                  </caption>
                  <thead>
                    <tr className="">
                      <th scope="col" className="px-4 py-2">
                        Symbol
                      </th>
                      <th scope="col" className="px-4 py-2">
                        Bid Price
                      </th>
                      <th scope="col" className="px-4 py-2">
                        Ask Price
                      </th>
                      <th scope="col" className="px-4 py-2">
                        Spread (Pips)
                      </th>
                      <th scope="col" className="px-4 py-2">
                        Market
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
                                <a href={"/forex/" + item.symbol.toLowerCase()}>
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
                          <td className="px-4 py-2 " t-name="Market">
                            {item.market.charAt(0).toUpperCase() +
                              item.market.slice(1).toLowerCase()}
                          </td>
                        </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <p className="opacity-80 mt-5">
            Ready to compare?{" "}
            <Link href="/calculators/cost-savings-calculator">
              <u>Calculate your trading costs</u>
            </Link>{" "}
            across your typical trading volume to see the total savings.
          </p>
        </div>
      )}

      {status === "disconnected" && !hasInitialTableData && <Retrying />}
      {status === "error" && !hasInitialTableData && <Disconnected />}
    </div>
  );
}
