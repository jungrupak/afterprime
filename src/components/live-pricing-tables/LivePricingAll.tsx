import React from "react";
import { LivePricingAll } from "@/components/live-pricing/LivePricing";

export default function LivePricingAllTable() {
  return (
    <section>
      {/* grain bg effect */}
      <div className="grainy_bg"></div>
      {/* grain bg effect */}
      <div className="ap_container">
        <LivePricingAll />
      </div>
    </section>
  );
}
