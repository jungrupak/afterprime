import Link from "next/link";
import styles from "./Page.module.scss";
import btnStyle from "@/components/ui/ui.module.scss";

interface VsSymbolHeroProps {
  brokerName: string;
  symbol: string;
  apCostPerLot: number;
  compCostPerLot: number;
  savingPct: number;
  savingPer100Lots: number;
}

export default function VsSymbolHero({
  brokerName,
  symbol,
  apCostPerLot,
  compCostPerLot,
  savingPct,
  savingPer100Lots,
}: VsSymbolHeroProps) {
  const sym = symbol.toUpperCase();

  return (
    <section className={`${styles.innerBannerSection}`}>
      <div className="ap_container_small flex max-md:flex-col gap-10 items-center h-full w-full">
        <div className="apBannerContent md:max-w-[860px]">
          <h1 className="h1-size mt-10 lg:mt-15">
            <span className="font-[600]">Afterprime vs {brokerName}:</span>{" "}
            {sym}
          </h1>
          <p
            className="paragraph lg:mt-8 opacity-80 max-w-[680px]"
            style={{ fontWeight: "300" }}
          >
            {brokerName} costs <strong>${compCostPerLot.toFixed(2)}/lot</strong>{" "}
            on {sym}. Afterprime costs{" "}
            <strong>${apCostPerLot.toFixed(2)}/lot</strong> —{" "}
            {savingPct.toFixed(1)}% lower, zero commission.
          </p>
          <div className="mt-8 md:mt-12">
            <Link
              href={`/trade/${sym}`}
              className={`${btnStyle.ap_button} ${btnStyle.primary} ${btnStyle.regular}`}
            >
              Start Trading {sym}
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

            <div className={`${styles.cardItem} py-4!`}>
              <div className={styles.statPillLabel}>You save per 100 lots</div>
              <div
                className={`${styles.statPillValue} ${styles.statPillSaving}`}
              >
                ${savingPer100Lots.toFixed(0)}{" "}
                <span className={`text-[14px] ${styles.statPillLabel}`}>
                  @Afterprime
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
