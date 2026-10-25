import type { ToolDefinition } from "@/shared";
import { SOD, num, usd, costRange } from "@/shared";

export const sodCalculator: ToolDefinition = {
  slug: "sod-calculator",
  title: "Sod Calculator — Rolls, Pallets & Cost",
  h1: "Sod Calculator",
  metaDescription:
    "Calculate how much sod you need in rolls and pallets for your lawn, with 2026 cost estimates. Enter your lawn size for instant results.",
  category: "landscaping",
  intro: [
    "Sod gives you an instant lawn, but ordering the wrong amount means seams that never close — or pallets of grass wilting in the driveway. Sod is sold either as individual rolls (slabs) covering about 10 square feet, or by the pallet covering roughly 450 square feet.",
    "Measure your lawn area, and this calculator adds the 5% extra that installers always order for cutting waste around curves and edges.",
  ],
  fields: [
    { name: "length", label: "Lawn length", unit: "ft", default: 20, min: 0.1, step: 0.5 },
    { name: "width", label: "Lawn width", unit: "ft", default: 20, min: 0.1, step: 0.5 },
  ],
  compute: (v) => {
    const area = v.length * v.width;
    const withWaste = area * 1.05;
    const rolls = Math.ceil(withWaste / SOD.rollSqFt);
    const pallets = Math.ceil(withWaste / SOD.palletSqFt);
    const rollCost = costRange(rolls, SOD.rollPrice);
    const palletCost = costRange(pallets, SOD.palletPrice);
    return {
      rows: [
        { label: "Lawn area", value: `${num(area, 0)} sq ft` },
        { label: "Order with 5% cutting waste", value: `${num(withWaste, 0)} sq ft`, emphasis: true },
        { label: "Sod rolls (10 sq ft each)", value: `${rolls} rolls` },
        { label: "Full pallets (450 sq ft each)", value: `${pallets} pallets` },
        { label: "Cost by pallet (est.)", value: `${usd(palletCost.low)} – ${usd(palletCost.high)}` },
        { label: "Cost by roll (est.)", value: `${usd(rollCost.low)} – ${usd(rollCost.high)}` },
      ],
      note: "Pallet sizes vary by grower — some hold 400, 450, or 500 sq ft. Confirm your supplier's pallet coverage when comparing prices. Sod must be installed within 24–48 hours of delivery.",
    };
  },
  howItWorks: {
    formula: "Rolls = (Length × Width × 1.05) ÷ 10   |   Pallets = (Length × Width × 1.05) ÷ 450",
    steps: [
      "Multiply lawn length × width to get square feet.",
      "Add 5% for cutting waste around curves, borders, and obstacles.",
      "Divide by 10 for the number of rolls (a standard roll covers ~10 sq ft), rounding up.",
      "Divide by 450 for full pallets — buying by the pallet is cheaper per square foot than single rolls.",
    ],
    example:
      "A 20 ft × 20 ft lawn = 400 sq ft; with 5% waste that's 420 sq ft → 42 rolls, or 1 full pallet with a few rolls left over for repairs.",
  },
  faqs: [
    {
      q: "How much does a pallet of sod cost in 2026?",
      a: "A pallet covering 450 sq ft costs roughly $120–$400 depending on grass variety and region — Bermuda and fescue on the lower end, Zoysia and St. Augustine on the higher. Delivery, if not included, adds $50–$100.",
    },
    {
      q: "How many square feet does a roll of sod cover?",
      a: "Most sod rolls (slabs) cover about 10 sq ft, typically 2 ft × 5 ft, and weigh 30–50 lb depending on moisture. Big-roll sod — 500+ sq ft per roll — is also available for large, open lawns and requires special equipment.",
    },
    {
      q: "How long can sod sit before it must be installed?",
      a: "Sod is perishable: install it within 24 hours of harvest, 48 at most in cool weather. Keep it stacked in shade and moistened if you can't lay it immediately. Pale yellowing edges mean it's already stressing.",
    },
    {
      q: "How do I prepare the ground before laying sod?",
      a: "Remove old grass and debris, till 4–6 inches deep, rake level, and add starter fertilizer. Lay the first row along a straight edge, stagger seams like brickwork, and roll and water heavily within 30 minutes of finishing.",
    },
    {
      q: "Sod or grass seed — which is cheaper?",
      a: "Seed costs dramatically less up front (roughly $0.03–$0.10 per sq ft vs $0.30–$0.80 for sod), but sod gives an instant lawn, stops erosion immediately, and can be planted almost year-round. Use our grass seed calculator to compare material costs for your exact lawn size.",
    },
  ],
  updated: "2026-10-26",
};
