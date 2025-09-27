import styles from "./style.module.scss";
import Btn from "@/components/ui/Button";

interface acfBlocks {
  section_title?: string;
  section_paragraph?: string;
  card_apply?: {
    title?: string;
    paragraph?: string;
    cta_label?: string;
    cta_link?: string;
  };
  card_referal?: {
    title?: string;
    paragraph?: string;
    cta_label?: string;
    cta_link?: string;
  };
}

interface Props {
  data: acfBlocks;
}

export function BottomCta({ data }: Props) {
  return (
    <>
      <section className={`${styles.section_cta}`}>
        {/* grain bg effect */}
        <div className="grainy_bg"></div>
        {/* grain bg effect */}
        <div className="ap_container">
          <div className="max-w-[700px] mx-auto text-center">
            <h2 className="h2-size mb-6">{data?.section_title}</h2>
            <p className="paragraph max-w-2xl mx-auto mb-20 opacity-90">
              {data.section_paragraph}
            </p>
          </div>
          {/* Cards */}
          <div className="ap_cards_wrapper grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-6 text-center md:mt-18 md:max-w-[900px] md:mx-auto">
            <div className={`${styles.ctaCard} group`}>
              <h3 className="">{data?.card_apply?.title}</h3>
              <p>{data?.card_apply?.paragraph}</p>

              <Btn
                size="regular"
                href={data?.card_apply?.cta_link}
                varient={"primary"}
              >
                {data?.card_apply?.cta_label}
              </Btn>
            </div>

            <div className={`${styles.ctaCard} group`}>
              <h3 className="">{data?.card_referal?.title}</h3>
              <p>{data?.card_referal?.paragraph}</p>

              <Btn
                size="regular"
                href={data?.card_referal?.cta_link}
                varient={"ghost"}
                linkTarget="_self"
              >
                {data?.card_referal?.cta_label}
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
