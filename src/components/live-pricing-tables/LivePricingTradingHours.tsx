import React from "react";
import { LivePricingTradingHours } from "@/components/live-pricing/LivePricingTradingHours";
import { getPrices } from "@/lib/getPrices";
import { getRequestLocale } from "@/lib/locale/getRequestLocale";
import { getTranslatedStatic } from "@/lib/content/getTranslatedStatic";
import { livePricingTradingHoursContent } from "@/components/live-pricing/livePricingTradingHoursContent";

export default async function LivePricingTradingHoursTable() {
  const [initialPrices, locale] = await Promise.all([
    getPrices().catch(() => []),
    getRequestLocale(),
  ]);
  const content = await getTranslatedStatic(
    "live-pricing-trading-hours",
    locale,
    livePricingTradingHoursContent,
  );

  return (
    <section className={`compact-section`}>
      <div className="ap_container_small">
        <LivePricingTradingHours
          initialPrices={initialPrices}
          content={content}
        />
      </div>
    </section>
  );
}
