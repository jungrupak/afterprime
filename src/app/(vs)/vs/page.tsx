import Lists from "@/utils/lists/Lists";
import styles from "./TradePage.module.scss";
import { Metadata } from "next";

type FxPair = {
  symbol: string;
  url: string;
};

type FxCategory = {
  majors?: FxPair[];
  minors?: FxPair[];
  exotics?: FxPair[];
};

export const metadata: Metadata = {
  title: `Afterprime Broker Comparisons - Verified Cost Analysis`,
  description: `Compare Afterprime's zero commission + Flow Rewards model against major forex brokers. Total cost breakdowns verified by ForexBenchmark.`,
  alternates: {
    canonical: "https://afterprime.com/vs",
  },
};

//Export Dynamic Page Title Tags Ends####

//####
export default async function TradePage() {
  const listItems = [
    `<b>xx% lower costs than top 10 brokers</b><br/>
xxxx
`,
    `<b>65% lower costs than industry average</b></br>
xxxx
`,
    `<b>Flow Rewards<sup>TM</sup></b></br>
xxx. Plus Zero commission on all instruments
`,
  ];

  const bottomLists = [
    "Cost per lot (including commission)",
    "All-In Cost (round turn)",
    "Flow Rewards<sup>TM</sup> per lot",
    "Net Cost per lot",
    "Savings vs Afterprime",
  ];

  return (
    <>
      {/* Banner Section */}
      <section
        className={`${styles.innerBannerSection} h-auto! compact-innerpage-banner`}
      >
        <div className="grainy_bg"></div>
        <div className="ap_container_small flex items-center h-full">
          <div className="apBannerContent">
            <h1 className="h1-size mt-10 lg:mt-15 md:max-w-[800px]">
              <span className="font-[600]">
                Compare Afterprime Against Major Brokers
              </span>
            </h1>
            <div
              className="paragraph max-lg:mx-auto lg:mt-8 opacity-80"
              style={{ fontWeight: "300", whiteSpace: "pre-line" }}
            >
              Independent cost comparisons across spreads, commissions, and execution quality. All data verified by ForexBenchmark.com.

              Afterprime's zero commission structure and <a href="/get-paid-to-trade"><u>Flow Rewards</u></a> deliver consistently lower total trading costs. Below are detailed comparisons against industry-leading brokers, showing exact cost differences at 50, 200, and 1,000 lot monthly volumes.
            </div>
          </div>
        </div>
      </section>
      {/* Banner Section Ends */}

      {/* INtro sectio */}
      <section className="compact-section">
        <div className="grainy_bg"></div>
        <div className="ap_container_small">
          <h2>Afterprime's Position</h2>
          <Lists bulletStyle="arrow_blue" items={listItems} />

All cost data from ForexBenchmark.com, 7-day rolling average.

Last updated: dd MM YYYY

        </div>
      </section>
      {/* INtro sectio Ends */}

      {/* INtro sectio */}
      <section className="compact-section">
        <div className="grainy_bg"></div>
        <div className="ap_container_small">
          <h2>Detailed Broker Comparisons</h2>

Select a broker below to see detailed cost breakdowns and monthly savings calculations at your trading volume.


<h2>Understanding Total Trading Cost</h2>

Total trading cost includes three components:

<ul>
<li><b>Spread cost</b> Average spread × $10 per pip per standard lot</li>
<li><b>Commission</b> Round-turn commission charged by the broker</li>
<li><b>Rebates</b> Flow Rewards or volume discounts (where applicable)</li>
</ul>

Formula:
Net cost per lot = (Spread × $10) + Commission - Rebates

Afterprime advantage:
- Zero commission ($0)
- Competitive spreads
- Flow Rewards starting with 1st trade

Most competitors charge $3-7 commission per lot with no rebate structure until significantly higher volumes.


Volume Scenarios Explained
Heading: "Cost Impact at Different Volumes"
50 Lots/Month:
Entry point for Flow Rewards. Typical for active day traders and small systematic strategies.
Monthly savings range: $115-$450 vs major competitors

200 Lots/Month:
Standard volume for full-time retail traders and small prop accounts.
Monthly savings range: $460-$1,800 vs major competitors

1,000 Lots/Month:
Professional trader and fund threshold. Flow Rewards create negative net costs.
Monthly savings range: $2,300-$9,000 vs major competitors


FAQ Section
Q1: How is this data verified?
A1: All spread, commission, and execution data comes from ForexBenchmark.com, an independent monitoring service. They track real-time costs across 100+ brokers with no commercial relationships.

Q2: Why isn't [Broker X] listed?
A2: We're adding comparisons continuously. If your current broker isn't listed, use our cost calculator to generate a custom comparison, or request it via the contact form.

Q3: Do these comparisons include all costs?
A3: Yes. We calculate total all-in costs including spreads, commissions, and any rebates or rewards programs. Overnight financing and inactivity fees are not included as they vary by account activity.

Q4: How often is this data updated?
A4: Cost data updates weekly from ForexBenchmark.com. Savings percentages recalculate automatically. Last update: dd mm yyyy

Q5: Can I switch if I'm currently with one of these brokers?
A5: Yes. Most traders complete account transfers in 2-3 business days. We provide migration support and verify your existing trading costs before you switch.

CTA Section
Heading: Calculate Your Exact Savings
Body:
Enter your current broker and monthly volume to see your specific cost comparison.

CTA Button: Use Cost Calculator → /calculator
Alternative CTA:
Ready to switch? Afterprime is invite-only.

CTA Button: Apply Now
Subtext:
Application takes 3 minutes. Our team reviews within 48 hours and provides a personalized cost analysis.
###
        </div>
      </section>
      {/* INtro sectio Ends */}

      {/* Bottom section */}
      <section className="compact-section">
        <div className="grainy_bg"></div>
        <div className="ap_container_small">
          <h2>How To Compare Forex Trading Costs</h2>
          <p className={`paragraph`}>
            Spreads show potential cost. All in cost shows actual cost.
          </p>
          <p className={`paragraph mt-4 md:mt-8`}>Afterprime publishes</p>
          <Lists
            customClass="mt-4 md:mt-8"
            bulletStyle="arrow_blue"
            items={bottomLists}
          />
          <p className={`paragraph mt-4 md:mt-8`}>
            These inputs allow traders to model costs across volume assumptions
            before trading.
          </p>
        </div>
      </section>
      {/* INtro sectio Ends */}
    </>
  );
}
