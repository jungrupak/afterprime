"use client";
import { useState } from "react";
import styles from "./Calculator.module.scss";
import TradingCalculator from "@/components/trading-calculator/TradingCalculator";
import ProfitCalculator from "@/components/profit-calculator/ProfitCalculator";

export default function TradingCalculatorClient() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const navItems = ["Trading Calculator", "Profit Calculator"];
  return (
    <section className={`${styles.pageCalcWrap}`}>
      <div className="grainy_bg"></div>
      <div className={`${styles.pageCalcWrapContainer}`}>
        <div className={`${styles.tabNav}`}>
          {navItems.map((item, idx) => (
            <span
              key={idx}
              className={`${styles.navItem} ${
                activeIndex === idx ? styles.active : ""
              }`}
              onClick={() => setActiveIndex(idx)}
            >
              {item}
            </span>
          ))}
        </div>
        <div
          className={`${styles.tabItem} ${
            activeIndex === 0 ? styles.active : ""
          }`}
        >
          <h2>Trading</h2>
          <TradingCalculator />
        </div>
        <div
          className={`${styles.tabItem} ${
            activeIndex === 1 ? styles.active : ""
          }`}
        >
          <h2>Profit</h2>
          <ProfitCalculator />
        </div>
      </div>
    </section>
  );
}
