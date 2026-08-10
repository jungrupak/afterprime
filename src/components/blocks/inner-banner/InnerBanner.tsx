import styles from "./style.module.scss";
import Button from "@/components/ui/Button";
import TypeformButton from "@/components/ui/typeForm";
import { getRequestLocale } from "@/lib/locale/getRequestLocale";
import { getTranslatedStatic } from "@/lib/content/getTranslatedStatic";
import { localizeHref } from "@/lib/locale/localizeHref";

interface InnerBannerProps {
  inner_banner_title?: string;
  inner_banner_paragraph?: string;
  inner_banner_button_label?: string;
  inner_banner_button_url?: string;
  inner_banner_is_type_form_cta?: string | undefined;
}

export default async function InnerBanner({
  inner_banner_title,
  inner_banner_paragraph,
  inner_banner_button_label,
  inner_banner_button_url,
  inner_banner_is_type_form_cta,
}: InnerBannerProps) {
  const locale = await getRequestLocale();
  const t = await getTranslatedStatic("inner-banner", locale, {
    getInviteCodeCta: "Get Invite Code",
  });

  const shouldShowCTA =
    inner_banner_is_type_form_cta === "1" ||
    (inner_banner_button_url && inner_banner_button_label);
  return (
    <>
      <section
        className={`${styles.innerBannerSection} h-auto! innerpage-banner`}
      >
        <div className="ap_container_small flex items-center h-full">
          <div className={`apBannerContent w-full`}>
            <h1 className="font-size-heading-xl mt-13 md:mt-18 font-semibold opacity-90">
              {inner_banner_title}
            </h1>
            <div
              className="reading-text-lg mt-5 md:mt-10 opacity-60"
              style={{ fontWeight: "300" }}
              dangerouslySetInnerHTML={{
                __html: inner_banner_paragraph || "&nbsp;",
              }}
            />

            {shouldShowCTA &&
              (inner_banner_is_type_form_cta === "1" ? (
                <div className={`mt-10 md:mt-15`}>
                  <TypeformButton
                    buttonText={t.getInviteCodeCta}
                    size="Regular"
                    varient="Primary"
                  />
                </div>
              ) : (
                <div className={`mt-10 md:mt-15`}>
                  <Button
                    href={localizeHref(inner_banner_button_url || "/", locale)}
                    varient="primary"
                    size="regular"
                    isArrowVisible={true}
                  >
                    {inner_banner_button_label}
                  </Button>
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
