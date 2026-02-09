import React from "react";
import { LivePricingStocks } from "../live-pricing/LivePricingStocks";

export default function LivePricingStocksTable() {
  return (
    <section className={`compact-section`}>
      {/* grain bg effect */}
      <div className="grainy_bg"></div>
      {/* grain bg effect */}
      <div className="ap_container_small">
        <LivePricingStocks />
      </div>
    </section>
  );
}
