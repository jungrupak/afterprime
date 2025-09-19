"use client";
import Btn from "@/components/ui/Button";
import { GetRebateData } from "@/data/api-rebate";
import { useEffect, useState, useRef } from "react";

//lets define whats our data object interface
export interface Rebate {
  symbol: string;
  product: string;
  rebate_usd_per_lot: number;
  effective_from: string;
  effective_to: string;
}
//ends

export function EarningCalc() {
  const [rebates, setRebates] = useState<Rebate[]>([]);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    const fetchData = async () => {
      try {
        const data = await GetRebateData(); // assume returns Rebate[]
        if (mountedRef.current) setRebates(data);
      } catch (err) {
        console.error("Failed to fetch rebates:", err);
      }
    };
    // run immediately
    fetchData();
    // schedule refresh every 18h
    const intervalId = setInterval(fetchData, 18 * 60 * 60 * 1000);

    return () => {
      mountedRef.current = false; // mark component as unmounted
      clearInterval(intervalId); // stop refresh
    };
  }, []);

  const [lotTradedValue, setLotTradedValue] = useState<number>(0);
  const [rebatePerLot, setRebatePerLot] = useState<number | null>();
  const [result, setResult] = useState<number>(0);
  const [error, setError] = useState<string>("");

  function calculateEarning() {
    return (rebatePerLot ?? 0) * lotTradedValue * 60;
  }

  const handleOnChangeTradeLot = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numberValue = Number(value);

    if (!value || isNaN(numberValue) || numberValue <= 0) {
      setError("Invalid input, Supports only numbers");
      setLotTradedValue(0);
    } else {
      setError("");
      setLotTradedValue(numberValue);
    }
  };

  return (
    <>
      <h4 className="text-[20px] font-[700] opacity-80">
        Calculate Flow Earnings :
      </h4>
      <div className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(175px,1fr))] gap-8 items-start">
        <div className="">
          <label>Lots Traded per month:</label>
          <input
            type="number"
            id="lotTraded"
            name="lottraded"
            placeholder="Lot Traded"
            className="w-full mt-5"
            value={lotTradedValue}
            onChange={handleOnChangeTradeLot}
          />
          {error && (
            <span className="text-red-500 block mt-4 text-[12px]">{error}</span>
          )}
        </div>
        <div className="">
          <label>Symbol Traded:</label>

          <select
            className="block mt-5 w-full"
            onChange={(e) => setRebatePerLot(Number(e.target.value))}
          >
            <option value="">Select</option>
            {rebates.map((symbol, index) => (
              <option key={index} value={symbol.rebate_usd_per_lot}>
                {symbol.symbol}
              </option>
            ))}
          </select>
        </div>
        <div className="self-start md:mt-[45px]">
          <Btn
            size="small"
            varient="primary-ghost"
            isArrowVisible={true}
            onclick={() => setResult(calculateEarning())}
          >
            Calculate
          </Btn>
        </div>
      </div>
      <div className="mt-8 text-[18px] font-[600] max-md:text-center">
        In 5 years, your Flow Earnings could be worth:{" "}
        <span
          className="inline-block md:ml-15 text-[24px] font-[700]"
          style={{ color: "var(--secondary-color)" }}
        >
          ${result.toFixed(2)}
        </span>
      </div>
      {/* <div className="mt-8 text-[18px] font-[600] max-md:text-center">
        In 5 years, you saved this much commission:{" "}
        <span
          className="inline-block md:ml-15 text-[24px] font-[700]"
          style={{ color: "var(--secondary-color)" }}
        >
          $ 156,000
        </span>
      </div> */}

      <div className="bg-white py-5 px-10 note_box text-center mt-10">
        Afterprime 2.0 smart execution can capture up to $3 saved per lot traded
        and compound into thousands in additional earnings over time.
      </div>
    </>
  );
}
