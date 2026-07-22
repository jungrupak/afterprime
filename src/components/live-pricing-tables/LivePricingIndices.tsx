import React from "react";
import { LivePricingIndices } from "@/components/live-pricing/LivePricingIndices";
import { getPrices } from "@/lib/getPrices";
import { getRequestLocale } from "@/lib/locale/getRequestLocale";
import { getTranslatedStatic } from "@/lib/content/getTranslatedStatic";
import { livePricingIndicesContent } from "@/components/live-pricing/livePricingIndicesContent";

export default async function LivePricingIndicesTable() {
  const [initialPrices, locale] = await Promise.all([
    getPrices().catch(() => []),
    getRequestLocale(),
  ]);
  const content = await getTranslatedStatic(
    "live-pricing-indices",
    locale,
    livePricingIndicesContent,
  );

  return (
    <section className={`compact-section`}>
      <div className="ap_container_small">
        <LivePricingIndices initialPrices={initialPrices} content={content} />
      </div>
    </section>
  );
}
