import React from "react";
import styles from "./Cta.module.scss";
import Button from "@/components/ui/Button";
export default function Cta() {
  return (
    <section className={`md:py-20!`}>
      {/* grain bg effect */}
      <div className="grainy_bg"></div>
      {/* grain bg effect */}

      <div className={`ap_container_small relative z-1 w-full`}>
        <div
          className={`${styles.bottomCta} flex flex-col justify-center items-center text-center`}
        >
          <div>
            <h2 className={`md:mb-8! leading-[1]`}>
              No Fine Print. Better Trading Economics.
            </h2>
            <p className={`paragraph mb-8 md:mb-10 opacity-80`}>
              Built on transparency. Lowest total trading costs.
              <br /> Execution you can measure. Rewards shared with you.
            </p>
            <Button
              varient="primary"
              size="large"
              linkTarget={"_blank"}
              href={"https://app.afterprime.com/live"}
            >
              Apply for Invite Code
            </Button>
            <div className={`mt-5 opacity-65`}>
              Invite only access for approved trading profiles.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
