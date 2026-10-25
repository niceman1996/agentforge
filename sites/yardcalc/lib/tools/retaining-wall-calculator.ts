import type { ToolDefinition } from "@/shared";
import { RETAINING_WALL, num, usd, costRange } from "@/shared";

export const retainingWallCalculator: ToolDefinition = {
  slug: "retaining-wall-calculator",
  title: "Retaining Wall Block Calculator — Blocks & Cost",
  h1: "Retaining Wall Block Calculator",
  metaDescription:
    "Calculate how many retaining wall blocks you need for your wall length and height, with waste allowance and 2026 cost estimates.",
  category: "landscaping",
  intro: [
    "Segmental retaining wall blocks make a DIY retaining wall possible without mortar or concrete trucks — but running short mid-project is a pain, because dye lots vary and matching replacement blocks later can be difficult.",
    "Enter your wall's length and height. This calculator sizes the most common DIY block (a face of roughly 0.66 sq ft per block, like a standard 8-inch-tall interlocking block) and adds 5% for cuts and breakage.",
  ],
  fields: [
    { name: "length", label: "Wall length", unit: "ft", default: 20, min: 0.5, step: 0.5 },
    { name: "height", label: "Wall height", unit: "ft", default: 2, min: 0.5, max: 4, step: 0.25 },
  ],
  compute: (v) => {
    const faceArea = v.length * v.height;
    const blocksExact = Math.ceil(faceArea / 0.66);
    const blocksWithWaste = Math.ceil(blocksExact * 1.05);
    const cost = costRange(blocksWithWaste, RETAINING_WALL.blockPrice);
    return {
      rows: [
        { label: "Wall face area", value: `${num(faceArea, 1)} sq ft` },
        { label: "Blocks (exact)", value: `${blocksExact} blocks` },
        { label: "Blocks with 5% waste", value: `${blocksWithWaste} blocks`, emphasis: true },
        { label: "Block cost (est.)", value: `${usd(cost.low)} – ${usd(cost.high)}` },
        { label: "Cap blocks needed", value: `${Math.ceil(v.length / 1.4)} caps (approx.)` },
      ],
      note: "Assumes standard interlocking blocks with a ~0.66 sq ft face (e.g. 12 in wide × 8 in tall exposed). Cap row and gravel backfill are extra. Walls over 4 ft usually need engineering and permits — check local code.",
    };
  },
  howItWorks: {
    formula: "Blocks = Wall length × Height ÷ 0.66 sq ft per block × 1.05 waste",
    steps: [
      "Multiply wall length × height to get the total face area in square feet.",
      "Divide by the exposed face area of your block — a common DIY interlocking block shows about 0.66 sq ft (12 in × 8 in).",
      "Round up to a whole block, then add 5% for cuts, breakage, and buried base courses.",
      "Add cap blocks separately for the finished top, roughly one cap per 1–1.5 ft of wall length.",
      "Don't forget the unseen materials: the first course is buried 4–6 inches, and you'll need compacted gravel base and drainage aggregate behind the wall.",
    ],
    example:
      "A 20 ft wall at 2 ft tall has a 40 sq ft face: 40 ÷ 0.66 ≈ 61 blocks, order 65 with waste, plus about 15 cap blocks.",
  },
  faqs: [
    {
      q: "How many retaining wall blocks do I need per square foot?",
      a: "For a standard interlocking block with a 12 in × 8 in exposed face (0.66 sq ft), you need about 1.5 blocks per square foot of wall face. Smaller 8 in × 4 in landscape blocks cover 0.22 sq ft and need about 4.5 blocks per square foot.",
    },
    {
      q: "How much does a retaining wall block cost in 2026?",
      a: "Standard concrete retaining wall blocks run roughly $2–$12 each depending on size and style — plain gray blocks at the low end, tumbled or designer finishes at the high end. A DIY 20 ft × 2 ft wall typically costs $150–$800 in blocks plus gravel and caps.",
    },
    {
      q: "How tall can a DIY retaining wall be?",
      a: "Most manufacturers and codes allow DIY segmental walls up to 3–4 ft without engineering. Taller walls need geogrid reinforcement, bigger footings, drainage design, and usually a permit and engineer's sign-off.",
    },
    {
      q: "Do I need drainage behind a retaining wall?",
      a: "Yes — hydrostatic pressure is what topples walls. Add 6–12 inches of drainage gravel directly behind the blocks, a perforated drain pipe at the base for walls over 2–3 ft, and weep holes or vents. Plan on roughly 1 cubic yard of gravel per 20–30 sq ft of wall face.",
    },
    {
      q: "How deep should the base be for a retaining wall?",
      a: "Dig and fill a 4–6 inch compacted gravel trench, and bury the first block course so its top sits level with (or just below) grade. For walls over 2 ft, use a 6 inch base. A level buried first course is the single biggest factor in a straight, lasting wall.",
    },
  ],
  updated: "2026-10-26",
};
