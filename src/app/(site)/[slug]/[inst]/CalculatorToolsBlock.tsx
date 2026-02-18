"use client";

import Link from "next/link";
const calCardData = [
  {
    name: "Position Size & Risk Calculator",
    pageUrl: "/calculators/position-size-calculator",
  },
  {
    name: "Trading Cost Calculator",
    pageUrl: "/calculators/cost-savings-calculator",
  },
  {
    name: "Margin & Leverage Calculator",
    pageUrl: "/calculators/margin-calculator",
  },
  {
    name: "Swap / Overnight Cost Calculator",
    pageUrl: "/calculators/swap-calculator",
  },
  {
    name: "Pip / Lot Value Calculator",
    pageUrl: "/calculators/pip-value-calculator",
  },
];

interface CalculatorToolsBlockProps {
  instrumentSlug?: string;
}

export default function CalculatorToolsBlock({
  instrumentSlug,
}: CalculatorToolsBlockProps) {
  return (
    <>
      <h2>Run the Numbers Yourself</h2>
      <p>
        Use Afterprime’s professional <a href="/calculators"><u>trading calculators</u></a> to model position sizing,
        margin requirements, swap impact, and true trading cost for{" "}
        {instrumentSlug}.
      </p>
      <p>
        <strong>Available Calculators</strong>
      </p>
      <div className={`grid md:grid-cols-5 gap-5 mb-[clamp(25px_,5vw_,40px)]`}>
        {calCardData.map((item, index) => (
          <Link
            key={index}
            href={item.pageUrl}
            target="_blank"
            className={`flex justify-center items-center leading-[1.4] text-center text-[18px] font-semibold py-[clamp(30px,5vw,40px)] px-[clamp(25px,5vw,40px)] bg-[rgba(255_,255_,255_,.08)] hover:bg-[rgba(255_,255_,255_,.12)]`}
          >
            {item.name}
          </Link>
        ))}
        <div className={`text-[16px] col-span-full opacity-65`}>
          Calculators default to Afterprime trading specifications.
        </div>
      </div>
    </>
  );
}
