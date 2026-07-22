import React from "react";
import TradingCalculator from "@/components/trading-calculator/TradingCalculator";
import styles from "./CostCalculator.module.scss";
import { getRequestLocale } from "@/lib/locale/getRequestLocale";
import { getTranslatedStatic } from "@/lib/content/getTranslatedStatic";
import { tradingProfitCalculatorContent } from "@/components/trading-calculator/tradingProfitCalculatorContent";

interface Props {
  instrument?: string;
}

export default async function CostCalculator({ instrument }: Props) {
  const locale = await getRequestLocale();
  const [t, formContent] = await Promise.all([
    getTranslatedStatic("cost-calculator-inline", locale, {
      headingTemplate: "{instrument} Trade Cost Calculator",
      descriptionTemplate:
        "Use calculator to model {instrument} trading costs across volume assumption, spread inputs and swaps.",
      disclaimerPre:
        "This tool is intended for cost modelling purposes only and does not constitute a guarantee of trading costs, margin requirements, or execution outcomes.",
      disclaimerPost:
        "Live spreads and swap rates will differ from modelled inputs.",
    }),
    getTranslatedStatic(
      "trading-profit-calculator",
      locale,
      tradingProfitCalculatorContent,
    ),
  ]);

  return (
    <div className={`my-8 md:my-20 z-6`}>
      <h2 className={`md:mb-5!`}>
        {t.headingTemplate.replace("{instrument}", instrument ?? "")}
      </h2>
      <p className={`paragraph mb-10 md:mb-15!`}>
        {t.descriptionTemplate.replace("{instrument}", instrument ?? "")}
      </p>
      <div className={`relative z-4!`}>
        <TradingCalculator
          selectedInstrument={instrument}
          content={formContent}
        />
      </div>
      <div className="text-[14px] opacity-60">
        <p className="risk-warning-all">
          {t.disclaimerPre}
          <br />
          <br />
          {t.disclaimerPost}
        </p>
      </div>
    </div>
  );
}
