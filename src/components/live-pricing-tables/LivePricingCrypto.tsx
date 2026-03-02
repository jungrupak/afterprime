import React from "react";
import { LivePricingCrypto } from "@/components/live-pricing/LivePricingCrypto";

export default function LivePricingCryptoTable() {
  return (
    <section className="compact-section">
      <div className="ap_container_small">
        <LivePricingCrypto />
      </div>
    </section>
  );
}
