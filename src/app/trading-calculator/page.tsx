"use client";
import { useState } from "react";
import styles from "./Calculator.module.scss";
import TradingCalculator from "@/components/trading-calculator/TradingCalculator";
import ProfitCalculator from "@/components/profit-calculator/ProfitCalculator";
export default function Page() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const navItems = ["Trading Calculator", "Profit Calculator"];
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
