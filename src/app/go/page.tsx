import { getRequestLocale } from "@/lib/locale/getRequestLocale";
import { getTranslatedStatic } from "@/lib/content/getTranslatedStatic";
import { goPageContent } from "./goPageContent";
import GoPageClient from "./GoPageClient";

export default async function GoPage() {
  const locale = await getRequestLocale();
  const t = await getTranslatedStatic("go-page", locale, goPageContent);
  return <GoPageClient content={t} />;
}
