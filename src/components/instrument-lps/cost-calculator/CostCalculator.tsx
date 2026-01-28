import React from "react";
import TradingCalculator from "@/components/trading-calculator/TradingCalculator";
import styles from "./CostCalculator.module.scss";

interface Props {
  selectedInstrument?: string;
}

export default function CostCalculator({ selectedInstrument }: Props) {
  return (
    <section className={`${styles.pageCalcWrap} md:py-20!`}>
      <div className="grainy_bg"></div>
      <div className={`ap_container_small`}>
        <h2 className={`md:mb-5!`}>
          {selectedInstrument} Trade Cost Calculator
        </h2>
        <p className={`paragraph mb-10 md:mb-15!`}>
          Use this calculator to model GBPUSD trading costs across volume
          assumption, spread inputs and swaps.
        </p>
        <div className={`relative z-4!`}>
          <TradingCalculator selectedInstrument={selectedInstrument} />
        </div>
        <p className={`max-md:mt-4`}>
          This tool is intended for cost modeling only.
        </p>
      </div>
    </section>
  );
}
