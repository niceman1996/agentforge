import type { ToolDefinition } from "@/shared";
import { CONCRETE, bagsNeeded, num, usd, costRange, circleAreaFromDiameter } from "@/shared";

export const postHoleConcreteCalculator: ToolDefinition = {
  slug: "post-hole-concrete-calculator",
  title: "Post Hole Concrete Calculator — Bags Per Post",
  h1: "Post Hole Concrete Calculator",
  metaDescription:
    "Calculate how much concrete you need for fence posts, deck posts or mailboxes: volume per hole, total bags of 80 lb or 60 lb mix, and 2026 cost.",
  category: "concrete",
  intro: [
    "Setting posts is the foundation of every fence and deck, and the concrete math is a cylinder volume problem: hole diameter × depth × number of posts. Guess small and posts heave in the first winter; guess big and you're hauling 80 lb bags for nothing.",
    "Enter your hole diameter, depth, and post count. Standard rule: hole diameter = 3× the post width, depth = ⅓–½ the above-ground height plus 6 inches of gravel below.",
  ],
  fields: [
    { name: "posts", label: "Number of posts", unit: "count", default: 10, min: 1, step: 1 },
    { name: "diameter", label: "Hole diameter", unit: "inches", default: 12, min: 6, max: 24, step: 1, help: "Rule of thumb: 3× the post width (12 in for a 4×4)" },
    { name: "depth", label: "Hole depth", unit: "ft", default: 3, min: 1, max: 6, step: 0.25, help: "⅓–½ of above-ground height; below frost line" },
  ],
  compute: (v) => {
    const radiusFt = v.diameter / 24;
    const perHoleCf = Math.PI * radiusFt * radiusFt * v.depth;
    const totalCf = perHoleCf * v.posts;
    const bags80 = bagsNeeded(totalCf, CONCRETE.bags[0].cubicFeet);
    const bags60 = bagsNeeded(totalCf, CONCRETE.bags[1].cubicFeet);
    const cost = costRange(bags80, CONCRETE.bags[0].price);
    return {
      rows: [
        { label: "Concrete per hole", value: `${num(perHoleCf, 2)} cu ft`, emphasis: true },
        { label: "Total volume", value: `${num(totalCf, 1)} cu ft` },
        { label: "80 lb bags", value: `${bags80} bags` },
        { label: "60 lb bags", value: `${bags60} bags` },
        { label: "Cost (80 lb bags, est.)", value: `${usd(cost.low)} – ${usd(cost.high)}` },
      ],
      note: "Bag counts assume filling the whole hole — you can subtract the displaced post volume (post sq in × depth) if you want the tighter number, and 6 in of gravel in the hole bottom reduces concrete by roughly half a bag per post.",
    };
  },
  howItWorks: {
    formula: "Volume per hole (ft³) = π × (Diameter ÷ 24)² × Depth",
    steps: [
      "Convert hole diameter to radius in feet: diameter in inches ÷ 24.",
      "Cylinder volume: π × radius² × depth in feet gives cubic feet per hole.",
      "Multiply by the number of posts for total volume.",
      "Divide by 0.60 cu ft per 80 lb bag (or 0.45 for 60 lb) and round up.",
      "Pour 6 inches of gravel in each hole first for drainage, then set the post and fill.",
    ],
    example:
      "Ten 12 in holes, 3 ft deep: each holds π × 0.5² × 3 = 2.36 cu ft → 23.6 cu ft total → 40 eighty-pound bags.",
  },
  faqs: [
    {
      q: "How many bags of concrete per fence post?",
      a: "A 4×4 post in a 12-inch hole 3 ft deep takes about 2.4 cu ft — four 80 lb bags if you fill the entire hole, though 2 bags plus gravel/tamped backfill also works in firm soil. The common quick answer of \"2–3 bags\" assumes a 10–12 in hole at 24–30 in depth.",
    },
    {
      q: "How wide should a post hole be?",
      a: "Three times the post width: a 4×4 post (3.5 in actual) wants a 10–12 inch hole, a 6×6 wants 12–18 inches. Wider holes at the same depth beat deeper narrow holes for lateral strength — a fence post is a lever, and the concrete collar is the fulcrum.",
    },
    {
      q: "How deep do post holes need to be?",
      a: "Bury ⅓ to ½ of the above-ground height, and at least to your local frost line — typically 24–36 inches in most of the US, up to 48+ inches in northern climates. A 6 ft privacy fence wants 30–36 inch holes; decks follow the engineer's spec, usually 12–48 inches.",
    },
    {
      q: "How much does post concrete cost in 2026?",
      a: "An 80 lb bag of concrete mix costs about $5.50–$8 at home improvement stores. Setting 10 fence posts at 2–4 bags each runs roughly $110–$320 in concrete — plus a $60–$120 auger rental if you're not digging by hand.",
    },
    {
      q: "Do I need gravel at the bottom of a post hole?",
      a: "Yes — 6 inches of gravel under the post drains water away from the buried end, dramatically slowing rot on wood posts. It also gives a firm leveling base. In heavy clay soils, some builders tamp the hole with gravel entirely instead of concrete.",
    },
  ],
  updated: "2026-10-26",
};
