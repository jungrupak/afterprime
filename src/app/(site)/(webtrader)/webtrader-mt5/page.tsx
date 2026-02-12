import WebTraderMt5 from "./Widget";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Afterprime | Get Paid to Trade",
  description:
    "Lowest costs, transparent execution, shared rewards. Value you won't find anywhere else.",
  alternates: {
    canonical: "https://afterprime.com/webtrader-mt5",
  },
};

export default function Page() {
  return <WebTraderMt5 />;
}
