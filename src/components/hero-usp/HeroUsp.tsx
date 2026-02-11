"use client";

import GoogleReviewBadge from "../ui/GoogleReviewBadge";
import styles from "./HeroUsp.module.scss";
import { Loader } from "../Loading/Loading";
import { useState, useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

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
  text?: string;
}

interface ReceiveText {
  text?: string;
}

interface ApiResponse {
  brokers?: [];
  secondBestVsAfterprimePct?: number;
  top10VsAfterprimeAvgPct?: number;
  industryVsAfterprimeAvgPct?: number;
}

export default function HeroUsp({ text }: ReceiveText) {
  const [note, setNote] = useState(false);
  const { data, isLoading, error } = useQuery<ApiResponse>({
    queryKey: ["compareCost"],
    queryFn: async () => {
      const res = await axios.get("/api/compare");
      return res.data;
    },
    staleTime: 1000 * 60 * 480,
  });

  useEffect(() => {
    const showNote = setTimeout(() => {
      setNote(true);
    }, 1500);
    return () => clearTimeout(showNote);
  }, []);

  if (isLoading)
    return (
      <div className="text-center mt-10 relative z-2">
        <Loader />
      </div>
    );
  if (error)
    return (
      <div className="text-center mt-10 text-red">
        Error while fetching Compare Data...
      </div>
    );

  const dataSaving = data?.secondBestVsAfterprimePct?.toFixed(1);
  const top10Saving = Math.round(data?.top10VsAfterprimeAvgPct || 0);
  const averageVsInds = Math.round(data?.industryVsAfterprimeAvgPct || 0);

  return (
    <>
      <div
        className={`${styles.HeroUps} lg:absolute left-0 bottom-0 z-5 py-8 md:pt-13 md:pb-15 px-10 flex-col flex-wrap flex md:flex-row items-center justify-center gap-y-5 gap-x-5 lg:gap-x-25`}
      >
        <div className={`${styles.upsItem}`}>
          <div className={`${styles.value}`}>#1</div>
          <div className={`${styles.descp}`}>
            Lowest All-in Costs Worldwide.
            <br />
            Independently Benchmarked
          </div>
        </div>
        <div className={`${styles.upsItem}`}>
          <div className={`${styles.value}`}>{top10Saving}%</div>
          <div className={`${styles.descp}`}>
            Lower Cost vs <br />
            Top 10
          </div>
        </div>
        <div className={`${styles.upsItem}`}>
          <div className={`${styles.value}`}>{averageVsInds}%</div>
          <div className={`${styles.descp}`}>
            Lower Cost vs <br />
            Industry Average
          </div>
        </div>
        <div className={`hero-usp-badge`}>
          <GoogleReviewBadge />
        </div>
        <p
          className={`${styles.note} text-[14px] absolute bottom-5 opacity-55 max-md:static`}
          style={{ opacity: note ? "0.55" : "0" }}
        >
          {text}
        </p>
      </div>
    </>
  );
}
