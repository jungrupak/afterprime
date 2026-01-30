"use client";
import { AP_FX_PAIRS } from "@/data/ap-fx-pairs-specs";
import styles from "./ProductSpecification.module.scss";

interface Specification {
  instrument?: string;
}

//##
const CACHE_TTL = 2 * 60 * 1000; // 2 minutes feed cache

export default function ProductSpecification({ instrument }: Specification) {
  //##
  if (!instrument) return;

  // ####
  const specData = AP_FX_PAIRS;
  const selectedInstrument = AP_FX_PAIRS.find(
    (item) => item.Symbol === instrument,
  );
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
      </div>
    </section>
  );
}
