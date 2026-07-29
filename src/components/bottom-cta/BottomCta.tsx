import styles from "./style.module.scss";
import Btn from "@/components/ui/Button";
import { getTranslatedStatic } from "@/lib/content/getTranslatedStatic";
import { getRequestLocale } from "@/lib/locale/getRequestLocale";

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

export async function BottomCta({ data }: Props) {
  const locale = await getRequestLocale();

  const t = await getTranslatedStatic("bottom-cta", locale, {
    heading: data?.section_title || "",
    paragraph: data?.section_paragraph || "",
    applyTitle: data?.card_apply?.title || "",
    applyParagraph: data?.card_apply?.paragraph || "",
    applyCta: data?.card_apply?.cta_label || "",
    referalTitle: data?.card_referal?.title || "",
    referalParagraph: data?.card_referal?.paragraph || "",
    referalCta: data?.card_referal?.cta_label || "",
  });

  return (
    <>
      <section className={`${styles.section_cta} compact-section`}>
        <div className="ap_container_small">
          <div className="max-w-[700px] mx-auto text-center">
            <h2
              className="h2-size mb-6"
              dangerouslySetInnerHTML={{ __html: t.heading }}
            />
            <p
              className="paragraph max-w-2xl mx-auto mb-20 opacity-90"
              dangerouslySetInnerHTML={{ __html: t.paragraph }}
            />
          </div>
          {/* Cards */}
          <div className="ap_cards_wrapper grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-6 text-center md:mt-18 md:max-w-[900px] md:mx-auto">
            <div className={`${styles.ctaCard} group`}>
              <h3
                dangerouslySetInnerHTML={{ __html: t.applyTitle }}
              />
              <p
                dangerouslySetInnerHTML={{ __html: t.applyParagraph }}
              />

              <Btn
                size="regular"
                href={data?.card_apply?.cta_link}
                varient={"primary"}
              >
                {t.applyCta}
              </Btn>
            </div>

            <div className={`${styles.ctaCard} group`}>
              <h3
                dangerouslySetInnerHTML={{ __html: t.referalTitle }}
              />
              <p
                dangerouslySetInnerHTML={{ __html: t.referalParagraph }}
              />

              <Btn
                size="regular"
                href={data?.card_referal?.cta_link}
                varient={"ghost"}
                linkTarget="_self"
              >
                {t.referalCta}
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
