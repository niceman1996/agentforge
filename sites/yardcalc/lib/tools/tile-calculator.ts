import type { ToolDefinition } from "@/shared";
import { TILE, num, usd, costRange } from "@/shared";

export const tileCalculator: ToolDefinition = {
  slug: "tile-calculator",
  title: "Tile Calculator — How Many Tiles Do I Need?",
  h1: "Tile Calculator",
  metaDescription:
    "Calculate how much tile you need for a floor or wall, including 10% waste allowance, grout estimate and 2026 tile cost. Enter dimensions for instant results.",
  category: "flooring",
  intro: [
    "Every tiling project needs extra material: cuts break, patterns consume more than the math suggests, and a box or two of spare tile saves you if a repair is needed years later. The standard allowance is 10% for straight layouts and 15% for diagonal or herringbone patterns.",
    "Enter your area dimensions and your tile's size in inches. The calculator adds the waste allowance, counts tiles, and estimates grout and material cost.",
  ],
  fields: [
    { name: "length", label: "Length", unit: "ft", default: 10, min: 0.1, step: 0.5 },
    { name: "width", label: "Width", unit: "ft", default: 10, min: 0.1, step: 0.5 },
    { name: "tileLength", label: "Tile length", unit: "inches", default: 12, min: 1, step: 0.5 },
    { name: "tileWidth", label: "Tile width", unit: "inches", default: 12, min: 1, step: 0.5 },
    { name: "waste", label: "Waste allowance", unit: "%", default: 10, min: 0, max: 25, step: 5, help: "Straight lay: 10% · Diagonal/herringbone: 15%" },
  ],
  compute: (v) => {
    const area = v.length * v.width;
    const tileSqFt = (v.tileLength * v.tileWidth) / 144;
    const tilesExact = tileSqFt > 0 ? Math.ceil(area / tileSqFt) : 0;
    // integer-safe waste: ceil(exact × (100+waste)/100), avoids FP ceil(100×1.1)=111
    const tiles = Math.ceil((tilesExact * (100 + v.waste)) / 100);
    const areaWithWaste = area * (1 + v.waste / 100);
    const cost = costRange(areaWithWaste, TILE.tilePricePerSqFt);
    const groutLb = Math.ceil((area / 100) * ((TILE.groutLbPer100SqFt.low + TILE.groutLbPer100SqFt.high) / 2));
    return {
      rows: [
        { label: "Area to tile", value: `${num(area, 1)} sq ft` },
        { label: `Tiles with ${v.waste}% waste`, value: `${tiles} tiles`, emphasis: true },
        { label: "Tile coverage purchased", value: `${num(areaWithWaste, 1)} sq ft` },
        { label: "Tile cost (est.)", value: `${usd(cost.low)} – ${usd(cost.high)}` },
        { label: "Grout (estimated)", value: `${groutLb} lb` },
      ],
      note: "Tile is sold by the box — round the tile count up to full boxes when ordering. Grout assumes ¼ in joints; wide joints on large stone tile need substantially more.",
    };
  },
  howItWorks: {
    formula: "Tiles = (Length × Width) ÷ (Tile L × Tile W ÷ 144) × (1 + Waste %)",
    steps: [
      "Multiply room length × width for the area in square feet.",
      "Compute one tile's coverage: tile length × width in inches ÷ 144 = square feet.",
      "Divide the area by the tile coverage and round up for the exact count.",
      "Multiply by 1.10 (straight lay) or 1.15 (diagonal) and round up again for cuts and spares.",
      "Budget grout at roughly 10–25 lb per 100 sq ft depending on joint width.",
    ],
    example:
      "A 10 ft × 10 ft floor with 12 in × 12 in tile: 100 sq ft ÷ 1.0 = 100 tiles exact → 110 tiles with 10% waste, plus about 18 lb of grout.",
  },
  faqs: [
    {
      q: "How much extra tile should I buy?",
      a: "Add 10% for straight (grid) layouts and 15% for diagonal, herringbone, or staggered patterns with lots of cuts. Keep 1–2 full boxes as attic stock after the job — dye lots are discontinued quickly, and matching tile years later is often impossible.",
    },
    {
      q: "How much does tile cost in 2026?",
      a: "Ceramic tile runs about $1–$8 per sq ft, porcelain $3–$15, and natural stone or designer tile $10–$20+. Add thinset mortar ($20–$40 per 50 lb bag covering 90–150 sq ft) and grout ($15–$40 per 25 lb bag) on top of the tile itself.",
    },
    {
      q: "How much grout do I need?",
      a: "As a rule of thumb, figure 10–25 lb of grout per 100 sq ft: small mosaic tiles with many joints are at the high end, large-format tile with narrow joints at the low end. Most manufacturers provide a grout calculator based on tile size and joint width.",
    },
    {
      q: "How do I calculate tile for a shower wall?",
      a: "Measure each wall's width × height and add them together, then subtract niches and windows. Shower walls are rarely plumb — measure in three places and use the largest. Shower applications need 15% waste due to cuts around fixtures and corners.",
    },
    {
      q: "Do I need more tile for a diagonal pattern?",
      a: "Yes — diagonal (45°) layouts produce more edge cuts and waste. Plan on 15% extra instead of 10%. Herringbone and other intricate patterns can need 15–20%, so buy an extra box if you're unsure.",
    },
  ],
  updated: "2026-10-26",
};
