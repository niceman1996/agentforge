import type { ToolDefinition } from "@/shared";
import { CONCRETE, bagsNeeded, cuftToCuyd, num, usd, costRange } from "@/shared";

export const concreteSlab: ToolDefinition = {
  slug: "concrete-calculator",
  title: "Concrete Calculator — Slab Volume, Bags & Cost",
  h1: "Concrete Slab Calculator",
  metaDescription:
    "Calculate concrete volume in cubic yards, the number of 80 lb or 60 lb bags, and estimated cost for any slab, patio or footing. Free and instant.",
  category: "concrete",
  intro: [
    "Planning a patio, shed pad, walkway or driveway slab? This calculator tells you exactly how much concrete you need — in cubic yards for a ready-mix truck, or in 80 lb / 60 lb bags for a DIY mix — plus an estimated 2026 cost range based on national US prices.",
    "Enter your slab dimensions below. Results update instantly as you type, including the 10% extra you should always order for spill and uneven subgrade.",
  ],
  fields: [
    { name: "length", label: "Length", unit: "ft", default: 10, min: 0.1, step: 0.5 },
    { name: "width", label: "Width", unit: "ft", default: 10, min: 0.1, step: 0.5 },
    {
      name: "thickness",
      label: "Thickness",
      unit: "inches",
      default: 4,
      min: 1,
      max: 24,
      step: 0.5,
      help: "Patios & walkways: 4 in · Driveways: 5–6 in",
    },
  ],
  compute: (v) => {
    const cuFt = v.length * v.width * (v.thickness / 12);
    const cuYd = cuftToCuyd(cuFt) * CONCRETE.orderOverageFactor;
    const bags80 = bagsNeeded(cuFt, CONCRETE.bags[0].cubicFeet);
    const bags60 = bagsNeeded(cuFt, CONCRETE.bags[1].cubicFeet);
    const bulk = costRange(cuYd, CONCRETE.bulkPricePerCubicYard);
    const bag80Cost = costRange(bags80, CONCRETE.bags[0].price);
    return {
      rows: [
        { label: "Slab volume (exact)", value: `${num(cuftToCuyd(cuFt), 2)} cu yd` },
        { label: "Order with 10% extra", value: `${num(cuYd, 2)} cu yd`, emphasis: true },
        { label: "80 lb bags (exact volume)", value: `${bags80} bags` },
        { label: "60 lb bags (exact volume)", value: `${bags60} bags` },
        { label: "Ready-mix truck cost (est.)", value: `${usd(bulk.low)} – ${usd(bulk.high)}` },
        {
          label: "Bagged concrete cost (80 lb)",
          value: `${usd(bag80Cost.low)} – ${usd(bag80Cost.high)}`,
        },
      ],
      note: "Bag counts are for the exact volume — buy 1–2 extra bags as buffer. Cost ranges are national US averages; delivery/short-load fees not included.",
    };
  },
  howItWorks: {
    formula:
      "Volume (yd³) = Length(ft) × Width(ft) × [Thickness(in) ÷ 12] ÷ 27   →   × 1.10 safety factor",
    steps: [
      "Convert thickness from inches to feet by dividing by 12 (4 in = 0.333 ft).",
      "Multiply length × width × thickness in feet to get cubic feet.",
      "Divide by 27 (one cubic yard = 27 cubic feet) to get cubic yards.",
      "Multiply by 1.10 — concrete pros order about 10% extra for spill, uneven subgrade, and settling.",
      "For bagged concrete: an 80 lb bag yields ≈ 0.60 cu ft, a 60 lb bag ≈ 0.45 cu ft. Divide your cubic feet by the bag yield and round up.",
    ],
    example:
      "A 10 ft × 10 ft slab at 4 in thick: 10 × 10 × 0.333 = 33.3 cu ft ÷ 27 = 1.23 yd³ exact → order 1.36 yd³ (about 56 × 80 lb bags, or 1.5 yards from a truck).",
  },
  faqs: [
    {
      q: "How many 80 lb bags of concrete are in a cubic yard?",
      a: "One cubic yard equals 27 cubic feet, and an 80 lb bag yields about 0.60 cubic feet — so it takes roughly 45 bags of 80 lb concrete mix to make one cubic yard.",
    },
    {
      q: "How much concrete do I need for a 10×10 slab?",
      a: "A 10 ft × 10 ft slab at 4 inches thick needs about 1.23 cubic yards — order 1.4 yards (or ~56 80-lb bags) after adding the standard 10% safety factor. At 6 inches thick the same slab needs about 1.85 yards exact.",
    },
    {
      q: "Should I order a ready-mix truck or use bags?",
      a: "Rule of thumb: under about 1 cubic yard, bags are manageable for DIY (a yard is ~45 × 80 lb bags — a lot of mixing). Above 1–1.5 yards, a ready-mix delivery is usually cheaper per yard and far less labor. Many suppliers impose short-load fees under 3 yards, which is reflected in the per-yard price range.",
    },
    {
      q: "How thick should a concrete slab be?",
      a: "4 inches is standard for patios, walkways and shed pads. Driveways that carry vehicles typically need 5–6 inches with rebar or wire mesh, and footings under structures usually require 8–12 inches — check your local code.",
    },
    {
      q: "How much does concrete cost in 2026?",
      a: "Nationally, ready-mix concrete runs roughly $140–$190 per cubic yard delivered, and an 80 lb bag of Quikrete-style mix costs about $5.50–$8 at home improvement stores. Prices vary significantly by region and by delivery distance.",
    },
  ],
  updated: "2026-10-25",
};
