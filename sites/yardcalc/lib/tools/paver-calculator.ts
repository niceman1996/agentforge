import type { ToolDefinition } from "@/shared";
import { PAVER, cuftToCuyd, num, usd, costRange, roundUpTo } from "@/shared";

export const paverCalculator: ToolDefinition = {
  slug: "paver-calculator",
  title: "Paver Calculator — Patio Pavers, Sand & Base",
  h1: "Paver Calculator",
  metaDescription:
    "Calculate paver patio costs, bedding sand bags and gravel base volume. Enter your patio dimensions for a complete 2026 material estimate.",
  category: "flooring",
  intro: [
    "A paver patio is three material layers, not one: the pavers you see, an inch of bedding sand underneath, and 4 inches of compacted gravel base below that. Skip the base and your patio sinks within a couple of seasons.",
    "Enter your patio dimensions and this calculator estimates all three layers plus the paver cost — priced per square foot including a cutting-waste allowance.",
  ],
  fields: [
    { name: "length", label: "Length", unit: "ft", default: 12, min: 0.1, step: 0.5 },
    { name: "width", label: "Width", unit: "ft", default: 12, min: 0.1, step: 0.5 },
    { name: "waste", label: "Waste allowance", unit: "%", default: 10, min: 0, max: 25, step: 5 },
  ],
  compute: (v) => {
    const area = v.length * v.width;
    const areaWithWaste = area * (1 + v.waste / 100);
    const paverCost = costRange(areaWithWaste, PAVER.pricePerSqFt);
    const sandCuFt = area * (1 / 12);
    const sandBags = roundUpTo(sandCuFt / PAVER.beddingSandBagCubicFeet, 1);
    const sandCost = costRange(sandBags, PAVER.beddingSandBagPrice);
    const baseCuYd = cuftToCuyd(area * (PAVER.baseGravelDepthInches / 12));
    return {
      rows: [
        { label: "Patio area", value: `${num(area, 1)} sq ft` },
        { label: `Pavers with ${v.waste}% waste`, value: `${num(areaWithWaste, 1)} sq ft`, emphasis: true },
        { label: "Paver cost (est.)", value: `${usd(paverCost.low)} – ${usd(paverCost.high)}` },
        { label: "Bedding sand (1 in)", value: `${sandBags} bags (0.5 cu ft)` },
        { label: "Sand cost (est.)", value: `${usd(sandCost.low)} – ${usd(sandCost.high)}` },
        { label: "Base gravel (4 in)", value: `${num(baseCuYd, 2)} cu yd` },
      ],
      note: "Pavers are priced per sq ft including waste. Base gravel is typically crusher run/road base, ordered by the cubic yard. For driveways, thicken the base to 6–8 inches.",
    };
  },
  howItWorks: {
    formula: "Pavers = L × W × (1 + Waste)   |   Sand bags = L × W × (1÷12) ÷ 0.5   |   Base yd³ = L × W × (4÷12) ÷ 27",
    steps: [
      "Multiply patio length × width for the surface area.",
      "Add the waste allowance (10% standard) to get the paver quantity to buy, priced per square foot.",
      "Bedding sand is 1 inch deep: area × 1/12 gives cubic feet; divide by 0.5 (a standard paver sand bag) and round up.",
      "Base gravel is 4 inches deep for patios: area × 4/12 ÷ 27 gives cubic yards to order.",
      "You'll also need paver edging and about 1 bag of polymeric sand per 50–80 sq ft to sweep into the joints.",
    ],
    example:
      "A 12 ft × 12 ft patio: 144 sq ft → 158 sq ft of pavers with 10% waste, 24 bags of bedding sand (12 cu ft), and 2.2 yd³ of base gravel.",
  },
  faqs: [
    {
      q: "How much does a paver patio cost in 2026?",
      a: "DIY paver materials run roughly $2–$15 per sq ft — concrete pavers $2–$8, brick $4–$10, natural stone $8–$15. A 12 ft × 12 ft patio typically totals $400–$2,500 in materials. Professional installation adds $8–$20 per sq ft in labor.",
    },
    {
      q: "How thick should the gravel base be under pavers?",
      a: "4 inches of compacted gravel base is standard for patios and walkways on decent soil. Use 6–8 inches for driveways or clay-heavy soil, compacting in 2-inch lifts. The base — not the pavers — is what keeps a patio flat for decades.",
    },
    {
      q: "How many pavers are in a square foot?",
      a: "It depends on size: 4 in × 8 pavers = 4.5 per sq ft, 6 in × 6 = 4 per sq ft, 6 in × 9 = 2.67, and 12 in × 12 = 1 per sq ft. Suppliers sell by the pallet or bundle with a stated square-foot coverage, so order by coverage, not piece count.",
    },
    {
      q: "Should I use polymeric sand or regular sand for the joints?",
      a: "Use polymeric sand for the final joints — it hardens when wetted and resists washout, ants, and weeds. Regular sand is fine only under the pavers as bedding. Budget about 1 bag (40–50 lb) per 50–80 sq ft of patio with typical joints.",
    },
    {
      q: "Can I lay pavers over an existing concrete slab?",
      a: "Only if the slab is in good condition — no major cracks or settling. Use a ½–1 in sand or mortar bed directly on it, glued edge restraints, and drill weep holes for drainage. A slab that's already failing will transfer every crack up through your new pavers.",
    },
  ],
  updated: "2026-10-26",
};
