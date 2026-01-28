import React from "react";
import styles from "./CostBreakdown.module.scss";

interface BreakdownList {
  breakdowns?: {
    volume?: string;
    raw_spread?: string;
    flow_rewards?: string;
    effective_net_cost?: string;
  };
}

interface Breakdown {
  instrument?: string;
  breakDownTableLists: BreakdownList[];
}

export default function CostBreakdown({
  breakDownTableLists,
  instrument,
}: Breakdown) {
  if (!breakDownTableLists) return null;
  return (
    <section className={`md:py-20!`}>
      {/* grain bg effect */}
      <div className="grainy_bg"></div>
      {/* grain bg effect */}

      <div className={`ap_container_small relative z-1 w-full`}>
        <h2 className={`text-center font-semibold max-md:leading-[1.2]`}>
          {instrument} All-In-Cost (Example)
        </h2>
        <div className={`${styles.costBreakDownTable}`}>
          <table cellPadding={"0"} cellSpacing={"0"} border={0}>
            <thead>
              <tr>
                <th>Volume</th>
                <th>Raw Spread</th>
                <th>Flow Rewards<sup>TM</sup></th>
                <th>Net Cost</th>
              </tr>
            </thead>
            <tbody>
                <tr>
                  <td>50</td>
                  <td>xyz pips</td>
                  <td>$dynxyz/lot</td>
                  <td>XYZ</td>
                </tr>
            </tbody>
          </table>
        </div>

        <div className={`text-[14px] w-full text-center mt-10 opacity-65`}>
          Flow Rewards<sup>TM</sup> are credited per traded lot (round turn) and recorded as
          a separate PnL line.
        </div>
      </div>
    </section>
  );
}
