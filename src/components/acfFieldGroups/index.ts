import type { PageFieldGroups } from "@/types/blocks";
import FoundersCard from "../founder-card/FounderCard";

/**
 * Registry mapping page-level ACF fields to React components.
 * Only register the fields you need. Each component receives
 * props typed according to the corresponding PageFieldGroups key.
 */
export const acfFieldRegistry: {
  [K in keyof PageFieldGroups]?: React.ComponentType<PageFieldGroups[K]>;
} = {
  founder_message: FoundersCard,
};
