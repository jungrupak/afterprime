import WebTraderMt4Widget from "./Widget";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Afterprime MT4 Live WebTrader | Trade Live Online",
  description:
    "Access your live Afterprime MT4 account directly from your browser. Trade forex, indices, commodities, and more with real time pricing.",
  alternates: {
    canonical: "https://afterprime.com/webtrader-mt4",
  },
};

export default function Page() {
  return <WebTraderMt4Widget />;
}
