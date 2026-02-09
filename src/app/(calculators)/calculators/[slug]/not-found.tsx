// app/not-found.tsx
import Button from "@/components/ui/Button";
import { Blinker } from "next/font/google";

const blinker = Blinker({
  subsets: ["latin"],
  weight: ["200", "400", "600", "800"],
});

export default function CalculatorNotFound() {
  return (
    <section>
      <div className="grainy_bg"></div>
      <div className="ap_container">
        <div className="text-center px-6">
          <h1 className="text-[clamp(50px,10vw,68px)] font-extrabold leading-none text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mt-30">
            Sorry, We can't find this calculator.
          </h1>
          <p className="mt-4 text-xl text-gray-400 mb-20">
            Oops! The page you&apos;re looking for doesn&apos;t exist.
          </p>
          <Button varient="primary-ghost" size="regular" href="/calculators/">
            Calculators
          </Button>
        </div>
      </div>
    </section>
  );
}
