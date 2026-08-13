export interface ExitIntentModalContent {
  eyebrow: string;
  heading: string;
  bodyCopy: string;
  statNumber: string;
  statLabel: string;
  emailPlaceholder: string;
  submitLabel: string;
  submitLabelLoading: string;
  dismissLabel: string;
  finePrint: string;
  successHeading: string;
  successBody: string;
  successCloseLabel: string;
  errorMessage: string;
  invalidEmailMessage: string;
  closeButtonLabel: string;
}

export const exitIntentModalContent: ExitIntentModalContent = {
  eyebrow: "Before you go",
  heading: "Get execution-level insights, every other Tuesday.",
  bodyCopy:
    "The Current is Afterprime's bi-weekly newsletter. Verified cost data, execution notes, and trader craft. No signals, no noise.",
  statNumber: "43%",
  statLabel:
    "lower total trading cost vs. industry average, ForexBenchmark-verified",
  emailPlaceholder: "your@email.com",
  submitLabel: "Subscribe to The Current",
  submitLabelLoading: "Subscribing…",
  dismissLabel: "No thanks, continue browsing",
  finePrint: "One email, every other Tuesday. Unsubscribe anytime.",
  successHeading: "You're on the list.",
  successBody:
    "The next issue of The Current lands in your inbox on the next Tuesday cycle.",
  successCloseLabel: "Close",
  errorMessage: "Something didn't go through. Check the email and try again.",
  invalidEmailMessage: "Enter a valid email address.",
  closeButtonLabel: "Close",
};
