import type { ToolDefinition } from "@/shared";
import { concreteSlab } from "./concrete-calculator";
import { postHoleConcreteCalculator } from "./post-hole-concrete-calculator";
import { mulchCalculator } from "./mulch-calculator";
import { gravelCalculator } from "./gravel-calculator";
import { topsoilCalculator } from "./topsoil-calculator";
import { sodCalculator } from "./sod-calculator";
import { grassSeedCalculator } from "./grass-seed-calculator";
import { retainingWallCalculator } from "./retaining-wall-calculator";
import { paintCalculator } from "./paint-calculator";
import { tileCalculator } from "./tile-calculator";
import { paverCalculator } from "./paver-calculator";
import { deckCalculator } from "./deck-calculator";
import { fenceCalculator } from "./fence-calculator";
import { drywallCalculator } from "./drywall-calculator";
import { insulationCalculator } from "./insulation-calculator";
import { roofShingleCalculator } from "./roof-shingle-calculator";
import { boardFeetCalculator } from "./board-feet-calculator";

/** All tools on the site. Append new tools here and in compute-map.ts. */
export const tools: ToolDefinition[] = [
  concreteSlab,
  postHoleConcreteCalculator,
  mulchCalculator,
  gravelCalculator,
  topsoilCalculator,
  sodCalculator,
  grassSeedCalculator,
  retainingWallCalculator,
  paintCalculator,
  tileCalculator,
  paverCalculator,
  deckCalculator,
  fenceCalculator,
  drywallCalculator,
  insulationCalculator,
  roofShingleCalculator,
  boardFeetCalculator,
];
