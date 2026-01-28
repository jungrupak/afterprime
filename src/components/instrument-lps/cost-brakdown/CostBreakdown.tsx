import React from "react";
import styles from "./CostBreakdown.module.scss";
import Link from "next/link";
export default function CostBreakdown() {
  return (
    <section className={`md:py-20!`}>
      {/* grain bg effect */}
      <div className="grainy_bg"></div>
      {/* grain bg effect */}

      <div className={`ap_container_small relative z-1 w-full`}>
        <h2 className={`text-center font-semibold max-md:leading-[1.2]`}>
          AUDUSD All-In-Cost Breakdown
        </h2>
        <div className={`${styles.costBreakDownTable}`}>
          <table cellPadding={"0"} cellSpacing={"0"} border={0}>
            <thead>
              <tr>
                <th>Volume</th>
                <th>Raw Spread</th>
                <th>
                  Flow Rewards <sup>TM</sup>
                </th>
                <th>Effective Net Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>50 lots</td>
                <td>Approximately 22 USD</td>
                <td>25 USD</td>
                <td>
                  Approx. <span>-3 USD</span>
                </td>
              </tr>
              <tr>
                <td>200 lots</td>
                <td>88 USD</td>
                <td>100 USD</td>
                <td>
                  <span>-12 USD</span>
                </td>
              </tr>
              <tr>
                <td>1000 lots</td>
                <td>440 USD</td>
                <td>500 USD</td>
                <td>
                  <span>-60 USD</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={`text-[14px] w-full text-center mt-10 opacity-65`}>
          Flow Rewards<sup>TM</sup> are credited per traded lot and recorded as
          a separate PnL line.
        </div>
      </div>
    </section>
  );
}
