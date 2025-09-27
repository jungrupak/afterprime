import type { PageFieldGroups } from "@/types/blocks";
import FoundersCard from "../founder-card/FounderCard";

// Partial allows missing fields without breaking
export const acfFieldRegistry: Partial<{
  [K in keyof PageFieldGroups]: React.ComponentType<PageFieldGroups[K]>;
}> = {
  founder_message: FoundersCard,
};
