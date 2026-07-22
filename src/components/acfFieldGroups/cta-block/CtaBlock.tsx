import TypeformButton from "@/components/instrument-lps/typeform-btn/typeForm";
import styles from "./style.module.scss";
import { getGlobalOptionFields } from "@/lib/getGlobalBlockData";
import { getRequestLocale } from "@/lib/locale/getRequestLocale";
import { getTranslatedStatic } from "@/lib/content/getTranslatedStatic";

export async function CtaBlock() {
  const locale = await getRequestLocale();
  const fieldsData = await getGlobalOptionFields("cta_card");

  const t = await getTranslatedStatic("cta-block-options", locale, {
    headline: String(fieldsData?.headline || ""),
    paragraph: String(fieldsData?.paragraph || ""),
    small_text: String(fieldsData?.small_text || ""),
    buttonText: "Apply for Invite code",
    signupNowText: "Signup Now",
  });

  return (
    <div className={`ap_container_small relative z-1 w-full`}>
      <div
        className={`${styles.bottomCta} flex flex-col justify-center items-center text-center`}
      >
        <div>
          <h2 className={`text-[clamp(30px_,5vw_,50px)]! md:mb-8! leading-[1]`}>
            {t.headline}
          </h2>
          <p
            className={`paragraph mb-8 md:mb-10 opacity-80`}
            dangerouslySetInnerHTML={{ __html: t.paragraph }}
          />
          <TypeformButton buttonText={t.buttonText} signupNowText={t.signupNowText} size="Regular" />
          <div className={`text-[clamp(14px_,4vw_,16px)] mt-5 opacity-65`}>
            {t.small_text}
          </div>
        </div>
      </div>
    </div>
  );
}
//
