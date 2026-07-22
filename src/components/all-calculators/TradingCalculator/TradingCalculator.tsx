import React from "react";
import GetCalculators from "./GetCalculators";
import type { GetCalculatorsContent } from "./GetCalculatorsContent";
import type { TradingProfitCalculatorContent } from "@/components/trading-calculator/tradingProfitCalculatorContent";

interface Props {
  content?: GetCalculatorsContent;
  formContent?: TradingProfitCalculatorContent;
}

export default function TradingCalculator({ content, formContent }: Props = {}) {
  return <GetCalculators content={content} formContent={formContent} />;
}
