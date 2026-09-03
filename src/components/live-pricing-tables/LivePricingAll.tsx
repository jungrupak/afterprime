import React from "react";
import { LivePricingAll } from "@/components/live-pricing/LivePricing";
import { getPrices } from "@/lib/getPrices";
import { getAllInstrumentSpecs } from "@/lib/getAllInstrumentSpecs";
import { getRequestLocale } from "@/lib/locale/getRequestLocale";
import { getTranslatedStatic } from "@/lib/content/getTranslatedStatic";
import { livePricingContent } from "@/components/live-pricing/livePricingContent";

export default async function LivePricingAllTable() {
  const [initialPrices, instrumentSpecs, locale] = await Promise.all([
    getPrices().catch(() => []),
    getAllInstrumentSpecs().catch(() => []),
    getRequestLocale(),
  ]);
  const content = await getTranslatedStatic(
    "live-pricing",
    locale,
    livePricingContent,
  );

  return (
    <section className={`compact-section`}>
      <div className="ap_container_small">
        <LivePricingAll
          initialPrices={initialPrices}
          instrumentSpecs={instrumentSpecs}
          content={content}
        />
      </div>
    </section>
  );
}
