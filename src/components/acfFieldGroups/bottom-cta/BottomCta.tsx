import TypeformButton from "@/components/instrument-lps/typeform-btn/typeForm";
import styles from "./style.module.scss";
import { getGlobalOptionFields } from "@/lib/getGlobalBlockData";
import { getRequestLocale } from "@/lib/locale/getRequestLocale";
import { getTranslatedStatic } from "@/lib/content/getTranslatedStatic";

export async function BottomCta() {
  const locale = await getRequestLocale();
  const fieldsData = await getGlobalOptionFields("global_cta_fields");

  const t = await getTranslatedStatic("bottom-cta-options", locale, {
    headline: String(fieldsData?.headline || ""),
    paragraph: String(fieldsData?.paragraph || ""),
    small_text: String(fieldsData?.small_text || ""),
    buttonText: "Get Invite code",
    signupNowText: "Signup Now",
  });

  return (
    <section className={`compact-section`}>
      <div className={`ap_container_small relative z-1 w-full`}>
        <div
          className={`${styles.bottomCta} flex flex-col justify-center items-center text-center`}
        >
          <div>
            <h2
              className={`font-size-heading-md mb-4 md:mb-6 opacity-80 font-semibold`}
              dangerouslySetInnerHTML={{ __html: t.headline }}
            />

            <p
              className={`${styles.paragraph} reading-text-md opacity-60 mb-8 md:mb-12`}
              dangerouslySetInnerHTML={{ __html: t.paragraph }}
            />
            <TypeformButton
              buttonText={t.buttonText}
              signupNowText={t.signupNowText}
              size="Regular"
            />
            <div className={`reading-text-caption opacity-40 mt-5`}>
              {t.small_text}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
//
