"use client";
import { AP_FX_PAIRS } from "@/data/ap-fx-pairs-specs";
import { getRelatedPairs } from "@/lib/getRelatedPairs";
import styles from "./ProductSpecification.module.scss";
import Link from "next/link";

interface Specification {
  instrument?: string;
}

//##
const CACHE_TTL = 2 * 60 * 1000; // 2 minutes feed cache

export default function ProductSpecification({ instrument }: Specification) {
  //##
  if (!instrument) return;

  // ####
  const specData = [...AP_FX_PAIRS]; //spreading this since we gonna have other pairs type in future like crypto, indices etc..
  const selectedInstrument = specData.find(
    (item) => item.Symbol === instrument,
  );
  //####

  //Compute Related pairs
  // After finding selectedInstrument
  const relatedPairs = selectedInstrument
    ? getRelatedPairs(specData, selectedInstrument.Symbol, 4)
    : [];
  //####

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
              {selectedInstrument &&
                Object.entries(selectedInstrument).map(([key, value]) => (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>{value}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className={`mt-15`}>
          <h3 className={`font-bold text-[clamp(28px,5vw,38px)] mb-8`}>
            Related Pairs
          </h3>
          <div
            className={`grid grid-cols-[repeat(auto-fit,minmax(200px,_1fr))] gap-6`}
          >
            {relatedPairs.map((pair) => (
              <Link
                key={pair.Symbol}
                href={`/trade/${pair.Symbol.toLowerCase()}`}
                className={`bg-[rgba(255,255,255,.12)] transition duration-[.3s] ease-in-out rounded-[5px] py-5 px-8 hover:bg-[rgba(255,255,255,.16)]`}
              >
                <span className={`text-[rgba(255,255,255,.48)]`}>Trade</span>
                <div className={`text-[20px] font-bold`}>{pair.Symbol}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
