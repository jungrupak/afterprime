export interface ExitIntentModalContent {
  eyebrow: string;
  heading: string;
  aloneCurrentText:string;
  bodyCopy: string;
  statLabel: string;
  statLabel2: string;
  emailPlaceholder: string;
  submitLabel: string;
  submitLabelLoading: string;
  dismissLabel: string;
  finePrint: string;
  successHeading: string;
  successBody1:string;
  successBody: string;
  successListHeading: string;
  successList: string[];
  successFooter: string;
  successCloseLabel: string;
  errorMessage: string;
  invalidEmailMessage: string;
  closeButtonLabel: string;
}

export const exitIntentModalContent: ExitIntentModalContent = {
  eyebrow: "Before you leave",
  heading: "Get execution-level insights, every other Tuesday.",
  aloneCurrentText:"The Current",
  bodyCopy:
    "is Afterprime's bi-weekly newsletter. Verified cost data, execution notes, and trader craft. No signals, no noise.",

  statLabel:
    "lower total trading cost vs. industry average",
    statLabel2:"ForexBenchmark-verified",
  emailPlaceholder: "your@email.com",
  submitLabel: "Subscribe to The Current",
  submitLabelLoading: "Subscribing…",
  dismissLabel: "No thanks, continue browsing",
  finePrint: "One email, every other Tuesday. Unsubscribe anytime.",
  successHeading: "You're on the list.",
  successBody1:"The next issue of",
  successBody:
    "arrives on the next Tuesday cycle.",
  successListHeading: "What you'll get:",
  successList: [
    "Cost Check: how Afterprime stacks up against the industry average",
    "Market data and execution insight relevant to active traders",
    "No filler, no lifestyle content",
  ],
  successFooter:
    "Zero commission. Sub-50ms execution. Flow Rewards up to $3/lot.",
  successCloseLabel: "Close",
  errorMessage: "Something didn't go through. Check the email and try again.",
  invalidEmailMessage: "Enter a valid email address.",
  closeButtonLabel: "Close",
};
