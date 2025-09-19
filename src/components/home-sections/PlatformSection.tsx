import React from "react";
import styles from "./style.module.scss";
import CardRepeator from "../card-repeater/CardRepeater";

//import utils
import { platformObjects } from "@/utils/PlatformsObjects";

//
export function PlatformsSection() {
  const cardItems = platformObjects;
  return (
    <section className={`${styles.section_platforms}`}>
      {/* grain bg effect */}
      <div className="grainy_bg"></div>
      {/* grain bg effect */}
      <div className="ap_container">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
          <div>
            <h2 className="h2-size mb-6 text-center md:text-left">
              Pro Platforms. <br /> <span>Seamless Access. </span>
            </h2>
          </div>
          <div>
            <p className="paragraph max-w-2xl opacity-90 max-md:text-center max-md:mb-10">
              Our all-in trading cost is calculated using ForexBenchmark&apos;s
              independent data, which aggregates the spread plus commission.
            </p>
          </div>
        </div>
        {/* Cards */}
        <div className="ap_cards_wrapper grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-6 text-center md:mt-18">
          <CardRepeator cardSize="regular" data={cardItems} />
        </div>
        {/* Cards Ends */}
      </div>
    </section>
  );
}
