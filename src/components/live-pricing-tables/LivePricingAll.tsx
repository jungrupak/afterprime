import React from "react";
import { LivePricingAll } from "@/components/live-pricing/LivePricing";

export default function LivePricingAllTable() {
  return (
    <section className={`compact-section`}>
      <div className="ap_container_small">
        <LivePricingAll />
      </div>
    </section>
  );
}
