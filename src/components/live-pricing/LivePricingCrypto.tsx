"use client";
import { PricesObjects, useLivePrices } from "@/hooks/useLivePrices";
import Link from "next/link";
import styles from "./style.module.scss";
import Image from "next/image";
import { Loader } from "../Loading/Loading";
import { Retrying } from "../retrying/Retry";
import { Disconnected } from "../disconnected/Disconnected";
import { useLocale } from "@/lib/locale/useLocale";
import { localizeHref } from "@/lib/locale/localizeHref";
import type { LivePricingCryptoContent } from "./livePricingCryptoContent";
import { livePricingCryptoContent } from "./livePricingCryptoContent";

interface LivePricingCryptoProps {
  initialPrices?: PricesObjects[];
  content?: LivePricingCryptoContent;
}

export function LivePricingCrypto({
  initialPrices = [],
  content: c = livePricingCryptoContent,
}: LivePricingCryptoProps) {
  const locale = useLocale();
  const { categories, status } = useLivePrices(initialPrices);

  const pricingCatLists = [categories.crypto];
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
          <div className={`${styles.ap_tab_container}`}>
            <div className={`${styles.livepricing_table_wrapper} ${styles.trading_hours_table}`}>
              <table className="">
                <thead>
                  <tr className="">
                    <th className="px-4 py-2">{c.tableHeaders.symbol}</th>
                    <th className="px-4 py-2">{c.tableHeaders.bid}</th>
                    <th className="px-4 py-2">{c.tableHeaders.ask}</th>
                    <th className="px-4 py-2">{c.tableHeaders.spread}</th>
                    <th className="px-4 py-2">{c.tableHeaders.marketHours}</th>
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
                      <td className="px-4 py-2 " t-name="Market Hours">
                        <div
                          className={`flex md:justify-end text-[16px] items-center`}
                        >
                          <Link
                            href={localizeHref("/trading-hours/" + item.symbol.toLowerCase(), locale)}
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
          </div>
        </div>
      )}

      {status === "disconnected" && !hasInitialTableData && <Retrying />}
      {status === "error" && !hasInitialTableData && <Disconnected />}
    </div>
  );
}
