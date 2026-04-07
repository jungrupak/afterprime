import React from "react";
import { LivePricingIndices } from "@/components/live-pricing/LivePricingIndices";
import { getPrices } from "@/lib/getPrices";

export default async function LivePricingIndicesTable() {
  const initialPrices = await getPrices().catch(() => []);

  return (
    <section className={`compact-section`}>
      <div className="ap_container_small">
        <LivePricingIndices initialPrices={initialPrices} />
      </div>
    </section>
  );
}
