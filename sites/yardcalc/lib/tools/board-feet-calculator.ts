import type { ToolDefinition } from "@/shared";
import { LUMBER, num, usd, costRange } from "@/shared";

export const boardFeetCalculator: ToolDefinition = {
  slug: "board-feet-calculator",
  title: "Board Foot Calculator — Lumber Volume & Cost",
  h1: "Board Foot Calculator",
  metaDescription:
    "Convert lumber dimensions to board feet instantly: thickness × width × length for any quantity of boards, with 2026 price estimates.",
  category: "lumber",
  intro: [
    "Lumberyards price hardwood by the board foot — a volume unit equal to a piece 12 in × 12 in × 1 in thick. It's not intuitive (a 2×4 eight feet long is not \"8 board feet\"), and getting it wrong means a 30% surprise at the register.",
    "Enter the nominal thickness and width in inches, the length in feet, and how many boards you need. Note: hardwood is sold by NOMINAL size — a dressed 4/4 board is actually about 13/16 in thick, but it's counted as a full inch.",
  ],
  fields: [
    { name: "thickness", label: "Thickness", unit: "inches", default: 1.5, min: 0.25, step: 0.25, help: "Nominal: 1 in (4/4), 1.5 in (6/4), 2 in (8/4)" },
    { name: "width", label: "Width", unit: "inches", default: 6, min: 0.5, step: 0.5 },
    { name: "length", label: "Length", unit: "ft", default: 8, min: 0.5, step: 0.5 },
    { name: "quantity", label: "Number of boards", unit: "count", default: 10, min: 1, step: 1 },
  ],
  compute: (v) => {
    const perBoard = (v.thickness * v.width * v.length) / 12;
    const total = perBoard * v.quantity;
    const cost = costRange(total, LUMBER.pricePerBoardFoot);
    return {
      rows: [
        { label: "Board feet per board", value: `${num(perBoard, 2)} bd ft` },
        { label: "Total board feet", value: `${num(total, 2)} bd ft`, emphasis: true },
        { label: "Lumber cost (est.)", value: `${usd(cost.low)} – ${usd(cost.high)}` },
      ],
      note: "Cost range spans common construction softwood to mid-range hardwoods. Premium hardwoods (walnut, cherry, figured stock) can run $8–$20+ per board foot.",
    };
  },
  howItWorks: {
    formula: "Board feet = Thickness(in) × Width(in) × Length(ft) ÷ 12 × Quantity",
    steps: [
      "Use the NOMINAL thickness and width (what you order), not the dressed/actual size.",
      "Multiply thickness × width in inches, then by length in feet.",
      "Divide by 12 — that's board feet for one board.",
      "Multiply by the number of boards and round to two decimals (lumberyards bill to the nearest 0.01 or 0.25 bd ft).",
    ],
    example:
      "Ten boards of 6/4 (1.5 in) cherry, 6 in wide, 8 ft long: 1.5 × 6 × 8 ÷ 12 = 6 bd ft each → 60 board feet total.",
  },
  faqs: [
    {
      q: "What is a board foot of lumber?",
      a: "A board foot is a volume of 144 cubic inches — a board 12 in wide × 12 in long × 1 in thick. Hardwoods and thicker slab lumber are priced per board foot, while construction softwoods (2×4s etc.) are priced per piece or per linear foot.",
    },
    {
      q: "How do I calculate board feet for a 2×4?",
      a: "Using nominal size: 2 × 4 × 8 ÷ 12 = 5.33 board feet per 8-footer. But big-box 2x4s are sold by the piece; the board-foot price matters mainly at hardwood yards and for bulk framing lumber quotes.",
    },
    {
      q: "Nominal vs actual lumber size — which do I use?",
      a: "Always calculate board feet with the NOMINAL (named) size: a 1×6 is really ¾ in × 5½ in dressed, but it's billed as a full 1 in × 6 in. Using actual sizes undercounts your bill by 20–25%.",
    },
    {
      q: "How much does lumber cost per board foot in 2026?",
      a: "Construction softwood framing runs roughly $1.50–$4 per board foot, common hardwoods (oak, maple, poplar) $4–$8, and premium woods (walnut, cherry) $8–$20+. Rough-sawn is cheaper than S4S (surfaced four sides), which the mill charges extra for.",
    },
    {
      q: "What does 4/4, 5/4, 8/4 lumber mean?",
      a: "That's thickness in quarters of an inch: 4/4 = 1 in nominal (about 13/16 in dressed), 5/4 = 1.25 in, 8/4 = 2 in. Hardwood is ordered in these quarter designations, and board feet use the nominal quarter size.",
    },
  ],
  updated: "2026-10-26",
};
