"use client";

import styles from "./UspHome.module.scss";
import { useState, useEffect } from "react";
import type { pairsAndCommission } from "@/types/pairsAndCommission";
import { Blocks } from "@/types/blocks";
import GoogleReviewBadge from "@/components/ui/GoogleReviewBadge";

type USPBlockProps = Blocks["usp-under-home-hero"];

//####
export function UspUnderHome(props: USPBlockProps) {
  const { usp_under_home_static_info_text } = props;
  const [data, setData] = useState<pairsAndCommission | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch(
          "https://scoreboard.argamon.com:8443/api/costs/comparison?period=7d&symbols=All%20pairs&mode=day&commission=true",
          { next: { revalidate: 14400 } }, // ISR: revalidate every 4 hours
        );
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        } else {
          const jsonObjects = await res.json();
          setData(jsonObjects);
        }
      } catch (err) {
        setError("Failed to load market comparison data");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading)
    return <div className="text-center">Loading compare data...</div>;
  if (error) return <div className="text-center">Error: {error}</div>;
  if (!data) return <div className="text-center">No Data Available..</div>;

  const { secondBestVsAfterprimePct, industryVsAfterprimeAvgPct } = data;

  return (
    <section className={`${styles.section_usp}`}>
      {/* grain bg effect */}
      <div className="grainy_bg"></div>
      {/* grain bg effect */}
      {!loading ? (
        <div className="ap_container_small">
          <div className={`${styles.usp_items_wrapper} items-center`}>
            <div>
              <h3>#1</h3>
              <p>
                Verified All-In
                <br /> Costs Globally
              </p>
            </div>
            <div>
              <h3>{secondBestVsAfterprimePct.toFixed(1)}%</h3>
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
              <h3>{industryVsAfterprimeAvgPct.toFixed(1)}%</h3>
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
              <GoogleReviewBadge />
              <span className="text-[20px] font-[300] mt-6 block">
                <p>{usp_under_home_static_info_text || ""}</p>
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">Loading..</div>
      )}
    </section>
  );
}
