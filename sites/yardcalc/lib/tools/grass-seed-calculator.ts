import type { ToolDefinition } from "@/shared";
import { GRASS_SEED, num, usd, costRange } from "@/shared";

function mid({ low, high }: { low: number; high: number }) {
  return (low + high) / 2;
}

export const grassSeedCalculator: ToolDefinition = {
  slug: "grass-seed-calculator",
  title: "Grass Seed Calculator — How Much Seed You Need",
  h1: "Grass Seed Calculator",
  metaDescription:
    "Calculate how much grass seed you need by seed type (Kentucky bluegrass, fescue, ryegrass) for a new lawn or overseeding, with 2026 cost estimates.",
  category: "landscaping",
  intro: [
    "Grass seeding rates vary enormously by seed type — Kentucky bluegrass needs as little as 2–3 lb per 1,000 sq ft, while turf-type tall fescue needs 8–10 lb for the same area. Seeding at the right rate is the difference between a thick lawn and a sparse, weedy one.",
    "Enter your lawn dimensions below. The calculator shows seeding amounts for the five most common seed types so you can compare, plus an estimated seed cost.",
  ],
  fields: [
    { name: "length", label: "Lawn length", unit: "ft", default: 50, min: 0.1, step: 1 },
    { name: "width", label: "Lawn width", unit: "ft", default: 40, min: 0.1, step: 1 },
  ],
  compute: (v) => {
    const area = v.length * v.width;
    const k = area / 1000;
    const types = GRASS_SEED.newLawnLbPer1000;
    const midType = "Sun & shade mix";
    const midLb = mid(types[midType]) * k;
    const cost = costRange(midLb, GRASS_SEED.pricePerLb);
    return {
      rows: [
        { label: "Lawn area", value: `${num(area, 0)} sq ft`, emphasis: true },
        { label: "Kentucky bluegrass", value: `${num(mid(types["Kentucky bluegrass"]) * k, 2)} lb` },
        { label: "Tall fescue", value: `${num(mid(types["Tall fescue"]) * k, 2)} lb` },
        { label: "Perennial ryegrass", value: `${num(mid(types["Perennial ryegrass"]) * k, 2)} lb` },
        { label: "Fine fescue", value: `${num(mid(types["Fine fescue"]) * k, 2)} lb` },
        { label: "Sun & shade mix", value: `${num(mid(types["Sun & shade mix"]) * k, 2)} lb` },
        {
          label: "Seed cost (est., mix)",
          value: `${usd(cost.low)} – ${usd(cost.high)}`,
        },
      ],
      note: "Rates shown are for seeding a NEW lawn from bare soil. For overseeding an existing lawn, use about half these amounts. Cost estimate uses a mid-range sun & shade mix at $3–$8 per lb.",
    };
  },
  howItWorks: {
    formula: "Seed (lb) = Lawn area ÷ 1,000 × seeding rate (lb per 1,000 sq ft)",
    steps: [
      "Multiply lawn length × width to get square feet.",
      "Divide by 1,000 — seeding rates are quoted per 1,000 sq ft.",
      "Multiply by the rate for your seed type: Kentucky bluegrass 2–3 lb, fine fescue 3–5 lb, perennial ryegrass 5–7 lb, tall fescue 8–10 lb per 1,000 sq ft for new lawns.",
      "For overseeding (thickening an existing lawn), halve the rate — you're filling gaps, not starting from scratch.",
    ],
    example:
      "A 50 ft × 40 ft lawn is 2,000 sq ft. Tall fescue at 9 lb per 1,000 sq ft needs 2 × 9 = 18 lb of seed for a new lawn, or about 9 lb for overseeding.",
  },
  faqs: [
    {
      q: "How much grass seed do I need for 1,000 square feet?",
      a: "For a new lawn: Kentucky bluegrass 2–3 lb, fine fescue 3–5 lb, perennial ryegrass 5–7 lb, and turf-type tall fescue 8–10 lb per 1,000 sq ft. For overseeding, use roughly half of these amounts. More is not better — overcrowded seedlings compete and die.",
    },
    {
      q: "Can I just spread extra seed for a thicker lawn?",
      a: "No — over-seeding wastes money and backfires. Seedlings crowded beyond the recommended rate compete for light, water, and nutrients, and many die off. Follow the rate for your species and improve thickness instead with proper fertilizing and watering.",
    },
    {
      q: "How much does grass seed cost in 2026?",
      a: "Quality grass seed costs roughly $3–$8 per pound depending on variety and purity — premium blends and coated seed run higher. Seeding a 5,000 sq ft lawn from scratch typically costs $60–$250 in seed, making it far cheaper than sod for the same area.",
    },
    {
      q: "When is the best time to plant grass seed?",
      a: "Cool-season grasses (bluegrass, fescue, ryegrass) seed best in late summer to early fall — soil is warm, air is cooling, and weeds are declining. Warm-season grasses (Bermuda, Zoysia) are best seeded late spring to early summer once soil reaches 65–70°F.",
    },
    {
      q: "How long does grass seed take to germinate?",
      a: "Perennial ryegrass germinate fastest, in 5–10 days; tall and fine fescue take 7–14 days; Kentucky bluegrass is slowest at 14–30 days. Keep the top inch of soil consistently moist the entire time — a single dry afternoon can kill sprouting seed.",
    },
  ],
  updated: "2026-10-26",
};
