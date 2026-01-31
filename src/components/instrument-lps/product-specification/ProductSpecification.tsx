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
    ? getRelatedPairs(specData, selectedInstrument.Symbol, 3)
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
          <h3 className={`font-bold text-[clamp(18px,5vw,24px)] mb-2`}>
            Trade connected FX pairs
          </h3>
          <p className={`opacity-80`}>
            Trade these related pairs or browse the full range of{" "}
            <Link href={"/trade"} className={`underline`}>
              FX markets
            </Link>{" "}
            available on Afterprime.
          </p>
          <div className={`flex flex-wrap gap-2 mt-4`}>
            {relatedPairs.map((pair) => (
              <Link
                key={pair.Symbol}
                href={`/trade/${pair.Symbol.toLowerCase()}`}
                className={`underline hover:no-underline`}
              >
                <div className={``}>{pair.Symbol}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
