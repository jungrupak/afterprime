import React from "react";
import TradingCalculator from "@/components/trading-calculator/TradingCalculator";
import styles from "./CostCalculator.module.scss";

interface Props {
  instrument?: string;
}

export default function CostCalculator({ instrument }: Props) {
  return (
    <div className={`my-8 md:my-20 z-6`}>
      <h2 className={`md:mb-5!`}>{instrument} Trade Cost Calculator</h2>
      <p className={`paragraph mb-10 md:mb-15!`}>
        Use calculator to model {instrument} trading costs across volume
        assumption, spread inputs and swaps.
      </p>
      <div className={`relative z-4!`}>
        <TradingCalculator selectedInstrument={instrument} />
      </div>
      <div className="text-[14px] opacity-60">
      <p className="risk-warning-all">
      This tool is intended for cost modelling purposes only and does not constitute a guarantee of trading costs, margin requirements, or execution outcomes.<br/><br/>Live spreads and swap rates will differ from modelled inputs.</p>
      </div>
    </div>

  );
}
