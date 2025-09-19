"use client";
import React from "react";
import styles from "./style.module.scss";
import Lists from "../ui/Lists";
import Btn from "@/components/ui/Button";
import BoxedBlock from "../boxed-block/BoxedBlock";
import { EarningCalc } from "@/utils/earning-calculator/EarningCalc";

//
export function EarningFlow() {
  const listItems = [
    "Execution becomes revenue — another line on your PnL.",
    "Tier-1 liquidity, cleared via Prime Brokers.",
    "Cut costs. Get paid. Sharpen your edge.",
  ];

  return (
    <section className={`${styles.section_earning_flow}`}>
      {/* grain bg effect */}
      <div className="grainy_bg"></div>
      {/* grain bg effect */}
      <div className="ap_container">
        <BoxedBlock isBoxed={false} vAlign="center">
          {/* Left */}
          <div>
            <h2 className="h2-size mb-6 text-center md:text-left">
              Earn up to $3 r/t per
              <br /> Lot on your flow
            </h2>
            <div className="mt-12">
              <Lists bulletVarient="arrow-blue" listItems={listItems} />
            </div>
            <div className="mt-16 text-center md:text-left">
              <Btn
                href="#"
                size="large"
                varient="primary-ghost"
                isArrowVisible={true}
              >
                How it Works
              </Btn>
            </div>
          </div>
          {/* Left Ends */}

          {/* Right */}
          <div>
            <EarningCalc />
          </div>
          {/* Right Ends */}
        </BoxedBlock>
      </div>
    </section>
  );
}
//
