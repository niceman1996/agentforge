import type { ToolDefinition } from "@/shared";
import { SHINGLES, num, usd, costRange } from "@/shared";

const PITCH_MULTIPLIERS: Record<number, number> = {
  1: 1.003,
  2: 1.014,
  3: 1.031,
  4: 1.054,
  5: 1.083,
  6: 1.118,
  7: 1.158,
  8: 1.202,
  9: 1.25,
  10: 1.302,
  12: 1.414,
};

function pitchMultiplier(pitch: number): number {
  const key = Math.min(12, Math.max(0, Math.round(pitch)));
  return PITCH_MULTIPLIERS[key] ?? 1.054;
}

export const roofShingleCalculator: ToolDefinition = {
  slug: "roof-shingle-calculator",
  title: "Roof Shingle Calculator — Squares & Bundles",
  h1: "Roofing Shingle Calculator",
  metaDescription:
    "Calculate how many roofing squares and shingle bundles you need, including pitch multiplier and 10% waste, with 2026 material cost estimates.",
  category: "roofing",
  intro: [
    "Roofers don't work in square feet — they work in squares (100 sq ft) and order shingles by the bundle, three bundles per square. And because roofs are sloped, the actual roof area is larger than your house footprint: the steeper the pitch, the bigger the multiplier.",
    "Measure one roof plane's length and width (or estimate from your foundation and overhangs), enter the pitch, and this calculator converts it into squares, bundles with 10% waste, and material cost.",
  ],
  fields: [
    { name: "length", label: "Roof length", unit: "ft", default: 30, min: 1, step: 0.5, help: "One flat roof plane, including overhangs" },
    { name: "width", label: "Roof width", unit: "ft", default: 20, min: 1, step: 0.5 },
    { name: "pitch", label: "Pitch (rise per 12)", unit: "in/12", default: 4, min: 0, max: 12, step: 1, help: "Typical: 4–6 · Steep: 8+" },
  ],
  compute: (v) => {
    const mult = pitchMultiplier(v.pitch);
    const footprint = v.length * v.width;
    const roofArea = footprint * mult;
    const squares = roofArea / 100;
    const bundles = Math.ceil(squares * SHINGLES.bundlesPerSquare * SHINGLES.wasteFactor);
    const cost = costRange(bundles, SHINGLES.bundlePrice);
    return {
      rows: [
        { label: "Footprint area", value: `${num(footprint, 0)} sq ft` },
        { label: `Pitch multiplier (${v.pitch}/12)`, value: `× ${mult.toFixed(3)}` },
        { label: "Actual roof area", value: `${num(roofArea, 0)} sq ft`, emphasis: true },
        { label: "Roofing squares", value: `${num(squares, 2)} squares` },
        { label: "Bundles (3/sq + 10% waste)", value: `${bundles} bundles` },
        { label: "Shingle cost (est.)", value: `${usd(cost.low)} – ${usd(cost.high)}` },
      ],
      note: "Measures ONE roof plane — double it for a simple gable (both slopes), or measure each plane separately for hip/valley roofs. Underlayment, drip edge, ridge caps, starter strip, and valley flashing are additional material lines.",
    };
  },
  howItWorks: {
    formula: "Squares = (Length × Width × Pitch multiplier) ÷ 100   |   Bundles = Squares × 3 × 1.10",
    steps: [
      "Multiply roof plane length × width for the flat footprint area.",
      "Apply the pitch multiplier: 4/12 pitch × 1.054, 6/12 × 1.118, 8/12 × 1.202 — steeper roofs have more actual surface.",
      "Divide by 100 for roofing squares.",
      "Multiply by 3 bundles per square, then by 1.10 for waste at valleys, hips, and rakes — round up.",
      "Repeat per roof plane and sum; a simple gable with two identical slopes is just 2× one plane.",
    ],
    example:
      "One 30 ft × 20 ft plane at 5/12 pitch: 600 × 1.083 = 650 sq ft = 6.5 squares → 22 bundles with waste. A gable roof with two such planes: 13 squares, 43 bundles.",
  },
  faqs: [
    {
      q: "How many bundles of shingles are in a square?",
      a: "Three bundles of standard 3-tab shingles cover one roofing square (100 sq ft). Some architectural shingle lines now need four bundles per square — check the bundle label's coverage before ordering; the bundle wrapper states exact square feet covered.",
    },
    {
      q: "How much do shingles cost in 2026?",
      a: "Asphalt 3-tab bundles run roughly $30–$50, architectural $40–$70, and premium designer $70–$90+. A 20-square roof in architectural shingles costs about $2,600–$4,600 in shingles alone; full material packages with underlayment, flashing, and ridge add 15–25%.",
    },
    {
      q: "What is a roofing square?",
      a: "One square equals 100 square feet of roof area. Roofing is quoted, ordered, and warrantied in squares — a typical US house is 15–25 squares. To convert your house footprint, multiply by the pitch multiplier and divide by 100.",
    },
    {
      q: "How do I measure my roof without climbing it?",
      a: "Measure the building footprint (length × width including overhangs) from the ground, then apply the pitch multiplier — for a simple gable roof, footprint × multiplier gives the TOTAL area of both slopes combined. For hips, dormers, and multiple planes, split the roof into rectangles and triangles per plane, or order a satellite measurement report for exact square counts.",
    },
    {
      q: "How much waste factor should I add for shingles?",
      a: "10% covers cuts and defects on a simple gable; use 12–15% for roofs with many valleys, dormers, or hips. Unopened bundles are usually returnable, so erring slightly high beats running short — dye-lot color matching is not guaranteed between orders.",
    },
  ],
  updated: "2026-10-26",
};
