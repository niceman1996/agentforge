import type { ToolDefinition } from "@/shared";
import { DECK, num, usd, costRange } from "@/shared";

export const deckCalculator: ToolDefinition = {
  slug: "deck-calculator",
  title: "Decking Calculator — Boards, Screws & Cost",
  h1: "Deck Board Calculator",
  metaDescription:
    "Calculate how many deck boards you need for 12 ft or 16 ft boards, plus screws and 2026 lumber cost. Enter deck dimensions for instant results.",
  category: "outdoor",
  intro: [
    "Decking math is about linear feet, not square feet: boards run in one direction, each board covers a strip about 5.75 inches wide (a 5½ in board plus a ¼ in gap), and every cut end wastes lumber. Order wrong and you're mid-deck with a hardware store run.",
    "Enter your deck's dimensions below. The calculator outputs total board footage, counts for both 12 ft and 16 ft boards, and the fasteners you'll need.",
  ],
  fields: [
    { name: "length", label: "Deck length", unit: "ft", default: 12, min: 1, step: 0.5 },
    { name: "width", label: "Deck width", unit: "ft", default: 12, min: 1, step: 0.5 },
    { name: "boardWidth", label: "Board width", unit: "inches", default: 5.5, min: 3.5, max: 12, step: 0.25, help: "Actual width: 5.5 in for standard 6 in decking" },
    { name: "gap", label: "Gap between boards", unit: "inches", default: 0.25, min: 0, max: 0.5, step: 0.125 },
  ],
  compute: (v) => {
    const area = v.length * v.width;
    const effectiveWidthFt = (v.boardWidth + v.gap) / 12;
    const linealFt = area / effectiveWidthFt;
    const boards12 = Math.ceil(linealFt / 12);
    const boards16 = Math.ceil(linealFt / 16);
    const screws = Math.ceil((area / 1000) * DECK.screwsPer1000SqFt);
    const cost = costRange(area, DECK.boardPricePerSqFt);
    return {
      rows: [
        { label: "Deck area", value: `${num(area, 1)} sq ft` },
        { label: "Decking needed", value: `${num(linealFt, 0)} linear ft`, emphasis: true },
        { label: "Using 12 ft boards", value: `${boards12} boards` },
        { label: "Using 16 ft boards", value: `${boards16} boards` },
        { label: "Deck screws (2 per joist crossing)", value: `≈ ${screws} screws` },
        { label: "Deck materials (est.)", value: `${usd(cost.low)} – ${usd(cost.high)}` },
      ],
      note: "Board counts are the mathematical minimum — add 5–10% for cuts, defects, and board ends splitting. 16 ft boards mean fewer seams but are harder to transport alone. Joists, posts, and rails are extra.",
    };
  },
  howItWorks: {
    formula: "Lineal ft = Deck area ÷ [(Board width + Gap) ÷ 12]",
    steps: [
      "Multiply deck length × width for the total area.",
      "Find each board's effective coverage: board width plus gap (5.5 in + 0.25 in = 5.75 in = 0.479 ft of deck per board run).",
      "Divide the area by that coverage for total linear feet of decking.",
      "Divide by your board length (12 or 16 ft) and round up for board count — longer boards mean fewer butt seams, which look better and are stronger.",
      "Estimate screws at roughly 3 per square foot (two screws at every joist crossing with 16 in spacing) — about 3,200 screws per 1,000 sq ft.",
    ],
    example:
      "A 12 ft × 12 ft deck: 144 ÷ 0.479 ≈ 301 linear ft → 26 twelve-foot boards or 19 sixteen-foot boards, plus roughly 460 screws (about 3 lb, or a 5 lb box with spares).",
  },
  faqs: [
    {
      q: "How many deck boards do I need for a 12×12 deck?",
      a: "A 12 ft × 12 ft deck needs about 301 linear feet of decking — 26 boards if buying 12-footers, or 19 if buying 16-footers (installed perpendicular to the joists, boards running across the 12 ft direction). Add 5–10% for waste and defects.",
    },
    {
      q: "How much does a 12×12 deck cost in 2026?",
      a: "Pressure-treated decking material runs roughly $8–$20 per sq ft ($1,150–$2,900 for 144 sq ft), including boards, fasteners, and framing lumber. Composite decking doubles or triples the decking cost. Labor adds $15–$35 per sq ft if you hire it out.",
    },
    {
      q: "What size gap should I leave between deck boards?",
      a: "For pressure-treated wood, a ¼ inch gap is standard — the wood is wet at install and shrinks. Composite boards usually need only a 3/16 inch gap or manufacturer clips. Air-dried hardwood can be gapped tighter at 1/8 inch.",
    },
    {
      q: "Can I use 12 ft boards on a 16 ft deck?",
      a: "You can, but stagger the butt joints across joists — never let splices line up in a straight row, and land every cut end on a joist face. Buying boards that span the full depth (16 fters for a 16 ft dimension) looks better and is structurally simpler.",
    },
    {
      q: "How far apart should deck joists be?",
      a: "16 inches on center is standard for wood decking on 2×8 or larger joists. Composite and PVC decking often requires 12 in OC, and diagonal layouts need tighter spacing too — check the decking manufacturer's span chart before framing.",
    },
  ],
  updated: "2026-10-26",
};
