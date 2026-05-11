import React from "react";
import { LivePricingTradingHours } from "@/components/live-pricing/LivePricingTradingHours";
import { getPrices } from "@/lib/getPrices";

export default async function LivePricingTradingHoursTable() {
  const initialPrices = await getPrices().catch(() => []);

  return (
    <section className={`compact-section`}>
      <div className="ap_container_small">
        <LivePricingTradingHours initialPrices={initialPrices} />
      </div>
    </section>
  );
}
