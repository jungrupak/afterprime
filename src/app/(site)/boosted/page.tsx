import { Metadata } from "next";
import HeroBoosted from "@/components/blocks/boosted/HeroBoosted";
import DifferenceComparison from "@/components/blocks/boosted/DifferenceComparison";
import HowItWorks from "@/components/blocks/boosted/HowItWorks";
import AccountMechanics from "@/components/blocks/boosted/AccountMechanics";
import FaqBoosted from "@/components/blocks/boosted/FaqBoosted";
import BottomCtaBoosted from "@/components/blocks/boosted/BottomCtaBoosted";
import { boostedContent } from "@/components/blocks/boosted/boostedContent";
import { getTranslatedStatic } from "@/lib/content/getTranslatedStatic";
import { getRequestLocale } from "@/lib/locale/getRequestLocale";

export const metadata: Metadata = {
  title: "Boosted Accounts — Get funded like it's real | Afterprime",
  description:
    "Pay once, prove yourself on a $10,000 simulated account, and graduate straight into a genuine STP-funded account. No challenge phases, no trailing drawdowns.",
  openGraph: {
    title: "Boosted Accounts — Get funded like it's real | Afterprime",
    description:
      "Pay once, prove yourself on a $10,000 simulated account, and graduate straight into a genuine STP-funded account.",
    url: "https://afterprime.com/boosted",
    siteName: "Afterprime",
    images: [
      {
        url: "/img/og-images/default-og-afterprime-home.jpg",
        width: 1200,
        height: 630,
        alt: "Afterprime Boosted Accounts",
      },
    ],
    type: "website",
  },
  alternates: {
    canonical: "https://afterprime.com/boosted",
  },
};

export default async function BoostedPage() {
  const locale = await getRequestLocale();
  const t = await getTranslatedStatic("boosted", locale, boostedContent);

  return (
    <>
      <HeroBoosted content={t.hero} />
      <DifferenceComparison content={t.difference} />
      <HowItWorks content={t.howItWorks} />
      <AccountMechanics content={t.mechanics} />
      <FaqBoosted content={t.faq} />
      <BottomCtaBoosted content={t.bottomCta} />
    </>
  );
}
