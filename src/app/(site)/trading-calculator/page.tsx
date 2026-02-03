import type { Metadata } from "next";
import TradingCalculatorClient from "@/components/trading-calculator-client/TradingCalculatorClient";

export const metadata: Metadata = {
  title: "Afterprime | Get Paid to Trade",
  description:
    "Lowest costs, transparent execution, shared rewards. Value you won't find anywhere else.",
  alternates: {
    canonical: "https://afterprime.com/trading-calculator",
  },
};

export default function Page() {
  return <TradingCalculatorClient />;
}
