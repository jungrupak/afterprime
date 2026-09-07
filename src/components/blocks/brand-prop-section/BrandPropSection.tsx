import { getTranslatedStatic } from "@/lib/content/getTranslatedStatic";
import { getRequestLocale } from "@/lib/locale/getRequestLocale";
import { brandPropContent } from "./brandPropContent";
import styles from "./style.module.scss";

export async function BrandPropSection() {
  const locale = await getRequestLocale();
  const t = await getTranslatedStatic(
    "brand-prop-section",
    locale,
    brandPropContent,
  );

  return (
    <section className={`${styles.sectionBrandProp} mt-10 md:mt-15`}>
      <div className="ap_container_small">
        <div className={styles.brandPropContents}>
          <div>
            <p className="font-size-heading-sm mb-4 md:mb-6 font-semibold">
              {t.left}
            </p>
          </div>
          <div>
            <p className="reading-text-md font-[300]">{t.right}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
