import React from "react";
import { LivePricingAll } from "@/components/live-pricing/LivePricing";

export default function LivePricingAllTable() {
  return (
    <section className={`compact-section`}>
      {/* grain bg effect */}
      <div className="grainy_bg"></div>
      {/* grain bg effect */}
      <div className="ap_container_small">
        <LivePricingAll />
      </div>
    </section>
  );
}
