import Link from "next/link";
import styles from "./Page.module.scss";
import btnStyle from "@/components/ui/ui.module.scss";
import {
  vsSymbolHeroContent,
  type VsSymbolHeroContent,
} from "./vsSymbolHeroContent";
import { localizeHref } from "@/lib/locale/localizeHref";

interface VsSymbolHeroProps {
  brokerName: string;
  symbol: string;
  apCostPerLot: number;
  compCostPerLot: number;
  savingPct: number;
  savingPer100Lots: number;
  content?: VsSymbolHeroContent;
  locale?: string;
}

export default function VsSymbolHero({
  brokerName,
  symbol,
  apCostPerLot,
  compCostPerLot,
  savingPct,
  savingPer100Lots,
  content: t = vsSymbolHeroContent,
  locale = "en",
}: VsSymbolHeroProps) {
  const sym = symbol.toUpperCase();

  const savingPerlot = compCostPerLot - apCostPerLot;

  return (
    <section className={`${styles.innerBannerSection}`}>
      <div className="ap_container_small flex max-md:flex-col gap-10 items-center h-full w-full">
        <div className="apBannerContent md:max-w-[860px]">
          <h1 className="h1-size mt-10 lg:mt-15">
            <span className="font-[600]">
              {t.heroPrefix} {brokerName}:
            </span>{" "}
            {sym}
          </h1>
          <p
            className="paragraph lg:mt-8 opacity-80 max-w-[680px]"
            style={{ fontWeight: "300" }}
          >
            {brokerName} {t.costLabel}{" "}
            <strong>${compCostPerLot.toFixed(2)}/lot</strong> {t.onLabel} {sym}.{" "}
            {t.afterprimeCostsLabel}{" "}
            <strong>${apCostPerLot.toFixed(2)}/lot</strong>.{" "}
            {savingPerlot > 0 && (
              <>{savingPct.toFixed(1)}{t.lowerZeroCommission}</>
            )}
          </p>
          <div className="mt-8 md:mt-12">
            <Link
              href={localizeHref(`/trade/${sym.toLowerCase()}`, locale)}
              className={`${btnStyle.ap_button} ${btnStyle.primary} ${btnStyle.regular}`}
            >
              {t.startTrading} {sym}
              <svg
                width="11"
                height="17"
                viewBox="0 0 11 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.70063 0.707031L10.8916 8.70703L2.70063 16.707L0.891603 14.9402L7.27355 8.70703L0.891602 2.47388L2.70063 0.707031Z"
                  fill="#fff"
                />
              </svg>
            </Link>
          </div>
        </div>
        <div className={`max-md:w-full`}>
          <div className={`flex flex-col gap-5`}>
            <div
              className={`${styles.cardItem} ${styles.statPillAfterPrime} py-4!`}
            >
              <div className={styles.statPillLabel}>Afterprime {sym}</div>
              <div className={styles.statPillValue}>
                ${apCostPerLot.toFixed(2)}/lot
              </div>
            </div>

            <div className={`${styles.cardItem} py-4!`}>
              <div className={styles.statPillLabel}>
                {brokerName} {sym}
              </div>
              <div className={styles.statPillValue}>
                ${compCostPerLot.toFixed(2)}/lot
              </div>
            </div>

            {savingPerlot > 0 && (
              <>
                <div className={`${styles.cardItem} py-4!`}>
                  <div className={styles.statPillLabel}>
                    {t.youSavePer100Lots}
                  </div>
                  <div
                    className={`${styles.statPillValue} ${styles.statPillSaving}`}
                  >
                    ${savingPer100Lots.toFixed(0)}{" "}
                    <span className={`text-[14px] ${styles.statPillLabel}`}>
                      {t.afterprimeLabel}
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
