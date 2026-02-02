import type { Metadata } from "next";
import styles from "./Calculator.module.scss";
import TradingCalculator from "@/components/trading-calculator/TradingCalculator";

interface AiseoResponseType {
  title: string;
  description: string;
}

export async function generateMetadata(): Promise<Metadata> {
  try {
    const res = await fetch(
      "https://wordpress-1264747-4900526.cloudwaysapps.com/wp-json/custom/v1/seo?page=trading-calculator",
      { next: { revalidate: 60 } },
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch SEO Data : ${res.status}`);
    }
    const data: AiseoResponseType = await res.json();
    return {
      title: data.title || "Afterprime Trading Calculator",
      description:
        data.description ||
        "Calculate position size, risk, and margin with Afterprime.",
    };
  } catch (err) {
    return {
      title: "Afterprime Trading Calculator",
      description: "Calculate position size, risk, and margin with Afterprime.",
    };
  }
}

export default function Page() {
  return (
    <section className={`${styles.pageCalcWrap}`}>
      <div className="grainy_bg"></div>
      <div className={`${styles.pageCalcWrapContainer}`}>
        <h2>Afterprime Trading Calculator</h2>
        <TradingCalculator />
      </div>
    </section>
  );
}
