import styles from "./style.module.scss";
import Btn from "@/components/ui/Button";
import TypeformButton from "@/components/ui/typeForm";
import SignupNowLink from "@/components/ui/SignupNowLink";
import type { Blocks } from "@/types/blocks";
import HeroUsp from "@/components/hero-usp/HeroUsp";
import { getTranslatedStatic } from "@/lib/content/getTranslatedStatic";
import { getRequestLocale } from "@/lib/locale/getRequestLocale";
import { localizeHref } from "@/lib/locale/localizeHref";
import GoogleReviewBadge from "@/components/ui/GoogleReviewBadge";

type HeroHomeProps = Blocks["hero-banner-home"];

export async function HeroHome(props: HeroHomeProps) {
  const {
    hero_banner_home_banner_heading,
    hero_banner_home_banner_paragraph,
    hero_banner_home_banner_btn_text,
    hero_banner_home_banner_btn_url,
    hero_banner_home_is_type_form_cta,
    hero_banner_home_data_source_note,
  } = props;

  const locale = await getRequestLocale();
  const t = await getTranslatedStatic("hero-home", locale, {
    // Fallback strings
    headingFallback: "Afterprime Hero Banner Text",
    buttonFallback: "Button",
    getInviteCodeCta: "Get Invite Code",
    signupNowPreText: "Have a code?",
    signupNowLinkText: "Apply Now",
    // CMS content — translated here as safety net in case page-level
    // translatePage fails. Weglot returns already-translated text unchanged.
    heading: hero_banner_home_banner_heading || "",
    btnText: hero_banner_home_banner_btn_text || "",
    dataNote: hero_banner_home_data_source_note || "",
    excellentOnGoogle: "Excellent on Google",
  });

  // Use translated CMS content when available, fall back to translated defaults
  const heading = t.heading || t.headingFallback;
  const btnText = t.btnText || t.buttonFallback;

  return (
    <>
      <div className={`${styles.hero_home} h-screen max-md:h-[100%] relative`}>
        <div className="flex flex-wrap flex-col justify-center items-center h-[100%] min-h-[400px] lg:min-h-[580px] relative z-2 max-md:pb-5">
          <div className="w-full max-w-[1080] mx-auto max-md:px-5">
            <h1
              className={`${styles.heroHeading} hero-h1 flex lg:mb-[20px]! gap-20 justify-center text-center font-bold`}
            >
              {heading}
            </h1>
          </div>
          <div className={`${styles.heroBannerPara} max-md:px-5`}>
            <div
              className=" max-w-[980px] text-[20px] md:text-[24px] lg:text-[32px]  mx-auto mb-12"
              style={{ fontWeight: "300" }}
              dangerouslySetInnerHTML={{
                __html: hero_banner_home_banner_paragraph ?? "&nbsp;",
              }}
            />

            <div className="flex flex-col gap-4 items-center justify-center">
              <div className="flex max-md:flex-col items-center gap-10 mb-5 max-md:w-full">
                {hero_banner_home_is_type_form_cta === "1" ? (
                  <TypeformButton
                    buttonText={t.getInviteCodeCta}
                    signupNowText={t.signupNowLinkText}
                    size="Regular"
                  />
                ) : (
                  <Btn
                    size="regular"
                    varient="primary"
                    isArrowVisible={true}
                    href={localizeHref(
                      hero_banner_home_banner_btn_url || "/",
                      locale,
                    )}
                  >
                    {btnText}
                  </Btn>
                )}
                <SignupNowLink
                  preText={t.signupNowPreText}
                  linkText={t.signupNowLinkText}
                />
              </div>
              <div
                className={`hero-usp-badge mt-0 md:mt-2 flex max-md:flex-col gap-2 h-[32px] overflow-hidden`}
              >
                <div
                  className={`text-[18px] font-bold opacity-65 max-md:hidden`}
                >
                  {t.excellentOnGoogle}
                </div>
                <GoogleReviewBadge />
              </div>
            </div>
          </div>
        </div>
        {/* ## */}
        <HeroUsp text={t.dataNote} />
      </div>
    </>
  );
}
