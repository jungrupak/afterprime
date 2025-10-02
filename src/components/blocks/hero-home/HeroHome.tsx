"use client";
import styles from "./style.module.scss";
import Btn from "@/components/ui/Button";
import Image from "next/image";
import TypeformButton from "@/components/ui/typeForm";
import { useEffect, useState } from "react";

import type { Blocks } from "@/types/blocks";

type HeroHomeProps = Blocks["hero-banner-home"];

export function MarkUpGReview() {
  return (
    <>
      <div
        className={`${styles.ap_Greview_btn} flex align-middle items-center gap-3 cursor-pointer`}
        onClick={() => {
          document.getElementById("googleReviewSection")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }}
      >
        <div>
          <Image
            src="/img/google-icon.png"
            alt="Google Review Stars"
            width={30}
            height={30}
            className="inline-block"
          />
        </div>
        <div className={`${styles.reviewNmr} text-[40px] font-[600]`}>4.9</div>
        <div>
          <span className="flex gap-[4px] mb-1">
            <svg
              width="16"
              height="15"
              viewBox="0 0 16 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.92445 7.52759C1.48412 6.74581 0.430479 6.48521 0.155273 5.56291C1.52868 5.38407 2.89684 5.13625 4.27549 5.0545C5.14566 5.0034 5.5493 4.60995 5.87954 3.89715C6.41947 2.73213 7.04851 1.60289 7.63824 0.458313C8.58966 1.53902 8.93301 2.9493 9.71669 4.12197C9.86609 4.47454 9.92375 4.89354 10.4427 4.94975C11.7794 5.09793 13.1161 5.25633 14.4555 5.40962C15.3518 5.59101 15.3283 5.94869 14.7307 6.51843C14.4214 6.81479 13.9313 6.87866 13.7452 7.30532C13.2052 7.78563 12.6863 8.2915 12.1175 8.73349C11.6877 9.06817 11.5986 9.41308 11.6955 9.93938C11.9681 11.4391 12.1647 12.9541 12.4137 14.625C11.0246 13.8841 9.76125 13.2479 8.5451 12.5428C7.92917 12.1851 7.44952 12.2081 6.83883 12.5709C5.65676 13.2735 4.41178 13.879 3.19302 14.5253C2.90995 14.1907 3.15632 13.8687 3.08293 13.5724C3.3031 12.2873 3.51016 10.9971 3.75391 9.71455C3.84302 9.24701 3.67266 8.96853 3.25592 8.78714C2.89422 8.28639 2.4303 7.88783 1.92707 7.52759H1.92445Z"
                fill="var(--secondary-color)"
              />
            </svg>
            <svg
              width="16"
              height="15"
              viewBox="0 0 16 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.92445 7.52759C1.48412 6.74581 0.430479 6.48521 0.155273 5.56291C1.52868 5.38407 2.89684 5.13625 4.27549 5.0545C5.14566 5.0034 5.5493 4.60995 5.87954 3.89715C6.41947 2.73213 7.04851 1.60289 7.63824 0.458313C8.58966 1.53902 8.93301 2.9493 9.71669 4.12197C9.86609 4.47454 9.92375 4.89354 10.4427 4.94975C11.7794 5.09793 13.1161 5.25633 14.4555 5.40962C15.3518 5.59101 15.3283 5.94869 14.7307 6.51843C14.4214 6.81479 13.9313 6.87866 13.7452 7.30532C13.2052 7.78563 12.6863 8.2915 12.1175 8.73349C11.6877 9.06817 11.5986 9.41308 11.6955 9.93938C11.9681 11.4391 12.1647 12.9541 12.4137 14.625C11.0246 13.8841 9.76125 13.2479 8.5451 12.5428C7.92917 12.1851 7.44952 12.2081 6.83883 12.5709C5.65676 13.2735 4.41178 13.879 3.19302 14.5253C2.90995 14.1907 3.15632 13.8687 3.08293 13.5724C3.3031 12.2873 3.51016 10.9971 3.75391 9.71455C3.84302 9.24701 3.67266 8.96853 3.25592 8.78714C2.89422 8.28639 2.4303 7.88783 1.92707 7.52759H1.92445Z"
                fill="var(--secondary-color)"
              />
            </svg>
            <svg
              width="16"
              height="15"
              viewBox="0 0 16 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.92445 7.52759C1.48412 6.74581 0.430479 6.48521 0.155273 5.56291C1.52868 5.38407 2.89684 5.13625 4.27549 5.0545C5.14566 5.0034 5.5493 4.60995 5.87954 3.89715C6.41947 2.73213 7.04851 1.60289 7.63824 0.458313C8.58966 1.53902 8.93301 2.9493 9.71669 4.12197C9.86609 4.47454 9.92375 4.89354 10.4427 4.94975C11.7794 5.09793 13.1161 5.25633 14.4555 5.40962C15.3518 5.59101 15.3283 5.94869 14.7307 6.51843C14.4214 6.81479 13.9313 6.87866 13.7452 7.30532C13.2052 7.78563 12.6863 8.2915 12.1175 8.73349C11.6877 9.06817 11.5986 9.41308 11.6955 9.93938C11.9681 11.4391 12.1647 12.9541 12.4137 14.625C11.0246 13.8841 9.76125 13.2479 8.5451 12.5428C7.92917 12.1851 7.44952 12.2081 6.83883 12.5709C5.65676 13.2735 4.41178 13.879 3.19302 14.5253C2.90995 14.1907 3.15632 13.8687 3.08293 13.5724C3.3031 12.2873 3.51016 10.9971 3.75391 9.71455C3.84302 9.24701 3.67266 8.96853 3.25592 8.78714C2.89422 8.28639 2.4303 7.88783 1.92707 7.52759H1.92445Z"
                fill="var(--secondary-color)"
              />
            </svg>
            <svg
              width="16"
              height="15"
              viewBox="0 0 16 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.92445 7.52759C1.48412 6.74581 0.430479 6.48521 0.155273 5.56291C1.52868 5.38407 2.89684 5.13625 4.27549 5.0545C5.14566 5.0034 5.5493 4.60995 5.87954 3.89715C6.41947 2.73213 7.04851 1.60289 7.63824 0.458313C8.58966 1.53902 8.93301 2.9493 9.71669 4.12197C9.86609 4.47454 9.92375 4.89354 10.4427 4.94975C11.7794 5.09793 13.1161 5.25633 14.4555 5.40962C15.3518 5.59101 15.3283 5.94869 14.7307 6.51843C14.4214 6.81479 13.9313 6.87866 13.7452 7.30532C13.2052 7.78563 12.6863 8.2915 12.1175 8.73349C11.6877 9.06817 11.5986 9.41308 11.6955 9.93938C11.9681 11.4391 12.1647 12.9541 12.4137 14.625C11.0246 13.8841 9.76125 13.2479 8.5451 12.5428C7.92917 12.1851 7.44952 12.2081 6.83883 12.5709C5.65676 13.2735 4.41178 13.879 3.19302 14.5253C2.90995 14.1907 3.15632 13.8687 3.08293 13.5724C3.3031 12.2873 3.51016 10.9971 3.75391 9.71455C3.84302 9.24701 3.67266 8.96853 3.25592 8.78714C2.89422 8.28639 2.4303 7.88783 1.92707 7.52759H1.92445Z"
                fill="var(--secondary-color)"
              />
            </svg>
            <svg
              width="16"
              height="15"
              viewBox="0 0 16 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.92445 7.52759C1.48412 6.74581 0.430479 6.48521 0.155273 5.56291C1.52868 5.38407 2.89684 5.13625 4.27549 5.0545C5.14566 5.0034 5.5493 4.60995 5.87954 3.89715C6.41947 2.73213 7.04851 1.60289 7.63824 0.458313C8.58966 1.53902 8.93301 2.9493 9.71669 4.12197C9.86609 4.47454 9.92375 4.89354 10.4427 4.94975C11.7794 5.09793 13.1161 5.25633 14.4555 5.40962C15.3518 5.59101 15.3283 5.94869 14.7307 6.51843C14.4214 6.81479 13.9313 6.87866 13.7452 7.30532C13.2052 7.78563 12.6863 8.2915 12.1175 8.73349C11.6877 9.06817 11.5986 9.41308 11.6955 9.93938C11.9681 11.4391 12.1647 12.9541 12.4137 14.625C11.0246 13.8841 9.76125 13.2479 8.5451 12.5428C7.92917 12.1851 7.44952 12.2081 6.83883 12.5709C5.65676 13.2735 4.41178 13.879 3.19302 14.5253C2.90995 14.1907 3.15632 13.8687 3.08293 13.5724C3.3031 12.2873 3.51016 10.9971 3.75391 9.71455C3.84302 9.24701 3.67266 8.96853 3.25592 8.78714C2.89422 8.28639 2.4303 7.88783 1.92707 7.52759H1.92445Z"
                fill="var(--secondary-color)"
              />
            </svg>
          </span>
          <span className="text-[16px] opacity-70 hover:underline">
            250+ Reviews (Google)
          </span>
        </div>
      </div>
    </>
  );
}

