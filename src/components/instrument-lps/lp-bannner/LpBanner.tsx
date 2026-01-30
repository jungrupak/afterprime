"use client";
import styles from "./LpBanner.module.scss";
import { getBrokerCompareData } from "@/lib/getBrokersToCompare";
import { useQuery } from "@tanstack/react-query";
import TypeformButton from "../typeform-btn/typeForm";
import GoogleReviewBadge from "@/components/ui/GoogleReviewBadge";

//####
interface BannerTitle {
  instrument?: string;
}

//##
const CACHE_TTL = 2 * 60 * 1000; // 2 minutes feed cache

export default function LPBanner({ instrument }: BannerTitle) {
  //####
  const { data, isLoading, error } = useQuery({
    queryKey: ["cost-comparison", instrument],
    queryFn: () => getBrokerCompareData(instrument!),
    enabled: !!instrument, //prevents undefined crash
    staleTime: CACHE_TTL, // fresh for 2 minutes
    gcTime: 10 * 60 * 1000, // cache stays for 10 minutes
  });
  //####

  const industryVsApAvgPct = data?.industryVsAfterprimeAvgPct ?? 0;
  const rebatePerLot = data?.rebate?.rebate_usd_per_lot ?? 0;

  //add saving percentage per broker savingPercentage

  const afterprimeCostPerLot = data?.brokers[0]?.costPerLot ?? 0;

  const allInCostAfterprime = afterprimeCostPerLot - rebatePerLot;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load data</div>;

  return (
    <>
      <section
        className={`${styles.lpBanner} max-md:mt-10 md:pb-0! md:h-[100vh]`}
      >
        {/* grain bg effect */}
        <div className="grainy_bg"></div>
        {/* grain bg effect */}
        <div
          className={`ap_container_small grid grid-cols-2 gap-8 md:gap-20 relative z-1 flex items-center h-full`}
        >
          <div className={`${styles.bannerLeftItem} max-md:col-span-2`}>
            <h1 className={`max-md:mb-5`}>
              Trade {instrument} <br />
              <span>
                Save Up to {industryVsApAvgPct.toFixed(2)}% vs Most Brokers
              </span>
            </h1>
            <div className={`${styles.listUi} md:mt-12`}>
              <ul>
                <li>
                  <b>${allInCostAfterprime.toFixed(2)}</b> All-In-Cost/lot
                </li>
                <li>
                  <b>${rebatePerLot.toFixed(2)}</b> /lot in Flow Rewards{" "}
                  <sup>TM</sup>
                </li>
                <li>Savings Compound With Volume</li>
              </ul>
            </div>

            <div className={`mt-8 md:mt-15`}>
              <TypeformButton
                buttonText="Apply for Invite code"
                size="Large"
                varient="primary"
              />
            </div>

            <div
              className={`flex flex-wrap gap-10 mt-5 max-md:justify-center max-md:text-center md:mt-10`}
            >
              <div
                className={`opacity-64 text-[14px] max-md:flex-[0_,0_,100%]`}
              >
                Invite only access for approved trading profiles.
                <br /> *Data Verified by ForexBenchmark
              </div>
              <div className={`max-md:flex-[0_,0_,100%]`}>
                <GoogleReviewBadge />
              </div>
            </div>
          </div>

          {/* <div
            className={`${styles.bannerLeftItem} max-md:col-span-2 flex justify-end`}
          >
            <div className="w-full md:w-[400px]">
              <SinglePricing />
            </div>
          </div> */}
        </div>
      </section>
    </>
  );
}
