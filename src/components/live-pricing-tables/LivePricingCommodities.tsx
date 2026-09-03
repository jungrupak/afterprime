import React from "react";
import { LivePricingCommodities } from "@/components/live-pricing/LivePricingCommodities";
import { getPrices } from "@/lib/getPrices";
import { getAllInstrumentSpecs } from "@/lib/getAllInstrumentSpecs";
import { getRequestLocale } from "@/lib/locale/getRequestLocale";
import { getTranslatedStatic } from "@/lib/content/getTranslatedStatic";
import { livePricingCommoditiesContent } from "@/components/live-pricing/livePricingCommoditiesContent";

export default async function LivePricingCommoditiesTable() {
  const [initialPrices, instrumentSpecs, locale] = await Promise.all([
    getPrices().catch(() => []),
    getAllInstrumentSpecs().catch(() => []),
    getRequestLocale(),
  ]);
  const content = await getTranslatedStatic(
    "live-pricing-commodities",
    locale,
    livePricingCommoditiesContent,
  );

  return (
    <section className={`compact-section`}>
      <div className="ap_container_small">
        <LivePricingCommodities
          initialPrices={initialPrices}
          instrumentSpecs={instrumentSpecs}
          content={content}
        />
      </div>
    </section>
  );
}
