import { Blocks } from "@/types/blocks";
import LivePricingAllTable from "@/components/live-pricing-tables/LivePricingAll";
import LivePricingForexTable from "@/components/live-pricing-tables/LivePricingForex";
import LivePricingCommoditiesTable from "@/components/live-pricing-tables/LivePricingCommodities";
import LivePricingCryptoTable from "@/components/live-pricing-tables/LivePricingCrypto";
import LivePricingIndicesTable from "@/components/live-pricing-tables/LivePricingIndices";
import LivePricingStocksTable from "@/components/live-pricing-tables/LivePricingStocks";

type CompoProps = Blocks["live-pricing-table"];

export function SelectLivePricingTable(props: CompoProps) {
  const { live_pricing_table_select_live_feed_ } = props;
  const tableType = live_pricing_table_select_live_feed_ || "";
  return (
    <>
      {(tableType === "ALL Markets" && <LivePricingAllTable />) ||
        (tableType === "Forex" && <LivePricingForexTable />) ||
        (tableType === "Commodities" && <LivePricingCommoditiesTable />) ||
        (tableType === "Crypto" && <LivePricingCryptoTable />) ||
        (tableType === "Indices" && <LivePricingIndicesTable />) ||
        (tableType === "Stocks" && <LivePricingStocksTable />)}
    </>
  );
}
