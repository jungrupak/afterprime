// app/not-found.tsx
import Button from "@/components/ui/Button";
import { Blinker } from "next/font/google";
import { getTranslatedStatic } from "@/lib/content/getTranslatedStatic";
import { getRequestLocale } from "@/lib/locale/getRequestLocale";

const blinker = Blinker({
  subsets: ["latin"],
  weight: ["200", "400", "600", "800"],
});

export default async function CalculatorNotFound() {
  const locale = await getRequestLocale();
  const t = await getTranslatedStatic("calculator-not-found", locale, {
    heading: "Sorry, We can't find this calculator",
    subheading: "Oops! The page you're looking for doesn't exist.",
    buttonText: "Calculators",
  });

  return (
    <section>
      <div className="ap_container">
        <div className="text-center px-6">
          <h1 className="text-[clamp(50px,10vw,68px)] font-extrabold leading-none text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mt-30">
            {t.heading}
          </h1>
          <p className="mt-4 text-xl text-gray-400 mb-20">{t.subheading}</p>
          <Button varient="primary-ghost" size="regular" href="/calculators/">
            {t.buttonText}
          </Button>
        </div>
      </div>
    </section>
  );
}
