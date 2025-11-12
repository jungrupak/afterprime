"use client";

import GoogleReviewBadge from "../ui/GoogleReviewBadge";
import { getCompareData } from "@/lib/getCompareData";
import { useState, useEffect } from "react";
import styles from "./HeroUsp.module.scss";
import { Loader } from "../Loading/Loading";

interface BrokerObject {
  broker?: string;
  symbol?: string;
  cost?: number | null;
  costPerLot?: number | null;
  savingPercentage?: number | null;
}

interface CompareDataType {
  brokers?: BrokerObject[];
  secondBestVsAfterprimePct?: number | null;
  top10VsAfterprimeAvgPct?: number | null;
  industryVsAfterprimeAvgPct?: number | null;
}

// ✅ Persisted cache outside component
let cachedData: CompareDataType | null = null;

export default function HeroUsp() {
  const [data, setData] = useState<CompareDataType | null>(cachedData);
  const [visible, setVisible] = useState(cachedData ? true : false);

  //handeling data cached and pull updated data as per condition##
  useEffect(() => {
    if (cachedData) {
      setData(cachedData); // show cached immediately
    }
    getCompareData().then((res) => {
      cachedData = res; // update cache
      setData(res); // refresh with new data
    });
  }, []);

  useEffect(() => {
    if (!data) return;

    const timer = setTimeout(() => {
      setVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [data]);

  const secondBest = data?.secondBestVsAfterprimePct?.toFixed(1);
  const industryAverage = data?.industryVsAfterprimeAvgPct?.toFixed(1);

  return (
    <>
      {!visible && (
        <div
          className={`${styles.HeroUps} md:absolute left-0 bottom-0 z-5 py-8 md:py-13 px-10 flex-col flex-wrap flex md:flex-row justify-center gap-10 md:gap-30`}
        >
          <Loader />
        </div>
      )}
      <div
        className={`${styles.HeroUps} md:absolute left-0 bottom-0 z-5 py-8 md:py-13 px-10 flex-col flex-wrap flex md:flex-row justify-center gap-10 md:gap-30`}
        style={{ opacity: visible ? 1 : 0 }}
      >
        <div className={`${styles.upsItem}`}>
          <div className={`${styles.value}`}>#1</div>
          <div className={`${styles.descp}`}>
            Verified All-In Costs
            <br />
            Globally
          </div>
        </div>
        <div className={`${styles.upsItem}`}>
          <div className={`${styles.value}`}>{secondBest}%</div>
          <div className={`${styles.descp}`}>
            Saving vs 2nd
            <br />
            Best
          </div>
        </div>
        <div className={`${styles.upsItem}`}>
          <div className={`${styles.value}`}>{industryAverage}%</div>
          <div className={`${styles.descp}`}>
            Saving vs Industry
            <br />
            Avg.
          </div>
        </div>
        <div className={`hero-usp-badge`}>
          <GoogleReviewBadge />
        </div>
        {/* <p className="text-[14px] absolute bottom-5 opacity-48">
        All Data Verified by ForexBenchmark: Previous 7 Days | Day Range | All
        Pairs | Spread+Comms.
      </p> */}
      </div>
    </>
  );
}
