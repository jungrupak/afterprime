import React from "react";
import styles from "./LpBanner.module.scss";
import ListUi from "@/components/instrument-lps/list-ui/ListUi";
import { WPPage } from "@/types/blocks";
import Button from "@/components/ui/Button";
import GoogleReviewBadge from "@/components/ui/GoogleReviewBadge";
import { SinglePricing } from "@/components/instrument-lps/single-symbol-pricing/SinglePricing";

interface BannerProps {
  data: WPPage;
}

//Hero Bullet Lists Type
interface HeroBullets {
  bullet_point?: string;
}

interface BannerTitle {
  instrumentname?: string;
  partialTitle?: string;
  lists?: HeroBullets[];
}

//####

export default function LPBanner({
  instrumentname,
  lists,
  partialTitle,
}: BannerTitle) {
  return (
    <>
      <section
        className={`${styles.lpBanner} max-md:mt-10 md:pb-0! md:h-[100vh]`}
      >
        {/* grain bg effect */}
        <div className="grainy_bg"></div>
        {/* grain bg effect */}
        <div
          className={`ap_container_small grid grid-cols-2 gap-8 md:gap-20 relative z-1 flex items-center h-full`}
        >
          <div className={`${styles.bannerLeftItem} max-md:col-span-2`}>
            <h1 className={`max-md:mb-5`}>
              TRADE {instrumentname} <br />
              <span
                dangerouslySetInnerHTML={{ __html: partialTitle || "" }}
              ></span>
            </h1>
            <ListUi customClass={`md:mt-12`} heroBulletLists={lists} />
            <div className={`mt-8 md:mt-15`}>
              <Button
                varient="primary"
                size="large"
                linkTarget={"_blank"}
                href={"https://app.afterprime.com/live"}
              >
                Apply for Invite Code
              </Button>
            </div>

            <div
              className={`flex flex-wrap gap-10 mt-5 max-md:justify-center max-md:text-center md:mt-10`}
            >
              <div
                className={`opacity-64 text-[14px] max-md:flex-[0_,0_,100%]`}
              >
                Invite only access for approved trading profiles.
                <br /> *All Data Verified by ForexBenchmark
              </div>
              <div className={`max-md:flex-[0_,0_,100%]`}>
                <GoogleReviewBadge />
              </div>
            </div>
          </div>

          {/* <div
            className={`${styles.bannerLeftItem} max-md:col-span-2 flex justify-end`}
          >
            <div className="w-full md:w-[400px]">
              <SinglePricing />
            </div>
          </div> */}
        </div>
      </section>
    </>
  );
}
