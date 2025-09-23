import React from "react";
import { LivePricingCommodities } from "@/components/live-pricing/LivePricingCommodities";

export default function LivePricingCommoditiesTable() {
  return (
    <section>
      {/* grain bg effect */}
      <div className="grainy_bg"></div>
      {/* grain bg effect */}
      <div className="ap_container">
        <LivePricingCommodities />
      </div>
    </section>
  );
}
