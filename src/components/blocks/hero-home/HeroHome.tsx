import styles from "./style.module.scss";
import Btn from "@/components/ui/Button";
import TypeformButton from "@/components/ui/typeForm";
import type { Blocks } from "@/types/blocks";
import HeroUsp from "@/components/hero-usp/HeroUsp";

type HeroHomeProps = Blocks["hero-banner-home"];

export function HeroHome(props: HeroHomeProps) {
  const {
    hero_banner_home_banner_heading,
    hero_banner_home_banner_paragraph,
    hero_banner_home_banner_btn_text,
    hero_banner_home_banner_btn_url,
    hero_banner_home_is_type_form_cta,
    hero_banner_home_data_source_note,
  } = props;

  return (
    <>
      <div className="home_banner_video">
        <video
          playsInline
          className="mui-1eodtn4-video"
          controls={false}
          data-automation="VideoPlayer"
          height="100%"
          width="100%"
          style={{ height: "calc(100vh + 42vh)" }}
          loop
          muted
          autoPlay
          poster="/img/hero-video-poster.jpg"
          preload="auto"
          aria-label="video-player"
          controlsList="nodownload"
        >
          <source
            src="https://motion.afterprime.com/web/low-res.mp4"
            type="video/mp4"
          />
        </video>
      </div>
      <div className={`${styles.hero_home} h-screen max-md:h-[100%] relative`}>
        <div className="flex flex-wrap flex-col justify-center items-center h-[100%] min-h-[400px] lg:min-h-[600px] relative z-2 md:pt-10 max-md:pb-5">
          <div className="w-full max-w-[800] mx-auto max-md:px-5">
            <h1
              className={`${styles.heroHeading} h1-size flex lg:mb-[20px]! gap-20 justify-center text-center font-bold`}
            >
              {hero_banner_home_banner_heading ?? "Afterprime Hero Banner Text"}
            </h1>
          </div>
          <div className={`${styles.heroBannerPara} max-md:px-5`}>
            <div
              className=" max-w-[650px] text-[20px] md:text-[24px] lg:text-[32px]  mx-auto mb-12"
              style={{ fontWeight: "300" }}
              dangerouslySetInnerHTML={{
                __html: hero_banner_home_banner_paragraph || "&nbsp;",
              }}
            />

            <div className="flex max-md:flex-col gap-4 items-center justify-center">
              <div className="flex max-md:flex-col items-center gap-5 mb-5 lg:mb-25 2xl:mb-5">
                {hero_banner_home_is_type_form_cta === "1" ? (
                  <TypeformButton buttonText="Get Invite Code" size="Regular" />
                ) : (
                  <Btn
                    size="regular"
                    varient="primary"
                    isArrowVisible={true}
                    href={hero_banner_home_banner_btn_url ?? "#"}
                  >
                    {hero_banner_home_banner_btn_text ?? "Button"}
                  </Btn>
                )}
                <a href="https://app.afterprime.com/live">
                  Have a code? <u>Signup Now</u>
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* ## */}
        <HeroUsp text={hero_banner_home_data_source_note ?? ""} />
      </div>
    </>
  );
}
