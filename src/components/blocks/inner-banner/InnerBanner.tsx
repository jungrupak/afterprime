import styles from "./style.module.scss";
import Button from "@/components/ui/Button";

interface InnerBannerProps {
  inner_banner_title?: string;
  inner_banner_paragraph?: string;
  inner_banner_button_label?: string;
  inner_banner_button_url?: string;
}

export default function InnerBanner({
  inner_banner_title,
  inner_banner_paragraph,
  inner_banner_button_label,
  inner_banner_button_url,
}: InnerBannerProps) {
  return (
    <>
      <section className={`${styles.innerBannerSection}`}>
        {/* grain bg effect */}
        <div className="grainy_bg"></div>
        {/* grain bg effect */}
        <div className="ap_container flex items-center h-full">
          <div className={`apBannerContent`}>
            <h1 className="h1-size mt-28 lg:mt-42">
              <span className="font-[600]">{inner_banner_title}</span>
            </h1>
            <p
              className="paragraph max-w-[600px] mb-12 lg:mt-20 opacity-80"
              style={{ fontWeight: "300" }}
            >
              {inner_banner_paragraph}
            </p>
            <Button
              href={inner_banner_button_url}
              varient="primary-ghost"
              size="large"
              isArrowVisible={true}
            >
              {inner_banner_button_label}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
