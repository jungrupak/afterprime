import React from "react";
import { LivePricingCrypto } from "@/components/live-pricing/LivePricingCrypto";
import { getPrices } from "@/lib/getPrices";
import { getAllInstrumentSpecs } from "@/lib/getAllInstrumentSpecs";
import { getRequestLocale } from "@/lib/locale/getRequestLocale";
import { getTranslatedStatic } from "@/lib/content/getTranslatedStatic";
import { livePricingCryptoContent } from "@/components/live-pricing/livePricingCryptoContent";

export default async function LivePricingCryptoTable() {
  const [initialPrices, instrumentSpecs, locale] = await Promise.all([
    getPrices().catch(() => []),
    getAllInstrumentSpecs().catch(() => []),
    getRequestLocale(),
  ]);
  const content = await getTranslatedStatic(
    "live-pricing-crypto",
    locale,
    livePricingCryptoContent,
  );

  return (
    <section className="compact-section">
      <div className="ap_container_small">
        <LivePricingCrypto
          initialPrices={initialPrices}
          instrumentSpecs={instrumentSpecs}
          content={content}
        />
      </div>
    </section>
  );
}
