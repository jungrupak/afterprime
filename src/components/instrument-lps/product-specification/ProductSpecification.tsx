"use client";
import { useQuery } from "@tanstack/react-query";
import { getBrokerCompareData } from "@/lib/getBrokersToCompare";
import styles from "./ProductSpecification.module.scss";

interface Specification {
  instrument?: string;
}

//##
const CACHE_TTL = 2 * 60 * 1000; // 2 minutes feed cache

export default function ProductSpecification({ instrument }: Specification) {
  //##
  if (!instrument) return;

  //####
  const { data, isLoading, error } = useQuery({
    queryKey: ["cost-comparison", instrument],
    queryFn: () => getBrokerCompareData(instrument!),
    enabled: !!instrument, //prevents undefined crash
    staleTime: CACHE_TTL, // fresh for 2 minutes
    gcTime: 10 * 60 * 1000, // cache stays for 10 minutes
  });
  //####

  const averageSpread = data?.brokers?.[0]?.cost ?? 0;
  const assetType = data?.rebate?.product ?? undefined;

  return (
    <section className={`md:py-20!`}>
      {/* grain bg effect */}
      <div className="grainy_bg"></div>
      {/* grain bg effect */}

      <div className={`ap_container_small relative z-1 w-full`}>
        <h2 className={`text-center font-semibold max-md:leading-[1.2]`}>
          {instrument} Trading Specification
        </h2>
        <div className={`${styles.costBreakDownTable}`}>
          <table cellPadding={"0"} cellSpacing={"0"} border={0}>
            <tbody>
              <tr>
                <td>Asset Class</td>
                <td>{assetType}</td>
              </tr>
              <tr>
                <td>Product Type</td>
                <td>XX</td>
              </tr>
              <tr>
                <td>Commission</td>
                <td>Zero</td>
              </tr>
              <tr>
                <td>
                  Flow Rewards<sup>TM</sup>
                </td>
                <td>0.50 USD</td>
              </tr>
              <tr>
                <td>Execution Speed</td>
                <td> &less; 50ms </td>
              </tr>
              <tr>
                <td>Contract Size</td>
                <td>100,000</td>
              </tr>
              <tr>
                <td>Min. Lot</td>
                <td>XX</td>
              </tr>
              <tr>
                <td>Max. Lots</td>
                <td>XX</td>
              </tr>
              <tr>
                <td>Lot Step</td>
                <td>XX</td>
              </tr>
              <tr>
                <td>Max Leverage</td>
                <td>1:400</td>
              </tr>
              <tr>
                <td>Swap Type & 3-Day Swap</td>
                <td>Points based, Wednesday</td>
              </tr>
              <tr>
                <td>Trading Hours</td>
                <td>Monday to Friday 00:00 to 23:59 GMT plus 2</td>
              </tr>
              <tr>
                <td colpsan={"2"}>Platforms</td>
              </tr>
              <tr>
                <td colpsan={"2"}>MT4, MT5, WebTrader, TraderEvolution, FIX Api</td>
              </tr>
              <tr>
                <td colpsan={"2"}>Licensing</td>
              </tr>
              <tr>
                <td colpsan={"2"}>
                  Afterprime Ltd (Seychelles company registration number
                  8426189-1) is a Securities Dealer, authorised by the Financial
                  Service Authority (FSA) with license #SD057
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
