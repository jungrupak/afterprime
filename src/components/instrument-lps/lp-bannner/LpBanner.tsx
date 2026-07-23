"use client";
import styles from "./LpBanner.module.scss";
import { getBrokerCompareData } from "@/lib/getBrokersToCompare";
import { useQuery } from "@tanstack/react-query";
import TypeformButton from "../typeform-btn/typeForm";
import GoogleReviewBadge from "@/components/ui/GoogleReviewBadge";
import { useState, useEffect } from "react";
import {
  lpBannerContent,
  type LpBannerContent,
} from "./lpBannerContent";

interface BannerTitle {
  instrument?: string;
  applyButtonText?: string;
  content?: LpBannerContent;
}

const CACHE_TTL = 2 * 60 * 1000;

// ── XAUUSD Banner ────────────────────────────────────────────
function LPBannerXAUUSD({
  applyButtonText,
  content: c = lpBannerContent,
}: BannerTitle) {
  return (
    <section className={`${styles.lpBanner} lp-banner max-md:mt-10 md:pb-0! md:h-[100vh]`}>
      <div className={`ap_container_small grid grid-cols-2 gap-8 md:gap-20 relative z-1 flex items-center h-full`}>
        <div className={`${styles.bannerLeftItem} max-md:col-span-2`}>
          <h1 className={`max-md:mb-5`}>
            {c.xauusd.heading}<br />
            <span>{c.xauusd.subheading}</span>
          </h1>
          <div className={`${styles.listUi} md:mt-12`}>
            <ul>
              <li>{c.xauusd.bullet1}</li>
              <li>{c.xauusd.bullet2}</li>
              <li>{c.xauusd.bullet3}</li>
            </ul>
          </div>
          <div className={`mt-8 md:mt-15`}>
            <TypeformButton
              buttonText={applyButtonText || "Apply for Invite code"}
              size="Large"
              varient="primary"
            />
          </div>
          <div className={`flex flex-wrap gap-10 mt-5 max-md:justify-center max-md:text-center md:mt-10`}>
            <div className={`opacity-64 text-[14px] max-md:flex-[0_,0_,100%]`}>
              {c.inviteOnlyNote}
              <br /> {c.dataVerifiedNote}
            </div>
            <div className={`max-md:flex-[0_,0_,100%]`}>
              <GoogleReviewBadge />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Default Banner (all other instruments) ───────────────────
function LPBannerDefault({
  instrument,
  applyButtonText,
  content: c = lpBannerContent,
}: BannerTitle) {
  const [dynamicContent, setDynamicContent] = useState({
    contentDefault: true,
    contentDataZero: false,
    contentRebateNull: false,
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["cost-comparison", instrument],
    queryFn: () => getBrokerCompareData(instrument!),
    enabled: !!instrument,
    staleTime: CACHE_TTL,
    gcTime: 10 * 60 * 1000,
  });

  const industryVsApAvgPct = data?.industryVsAfterprimeAvgPct ?? 0;
  const rebatePerLot = data?.rebate?.rebate_usd_per_lot ?? 0;

  const afterprimeCostPerLot =
    data?.brokers?.find((b) => b.broker === "Afterprime")?.costPerLot ?? 0;

  const allInCostAfterprime = afterprimeCostPerLot - rebatePerLot;

  useEffect(() => {
    if (industryVsApAvgPct <= 0 && rebatePerLot > 0) {
      setDynamicContent({
        contentDefault: false,
        contentDataZero: true,
        contentRebateNull: false,
      });
    } else if (rebatePerLot === 0) {
      setDynamicContent({
        contentDefault: false,
        contentDataZero: false,
        contentRebateNull: true,
      });
    } else {
      setDynamicContent({
        contentDefault: true,
        contentDataZero: false,
        contentRebateNull: false,
      });
    }
  }, [industryVsApAvgPct, rebatePerLot]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load data</div>;

  return (
    <section className={`${styles.lpBanner} lp-banner max-md:mt-10 md:pb-0! md:h-[100vh]`}>
      <div className={`ap_container_small grid grid-cols-2 gap-8 md:gap-20 relative z-1 flex items-center h-full`}>
        <div className={`${styles.bannerLeftItem} max-md:col-span-2`}>
          {dynamicContent.contentDefault && (
            <>
              <h1 className={`max-md:mb-5`}>
                {c.tradeHeading.replace("{sym}", instrument?.toUpperCase() ?? "")}{" "}
                <br />
                <span>
                  {industryVsApAvgPct.toFixed(2)}
                  {c.default.subtitleSuffix}
                </span>
              </h1>
              <div className={`${styles.listUi} md:mt-12`}>
                <ul>
                  <li>
                    <b>${allInCostAfterprime.toFixed(2)}</b>{" "}
                    {c.default.netCostLabel}
                  </li>
                  <li>
                    <b>${rebatePerLot.toFixed(2)}</b> {c.default.flowRewardsLabel}{" "}
                    <sup>TM</sup>
                  </li>
                  <li>{c.default.bullet3}</li>
                </ul>
              </div>
            </>
          )}

          {dynamicContent.contentDataZero && (
            <>
              <h1 className={`max-md:mb-5`}>
                {c.tradeHeading.replace("{sym}", instrument?.toUpperCase() ?? "")}
                <br />
                <span>{c.dataZero.subtitle}</span>
              </h1>
              <div className={`${styles.listUi} md:mt-12`}>
                <ul>
                  <li>
                    {c.dataZero.getPaidPrefix}
                    {rebatePerLot.toFixed(2)} {c.dataZero.getPaidLabel}
                    <sup>TM</sup>
                  </li>
                  <li>{c.dataZero.bullet2}</li>
                  <li>{c.dataZero.bullet3}</li>
                </ul>
              </div>
            </>
          )}

          {dynamicContent.contentRebateNull && (
            <>
              <h1 className={`max-md:mb-5`}>
                {c.tradeHeading.replace("{sym}", instrument?.toUpperCase() ?? "")}
              </h1>
              <div className={`${styles.listUi} md:mt-12`}>
                <ul>
                  <li>
                    {c.rebateNull.zeroRewardsPrefix}
                    <sup>TM</sup> {c.rebateNull.zeroRewardsSuffix}
                  </li>
                  <li>{c.rebateNull.bullet2}</li>
                  <li>{c.rebateNull.bullet3}</li>
                </ul>
              </div>
            </>
          )}

          <div className={`mt-8 md:mt-15`}>
            <TypeformButton
              buttonText={applyButtonText || "Apply for Invite code"}
              size="Large"
              varient="primary"
            />
          </div>

          <div className={`flex flex-wrap gap-10 mt-5 max-md:justify-center max-md:text-center md:mt-10`}>
            <div className={`opacity-64 text-[14px] max-md:flex-[0_,0_,100%]`}>
              {c.inviteOnlyNote}
              <br /> {c.dataVerifiedNote}
            </div>
            <div className={`max-md:flex-[0_,0_,100%]`}>
              <GoogleReviewBadge />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Entry point ───────────────────────────────────────────────
export default function LPBanner({ instrument, applyButtonText, content }: BannerTitle) {
  if (instrument?.toUpperCase() === "XAUUSD")
    return <LPBannerXAUUSD applyButtonText={applyButtonText} content={content} />;
  return (
    <LPBannerDefault
      instrument={instrument}
      applyButtonText={applyButtonText}
      content={content}
    />
  );
}
