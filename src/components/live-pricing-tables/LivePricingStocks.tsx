import React from "react";
import { LivePricingStocks } from "../live-pricing/LivePricingStocks";

export default function LivePricingStocksTable() {
  return (
    <section className={`compact-section`}>
      <div className="ap_container_small">
        <LivePricingStocks />
      </div>
    </section>
  );
}
