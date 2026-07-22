import React from "react";
import { LivePricingAll } from "@/components/live-pricing/LivePricing";
import { getPrices } from "@/lib/getPrices";
import { getRequestLocale } from "@/lib/locale/getRequestLocale";
import { getTranslatedStatic } from "@/lib/content/getTranslatedStatic";
import { livePricingContent } from "@/components/live-pricing/livePricingContent";

export default async function LivePricingAllTable() {
  const [initialPrices, locale] = await Promise.all([
    getPrices().catch(() => []),
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
        <LivePricingAll initialPrices={initialPrices} content={content} />
      </div>
    </section>
  );
}