export function HeroHome(props: HeroHomeProps) {
  const {
    hero_banner_home_banner_heading = "",
    hero_banner_home_banner_paragraph,
    hero_banner_home_banner_btn_text,
    hero_banner_home_banner_btn_url,
    hero_banner_home_is_type_form_cta,
    hero_banner_home,
  } = props;

  const heroWords = hero_banner_home_banner_heading.split(" ");
  const title = heroWords.map((word) => word.toLocaleUpperCase() + " ");

  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    const resizedWindow = () => setWidth(window.innerWidth);
    window.addEventListener("resize", resizedWindow);
    return () => window.removeEventListener("resize", resizedWindow);
  }, []);

  return (
    <div className={`${styles.hero_home} h-screen`}>
      {/* grain bg effect */}
      <div className="grainy_bg"></div>
      {/* grain bg effect */}

      <div className="ap_container h-full relative z-2">
        <div className="flex flex-wrap items-center h-full min-h-[400px] lg:min-h-[600px] relative">
          <div className="w-full">
            <h1
              className={`${styles.heroHeading} h1-size flex gap-20 justify-between`}
            >
              {title.map((text, i) => (
                <span key={i}>{text}</span>
              ))}
            </h1>
          </div>
          <div className={`${styles.heroBannerPara}`}>
            <div
              className="paragraph max-w-[500px] mx-auto mb-12 opacity-80"
              style={{ fontWeight: "300" }}
              dangerouslySetInnerHTML={{
                __html: hero_banner_home_banner_paragraph || "&nbsp;",
              }}
            />

            {hero_banner_home_is_type_form_cta === "1" ? (
              <TypeformButton
                formId="GYkOukSo"
                buttonText="Request Invite"
                size="Large"
              />
            ) : (
              <Btn
                size="large"
                varient="primary-ghost"
                typeformId="01K6A1X4YDAH2RV3WNYVB632WG"
                isArrowVisible={true}
                href={hero_banner_home_banner_btn_url || "#"}
              >
                {hero_banner_home_banner_btn_text || "Button"}
              </Btn>
            )}
            <span className="md:hidden">
              <a
                href="https://app.afterprime.com/live"
                className="large ap_button washed mt-5"
              >
                Client Login
              </a>
            </span>
          </div>
          <div className="max-md:text-center"></div>
        </div>
      </div>
    </div>
  );
}
