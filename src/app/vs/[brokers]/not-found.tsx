// app/not-found.tsx
import Button from "@/components/ui/Button";
import { Blinker } from "next/font/google";
import { getTranslatedStatic } from "@/lib/content/getTranslatedStatic";
import { vsBrokersNotFoundContent } from "./vsBrokersNotFoundContent";
import { getRequestLocale } from "@/lib/locale/getRequestLocale";
import { localizeHref } from "@/lib/locale/localizeHref";

const blinker = Blinker({
  subsets: ["latin"],
  weight: ["200", "400", "600", "800"],
});

export default async function CalculatorNotFound() {
  const locale = await getRequestLocale();
  const t = await getTranslatedStatic("vs-brokers-not-found", locale, vsBrokersNotFoundContent);

  return (
    <section>
      <div className="ap_container">
        <div className="text-center px-6">
          <h1 className="text-[clamp(50px,10vw,68px)] font-extrabold leading-none text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mt-30">
            {t.heading}
          </h1>
          <p className="mt-4 text-xl text-gray-400 mb-20">
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
