import React from "react";
import { ProsNCons } from "@/components/ui/ProsNcons";
import type { ProsConsObjects } from "@/types/prosCons";
import BoxedBlock from "../boxed-block/BoxedBlock";
import Btn from "@/components/ui/Button";
export function BuiltForTraders() {
  const prosNcons: ProsConsObjects = {
    pros: {
      label: "Designed For:",
      points: [
        "Professional traders running consistent strategies.",
        "Disciplined traders who respect execution, risk, and capital.",
      ],
    },
    cons: {
      label: "Not Designed For:",
      points: [
        "Arbitrage or latency flow type strategies.",
        "Accounts chasing leverage, bonuses, or gimmicks.",
      ],
    },
  };

  return (
    <section>
      {/* grain bg effect */}
      <div className="grainy_bg"></div>
      {/* grain bg effect */}
      <div className="ap_container">
        <BoxedBlock isBoxed={false} vAlign="center">
          {/* Left */}
          <div>
            <div className="max-md:text-center md:pr-25">
              <h2 className="h2-size mb-6">
                Afterprime is built for traders who treat trading like a
                profession.
              </h2>
              <p className="paragraph">
                Our platform is designed for clients who understand our model,
                respect risk, and approach markets with discipline.
              </p>
              <div className="mt-12">
                <Btn
                  varient="primary-ghost"
                  href="#"
                  isArrowVisible={true}
                  size="large"
                >
                  How to Qualify
                </Btn>
              </div>
            </div>
          </div>
          {/* Left Ends */}

          {/* Right */}
          <div>
            <ProsNCons data={prosNcons} />
          </div>
          {/* Right Ends */}
        </BoxedBlock>
      </div>
    </section>
  );
}
