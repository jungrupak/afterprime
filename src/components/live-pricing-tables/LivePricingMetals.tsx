import React from "react";
import { LivePricingMetals } from "@/components/live-pricing/LivePricingMetals";
import { getPrices } from "@/lib/getPrices";
export default async function LivePricingMetalsTable() {
  const initialPrices = await getPrices().catch(() => []);

  return (
    <section className={`compact-section`}>
      <div className="ap_container_small">
        <LivePricingMetals initialPrices={initialPrices} />
      </div>
    </section>
  );
}
