import React from "react";
import { LivePricingCrypto } from "@/components/live-pricing/LivePricingCrypto";

export default function LivePricingCryptoTable() {
  return (
    <section>
      {/* grain bg effect */}
      <div className="grainy_bg"></div>
      {/* grain bg effect */}
      <div className="ap_container">
        <LivePricingCrypto />
      </div>
    </section>
  );
}
