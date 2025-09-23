import React from "react";
import { LivePricingForex } from "@/components/live-pricing/LivePricingForex";

export default function LivePricingForexTable() {
  return (
    <section>
      {/* grain bg effect */}
      <div className="grainy_bg"></div>
      {/* grain bg effect */}
      <div className="ap_container">
        <LivePricingForex />
      </div>
    </section>
  );
}
