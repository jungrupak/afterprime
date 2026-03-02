import React from "react";
import { LivePricingForex } from "@/components/live-pricing/LivePricingForex";

export default function LivePricingForexTable() {
  return (
    <section className={`compact-section`}>
      <div className="ap_container_small">
        <LivePricingForex />
      </div>
    </section>
  );
}
