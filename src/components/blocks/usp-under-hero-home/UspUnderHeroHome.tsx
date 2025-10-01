"use client";

import styles from "./UspHome.module.scss";
import { MarkUpGReview } from "../hero-home/HeroHome";
import { useState, useEffect } from "react";
import type { pairsAndCommission } from "@/types/pairsAndCommission";
import { Blocks } from "@/types/blocks";

type USPBlockProps = Blocks["usp-under-home-hero"];

//####
export function UspUnderHome(props: USPBlockProps) {
  const { usp_under_home_static_info_text } = props;
  const [data, setData] = useState<pairsAndCommission | null>(null);
  const [error, setError] = useState<string | null>(null);
  //const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    async function compareData() {
      try {
        const res = await fetch(
          "https://scoreboard.argamon.com:8443/api/costs/comparison?period=1d&symbols=All%20pairs&mode=day&commission=true",
          //https://scoreboard.argamon.com:8443/api/costs/comparison?period=7d&symbols=All%20pairs&mode=day&commission=true
          {
            signal: controller.signal,
            next: { revalidate: 60 },
          }
        );
        const json = await res.json();
        if (json.error) {
          setError(json.error);
        } else {
          setData(json);
        }
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError("Failed to fetch Data");
      }
    }
    compareData();
    return () => controller.abort(); //Abort fetch on unmount
  }, []);

  // if (loading) return <p>Loading selling data...</p>;
  // if (error) return <p>Error: {error}</p>;
  // if (!data) return <p>No data available</p>;

  //console.log("compare data:", data);

  return (
    <section className={`${styles.section_usp}`}>
      {/* grain bg effect */}
      <div className="grainy_bg"></div>
      {/* grain bg effect */}
      <div className="ap_container">
        <div className={`${styles.usp_items_wrapper} items-center`}>
          <div>
            <h3>#1</h3>
            <p>
              Verified All-In
              <br /> Costs Globally
            </p>
          </div>
          <div>
            {(data && (
              <h3>{data.secondBestVsAfterprimePct.toFixed(1)}%</h3>
            )) || <h3>%</h3>}

            <p>
              Saving vs
              <br /> 2nd best
              {/* <Link href="#" className={`${styles.uspDropdown}`}>
                {" "}
                2nd best{" "}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <mask id="path-2-inside-1_0_1" fill="white">
                    <path d="M4.88501 10.4863L9.09321 6.27812L13.3014 10.4863L9.09321 14.6945L4.88501 10.4863Z"></path>
                  </mask>
                  <path d="M4.88501 10.4863L9.09321 6.27812L13.3014 10.4863L9.09321 14.6945L4.88501 10.4863Z"></path>
                  <path
                    d="M13.3014 10.4863L14.3176 11.5025L15.3338 10.4863L14.3176 9.47012L13.3014 10.4863ZM9.09321 6.27812L8.077 7.29433L12.2852 11.5025L13.3014 10.4863L14.3176 9.47012L10.1094 5.26191L9.09321 6.27812ZM13.3014 10.4863L12.2852 9.47012L8.077 13.6783L9.09321 14.6945L10.1094 15.7107L14.3176 11.5025L13.3014 10.4863Z"
                    fill="#fff"
                    mask="url(#path-2-inside-1_0_1)"
                  ></path>
                </svg>
              </Link> */}
            </p>
          </div>
          <div>
            {(data && (
              <h3>{data.industryVsAfterprimeAvgPct.toFixed(1)}%</h3>
            )) || <h3>%</h3>}
            <p>
              Saving vs <br /> Industry Avg.
              {/* <Link href="#" className={`${styles.uspDropdown}`}>
                Industry Avg.{" "}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <mask id="path-2-inside-1_0_1" fill="white">
                    <path d="M4.88501 10.4863L9.09321 6.27812L13.3014 10.4863L9.09321 14.6945L4.88501 10.4863Z"></path>
                  </mask>
                  <path d="M4.88501 10.4863L9.09321 6.27812L13.3014 10.4863L9.09321 14.6945L4.88501 10.4863Z"></path>
                  <path
                    d="M13.3014 10.4863L14.3176 11.5025L15.3338 10.4863L14.3176 9.47012L13.3014 10.4863ZM9.09321 6.27812L8.077 7.29433L12.2852 11.5025L13.3014 10.4863L14.3176 9.47012L10.1094 5.26191L9.09321 6.27812ZM13.3014 10.4863L12.2852 9.47012L8.077 13.6783L9.09321 14.6945L10.1094 15.7107L14.3176 11.5025L13.3014 10.4863Z"
                    fill="#fff"
                    mask="url(#path-2-inside-1_0_1)"
                  ></path>
                </svg>
              </Link> */}
            </p>
          </div>
          <div className="max-md:flex items-center flex-col">
            <MarkUpGReview />
            <span className="text-[20px] font-[300] mt-6 block">
              <p>{usp_under_home_static_info_text || ""}</p>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
