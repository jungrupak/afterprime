import React from "react";
import { LivePricingCrypto } from "@/components/live-pricing/LivePricingCrypto";
import { getPrices } from "@/lib/getPrices";

export default async function LivePricingCryptoTable() {
  const initialPrices = await getPrices().catch(() => []);

  return (
    <section className="compact-section">
      <div className="ap_container_small">
        <LivePricingCrypto initialPrices={initialPrices} />
      </div>
    </section>
  );
}
