"use client";
import styles from "./TradingCalculator.module.scss";
import Dropdown from "@/components/ui/dropdown/Dropdown";
import Input from "@/components/ui/inputfield/Input";
import Button from "@/components/ui/Button";
import { useState, useEffect, useRef, useMemo } from "react";
import { useLiveQote } from "@/hooks/useLiveQuote";
import { useInstrument } from "@/hooks/useInstruments";
import { getUSDRates } from "@/lib/getUsdRate";
import ProgressLoader from "../ui/ProgressLoader";
import SuggestionInput from "../ui/suggestionInput/SuggestionInput";

interface Price {
  bidPrice: string;
  askPrice: string;
}

interface Results {
  marginLong: number;
  marginShort: number;
  spread: number;
  spreadCost: number;
  pointValue: number;
  swapLongPips: number;
  swapLongValue: number;
  swapShortPips: number;
  swapShortValue: number;
  contract: number;
  point: number;
  minLotSize: number;
  minLotStep: number;
}

export default function TradingCalculator() {
  //#### loader
  const [loading, setLoading] = useState(true);

  //####
  const [snapshotPrice, setSnapshotPrice] = useState<{
    bid: string;
    ask: string;
  } | null>(null);

  //Const Objects Price
  const [price, setPrice] = useState<Price>({
    bidPrice: "",
    askPrice: "",
  });

  //Const Objects Trade (as default values)
  const [trade, setTrade] = useState({
    lotSize: "1.00",
    leverage: "1:100",
    selectedInstrument: "EURUSD",
    accountCurrency: "USD",
    exchangeRate: "1",
    instrumentGroup: "Forex",
  });

  const [inputLength, setInputLength] = useState(0);

  //Const Object Error States
  const [error, setError] = useState({
    inputErrorLot: "",
    inputErrorBid: "",
    inputErrorAsk: "",
  });

  //Results Consts
  const [result, setResult] = useState<Results>({
    marginLong: 0,
    marginShort: 0,
    spread: 0,
    spreadCost: 0,
    pointValue: 0,
    swapLongPips: 0,
    swapLongValue: 0,
    swapShortPips: 0,
    swapShortValue: 0,
    contract: 0,
    point: 0,
    minLotSize: 0,
    minLotStep: 0,
  });

  const accountCurrencies = ["USD", "EUR", "CAD", "JPY", "GBP", "AUD", "SGD"];
  const tradingLeverages =
    trade.instrumentGroup === "Metals" ||
    trade.instrumentGroup === "Commodities" ||
    trade.instrumentGroup === "Energies" ||
    trade.instrumentGroup === "Indices"
      ? ["1:100"]
      : trade.instrumentGroup === "Crypto"
      ? ["1:33"]
      : trade.instrumentGroup === "Stocks"
      ? ["1:5"]
      : ["1:33", "1:50", "1:100", "1:200", "1:400"]; //These are conditional leverage as per instrument category or group

  const snapPricingRef = useRef(false);

  //Trim Leverage Function
  const trimLeverage = (leverage: string) => {
    return leverage.split(":")[1] || leverage;
  };

  //Exchange rate GET from the getUSDRate FC
  const { getUSDRate } = getUSDRates();
  //const rate = getUSDRate("CAD") || 0;
  //console.log("CAD curr:", rate.toFixed(4));
  const handleExchangeRate = (value: string) => {
    const rate = getUSDRate(value);
    const trim = rate?.toFixed(4) || 0;
    if (!rate) return;
    setTrade((prev) => ({
      ...prev,
      exchangeRate: trim.toString(),
    }));
  };
  // ####

  //Get Symbols Lists from live pricing
  const instruments = useLiveQote();
  const { prices } = instruments;
  const symbolArray: string[] = prices.map((item) => item.symbol);

  //Memorize the active instruments price
  const activeLivePrice = useMemo(() => {
    return prices.find((obj) => obj.symbol === trade.selectedInstrument);
  }, [prices, trade.selectedInstrument]);

  //deafault values for bid and asks####
  useEffect(() => {
    if (!activeLivePrice) return;

    // run only once
    if (snapPricingRef.current) return;
    snapPricingRef.current = true;
    const bid = String(activeLivePrice.bestBid);
    const ask = String(activeLivePrice.bestAsk);
    const group = String(activeLivePrice.group?.split("\\")[0]);

    setSnapshotPrice({ bid, ask });
    setPrice({
      bidPrice: bid,
      askPrice: ask,
    });
    setTrade((prev) => ({ ...prev, instrumentGroup: group }));
    //run calculations
  }, [activeLivePrice, trade.selectedInstrument]);

  //Instrument Values on State Change or update in instrument selected items ####

  useEffect(() => {
    if (!activeLivePrice) return;
    const bid = String(activeLivePrice.bestBid);
    const ask = String(activeLivePrice.bestAsk);
    const group = String(activeLivePrice.group?.split("\\")[0]);
    setPrice({
      bidPrice: bid,
      askPrice: ask,
    });
    setTrade((prev) => ({
      ...prev,
      instrumentGroup: group,
    }));

    const getLeverageByGroup = (group: string): string => {
      switch (group) {
        case "Crypto":
          return "1:33";
        case "Stocks":
          return "1:5";
        case "Commodities":
        case "Metals":
        case "Energies":
        case "Indices":
          return "1:100";
        default:
          return "1:100";
      }
    };

    setTrade((prev) => ({
      ...prev,
      leverage: getLeverageByGroup(group),
    }));

    //Set Leverage as per instrument group
  }, [trade.selectedInstrument]);

  //Result Calculation ####
  const selectedCurRate = parseFloat(trade.exchangeRate);
  const activeCurrency = trade.accountCurrency;
  const activeInstrument = trade.selectedInstrument;
  const activeLeverage = parseInt(trimLeverage(trade.leverage));
  const activeLotsize = parseFloat(trade.lotSize) || 0;
  const activeBidPrice = parseFloat(price.bidPrice) || 0.0;
  const activeAskPrice = parseFloat(price.askPrice) || 0.0;

  //Calculation Stuff ################################################################################### Calculation
  //Calculation Stuff ###################################################################################

  const { allIsntruments } = useInstrument();
  const INSTRUMENTS = useMemo(() => {
    return allIsntruments.reduce(
      (acc, inst) => {
        acc[inst.symbol] = {
          pointSize: inst.point,
          tickBookDepth: inst.tickBookDepth,
          contractSize: inst.contractSize,
          swapLong: inst.swapLong,
          swapShort: inst.swapShort,
          volumeMin: inst.volumeMin,
          volumeStep: inst.volumeStep,
        };
        return acc;
      },
      {} as Record<
        string,
        {
          pointSize: number;
          contractSize: number;
          tickBookDepth: number;
          swapLong: number;
          swapShort: number;
          volumeMin: number;
          volumeStep: number;
        }
      >
    );
  }, [allIsntruments]);

  function resultCalc() {
    const instrument = INSTRUMENTS[activeInstrument];
    // Only calculate if all necessary values exist
    if (
      !instrument ||
      !activeLotsize ||
      !activeLeverage ||
      !activeAskPrice ||
      !activeBidPrice
    ) {
      console.warn("Skipping calculation, missing data", {
        activeInstrument,
        instrument,
        activeLotsize,
        activeLeverage,
        activeAskPrice,
        activeBidPrice,
      });
      return;
    }

    const {
      contractSize,
      pointSize,
      swapLong,
      swapShort,
      volumeMin,
      volumeStep,
    } = instrument;

    const fx = selectedCurRate || 1;

    const contractForLot = contractSize * activeLotsize;

    // Calculations in USD
    const marginLongUsd = (contractForLot * activeAskPrice) / activeLeverage;
    const marginShortUsd = (contractForLot * activeBidPrice) / activeLeverage;
    const point = pointSize; //* tickBookDepth;

    const spreadPrice = activeAskPrice - activeBidPrice;
    const spreadPips = spreadPrice / point;

    const pointValueUsd = contractForLot * point;
    const spreadCostUsd = spreadPips * pointValueUsd;

    const swapLongValueUsd = swapLong * pointValueUsd;
    const swapShortValueUsd = swapShort * pointValueUsd;

    const minLot = volumeMin / 10000;
    const minStep = volumeStep / 10000;

    // Convert to account currency
    const marginLong = (marginLongUsd * fx).toFixed(2);
    const marginShort = (marginShortUsd * fx).toFixed(2);
    const spread = spreadPips.toFixed(2);
    const spreadCost = (spreadCostUsd * fx).toFixed(2);
    const pointValue = (pointValueUsd * fx).toFixed(4);
    const swapLongValue = (swapLongValueUsd * fx).toFixed(2);
    const swapShortValue = (swapShortValueUsd * fx).toFixed(2);
    const contract = contractSize;
    const swapLongPips = (instrument?.swapLong).toFixed(2);
    const swapShortPips = (instrument?.swapShort).toFixed(2);
    const tickPoint = point;

    // Set Result as per calculation
    setResult({
      marginLong: Number(marginLong),
      marginShort: Number(marginShort),
      spread: Number(spread),
      spreadCost: Number(spreadCost),
      pointValue: Number(pointValue),
      swapLongPips: Number(swapLongPips),
      swapLongValue: Number(swapLongValue),
      swapShortPips: Number(swapShortPips),
      swapShortValue: Number(swapShortValue),
      contract: contract,
      point: tickPoint,
      minLotSize: minLot,
      minLotStep: minStep,
    });
  }

  //wait untill all data ready before render
  const isDataReady =
    activeCurrency &&
    activeInstrument &&
    activeBidPrice &&
    activeAskPrice &&
    INSTRUMENTS;

  useEffect(() => {
    if (!isDataReady) return;
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    resultCalc();

    return () => clearTimeout(timer);
  }, [activeCurrency, isDataReady]);

  //Change Lot size on Instrument Change
  useEffect(() => {
    const instrument = INSTRUMENTS[activeInstrument];
    // Only calculate if all necessary values exist
    if (
      !instrument ||
      !activeLotsize ||
      !activeLeverage ||
      !activeAskPrice ||
      !activeBidPrice
    )
      return;

    const { volumeMin, volumeStep } = instrument;

    const minLot = volumeMin / 10000;
    const minStep = volumeStep / 10000;

    setResult((prev) => ({
      ...prev,
      minLotSize: minLot,
      minLotStep: minStep,
    }));

    setTrade((prev) => ({ ...prev, lotSize: String(minStep) }));

    if (minStep === 0.01) {
      setTrade((prev) => ({ ...prev, lotSize: String("1.00") }));
    }
    if (minStep === 0.1) {
      setTrade((prev) => ({ ...prev, lotSize: String("1.0") }));
    }
    if (minStep === 1) {
      setTrade((prev) => ({ ...prev, lotSize: String("1") }));
    }
  }, [trade.selectedInstrument]);

  //###############

  function formatNumber(v: number, d: number = 2): string {
    if (!isFinite(v)) return "-";
    return Number(v.toFixed(d)).toLocaleString(undefined, {
      minimumFractionDigits: d,
      maximumFractionDigits: d,
    });
  }

  //Calculation Stuff ################################################################################### Calculation Ends
  //Calculation Stuff ################################################################################### Ends

  //Check Validation Input
  const isValidTradeInput =
    activeLotsize > 0 &&
    activeBidPrice > 0 &&
    activeAskPrice > 0 &&
    activeBidPrice <= activeAskPrice &&
    error.inputErrorAsk === "";

  return (
    <div className={`${styles.pageCalcWrapContainer}`}>
      <div className="grid grid-cols-6 gap-8 md:gap-20">
        {/* Caclulator room */}
        <div className="col-span-6 md:col-span-6 lg:col-span-3">
          <h4 className="text-[18px] font-[600]">
            Trade Settings :{" "}
            <span className="opacity-65 font-[300]">
              Plan your margin, spread cost, and swaps
            </span>
          </h4>
          {/* Display Exchange Rates */}

          <div
            className={`${styles.inputWrapper} grid grid-cols-8 gap-5 mt-10`}
          >
            <div className="md:col-span-2 col-span-4 !z-4">
              <span className="opacity-60 mb-3 block">Account Currency</span>
              <Dropdown
                label={trade.accountCurrency}
                options={accountCurrencies}
                selectedValue={(value) => {
                  setTrade((prev) => ({ ...prev, accountCurrency: value }));
                  handleExchangeRate(value);
                }} //runs callback function and set it's value accordingly i.e "value" here
              />
            </div>
            <div className="md:col-span-3 col-span-4 !z-2">
              <span className="opacity-60 mb-3 block">Instrument</span>
              <SuggestionInput
                label={trade.selectedInstrument}
                options={symbolArray}
                selectedValue={(value) => {
                  setTrade((prev) => ({
                    ...prev,
                    selectedInstrument: value,
                  }));
                  setError({
                    inputErrorLot: "",
                    inputErrorBid: "",
                    inputErrorAsk: "",
                  });
                }} //runs callback function
                listSearch={true}
              />
            </div>
            <div className="md:col-span-3 col-span-4 !z-2">
              <span className="opacity-60 mb-3 block">Leverage</span>
              <Dropdown
                //isDisabled={true}
                label={trade.leverage}
                options={tradingLeverages}
                selectedValue={(value) => {
                  setTrade((prev) => ({ ...prev, leverage: value }));
                }} //runs callback function
              />
            </div>
            <div className="md:col-span-2 col-span-4">
              <span className="opacity-60 mb-3 block">
                Lot Size{" "}
                <span className="text-[10px]">
                  Min Lot: {result.minLotSize}
                </span>
              </span>
              <Input
                type="number"
                value={trade.lotSize}
                steps={String(result.minLotStep)}
                onchange={(value) => {
                  //Snoofing lotsize length
                  const exceedLength =
                    result.minLotStep === 0.01
                      ? 5
                      : result.minLotStep === 0.1
                      ? 4
                      : result.minLotStep === 1
                      ? 2
                      : 5;

                  if (value.length < exceedLength) {
                    setTrade((prev) => ({ ...prev, lotSize: value }));
                  } else {
                    setError((prev) => ({
                      ...prev,
                      inputErrorLot: "Can not exceed max step",
                    }));
                  }

                  if (Number(value) < result.minLotStep) {
                    setError((prev) => ({
                      ...prev,
                      inputErrorLot:
                        "Value cannot be negative, less then minimum and text string",
                    }));
                  } else {
                    setError((prev) => ({
                      ...prev,
                      inputErrorLot: "",
                    })); //clear error msg state
                  }
                }}
                error={error.inputErrorLot}
              />
            </div>
            <div className="col-span-4 md:col-span-3">
              <span className="opacity-60 mb-3 block">Bid Price</span>
              <Input
                type="number"
                value={price.bidPrice}
                steps={"0.00001"}
                onchange={(value) => {
                  setPrice((prev) => ({ ...prev, bidPrice: value }));
                  if (Number(value) < 0) {
                    setError((prev) => ({
                      ...prev,
                      inputErrorBid: "Value cannot be negative",
                    }));
                  } else {
                    setError((prev) => ({ ...prev, inputErrorBid: "" })); //clear error msg state
                  }
                }}
                error={error.inputErrorBid}
              />
            </div>
            <div className="col-span-4 md:col-span-3">
              <span className="opacity-60 mb-3 block">Ask Price</span>
              <Input
                type="number"
                value={price.askPrice}
                steps={"0.00001"}
                onchange={(value) => {
                  setPrice((prev) => ({ ...prev, askPrice: value }));
                  if (value < price.bidPrice) {
                    setError((prev) => ({
                      ...prev,
                      inputErrorAsk: "Value cannot be less than bidPrice",
                    }));
                  } else {
                    setError((prev) => ({ ...prev, inputErrorAsk: "" })); //clear error msg state
                  }
                }}
                error={error.inputErrorAsk}
              />
            </div>
            <div className="col-span-8">
              <Button
                className={`w-full mt-5 ${
                  isValidTradeInput ? "active:scale-95 active:shadow-sm" : ""
                }`}
                varient="primary-ghost"
                onclick={() => {
                  if (isValidTradeInput) {
                    setLoading(true);

                    const timer = setTimeout(() => {
                      setLoading(false);
                    }, 100);

                    resultCalc();

                    return () => clearTimeout(timer);
                  }
                }}
              >
                Calculate
              </Button>

              {/* This is for test preview of what data have been grabbed so far */}
              {/* <h3 className="text-[20px] my-5">
                Calculation Factors: Just for QA and test
              </h3>
              <div>
                {" "}
                Currency Exchange Rate : {selectedCurRate} {activeCurrency}
              </div>
              <div>Active Instrument : {activeInstrument}</div>
              <div>Instrument Group : {trade.instrumentGroup}</div>
              <div> Leverage Value : {activeLeverage}</div>
              <div> Lot Size : {activeLotsize}</div>
              <div> Bid Price : {activeBidPrice}</div>
              <div> Ask Price : {activeAskPrice}</div>

              <div> Point : {result.point}</div>
              <div> Contract Size : {result.contract}</div>
              <div> Swap Long Pips : {result.swapLongPips}</div>
              <div> Swap Long Value : {result.swapLongValue}</div>
              <div> Swap Short Pips : {result.swapShortPips}</div>
              <div> Swap Short Value : {result.swapShortValue}</div> */}
            </div>
          </div>
        </div>

        {/* Result room */}
        <div className="col-span-6 md:col-span-6 lg:col-span-3 !z-0">
          <h4 className="text-[18px] font-[600]">
            Results :{" "}
            <span className="opacity-65 font-[300]">
              based on your selected parameters
            </span>
          </h4>
          <div className="grid grid-cols-12 gap-5 mt-10">
            {/*  */}
            <div className="col-span-6 md:col-span-4 order-1 md:order-1">
              <div className={`${styles.resultCard}`}>
                <span>Margin Long</span>
                <div className="flex items-center gap-1">
                  {loading ? <ProgressLoader /> : result.marginLong}{" "}
                  <span className="text-[14px] opacity-65">
                    {activeCurrency}
                  </span>
                </div>
              </div>
            </div>

            {/*  */}
            <div className="col-span-6 md:col-span-4 order-2 md:order-2">
              <div className={`${styles.resultCard}`}>
                <span>Margin Short</span>
                <div className="flex items-center gap-1">
                  {loading ? <ProgressLoader /> : result.marginShort}{" "}
                  <span className="text-[14px] opacity-65">
                    {activeCurrency}
                  </span>
                </div>
              </div>
            </div>

            {/*  */}
            <div className="col-span-6 md:col-span-4 order-3 md:order-3">
              <div className={`${styles.resultCard}`}>
                <span>Contract Size</span>
                <div className="flex items-center gap-1">
                  {loading ? <ProgressLoader /> : result.contract}
                </div>
              </div>
            </div>

            {/*  */}
            <div className="col-span-12 md:col-span-6 order-5 md:order-4">
              <div className={`${styles.resultCard}`}>
                <span>Spreads</span>
                <div className="flex items-center gap-1">
                  {loading ? (
                    <ProgressLoader />
                  ) : (
                    formatNumber(result.spread, 1)
                  )}{" "}
                  <span className="text-[14px] opacity-65">pips</span> /{" "}
                  {loading ? (
                    <ProgressLoader />
                  ) : (
                    formatNumber(result.spreadCost, 2)
                  )}{" "}
                  <span className="text-[14px] opacity-65">
                    {activeCurrency}
                  </span>
                </div>
              </div>
            </div>

            {/*  */}
            <div className="col-span-6 md:col-span-6 order-4 md:order-5">
              <div className={`${styles.resultCard}`}>
                <span>Point Value</span>
                <div className="flex items-center gap-1">
                  {loading ? (
                    <ProgressLoader />
                  ) : (
                    formatNumber(result.pointValue, 4)
                  )}{" "}
                  <span className="text-[14px] opacity-65">
                    {activeCurrency}
                  </span>
                </div>
              </div>
            </div>

            {/*  */}
            <div className="col-span-12 md:col-span-6 order-6 md:order-6">
              <div className={`${styles.resultCard}`}>
                <span>Swap long</span>
                <div className="flex items-center gap-1">
                  {loading ? <ProgressLoader /> : result.swapLongPips}
                  <span className="text-[14px] opacity-65">pips</span> /
                  {loading ? <ProgressLoader /> : result.swapLongValue}
                  <span className="text-[14px] opacity-65">
                    {activeCurrency}
                  </span>
                </div>
              </div>
            </div>

            {/*  */}
            <div className="col-span-12 md:col-span-6 order-7 md:order-7">
              <div className={`${styles.resultCard}`}>
                <span>Swap Short</span>
                <div className="flex items-center gap-1">
                  {loading ? <ProgressLoader /> : result.swapShortPips}
                  <span className="text-[14px] opacity-65">pips</span> /{" "}
                  {loading ? <ProgressLoader /> : result.swapShortValue}
                  <span className="text-[14px] opacity-65">
                    {activeCurrency}
                  </span>
                </div>
              </div>
            </div>

            {/*  */}
            <div className="col-span-12 text-[14px] order-8 md:order-8 opacity-50">
              Note: Triple swaps are applied on <b>Wednesday</b> for FX and
              metals, and on <b>Friday</b> for all other instruments.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
