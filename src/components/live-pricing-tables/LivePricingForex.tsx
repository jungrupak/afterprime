import React from "react";
import { LivePricingForex } from "@/components/live-pricing/LivePricingForex";
import { getPrices } from "@/lib/getPrices";

export default async function LivePricingForexTable() {
  const initialPrices = await getPrices().catch(() => []);

  return (
    <section className={`compact-section`}>
      <div className="ap_container_small">
        <LivePricingForex initialPrices={initialPrices} />
      </div>
    </section>
  );
}
