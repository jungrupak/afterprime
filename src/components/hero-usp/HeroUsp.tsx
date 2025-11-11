"use client";

import GoogleReviewBadge from "../ui/GoogleReviewBadge";
import { getCompareData } from "@/lib/getCompareData";
import { useState, useEffect } from "react";
import styles from "./HeroUsp.module.scss";
import { Loader } from "../Loading/Loading";
import { clearTimeout } from "timers";

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

export default function HeroUsp() {
  const [data, setData] = useState<CompareDataType | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    getCompareData().then(setData);
  }, []);

  useEffect(() => {
    if (data) {
      const timer = setTimeout(() => {
        setVisible(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [data]);

  if (!data)
    return (
      <div className="py-10 text-center relative z-4">
        <Loader />
      </div>
    );
  const { secondBestVsAfterprimePct, industryVsAfterprimeAvgPct } = data;

  return (
    <div
      className={`${styles.HeroUps} md:absolute left-0 bottom-0 z-5 py-8 md:py-13 px-10 flex-col flex-wrap flex md:flex-row justify-center gap-10 md:gap-30 transition-opacity duration-700`}
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
        <div className={`${styles.value}`}>
          {secondBestVsAfterprimePct?.toFixed(1)}%
        </div>
        <div className={`${styles.descp}`}>
          Saving vs 2nd
          <br />
          Best
        </div>
      </div>
      <div className={`${styles.upsItem}`}>
        <div className={`${styles.value}`}>
          {industryVsAfterprimeAvgPct?.toFixed(1)}%
        </div>
        <div className={`${styles.descp}`}>
          Saving vs Industry
          <br />
          Avg.
        </div>
      </div>
      <div className={`hero-usp-badge`}>
        <GoogleReviewBadge />
      </div>
    </div>
  );
}
