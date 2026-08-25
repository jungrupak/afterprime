export interface BoostedHeroWidgetContent {
  badge: string;
  accountLabel: string;
  equityCaption: string;
  startEquity: number;
  graduationEquity: number;
  targetEquity: number;
  maxNop: number;
  floorLabel: string;
  nopLabel: string;
  withdrawableLabel: string;
  graduationCaption: string;
}

export interface BoostedHeroContent {
  eyebrow: string;
  headingPrefix: string;
  headingHighlight: string;
  subhead: string;
  ctaPrimary: string;
  ctaSecondary: string;
  trustPoints: string[];
  widget: BoostedHeroWidgetContent;
}

export interface ComparisonColumn {
  label: string;
  points: string[];
}

export interface BoostedDifferenceContent {
  eyebrow: string;
  heading: string;
  typical: ComparisonColumn;
  boosted: ComparisonColumn;
}

export interface HowItWorksStep {
  title: string;
  body: string;
}

export interface BoostedHowItWorksContent {
  eyebrow: string;
  heading: string;
  steps: HowItWorksStep[];
}

export interface MechanicsStat {
  label: string;
  value: string;
  caption: string;
  accent?: boolean;
}

export interface BoostedMechanicsContent {
  eyebrow: string;
  heading: string;
  stats: MechanicsStat[];
}

export interface FaqEntry {
  question: string;
  answer: string;
}

export interface BoostedFaqContent {
  eyebrow: string;
  heading: string;
  items: FaqEntry[];
}

export interface BoostedBottomCtaContent {
  heading: string;
  body: string;
  cta: string;
}

export interface BoostedPageContent {
  hero: BoostedHeroContent;
  difference: BoostedDifferenceContent;
  howItWorks: BoostedHowItWorksContent;
  mechanics: BoostedMechanicsContent;
  faq: BoostedFaqContent;
  bottomCta: BoostedBottomCtaContent;
  footerNote: string;
}

export const boostedContent: BoostedPageContent = {
  hero: {
    eyebrow: "TradeCore-powered funded accounts",
    headingPrefix: "Get funded like it's real. Because eventually, ",
    headingHighlight: "it is.",
    subhead:
      "Pay once, prove yourself on a $10,000 simulated account, and graduate straight into a genuine STP-funded account. No challenge phases, no trailing drawdowns, no fine print built to fail you.",
    ctaPrimary: "Start with $500",
    ctaSecondary: "See how it works ↓",
    trustPoints: [
      "Real STP execution",
      "$100K max NOP",
      "Withdraw anytime above $10,500",
    ],
    widget: {
      badge: "GRADUATED",
      accountLabel: "BOOSTED ACCOUNT · #BA-0192",
      equityCaption: "Live equity · STP account",
      startEquity: 10000,
      graduationEquity: 10500,
      targetEquity: 10842.16,
      maxNop: 100000,
      floorLabel: "EQUITY FLOOR",
      nopLabel: "MAX NOP",
      withdrawableLabel: "WITHDRAWABLE",
      graduationCaption: "graduation",
    },
  },
  difference: {
    eyebrow: "The difference",
    heading: "This isn't another prop challenge.",
    typical: {
      label: "Typical prop challenge",
      points: [
        "Consistency rules on how you trade",
        "Minimum trading days before payout",
        "Trailing drawdowns that chase your gains",
        "Multiple phases before you're \"funded\"",
        "Still simulated, even after you \"pass\"",
      ],
    },
    boosted: {
      label: "Boosted account",
      points: [
        "One simple target: $10,000 → $10,500",
        "No minimum trading days",
        "No trailing drawdown",
        "Automatic graduation to a real account",
        "Withdraw profits above $10,500, whenever you like",
      ],
    },
  },
  howItWorks: {
    eyebrow: "How it works",
    heading: "Four steps. One real account at the end.",
    steps: [
      {
        title: "Pay $500 & complete KYC",
        body: "One-time entry fee. Full identity verification before you place a trade.",
      },
      {
        title: "Trade a $10,000 simulated account",
        body: "Zero market exposure at this stage. Equity falling to $9,500 closes the account.",
      },
      {
        title: "Reach $10,500 — graduate automatically",
        body: "No review, no approval queue. Hit the number and you're moved to a live STP account.",
      },
      {
        title: "Trade real. Withdraw whenever.",
        body: "$10,000 equity floor, $100,000 max NOP. Pull profits above $10,500 any time you choose.",
      },
    ],
  },
  mechanics: {
    eyebrow: "Account mechanics",
    heading: "The full spec, no asterisks.",
    stats: [
      { label: "Entry fee", value: "$500", caption: "One-time, includes KYC" },
      {
        label: "Simulated balance",
        value: "$10,000",
        caption: "No live market exposure",
      },
      {
        label: "Simulated cut-off",
        value: "$9,500",
        caption: "Account closes below this",
      },
      {
        label: "Graduation target",
        value: "$10,500",
        caption: "Unlocks the real account",
        accent: true,
      },
      {
        label: "Live equity floor",
        value: "$10,000",
        caption: "Below this, account auto-closes",
      },
      {
        label: "Max net open position",
        value: "$100,000",
        caption: "The only trading limit, live",
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    heading: "Straight answers.",
    items: [
      {
        question: "Is my money at risk during the simulated stage?",
        answer:
          "No trades reach the live market until you graduate. The simulated stage carries zero market exposure for you or for us.",
      },
      {
        question: "What happens if I don't reach $10,500?",
        answer:
          "Your simulated account closes automatically once equity hits $9,500. [PLACEHOLDER — confirm re-attempt / refund policy with product]",
      },
      {
        question: "When can I withdraw?",
        answer:
          "Once you're live, any equity above $10,500 is yours to withdraw whenever you like — or you can close the account and take the full remaining balance.",
      },
      {
        question: "Is the live account really \"real\"?",
        answer:
          "Yes — once graduated, it's a genuine STP account with [YOUR ENTITY / REGULATOR — placeholder pending Jem's copy], the same execution you'd get funding an account yourself.",
      },
    ],
  },
  bottomCta: {
    heading: "Your next account could be real.",
    body: "$500 to start. One target to hit. A genuine STP account waiting on the other side.",
    cta: "Start with $500 →",
  },
  footerNote:
    "[PLACEHOLDER — final risk disclosure & regulatory copy pending legal/compliance review]",
};
