import WebTraderMt4Demo from "./Widget";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Afterprime MT4 Demo WebTrader | Practice Trading Online",
  description:
    "Open and use an Afterprime MT4 demo account in your browser. Test strategies with real market data, full MT4 functionality, and zero risk, no installation needed.",
  alternates: {
    canonical: "https://afterprime.com/webtrader-mt4-demo",
  },
};

export default function Page() {
  return (
    <div className="relative" style={{ zIndex: 99 }}>
      <WebTraderMt4Demo />
    </div>
  );
}
