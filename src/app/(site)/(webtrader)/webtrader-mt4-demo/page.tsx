import WebTraderMt4Demo from "./Widget";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Afterprime | Get Paid to Trade",
  description:
    "Lowest costs, transparent execution, shared rewards. Value you won't find anywhere else.",
  alternates: {
    canonical: "https://afterprime.com/webtrader-mt4-demo",
  },
};

export default function Page() {
  return <WebTraderMt4Demo />;
}
