import { useMemo } from "react";
import type { acfBlocks } from "@/types/acf";

export function useAcfRepeaterValues<T extends acfBlocks>(
  data: T,
  fieldName: string,
  subField: string
): string[] {
  return useMemo(() => {
    const totalRows = Number(data[fieldName]) || 0;

    return Array.from({ length: totalRows }, (_, i) => {
      const value = data[`${fieldName}_${i}_${subField}`];
      // Ensure value is string
      return value !== undefined && value !== null ? String(value) : null;
    }).filter((v): v is string => Boolean(v));
  }, [data, fieldName, subField]);
}
