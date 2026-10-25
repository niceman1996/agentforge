import type { ComputeFn } from "@/shared";
import { concreteSlab } from "./tools/concrete-calculator";
import { postHoleConcreteCalculator } from "./tools/post-hole-concrete-calculator";
import { mulchCalculator } from "./tools/mulch-calculator";
import { gravelCalculator } from "./tools/gravel-calculator";
import { topsoilCalculator } from "./tools/topsoil-calculator";
import { sodCalculator } from "./tools/sod-calculator";
import { grassSeedCalculator } from "./tools/grass-seed-calculator";
import { retainingWallCalculator } from "./tools/retaining-wall-calculator";
import { paintCalculator } from "./tools/paint-calculator";
import { tileCalculator } from "./tools/tile-calculator";
import { paverCalculator } from "./tools/paver-calculator";
import { deckCalculator } from "./tools/deck-calculator";
import { fenceCalculator } from "./tools/fence-calculator";
import { drywallCalculator } from "./tools/drywall-calculator";
import { insulationCalculator } from "./tools/insulation-calculator";
import { roofShingleCalculator } from "./tools/roof-shingle-calculator";
import { boardFeetCalculator } from "./tools/board-feet-calculator";

/**
 * Client-side compute registry: slug → compute function. This module is
 * imported by the client calculator component, so it must stay free of
 * server-only imports. Append one line per new tool.
 */
export const computeMap: Record<string, ComputeFn> = {
  [concreteSlab.slug]: concreteSlab.compute,
  [postHoleConcreteCalculator.slug]: postHoleConcreteCalculator.compute,
  [mulchCalculator.slug]: mulchCalculator.compute,
  [gravelCalculator.slug]: gravelCalculator.compute,
  [topsoilCalculator.slug]: topsoilCalculator.compute,
  [sodCalculator.slug]: sodCalculator.compute,
  [grassSeedCalculator.slug]: grassSeedCalculator.compute,
  [retainingWallCalculator.slug]: retainingWallCalculator.compute,
  [paintCalculator.slug]: paintCalculator.compute,
  [tileCalculator.slug]: tileCalculator.compute,
  [paverCalculator.slug]: paverCalculator.compute,
  [deckCalculator.slug]: deckCalculator.compute,
  [fenceCalculator.slug]: fenceCalculator.compute,
  [drywallCalculator.slug]: drywallCalculator.compute,
  [insulationCalculator.slug]: insulationCalculator.compute,
  [roofShingleCalculator.slug]: roofShingleCalculator.compute,
  [boardFeetCalculator.slug]: boardFeetCalculator.compute,
};
