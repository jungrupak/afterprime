import React from "react";
import { useLivePrices } from "@/hooks/useLivePrices";
import styles from "../style.module.scss";
import Image from "next/image";
export function Popular() {
  const { categories, status } = useLivePrices();
  const itemCategory = categories.popular;
  console.log("cat", itemCategory);
  return (
    <>
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
            {itemCategory.map((item, index) => (
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
    </>
  );
}
