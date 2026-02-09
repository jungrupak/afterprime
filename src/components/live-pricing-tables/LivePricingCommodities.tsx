import React from "react";
import { LivePricingCommodities } from "@/components/live-pricing/LivePricingCommodities";

export default function LivePricingCommoditiesTable() {
  return (
    <section className={`compact-section`}>
      {/* grain bg effect */}
      <div className="grainy_bg"></div>
      {/* grain bg effect */}
      <div className="ap_container_small">
        <LivePricingCommodities />
      </div>
    </section>
  );
}
