import WebTraderMt5 from "./Widget";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Afterprime MT5 WebTrader | Advanced Trading Platform",
  description:
    "Trade on Afterprime MT5 WebTrader with powerful charting, fast execution, and expanded market access.",
  alternates: {
    canonical: "https://afterprime.com/webtrader-mt5",
  },
};

export default function Page() {
  return <WebTraderMt5 />;
}
