"use client";
import styles from "./style.module.scss";
import Btn from "@/components/ui/Button";
import Image from "next/image";
import TypeformButton from "@/components/ui/typeForm";
import { useEffect, useState } from "react";

import type { Blocks } from "@/types/blocks";

type HeroHomeProps = Blocks["hero-banner-home"];

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
