import styles from "./Page.module.scss";
import Lists from "@/utils/lists/Lists";
import { Metadata } from "next";
import Card from "@/components/ui/Card";
import Image from "next/image";
import { getCalcPageData } from "@/data/getCalculatorPageData";
import FaqCalc from "@/components/faq-calculators/Faq";
import { calculatorSchema } from "@/lib/schema/calculatorsPageSchema";

export const metadata: Metadata = {
  title: `Trading Calculators | Free Forex & CFD Tools
`,
  description: `Free trading calculators for forex, CFD, and crypto traders. Position size, profit/loss, margin, pip value, compound growth, and risk analysis tools.`,
  alternates: {
    canonical: "https://afterprime.com/calculators",
  },
};

//Export Dynamic Page Title Tags Ends####

//####
export default async function Page() {
  const pageData = await getCalcPageData("calculators");
  if (!pageData) return;
  const faqSection = pageData?.acf?.faq_section;

  const sectionTitle = faqSection?.ssection_title;
  const faqData = faqSection?.q_and_a;

  const cards = [
    {
      title: "Position Size Calculator",
      paragraph:
        "Calculate the optimal lot size for any trade based on your account balance, risk percentage, and stop-loss distance. Primary Use: Determine how many lots to trade while staying within your risk limits",
      button_url: "/calculators/position-size-calculator",
    },
    {
      title: "Profit/Loss Calculator",
      paragraph:
        "See your potential profit and loss before entering a trade. Enter entry, stop-loss, and take-profit levels with position size. Primary Use: Know exactly what you stand to gain or lose before committing capital. ",
      button_url: "/calculators/profit-loss-calculator",
    },
    {
      title: "Margin & Leverage Calculator",
      paragraph:
        "Calculate margin requirements and understand your leverage exposure. See how much capital is tied up and risk of margin call. Primary Use: Ensure you have sufficient margin and understand your effective leverage ",
      button_url: "/calculators/margin-calculator",
    },
    {
      title: "Pip Value Calculator",
      paragraph:
        "Find the exact value of a pip for any instrument and position size. Supports forex pairs, commodities, and indices. Primary Use: Know the dollar value of price movements before sizing positions.",
      button_url: "/calculators/pip-value-calculator",
    },
    {
      title: "Compound Growth Calculator",
      paragraph:
        "Project your account growth over time based on win rate, risk-reward ratio, and position sizing with compound returns. Primary Use: Set realistic expectations and understand the power of consistent trading",
      button_url: "/calculators/compound-growth-calculator",
    },
    {
      title: "Drawdown & Risk of Ruin Calculator",
      paragraph:
        "Calculate maximum expected drawdown, probability of losing streaks, and risk of ruin for your trading strategy. Primary Use: Understand worst-case scenarios and ensure your strategy survives variance.",
      button_url: "/calculators/drawdown-calculator/",
    },
    {
      title: "Currency Converter",
      paragraph:
        "Convert between major currencies, crypto, and precious metals. Useful when your account currency differs from trading instruments. Primary Use: Quick currency conversions for international trading and profit calculation.",
      button_url: "/calculators/currency-converter/",
    },
    {
      title: "Swap/Overnight Cost Calculator",
      paragraph:
        "Calculate the cost or credit of holding positions overnight. Estimate financing charges for swing trades and longer holds. Primary Use: Factor overnight costs into multi-day trading strategies.",
      button_url: "/calculators/swap-calculator/",
    },
  ];

  const listItems = [
    `<b>Risk Management</b><br/>
The difference between professional and amateur traders often comes down to risk management. Calculators help you determine exact position sizes, potential losses, and whether a trade fits your risk parameters.
`,
    `<b>Remove Emotion</b></br>
When you calculate position size and potential loss before entering, you've already accepted the risk. This removes the emotional decision-making that causes many traders to move stops or overtrade.
`,
    `<b>Consistency</b></br>
Using the same calculation process for every trade creates consistency. Whether the market is trending or ranging, your risk remains controlled.
`,
    `<b>Efficiency</b></br>
Mental math under pressure leads to errors. Let calculators handle the numbers so you can focus on analysis and execution.
`,
  ];

  const listBeforeTrade = [
    `Use the <b>Pip Value Calculator</b> to understand movement value`,
    `Use the <b>Position Size Calculator</b> to determine lot size`,
    `Use the <b>Profit/Loss Calculator</b> to preview outcomes`,
    `Use the <b>Margin Calculator</b> to ensure sufficient capital
`,
  ];
  const listStrategyPlanning = [
    `Use the <b>Compound Growth Calculator</b> to set realistic goals`,
    `Use the <b>Drawdown Calculator</b> to stress-test your approach`,
    `Use the <b>Swap Calculator</b> for overnight hold strategies`,
  ];

  const faqSchema =
    faqData && faqData.length
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqData
            .filter(
              (item: { question: string; answer: string }) =>
                item.question && item.answer,
            )
            .map((item: { question: string; answer: string }) => ({
              "@type": "Question",
              name: item.question.replace(/(<([^>]+)>)/gi, ""),
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer.replace(/(<([^>]+)>)/gi, ""),
              },
            })),
        }
      : null;

  return (
    <>
      {/* Banner Section */}
      <section
        className={`${styles.innerBannerSection} max-h-[600px]! md:max-h-[72vh]!`}
      >
        <div className="grainy_bg"></div>
        <div className="ap_container flex items-center h-full">
          <div className="apBannerContent md:max-w-[800px]">
            <h1 className="h1-size mt-28 lg:mt-42 ">
              <span className="font-[600]">Trading Calculators</span>
            </h1>
            <div
              className="paragraph mb-12 max-lg:mx-auto lg:mt-20 opacity-80"
              style={{ fontWeight: "300" }}
            >
              Free tools to help you trade smarter. Calculate position sizes,
              potential profits, margin requirements, and more - before you
              click the button. Professional traders don't guess these numbers;
              neither should you.
            </div>
          </div>
        </div>
      </section>
      {/* Banner Section Ends */}

      {/* INtro sectio */}
      <section className="pt-10!">
        <div className="grainy_bg"></div>
        <div className="ap_container">
          {/* Cards */}
          <div className="ap_cards_wrapper grid flex flex-col md:grid-cols-[repeat(auto-fit_,minmax(600px,1fr))] text-left! gap-6 md:mt-18">
            {cards.length > 0 &&
              cards.map((card, index) => (
                <Card
                  key={index}
                  title={card.title}
                  paragraph={card.paragraph}
                  cardCtaLabel={card.title}
                  cardCtaLink={card.button_url}
                  cardSize={"large"} //compact|large|regular|small|
                  alignItems="left"
                />
              ))}
          </div>
          {/* Cards Ends */}
        </div>
      </section>
      {/* INtro sectio Ends */}

      {/* section */}
      <section className="py-4! md:py_10!">
        <div className="grainy_bg"></div>
        <div className="ap_container">
          <div className="grid grid-cols-2 lg:grid-cols-2 xl:gap-25 gap-10">
            <div className="col-span-2 md:col-span-1 order-2 h-full">
              <Image
                src={"/a-lone-trader-on-a-subway-ghost-in-the-studio.webp"}
                width={600}
                height={700}
                alt="A lone Trader on a Subway"
                className="aspect-auto"
              />
            </div>
            <div className="col-span-2 md:col-span-1 contetPart order-1">
              <h2>Why Use Trading Calculators?</h2>
              <Lists bulletStyle="arrow_blue" items={listItems} />
            </div>
          </div>
        </div>
      </section>
      {/* section Ends */}

      {/* When to use calculator */}
      <section className="SectionCardRepeater-module-scss-module__tw0V9a__section_generic_cards_content undefined">
        <div className="grainy_bg" />
        <div className="ap_container">
          <div className="grid max-md:grid-cols-[repeat(auto-fit,minmax(350px,1fr))] grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 justify-center max-md:mb-8">
            <div className="" />
          </div>
          <div className="ap_cards_wrapper grid grid-cols-[repeat(auto-fit,minmax(335px,1fr))] gap-6 md:gap-15 md:mt-18">
            <div>
              <h3 className={`text-[clamp(20px_,5vw_,34px)] font-semibold]`}>
                Before the Trade
              </h3>
              <Lists bulletStyle="arrow" items={listBeforeTrade} />
            </div>
            <div>
              <h3 className={`text-[clamp(20px_,5vw_,34px)] font-semibold]`}>
                For Strategy Planning
              </h3>
              <Lists bulletStyle="arrow" items={listStrategyPlanning} />
            </div>
            <div>
              <h3 className={`text-[clamp(20px_,5vw_,34px)] font-semibold]`}>
                For Account Management
              </h3>
              <Lists bulletStyle="arrow" items={listBeforeTrade} />
            </div>
          </div>
        </div>
      </section>
      {/* When to use calculator */}

      <FaqCalc faqSubject={sectionTitle} data={faqData} />

      {/* //render data comparison schema */}
      {calculatorSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(calculatorSchema),
          }}
        />
      )}

      {/* FAQ schema */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      )}
    </>
  );
}
