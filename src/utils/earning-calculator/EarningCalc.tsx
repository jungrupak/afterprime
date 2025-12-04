"use client";
import Btn from "@/components/ui/Button";
import { useEffect, useState } from "react";
import type { SymbolTraded } from "@/types/symbolTraded";
import styles from "./style.module.scss";

export function EarningCalc() {
  const [rebates, setRebates] = useState<SymbolTraded[]>([]);
  const [selectedSymbol, setSelectedSymbol] = useState<string>(""); // 🆕 keep track of selected symbol
  const [lotTradedValue, setLotTradedValue] = useState<number | "">(100); // default 100 lots
  const [rebatePerLot, setRebatePerLot] = useState<number | null>(null);
  const [result, setResult] = useState<number>(0);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/rebates`);
        const data = await res.json();
        if (data.error) {
          setError(data.error);
        } else {
          setRebates(data);

          // Set default Symbol Traded if CADCHF exists
          const defaultSymbol = data.find(
            (s: SymbolTraded) => s.symbol === "CADCHF"
          );
          if (defaultSymbol) {
            setSelectedSymbol(defaultSymbol.symbol);
            setRebatePerLot(defaultSymbol.rebate_usd_per_lot);
          } else if (data.length > 0) {
            // fallback to first symbol
            setSelectedSymbol(data[0].symbol);
            setRebatePerLot(data[0].rebate_usd_per_lot);
          }
        }
      } catch (err) {
        console.error("Failed to fetch rebates:", err);
      }
    }
    fetchData();
  }, []);

  // Recalculate result when defaults are set
  useEffect(() => {
    if (lotTradedValue && rebatePerLot) {
      setResult((rebatePerLot ?? 0) * (lotTradedValue || 0) * 60);
    }
  }, [lotTradedValue, rebatePerLot]);

  function calculateEarning() {
    return (rebatePerLot ?? 0) * (lotTradedValue || 0) * 60;
  }

  const handleOnChangeTradeLot = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const numberValue = Number(inputValue);

    if (isNaN(numberValue) || numberValue <= 0) {
      setError("Invalid input, supports only numbers");
      setLotTradedValue("");
    } else {
      setError("");
      setLotTradedValue(numberValue);
    }
  };

  const handleSymbolChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSymbol = e.target.value;
    const selected = rebates.find((s) => s.symbol === newSymbol);
    setSelectedSymbol(newSymbol);
    setRebatePerLot(selected ? selected.rebate_usd_per_lot : null);
  };

  return (
    <>
      <h4 className="text-[20px] font-[700] opacity-80">
        Calculate Flow Earnings :
      </h4>

      <div className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-8 items-start">
        {/* LOT TRADED */}
        <div>
          <label>Lots Traded per month:</label>
          <input
            type="text"
            id="lotTraded"
            name="lottraded"
            placeholder="Lot Traded/ month"
            className={`${styles.customInput} w-full mt-5`}
            value={lotTradedValue}
            onChange={handleOnChangeTradeLot}
          />
          {error && (
            <span className="text-red-500 block mt-4 text-[12px]">{error}</span>
          )}
        </div>

        {/* SYMBOL TRADED */}
        <div>
          <label>Symbol Traded:</label>
          <select
            className={`${styles.customSelect} block mt-5 w-full`}
            value={selectedSymbol}
            onChange={handleSymbolChange}
          >
            {rebates.map((symbol, index) => (
              <option key={index} value={symbol.symbol}>
                {symbol.symbol}
              </option>
            ))}
          </select>
        </div>

        {/* BUTTON */}
        <div className="self-start md:mt-[45px] max-md:col-span-2">
          <Btn
            size="small"
            varient="primary-ghost"
            isArrowVisible={true}
            onclick={() => setResult(calculateEarning())}
            className="w-full"
          >
            Calculate
          </Btn>
        </div>
      </div>

      {/* RESULT */}
      <div className="mt-8 text-[18px] font-[600] max-md:text-center">
        In 5 years, your Flow Earnings could be worth:{" "}
        <span
          className="inline-block md:ml-15 text-[24px] font-[700]"
          style={{ color: "var(--secondary-color)" }}
        >
          ${result}
        </span>
      </div>

      <div className="bg-white py-5 px-10 note_box text-center mt-10">
        Afterprime 2.0 smart execution can capture up to $3 saved per lot traded
        and compound into thousands in additional earnings over time.
      </div>
    </>
  );
}
