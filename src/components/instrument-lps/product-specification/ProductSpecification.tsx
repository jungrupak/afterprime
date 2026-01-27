import React from "react";
import styles from "./ProductSpecification.module.scss";
import Link from "next/link";
export default function ProductSpecification() {
  return (
    <section className={`md:py-20!`}>
      {/* grain bg effect */}
      <div className="grainy_bg"></div>
      {/* grain bg effect */}

      <div className={`ap_container_small relative z-1 w-full`}>
        <h2 className={`text-center font-semibold max-md:leading-[1.2]`}>
          AUDUSD Trading Specification
        </h2>
        <div className={`${styles.costBreakDownTable}`}>
          <table cellPadding={"0"} cellSpacing={"0"} border={0}>
            <tbody>
              <tr>
                <td>Asset Class</td>
                <td>Forex</td>
              </tr>
              <tr>
                <td>Product type</td>
                <td>Perpetual spot FX</td>
              </tr>
              <tr>
                <td>Average spread</td>
                <td>4.4 points, 0.044 pips</td>
              </tr>
              <tr>
                <td>Commission</td>
                <td>0 USD per lot</td>
              </tr>
              <tr>
                <td>
                  Flow Rewards<sup>TM</sup> per lot
                </td>
                <td>Up to 0.50 USD</td>
              </tr>
              <tr>
                <td>Execution speed</td>
                <td>Less than 1 millisecond</td>
              </tr>
              <tr>
                <td>Contract size</td>
                <td>100,000</td>
              </tr>
              <tr>
                <td>Minimum lot</td>
                <td>0.01</td>
              </tr>
              <tr>
                <td>Maximum lots</td>
                <td>200</td>
              </tr>
              <tr>
                <td>Lot step</td>
                <td>0.01</td>
              </tr>
              <tr>
                <td>Leverage</td>
                <td>Up to 1:400</td>
              </tr>
              <tr>
                <td>Swap type & 3-Day Swap</td>
                <td>Points based, Wednesday</td>
              </tr>
              <tr>
                <td>Trading hours</td>
                <td>Monday to Friday 00:00 to 23:59 GMT plus 2</td>
              </tr>
              <tr>
                <td>Platforms supported</td>
                <td>MT4, MT5, WebTrader, TraderEvolution, FIX API</td>
              </tr>
              <tr>
                <td>Licensing and regulation</td>
                <td>
                  Afterprime Ltd (Seychelles company registration number
                  8426189-1) is a Securities Dealer, authorised by the Financial
                  Service Authority (FSA) with license number SD057
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
