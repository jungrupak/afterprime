import React from "react";
import { LivePricingForex } from "@/components/live-pricing/LivePricingForex";
import { getPrices } from "@/lib/getPrices";
import { getRequestLocale } from "@/lib/locale/getRequestLocale";
import { getTranslatedStatic } from "@/lib/content/getTranslatedStatic";
import { livePricingForexContent } from "@/components/live-pricing/livePricingForexContent";

export default async function LivePricingForexTable() {
  const [initialPrices, locale] = await Promise.all([
    getPrices().catch(() => []),
    getRequestLocale(),
  ]);
  const content = await getTranslatedStatic(
    "live-pricing-forex",
    locale,
    livePricingForexContent,
  );

  return (
    <section className={`compact-section`}>
      <div className="ap_container_small">
        <LivePricingForex initialPrices={initialPrices} content={content} />
      </div>
    </section>
  );
}
