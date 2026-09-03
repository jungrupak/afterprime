import React from "react";
import { LivePricingMetals } from "@/components/live-pricing/LivePricingMetals";
import { getPrices } from "@/lib/getPrices";
import { getAllInstrumentSpecs } from "@/lib/getAllInstrumentSpecs";
import { getRequestLocale } from "@/lib/locale/getRequestLocale";
import { getTranslatedStatic } from "@/lib/content/getTranslatedStatic";
import { livePricingMetalsContent } from "@/components/live-pricing/livePricingMetalsContent";

export default async function LivePricingMetalsTable() {
  const [initialPrices, instrumentSpecs, locale] = await Promise.all([
    getPrices().catch(() => []),
    getAllInstrumentSpecs().catch(() => []),
    getRequestLocale(),
  ]);
  const content = await getTranslatedStatic(
    "live-pricing-metals",
    locale,
    livePricingMetalsContent,
  );

  return (
    <section className={`compact-section`}>
      <div className="ap_container_small">
        <LivePricingMetals
          initialPrices={initialPrices}
          instrumentSpecs={instrumentSpecs}
          content={content}
        />
      </div>
    </section>
  );
}
