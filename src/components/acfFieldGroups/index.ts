// components/acfFieldGroups/index.ts
import type { ComponentType } from "react";
import { PageFieldGroups, FieldGroupName } from "@/types/blocks";
//import component accordingly
import FoundersCard from "../founder-card/FounderCard";

export const acfFieldRegistry: {
  [K in FieldGroupName]: ComponentType<PageFieldGroups[K]>;
} = {
  founder_message: FoundersCard,
};
