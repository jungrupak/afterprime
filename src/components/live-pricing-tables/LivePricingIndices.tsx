import React from "react";
import { LivePricingIndices } from "@/components/live-pricing/LivePricingIndices";

export default function LivePricingIndicesTable() {
  return (
    <section className={`compact-section`}>
      {/* grain bg effect */}
      <div className="grainy_bg"></div>
      {/* grain bg effect */}
      <div className="ap_container_small">
        <LivePricingIndices />
      </div>
    </section>
  );
}
