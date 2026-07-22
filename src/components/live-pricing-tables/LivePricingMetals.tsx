import React from "react";
import { LivePricingMetals } from "@/components/live-pricing/LivePricingMetals";
import { getPrices } from "@/lib/getPrices";
import { getRequestLocale } from "@/lib/locale/getRequestLocale";
import { getTranslatedStatic } from "@/lib/content/getTranslatedStatic";
import { livePricingMetalsContent } from "@/components/live-pricing/livePricingMetalsContent";

export default async function LivePricingMetalsTable() {
  const [initialPrices, locale] = await Promise.all([
    getPrices().catch(() => []),
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
        <LivePricingMetals initialPrices={initialPrices} content={content} />
      </div>
    </section>
  );
}
