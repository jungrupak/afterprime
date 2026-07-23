"use client";

import Link from "next/link";
import {
  calculatorToolsBlockContent,
  type CalculatorToolsBlockContent,
} from "./CalculatorToolsBlockContent";
import { useLocale } from "@/lib/locale/useLocale";
import { localizeHref } from "@/lib/locale/localizeHref";

// nameKey indexes into content.calculatorNames at render time — the display
// name lives in CalculatorToolsBlockContent.ts so it can be translated;
// pageUrl is never touched by the translation pipeline.
const calCardData = [
  {
    nameKey: "positionSize",
    pageUrl: "/calculators/position-size-calculator",
  },
  {
    nameKey: "tradingCost",
    pageUrl: "/calculators/cost-savings-calculator",
  },
  {
    nameKey: "marginLeverage",
    pageUrl: "/calculators/margin-calculator",
  },
  {
    nameKey: "swapOvernight",
    pageUrl: "/calculators/swap-calculator",
  },
  {
    nameKey: "pipLotValue",
    pageUrl: "/calculators/pip-value-calculator",
  },
] as const;

interface CalculatorToolsBlockProps {
  instrumentSlug?: string;
  content?: CalculatorToolsBlockContent;
}

export default function CalculatorToolsBlock({
  instrumentSlug,
  content = calculatorToolsBlockContent,
}: CalculatorToolsBlockProps) {
  const locale = useLocale();

  return (
    <>
      <h2>{content.heading}</h2>
      <p>
        {content.descriptionPrefix}{" "}
        <a href={localizeHref("/calculators", locale)}>
          <u>{content.calculatorsLinkText}</u>
        </a>{" "}
        {content.description.replace("{sym}", instrumentSlug ?? "")}
      </p>
      <p>
        <strong>{content.availableCalculators}</strong>
      </p>
      <div className={`grid md:grid-cols-5 gap-5`}>
        {calCardData.map((item, index) => (
          <Link
            key={index}
            href={localizeHref(item.pageUrl, locale)}
            target="_blank"
            className={`flex justify-center items-center leading-[1.4] text-center text-[18px] font-semibold py-[clamp(30px,5vw,40px)] px-[clamp(25px,5vw,40px)] bg-[rgba(255_,255_,255_,.08)] hover:bg-[rgba(255_,255_,255_,.12)]`}
          >
            {content.calculatorNames[item.nameKey]}
          </Link>
        ))}
        <div className={`text-[16px] col-span-full opacity-65`}>
          {content.footnote}
        </div>
      </div>
    </>
  );
}
