import React from "react";
import styles from "./LpBanner.module.scss";
import ListUi from "@/components/instrument-lps/list-ui/ListUi";

import Button from "@/components/ui/Button";
import GoogleReviewBadge from "@/components/ui/GoogleReviewBadge";

//Hero Bullet Lists Type
interface HeroBullets {
  point_one?: string;
  point_two?: string;
  point_three?: string;
}

interface BannerTitle {
  instrumentname?: string;
  partialTitle?: string;
  lists?: HeroBullets;
}

//####

export default function LPBanner({
  instrumentname,
  lists,
  partialTitle,
}: BannerTitle) {
  if (!lists) return null;
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
              Trade {instrumentname} <br />
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
                href={"#"}
                className="group"
              >
                <svg
                  width="17"
                  height="18"
                  viewBox="0 0 17 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ fill: "none" }}
                >
                  <path
                    d="M4.33333 8.2V5C4.33333 3.93913 4.77232 2.92172 5.55372 2.17157C6.33512 1.42143 7.39493 1 8.5 1C9.60507 1 10.6649 1.42143 11.4463 2.17157C12.2277 2.92172 12.6667 3.93913 12.6667 5V8.2M2.66667 8.2H14.3333C15.2538 8.2 16 8.91634 16 9.8V15.4C16 16.2837 15.2538 17 14.3333 17H2.66667C1.74619 17 1 16.2837 1 15.4V9.8C1 8.91634 1.74619 8.2 2.66667 8.2Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ fill: "none" }}
                    className="group-hover:stroke-[#000000]"
                  />
                </svg>
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
                <br /> *Data Verified by ForexBenchmark
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
