"use client";
import styles from "./style.module.scss";
import Btn from "@/components/ui/Button";
import TypeformButton from "@/components/ui/typeForm";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { Blocks } from "@/types/blocks";
import HeroUsp from "@/components/hero-usp/HeroUsp";

type HeroHomeProps = Blocks["hero-banner-home"];

export function HeroHome(props: HeroHomeProps) {
  const {
    hero_banner_home_banner_heading = "",
    hero_banner_home_banner_paragraph,
    hero_banner_home_banner_btn_text,
    hero_banner_home_banner_btn_url,
    hero_banner_home_is_type_form_cta,
    hero_banner_home_data_source_note,
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
    <div
      className={`${styles.hero_home} h-screen max-md:h-[100%] md:max-h-[1080px] relative`}
    >
      {/* grain bg effect */}
      <div className="grainy_bg"></div>
      {/* grain bg effect */}

      <div className="flex flex-wrap flex-col justify-center items-center h-[100%] min-h-[400px] lg:min-h-[600px] relative z-2 md:pt-10 max-md:pb-5">
        <div className="w-full max-w-[1200] mx-auto">
          <h1
            className={`${styles.heroHeading} h1-size flex gap-20 justify-between`}
          >
            {title.map((text, i) => (
              <span key={i}>{text}</span>
            ))}
          </h1>
        </div>
        <div className={`${styles.heroBannerPara} max-md:px-5`}>
          <div
            className=" max-w-[650px] text-[28px] lg:text-[32px]  mx-auto mb-12"
            style={{ fontWeight: "300" }}
            dangerouslySetInnerHTML={{
              __html: hero_banner_home_banner_paragraph || "&nbsp;",
            }}
          />

          <div className="flex max-md:flex-col gap-4 items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              {hero_banner_home_is_type_form_cta === "1" ? (
                <TypeformButton buttonText="Get Invite Code" size="Regular" />
              ) : (
                <Btn
                  size="regular"
                  varient="primary"
                  isArrowVisible={true}
                  href={hero_banner_home_banner_btn_url || "#"}
                >
                  {hero_banner_home_banner_btn_text || "Button"}
                </Btn>
              )}
              <a href="https://app.afterprime.com/live">
                I already <u>have an invite code</u>
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* ## */}
      <HeroUsp text={hero_banner_home_data_source_note} />
    </div>
  );
}
