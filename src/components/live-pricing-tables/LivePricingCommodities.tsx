import React from "react";
import { LivePricingCommodities } from "@/components/live-pricing/LivePricingCommodities";
import { getPrices } from "@/lib/getPrices";
import { getRequestLocale } from "@/lib/locale/getRequestLocale";
import { getTranslatedStatic } from "@/lib/content/getTranslatedStatic";
import { livePricingCommoditiesContent } from "@/components/live-pricing/livePricingCommoditiesContent";

export default async function LivePricingCommoditiesTable() {
  const [initialPrices, locale] = await Promise.all([
    getPrices().catch(() => []),
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
          content={content}
        />
      </div>
    </section>
  );
}
