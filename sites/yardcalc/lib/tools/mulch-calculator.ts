import type { ToolDefinition } from "@/shared";
import { MULCH, bagsNeeded, cuftToCuyd, num, usd, costRange } from "@/shared";

export const mulchCalculator: ToolDefinition = {
  slug: "mulch-calculator",
  title: "Mulch Calculator — How Much Mulch Do You Need?",
  h1: "Mulch Calculator",
  metaDescription:
    "Calculate how much mulch you need in cubic yards or 2 cu ft bags, with estimated 2026 cost. Enter your bed size and mulch depth for instant results.",
  category: "landscaping",
  intro: [
    "Mulch is sold by the cubic yard in bulk or in bags (typically 2 or 3 cubic feet each) — and guessing wrong means a second trip to the garden center or a pile left over. This calculator converts your bed dimensions and target depth into cubic yards, bag counts, and an estimated 2026 cost.",
    "Most landscaping mulch is applied 2–4 inches deep. Too thin and weeds break through; too deep and you can smother plant roots and tree trunks.",
  ],
  fields: [
    { name: "length", label: "Bed length", unit: "ft", default: 10, min: 0.1, step: 0.5 },
    { name: "width", label: "Bed width", unit: "ft", default: 6, min: 0.1, step: 0.5 },
    {
      name: "depth",
      label: "Mulch depth",
      unit: "inches",
      default: 3,
      min: 1,
      max: 6,
      step: 0.5,
      help: "Recommended: 2–4 inches",
    },
  ],
  compute: (v) => {
    const cuFt = v.length * v.width * (v.depth / 12);
    const cuYd = cuftToCuyd(cuFt);
    const bags2 = bagsNeeded(cuFt, MULCH.bags[0].cubicFeet);
    const bags3 = bagsNeeded(cuFt, MULCH.bags[1].cubicFeet);
    const bulk = costRange(cuYd, MULCH.bulkPricePerCubicYard);
    const bagCost = costRange(bags2, MULCH.bags[0].price);
    return {
      rows: [
        { label: "Mulch needed", value: `${num(cuYd, 2)} cu yd`, emphasis: true },
        { label: "Same in cubic feet", value: `${num(cuFt, 1)} cu ft` },
        { label: "2 cu ft bags", value: `${bags2} bags` },
        { label: "3 cu ft bags", value: `${bags3} bags` },
        { label: "Bulk delivered (est.)", value: `${usd(bulk.low)} – ${usd(bulk.high)}` },
        { label: "Bagged cost (2 cu ft)", value: `${usd(bagCost.low)} – ${usd(bagCost.high)}` },
      ],
      note: "Bulk mulch is usually much cheaper per yard for beds over ~6 yards. Costs are national averages for basic shredded hardwood bark; premium dyed mulches cost more.",
    };
  },
  howItWorks: {
    formula: "Volume (yd³) = Length(ft) × Width(ft) × [Depth(in) ÷ 12] ÷ 27",
    steps: [
      "Convert depth to feet (3 in = 0.25 ft).",
      "Multiply bed length × width × depth in feet = cubic feet of mulch.",
      "Divide by 27 to convert to cubic yards — the unit bulk mulch is sold in.",
      "For bags: divide cubic feet by the bag size (usually 2 cu ft) and round up. One cubic yard ≈ 13.5 two-cubic-foot bags.",
    ],
    example:
      "A 10 ft × 6 ft bed at 3 in deep: 10 × 6 × 0.25 = 15 cu ft = 0.56 yd³ → 8 bags of 2 cu ft (or half a yard bulk).",
  },
  faqs: [
    {
      q: "How deep should mulch be?",
      a: "2–4 inches is the standard recommendation. Go thinner (about 2 in) over heavy or wet clay soils, and keep mulch 3–6 inches away from tree trunks and plant crowns to prevent rot. Anything over 4 inches can block water and air from reaching roots.",
    },
    {
      q: "How many bags of mulch equal a yard?",
      a: "One cubic yard of mulch equals 27 cubic feet, so it takes 13.5 bags of 2 cu ft mulch or 9 bags of 3 cu ft mulch. Bulk delivery is typically cheaper once you need more than about 6–8 bags.",
    },
    {
      q: "How much does a yard of mulch cover?",
      a: "At 3 inches deep, one cubic yard covers about 108 square feet (324 sq ft per inch of depth ÷ 3). At 2 inches it covers about 162 sq ft, and at 4 inches about 81 sq ft.",
    },
    {
      q: "How much does mulch cost in 2026?",
      a: "Bagged mulch runs about $3.50–$7 per 2 cu ft bag at big-box stores. Bulk mulch costs roughly $20–$55 per cubic yard picked up, or $15–$65+ delivered depending on distance and type — dyed premium mulch sits at the high end.",
    },
    {
      q: "Should I buy mulch in bags or bulk?",
      a: "For small beds (under ~2 yards) bags win on convenience. For larger jobs, bulk delivery is usually 30–50% cheaper per cubic foot and saves hauling. Compare the two totals this calculator shows for your actual bed size.",
    },
  ],
  updated: "2026-10-25",
};
