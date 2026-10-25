import type { ToolDefinition } from "@/shared";
import { PAINT, num, usd, costRange, subtractArea } from "@/shared";

export const paintCalculator: ToolDefinition = {
  slug: "paint-calculator",
  title: "Paint Calculator — How Much Paint Do I Need?",
  h1: "Interior Paint Calculator",
  metaDescription:
    "Calculate how much paint you need for a room: gallons, coats, doors and windows subtracted, with 2026 paint cost estimates. Instant and free.",
  category: "painting",
  intro: [
    "Paint is sold by the gallon, one gallon covers 350–400 square feet per coat, and nobody wants a half-painted room at 9 PM on a Sunday. This calculator converts your room's wall measurements into the right number of gallons — subtracting doors and windows so you don't overbuy.",
    "Measure the total distance around the room (perimeter) and the wall height, count doors (20 sq ft each) and windows (15 sq ft each), and pick your number of coats.",
  ],
  fields: [
    { name: "perimeter", label: "Wall perimeter (total)", unit: "ft", default: 40, min: 1, step: 0.5, help: "Add up all wall lengths around the room" },
    { name: "height", label: "Wall height", unit: "ft", default: 8, min: 1, step: 0.25 },
    { name: "doors", label: "Doors", unit: "count", default: 2, min: 0, step: 1, help: "Each door subtracts ~20 sq ft" },
    { name: "windows", label: "Windows", unit: "count", default: 2, min: 0, step: 1, help: "Each window subtracts ~15 sq ft" },
    { name: "coats", label: "Coats", unit: "count", default: 2, min: 1, max: 4, step: 1 },
  ],
  compute: (v) => {
    const gross = v.perimeter * v.height;
    const net = subtractArea(gross, v.doors * 20 + v.windows * 15);
    const coverageArea = net * v.coats;
    const gallons = Math.ceil(coverageArea / 350);
    const cost = costRange(gallons, PAINT.interiorPricePerGallon);
    return {
      rows: [
        { label: "Paintable wall area", value: `${num(net, 0)} sq ft` },
        { label: `Total coverage (${v.coats} coats)`, value: `${num(coverageArea, 0)} sq ft` },
        { label: "Paint needed", value: `${gallons} gallon${gallons === 1 ? "" : "s"}`, emphasis: true },
        { label: "Primer (if needed, 1 coat)", value: `${Math.ceil(net / PAINT.primerCoveragePerGallon)} gallon${Math.ceil(net / PAINT.primerCoveragePerGallon) === 1 ? "" : "s"}` },
        { label: "Paint cost (est.)", value: `${usd(cost.low)} – ${usd(cost.high)}` },
      ],
      note: "Uses a conservative 350 sq ft per gallon — textured walls, dark colors over light, or bare drywall reduce real-world coverage to 250–300 sq ft. When in doubt, buy the extra gallon (unopened cans are returnable).",
    };
  },
  howItWorks: {
    formula: "Gallons = [Perimeter × Height − (Doors × 20 + Windows × 15)] × Coats ÷ 350",
    steps: [
      "Multiply the room's perimeter by wall height for gross wall area.",
      "Subtract 20 sq ft per door and 15 sq ft per window — or skip this for a small safety buffer.",
      "Multiply by the number of coats (two coats is standard for a quality finish).",
      "Divide by 350 sq ft per gallon (conservative end of the 350–400 range on paint labels) and round up.",
    ],
    example:
      "A 12 ft × 10 ft room (44 ft perimeter) with 8 ft walls, 2 doors, 2 windows, 2 coats: (44×8 − 70) × 2 = 564 sq ft ÷ 350 → 2 gallons.",
  },
  faqs: [
    {
      q: "How much does a gallon of paint cover?",
      a: "One gallon of interior paint covers 350–400 sq ft per coat on smooth, primed walls. Fresh drywall drinks paint and may only get 250–300 sq ft per gallon, and textured walls can drop coverage by 10–15%. Always plan on two coats for a uniform finish.",
    },
    {
      q: "How much does interior paint cost in 2026?",
      a: "Interior paint runs about $25–$70 per gallon — contractor-grade around $25–$40, quality consumer brands (Benjamin Moore, Sherwin-Williams) $50–$70+. Primer adds $20–$45 per gallon, and a 12 ft × 12 ft room typically needs 2 gallons per coat-pair.",
    },
    {
      q: "Do I need primer before painting?",
      a: "Prime when covering dark colors, painting new drywall, blocking stains, or switching between oil and latex. Tinted primer (gray) helps deep colors cover in two topcoats. If the walls are already sound light-colored latex, two topcoats without primer is fine.",
    },
    {
      q: "Will one coat be enough?",
      a: "One coat works only when repainting with the same color and sheen in good condition. Color changes, patch repairs, and builder-flat originals all need two coats — cutting this corner usually means repainting sooner.",
    },
    {
      q: "Does the paint color affect how much I need?",
      a: "Yes. Deep, saturated reds, oranges, and blues often need 3+ coats or a tinted primer over light walls. If you're going from dark to light, prime first — it saves a topcoat. Budget about 25% more paint for dramatic color changes.",
    },
  ],
  updated: "2026-10-26",
};
