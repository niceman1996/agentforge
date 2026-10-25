import type { ComputeFn } from "@/shared";
import { concreteSlab } from "./tools/concrete-calculator";
import { mulchCalculator } from "./tools/mulch-calculator";

/**
 * Client-side compute registry: slug → compute function. This module is
 * imported by the client calculator component, so it must stay free of
 * server-only imports. Append one line per new tool.
 */
export const computeMap: Record<string, ComputeFn> = {
  [concreteSlab.slug]: concreteSlab.compute,
  [mulchCalculator.slug]: mulchCalculator.compute,
};
