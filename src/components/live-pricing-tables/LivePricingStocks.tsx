import React from "react";
import { LivePricingStocks } from "../live-pricing/LivePricingStocks";
import { getPrices } from "@/lib/getPrices";

export default async function LivePricingStocksTable() {
  const initialPrices = await getPrices().catch(() => []);

  return (
    <section className={`compact-section`}>
      <div className="ap_container_small">
        <LivePricingStocks initialPrices={initialPrices} />
      </div>
    </section>
  );
}
