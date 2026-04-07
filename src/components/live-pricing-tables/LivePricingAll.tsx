import React from "react";
import { LivePricingAll } from "@/components/live-pricing/LivePricing";
import { getPrices } from "@/lib/getPrices";

export default async function LivePricingAllTable() {
  const initialPrices = await getPrices().catch(() => []);

  return (
    <section className={`compact-section`}>
      <div className="ap_container_small">
        <LivePricingAll initialPrices={initialPrices} />
      </div>
    </section>
  );
}
