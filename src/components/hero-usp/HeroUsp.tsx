import GoogleReviewBadge from "../ui/GoogleReviewBadge";
import styles from "./HeroUsp.module.scss";

const DynamicData = async () => {
  try {
    const res = await fetch(`https://feed.afterprime.com/api/costs`, {
      next: { revalidate: 1800 },
    });
    if (!res.ok) {
      return "Failed to load Data from api source";
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Failded to fetch data:", err);
  }
};
const dynamicData = await DynamicData();

export default async function HeroUsp({ text }: { text: string }) {
  const { top10VsAfterprimeAvgPct, industryVsAfterprimeAvgPct } = dynamicData;
  const top10Saving = Math.round(top10VsAfterprimeAvgPct ?? 0);
  const averageVsInds = Math.round(industryVsAfterprimeAvgPct ?? 0);

  return (
    <>
      <div
        className={`${styles.heroUspContainer} mx-auto lg:absolute left-0 bottom-0 z-5`}
      >
        <div
          className={`${styles.HeroUps} ap_container_small py-8 md:pt-6 md:pb-15 flex-col flex-wrap flex md:flex-row items-center justify-center gap-y-5 gap-x-5 lg:gap-x-12 px-5 mx:px-0`}
        >
          <div className={`${styles.upsItem}`}>
            <div className={`${styles.value}`}>#1</div>
            <div className={`${styles.descp}`}>
              Lowest All-in Costs Worldwide.
              <br />
              Independently Benchmarked.
            </div>
          </div>
          <div className={`${styles.upsItem}`}>
            <div className={`${styles.value}`}>{top10Saving}%</div>
            <div className={`${styles.descp}`}>
              Lower Cost vs <br />
              Top 10 Average
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
            className={`${styles.note} text-[14px] absolute bottom-5 opacity-55 max-md:static leading-[1.4]`}
            //style={{ opacity: note ? "0.55" : "0" }}
          >
            {text}. {""}
            (Afterprime Ltd is a licensed CFD Broker - FSA #SD057)
          </p>
        </div>
      </div>
    </>
  );
}
