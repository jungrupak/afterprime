"use client";
import { useState } from "react";
import styles from "./Calculator.module.scss";
import TradingCalculator from "@/components/trading-calculator/TradingCalculator";
import ProfitCalculator from "@/components/profit-calculator/ProfitCalculator";
import {
  getCalculatorsContent,
  type GetCalculatorsContent,
} from "./GetCalculatorsContent";
import { tradingProfitCalculatorContent } from "@/components/trading-calculator/tradingProfitCalculatorContent";
import type { TradingProfitCalculatorContent } from "@/components/trading-calculator/tradingProfitCalculatorContent";

interface Props {
  content?: GetCalculatorsContent;
  formContent?: TradingProfitCalculatorContent;
}

export default function GetCalculators({
  content = getCalculatorsContent,
  formContent = tradingProfitCalculatorContent,
}: Props = {}) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  // Stable, untranslated keys — tab switching is driven by numeric index
  // (activeIndex === idx) below, never by these string values. Keep them
  // as-is; the translated labels shown to the user come from `tabLabels`.
  const navItems = ["Trading Calculator", "Profit Calculator"];
  const tabLabels = [content.tradingCalculatorTab, content.profitCalculatorTab];
  return (
    <div className={`${styles.pageCalcWrapContainer}`}>
      <div className={`${styles.tabNav}`}>
        {navItems.map((_item, idx) => (
          <span
            key={idx}
            className={`${styles.navItem} ${
              activeIndex === idx ? styles.active : ""
            }`}
            onClick={() => setActiveIndex(idx)}
          >
            {tabLabels[idx]}
          </span>
        ))}
      </div>
      <div
        className={`${styles.tabItem} ${
          activeIndex === 0 ? styles.active : ""
        }`}
      >
        <h2>{content.tradingHeading}</h2>
        <TradingCalculator content={formContent} />
      </div>
      <div
        className={`${styles.tabItem} ${
          activeIndex === 1 ? styles.active : ""
        }`}
      >
        <h2>{content.profitHeading}</h2>
        <ProfitCalculator content={formContent} />
      </div>
    </div>
  );
}
