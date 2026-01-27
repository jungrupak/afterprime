import React from "react";
import styles from "./LpBanner.module.scss";

interface ComponentProps {
  instrumentName?: string;
}

export default function LPBanner({instrumentName}: ComponentProps) {
  return <>
    <section className={`${styles.lpBanner}`}>
      {/* grain bg effect */}
      <div className="grainy_bg"></div>
      {/* grain bg effect */}
      <div className={`ap_container relative z-1`}>
        <h1>
          TRADE GBPUSD <br/>
          with near zero friction
        </h1>
      </div>
    </section>
  </>
}