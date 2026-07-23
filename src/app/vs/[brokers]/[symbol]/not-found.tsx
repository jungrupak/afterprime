import Button from "@/components/ui/Button";
import { getTranslatedStatic } from "@/lib/content/getTranslatedStatic";
import { vsSymbolNotFoundContent } from "./vsSymbolNotFoundContent";
import { getRequestLocale } from "@/lib/locale/getRequestLocale";
import { localizeHref } from "@/lib/locale/localizeHref";

export default async function VsSymbolNotFound() {
  const locale = await getRequestLocale();
  const t = await getTranslatedStatic("vs-symbol-not-found", locale, vsSymbolNotFoundContent);

  return (
    <section>
      <div className="ap_container">
        <div className="text-center px-6 py-30">
          <h1 className="h1-size mt-30">{t.heading}</h1>
          <p className="paragraph mt-4 mb-10 opacity-70">
            {t.description}
          </p>
          <Button varient="primary-ghost" size="regular" href={localizeHref("/vs/", locale)}>
            {t.backLink}
          </Button>
        </div>
      </div>
    </section>
  );
}
