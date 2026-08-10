import TypeformButton from "@/components/ui/typeForm";
import styles from "./TradingDowntime.module.scss";
import SectionHeading from "@/components/ui/SectionHeading";

export default function TradingDowntime() {
  return (
    <section className={`py-[clamp(40px_,10vw_,60px)]! compact-section`}>
      <div className="ap_container_small">
        <SectionHeading
          heading="Scheduled Trading Downtime – Crypto Pairs"
          subHeading=""
        />

        <div className={`${styles.tableWrapper} mb-8 md:mb-12`}>
          <table className={styles.compareTable}>
            <thead>
              <tr>
                <th>Sundays</th>
                <th>Wednesdays</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>05:00-05:15 Server time </td>
                <td>13:00-14:00 Server time </td>
              </tr>
              <tr>
                <td>
                  ADAUSD, BCHUSD, BTCUSD, ETHUSD, LTCUSD, XLMUSD, XRPUSD, XTZUSD
                </td>
                <td>
                  ATOMUSD, AVAXUSD, BATUSD, BNBUSD, COMPUSD, CRVUSD, DOGEUSD,
                  DOTUSD, LINKUSD, SOLUSD, UNIUSD
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <TypeformButton
            buttonText="Get Invite Code"
            signupNowText="Signup Now"
            size="Regular"
          />
        </div>
      </div>
    </section>
  );
}
