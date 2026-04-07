import React from "react";
import { LivePricingCommodities } from "@/components/live-pricing/LivePricingCommodities";
import { getPrices } from "@/lib/getPrices";

export default async function LivePricingCommoditiesTable() {
  const initialPrices = await getPrices().catch(() => []);

  return (
    <section className={`compact-section`}>
      <div className="ap_container_small">
        <LivePricingCommodities initialPrices={initialPrices} />
      </div>
    </section>
  );
}
