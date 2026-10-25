import type { ToolDefinition } from "@/shared";
import { concreteSlab } from "./concrete-calculator";
import { mulchCalculator } from "./mulch-calculator";

/** All tools on the site. Sub-agents: append your tool import here (keep alphabetical-ish). */
export const tools: ToolDefinition[] = [concreteSlab, mulchCalculator];
