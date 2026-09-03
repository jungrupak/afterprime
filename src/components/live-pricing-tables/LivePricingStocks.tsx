import React from "react";
import { LivePricingStocks } from "../live-pricing/LivePricingStocks";
import { getPrices } from "@/lib/getPrices";
import { getAllInstrumentSpecs } from "@/lib/getAllInstrumentSpecs";
import { getRequestLocale } from "@/lib/locale/getRequestLocale";
import { getTranslatedStatic } from "@/lib/content/getTranslatedStatic";
import { livePricingStocksContent } from "@/components/live-pricing/livePricingStocksContent";

export default async function LivePricingStocksTable() {
  const [initialPrices, instrumentSpecs, locale] = await Promise.all([
    getPrices().catch(() => []),
    getAllInstrumentSpecs().catch(() => []),
    getRequestLocale(),
  ]);
  const content = await getTranslatedStatic(
    "live-pricing-stocks",
    locale,
    livePricingStocksContent,
  );

  return (
    <section className={`compact-section`}>
      <div className="ap_container_small">
        <LivePricingStocks
          initialPrices={initialPrices}
          instrumentSpecs={instrumentSpecs}
          content={content}
        />
      </div>
    </section>
  );
}
