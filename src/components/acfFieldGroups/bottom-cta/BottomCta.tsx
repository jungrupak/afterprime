import dynamic from "next/dynamic";
import styles from "./style.module.scss";
import Btn from "@/components/ui/Button";
import type { PageFieldGroups } from "@/types/blocks";

type CtaProps = PageFieldGroups["bottom_cta"];

export function BottomCta(props: CtaProps) {
  const { section_title, section_paragraph, card_apply, card_referal } =
    props || {};

  return (
    <>
      <section className={`${styles.section_cta}`}>
        {/* grain bg effect */}
        <div className="grainy_bg"></div>
        {/* grain bg effect */}
        <div className="ap_container">
          <div className="max-w-[700px] mx-auto text-center">
            <div
              className="h2-size mb-6"
              dangerouslySetInnerHTML={{ __html: section_title || "&nbsp;" }}
            />
            <p className="paragraph max-w-2xl mx-auto mb-20 opacity-90">
              {section_paragraph}
            </p>
          </div>
          {/* Cards */}
          <div className="ap_cards_wrapper grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-6 text-center md:mt-18 md:max-w-[900px] md:mx-auto">
            <div className={`${styles.ctaCard} group`}>
              <h3 className="">{card_apply?.title}</h3>
              <p>{card_apply?.paragraph}</p>

              <Btn size="regular" href={`#`} varient={"primary"}>
                {card_apply?.cat_label || "Apply Now"}
              </Btn>
            </div>

            <div className={`${styles.ctaCard} group`}>
              <h3 className="">{card_referal?.title}</h3>
              <p>{card_referal?.paragraph}</p>

              <Btn
                size="regular"
                href={`#`}
                varient={"ghost"}
                linkTarget="_self"
              >
                {card_referal?.cat_label || "Referal"}
              </Btn>
            </div>
          </div>
          {/* Cards Ends */}
        </div>
      </section>
    </>
  );
}
//
