import type { ToolDefinition } from "@/shared";
import { TOPSOIL, bagsNeeded, cuftToCuyd, num, usd, costRange } from "@/shared";

export const topsoilCalculator: ToolDefinition = {
  slug: "topsoil-calculator",
  title: "Topsoil Calculator — Cubic Yards, Bags & Cost",
  h1: "Topsoil Calculator",
  metaDescription:
    "Calculate how much topsoil you need in cubic yards or 40 lb bags for garden beds, lawn repairs and raised beds, with 2026 cost estimates.",
  category: "landscaping",
  intro: [
    "New garden beds, lawn patches, and raised planters all start with the same question: how much topsoil? Order too little and the project stalls; order too much and you have a pile of dirt with nowhere to go.",
    "Enter your bed dimensions and the depth of soil you want to add. Vegetable gardens and new lawns usually need 6 inches or more of quality topsoil, while topping existing beds takes 2–3 inches.",
  ],
  fields: [
    { name: "length", label: "Length", unit: "ft", default: 10, min: 0.1, step: 0.5 },
    { name: "width", label: "Width", unit: "ft", default: 10, min: 0.1, step: 0.5 },
    {
      name: "depth",
      label: "Depth",
      unit: "inches",
      default: 6,
      min: 1,
      max: 24,
      step: 0.5,
      help: "New garden bed: 6–12 in · Top dressing: 2–3 in",
    },
  ],
  compute: (v) => {
    const cuFt = v.length * v.width * (v.depth / 12);
    const cuYd = cuftToCuyd(cuFt);
    const bags = bagsNeeded(cuFt, TOPSOIL.bags[0].cubicFeet);
    const bulk = costRange(cuYd, TOPSOIL.bulkPricePerCubicYard);
    const bagCost = costRange(bags, TOPSOIL.bags[0].price);
    return {
      rows: [
        { label: "Topsoil needed", value: `${num(cuYd, 2)} cu yd`, emphasis: true },
        { label: "Same in cubic feet", value: `${num(cuFt, 1)} cu ft` },
        { label: "40 lb bags (≈0.75 cu ft)", value: `${bags} bags` },
        { label: "Bulk cost (est.)", value: `${usd(bulk.low)} – ${usd(bulk.high)}` },
        { label: "Bagged cost", value: `${usd(bagCost.low)} – ${usd(bagCost.high)}` },
      ],
      note: "Bulk topsoil is sold by the cubic yard; a 40 lb bag holds roughly 0.75 cubic feet. Screened loam costs more than unscreened fill dirt.",
    };
  },
  howItWorks: {
    formula: "Volume (yd³) = Length × Width × (Depth ÷ 12) ÷ 27",
    steps: [
      "Convert the depth from inches to feet (6 in = 0.5 ft).",
      "Multiply length × width × depth in feet to get cubic feet.",
      "Divide by 27 to convert to cubic yards.",
      "For bags: divide cubic feet by 0.75 (a 40 lb bag of topsoil) and round up. One yard ≈ 36 bags.",
    ],
    example:
      "A 10 ft × 10 ft bed topped with 6 in of soil: 10 × 10 × 0.5 = 50 cu ft = 1.85 yd³ — about 67 forty-pound bags, or 2 yards delivered bulk.",
  },
  faqs: [
    {
      q: "How deep should topsoil be for a garden?",
      a: "Vegetable gardens perform best with 8–12 inches of loose, amended topsoil so roots can develop. For topping an existing lawn or bed, 2–3 inches is plenty — more can smother grass. Most grass roots live in the top 6 inches of soil.",
    },
    {
      q: "How much does a yard of topsoil weigh?",
      a: "A cubic yard of dry topsoil weighs roughly 2,000–2,400 lb (about a ton). Wet soil can weigh considerably more, which matters if you're hauling it in a pickup — a half-ton truck handles about one scoop safely.",
    },
    {
      q: "How many 40 lb bags of topsoil are in a yard?",
      a: "One cubic yard equals 27 cubic feet, and a 40 lb bag of topsoil is about 0.75 cubic feet, so it takes roughly 36 bags to equal one yard. Bagged soil typically costs several times more per yard than bulk delivery.",
    },
    {
      q: "How much does topsoil cost in 2026?",
      a: "Bulk topsoil runs about $12–$55 per cubic yard depending on quality and region — screened loam sits at the higher end, unscreened fill dirt at the lower. Forty-pound bags cost around $3–$6 each at big-box stores, and delivery fees add $50–$150.",
    },
    {
      q: "What's the difference between topsoil, garden soil, and fill dirt?",
      a: "Topsoil is the organic-rich upper layer, suitable for lawns and beds. Garden soil is topsoil blended with compost and amendments for planting. Fill dirt is subsoil with little organic matter — use it for grading and filling holes, not for planting.",
    },
  ],
  updated: "2026-10-26",
};
