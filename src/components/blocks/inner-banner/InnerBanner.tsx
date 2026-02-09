import styles from "./style.module.scss";
import Button from "@/components/ui/Button";
import TypeformButton from "@/components/ui/typeForm";

interface InnerBannerProps {
  inner_banner_title?: string;
  inner_banner_paragraph?: string;
  inner_banner_button_label?: string;
  inner_banner_button_url?: string;
  inner_banner_is_type_form_cta?: string | undefined;
}

export default function InnerBanner({
  inner_banner_title,
  inner_banner_paragraph,
  inner_banner_button_label,
  inner_banner_button_url,
  inner_banner_is_type_form_cta,
}: InnerBannerProps) {
  const shouldShowCTA =
    inner_banner_is_type_form_cta === "1" ||
    (inner_banner_button_url && inner_banner_button_label);
  return (
    <>
      <section
        className={`${styles.innerBannerSection} h-auto! innerpage-banner`}
      >
        {/* grain bg effect */}
        <div className="grainy_bg"></div>
        {/* grain bg effect */}
        <div className="ap_container_small flex items-center h-full">
          <div className={`apBannerContent`}>
            <h1 className="h1-size mt-10 lg:mt-15">
              <span className="font-[600]">{inner_banner_title}</span>
            </h1>
            <div
              className="paragraph max-w-[600px] lg:mt-8 opacity-80"
              style={{ fontWeight: "300" }}
              dangerouslySetInnerHTML={{
                __html: inner_banner_paragraph || "&nbsp;",
              }}
            />

            <div className={`mt-8 md:mt-15`}>
              {shouldShowCTA &&
                (inner_banner_is_type_form_cta === "1" ? (
                  <TypeformButton buttonText="Request Invite" size="Large" />
                ) : (
                  <Button
                    href={inner_banner_button_url}
                    varient="primary-ghost"
                    size="large"
                    isArrowVisible={true}
                  >
                    {inner_banner_button_label}
                  </Button>
                ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
