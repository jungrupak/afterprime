// components/acfFieldGroups/index.ts
import type { ComponentType } from "react";
//import component accordingly
import FoundersCard from "../founder-card/FounderCard";

export const acfFieldRegistry: Record<string, ComponentType<any>> = {
  founder_message: FoundersCard,
};
