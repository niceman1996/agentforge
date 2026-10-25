import type { ToolDefinition } from "@/shared";
import { GRAVEL, bagsNeeded, cuftToCuyd, num, usd, costRange } from "@/shared";

export const gravelCalculator: ToolDefinition = {
  slug: "gravel-calculator",
  title: "Gravel Calculator — Cubic Yards, Tons & Cost",
  h1: "Gravel Calculator",
  metaDescription:
    "Calculate how much gravel you need in cubic yards or tons, plus 0.5 cu ft bag equivalents and estimated 2026 cost for driveways, walkways and French drains.",
  category: "landscaping",
  intro: [
    "Gravel is sold by the cubic yard in bulk or by the bag, but driveways and drainage projects are planned in tons — and the conversions trip up a lot of DIYers. This calculator gives you all three: cubic yards for the bulk order, tons for checking truck capacity, and bag counts for small jobs.",
    "Enter the area you're covering and the depth you need. For a stable driveway base, plan on 4–6 inches of compacted gravel; decorative walkways and French drains typically use 2–3 inches.",
  ],
  fields: [
    { name: "length", label: "Length", unit: "ft", default: 10, min: 0.1, step: 0.5 },
    { name: "width", label: "Width", unit: "ft", default: 10, min: 0.1, step: 0.5 },
    {
      name: "depth",
      label: "Depth",
      unit: "inches",
      default: 3,
      min: 1,
      max: 12,
      step: 0.5,
      help: "Driveway base: 4–6 in · Walkway: 2–3 in",
    },
  ],
  compute: (v) => {
    const cuFt = v.length * v.width * (v.depth / 12);
    const cuYd = cuftToCuyd(cuFt);
    const tons = (cuFt * 110) / 2000;
    const bags = bagsNeeded(cuFt, GRAVEL.bags[0].cubicFeet);
    const bulk = costRange(cuYd, GRAVEL.bulkPricePerCubicYard);
    const bagCost = costRange(bags, GRAVEL.bags[0].price);
    return {
      rows: [
        { label: "Gravel volume", value: `${num(cuYd, 2)} cu yd`, emphasis: true },
        { label: "Approximate weight", value: `${num(tons, 2)} tons` },
        { label: "Same in cubic feet", value: `${num(cuFt, 1)} cu ft` },
        { label: "0.5 cu ft bags", value: `${bags} bags` },
        { label: "Bulk gravel cost (est.)", value: `${usd(bulk.low)} – ${usd(bulk.high)}` },
        { label: "Bagged cost (0.5 cu ft)", value: `${usd(bagCost.low)} – ${usd(bagCost.high)}` },
      ],
      note: "Weight uses ~110 lb per cubic foot (typical crushed stone). Bulk price varies sharply by region and stone type — pea gravel and decorative stone cost more than road base.",
    };
  },
  howItWorks: {
    formula: "Volume (yd³) = Length × Width × (Depth ÷ 12) ÷ 27   |   Tons = cu ft × 110 ÷ 2000",
    steps: [
      "Convert depth to feet by dividing inches by 12 (3 in = 0.25 ft).",
      "Multiply length × width × depth in feet to get cubic feet.",
      "Divide by 27 for cubic yards — the unit bulk gravel is sold in.",
      "Estimate tons by multiplying cubic feet by about 110 lb per cubic foot and dividing by 2,000 lb per ton. Crushed stone runs 90–130 lb/ft³ depending on size and moisture.",
      "For bags: divide cubic feet by 0.5 (a standard bag) and round up.",
    ],
    example:
      "A 10 ft × 10 ft area at 3 in deep: 10 × 10 × 0.25 = 25 cu ft = 0.93 yd³, weighing roughly 1.4 tons — about 50 bags, or 1 yard delivered in bulk.",
  },
  faqs: [
    {
      q: "How deep should a gravel driveway be?",
      a: "A residential gravel driveway needs 4–6 inches of gravel over a compacted base. Use larger #3 stone for the bottom layer and #57 or crusher run for the top. For a patio or walkway, 2–3 inches over a paver base is typical.",
    },
    {
      q: "How much does a cubic yard of gravel weigh?",
      a: "One cubic yard of typical crushed stone weighs roughly 2,400–2,900 lb (1.2–1.45 tons), depending on stone size and moisture. That's why suppliers often quote gravel by the ton instead of by volume.",
    },
    {
      q: "How many bags of gravel equal a yard?",
      a: "One cubic yard is 27 cubic feet, so it takes 54 half-cubic-foot bags to equal one yard. At that quantity, bulk delivery is almost always dramatically cheaper than bags.",
    },
    {
      q: "How much does gravel cost in 2026?",
      a: "Bulk crushed stone runs about $15–$75 per cubic yard depending on stone type and region, with decorative stone at the high end. Half-cubic-foot bags cost roughly $4–$8 each at home improvement stores. Delivery fees add $30–$100 on top.",
    },
    {
      q: "How do I calculate gravel for a French drain?",
      a: "Size the trench the same way as this calculator: trench length × width × depth. A typical French drain is 10–12 inches wide and 18–24 inches deep, filled with #57 washed stone around a 4-inch perforated pipe. Remember to account for the volume the pipe itself takes up.",
    },
  ],
  updated: "2026-10-26",
};
