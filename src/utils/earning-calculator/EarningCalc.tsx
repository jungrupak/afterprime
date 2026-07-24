// src/utils/earning-calculator/EarningCalc.tsx
"use client";
import { useEffect, useState } from "react";
import styles from "./style.module.scss";
import { RebateDataType } from "@/lib/rebates";
import { earningCalcContent, type EarningCalcContent } from "./earningCalcContent";

interface Props {
  initialRebates: RebateDataType[];
  content?: EarningCalcContent;
  disclaimerHref?: string;
}

export function EarningCalc({
  initialRebates,
  content = earningCalcContent,
  disclaimerHref = "/trade-execution",
}: Props) {
  const [rebates] = useState<RebateDataType[]>(initialRebates);
  const [selectedSymbol, setSelectedSymbol] = useState<string>("");
  const [lotTradedValue, setLotTradedValue] = useState<number | "">(100);
  const [rebatePerLot, setRebatePerLot] = useState<number | null>(null);
  const [result, setResult] = useState<number>(0);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!rebates || rebates.length === 0) return;
    const defaultSymbol =
      rebates.find((s) => s.symbol === "CADCHF") ?? rebates[0];
    setSelectedSymbol(defaultSymbol.symbol);
    setRebatePerLot(defaultSymbol.rebate_usd_per_lot);
  }, [rebates]);

  const calculateEarning = () => {
    const lot = lotTradedValue === "" ? 0 : lotTradedValue;
    const rebate = rebatePerLot ?? 0;
    return rebate * lot * 60;
  };

  useEffect(() => {
    setResult(calculateEarning());
  }, [lotTradedValue, rebatePerLot, selectedSymbol]);

  const handleOnChangeTradeLot = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const num = Number(value);
    if (value === "") {
      setLotTradedValue("");
      return;
    }
    if (isNaN(num) || num <= 0) {
      setError(content.invalidInput);
      return;
    }
    setError("");
    setLotTradedValue(num);
  };

  const handleSymbolChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sym = e.target.value;
    setSelectedSymbol(sym);
    const found = rebates.find((s) => s.symbol === sym);
    setRebatePerLot(found ? found.rebate_usd_per_lot : null);
  };

  return (
    <>
      <h3 className="text-[20px] font-[700] opacity-80">
        {content.heading}
      </h3>

      <div className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-8 items-start">
        {/* LOT TRADED */}
        <div>
          <label>{content.lotsLabel}</label>
          <input
            type="text"
            placeholder={content.lotsPlaceholder}
            className={`${styles.customInput} w-full mt-5`}
            value={lotTradedValue}
            onChange={handleOnChangeTradeLot}
          />
          {error && (
            <span className="text-red-500 block mt-4 text-[12px]">{error}</span>
          )}
        </div>

        {/* SYMBOL */}
        <div>
          <label>{content.symbolLabel}</label>
          <select
            className={`${styles.customSelect} block mt-5 w-full`}
            value={selectedSymbol}
            onChange={handleSymbolChange}
          >
            {rebates.map((symbol) => (
              <option key={symbol.symbol} value={symbol.symbol}>
                {symbol.symbol}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* RESULT */}
      <div className="mt-8 text-[18px] font-[600] max-md:text-center">
        {content.resultPrefix}{" "}
        <span
          className="inline-block md:ml-15 text-[24px] font-[700]"
          style={{ color: "var(--secondary-color)" }}
        >
          ${result}
        </span>
      </div>

      <div className="bg-white py-5 px-10 note_box text-center mt-10">
        Afterprime&apos;s{" "}
        <a href={disclaimerHref}>
          <u>{content.disclaimerLinkText}</u>
        </a>{" "}
        {content.disclaimerSuffix}
      </div>
    </>
  );
}
