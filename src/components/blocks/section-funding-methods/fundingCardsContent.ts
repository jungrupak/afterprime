import { DepositCardData, WithdrawCardData } from "@/utils/FundingCardJson";

// method_name (brand/proper nouns like "Skrill", "Neteller") is skipped by
// the Object Walker's "name" denylist rule automatically; processing_time
// ("Instant", "Within 1-2 hours", ...) is the field actually worth
// translating here, and passes through untouched.
export const fundingCardsContent = {
  labels: {
    acceptedCurrencies: "Accepted Currencies:",
    processingTime: "Processing Time:",
    zeroFee: "- Zero Fee",
    depositNow: "Deposit Now",
    withdrawal: "Withdrawal",
  },
  depositCards: DepositCardData(),
  withdrawCards: WithdrawCardData(),
};

export type FundingCardsContent = typeof fundingCardsContent;
