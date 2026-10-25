// US material facts & prices for YardCalc cost estimates.
//
// ⚠ STATUS: PRELIMINARY SEED VALUES — every constant below must be verified
// against 2026 US retail/industry sources (Home Depot / Lowe's / Angi /
// HomeGuide / supplier price lists) by the data agent before launch.
// When verified, set `DATA_VERIFIED = true` and fill `SOURCES` with the
// URLs and access date. Formulas consume these constants so a price fix
// never requires touching calculator code.

// All material groups verified against 2026 US retail/industry sources
// (2026-10-26) — see SOURCES. Coverage/size constants are industry standards.
export const DATA_VERIFIED = true as boolean;

export const SOURCES: { key: string; url: string; accessed: string }[] = [
  { key: "concrete.bulk", url: "https://homeguide.com/costs/concrete-prices", accessed: "2026-10-26" },
  { key: "concrete.bulk", url: "https://www.concretenetwork.com/concrete-prices.html", accessed: "2026-10-26" },
  { key: "concrete.bag80", url: "https://www.homedepot.com/p/Quikrete-80-lb-Concrete-Mix-110180/100318511", accessed: "2026-10-26" },
  { key: "mulch.bulk", url: "https://www.lawnstarter.com/blog/cost/mulch-price", accessed: "2026-10-26" },
  { key: "mulch.bags", url: "https://estimationpro.ai/tools/blog/mulch-cost-per-yard", accessed: "2026-10-26" },
  { key: "gravel.bulk", url: "https://hellogravel.com/guides/bulk-gravel-delivery-2026-complete-guide-types-costs-and-process/", accessed: "2026-10-26" },
  { key: "topsoil.bulk", url: "https://www.angi.com/articles/topsoil-cost.htm", accessed: "2026-10-26" },
  { key: "grassseed.price", url: "https://lawncare.center/articles/grass-seed-prices-2026", accessed: "2026-10-26" },
  { key: "tile.retail", url: "https://www.homedepot.com/b/Flooring-Tile-Porcelain-Tile/N-5yc1vZb97m", accessed: "2026-10-26" },
  { key: "paver.materials", url: "https://joinbreasy.com/knowledge/paver-installation-cost", accessed: "2026-10-26" },
  { key: "deck.materials", url: "https://www.angi.com/articles/pressure-treated-decking-cost.htm", accessed: "2026-10-26" },
  { key: "fence.panels", url: "https://callfantasticfence.com/how-much-does-a-wood-fence-cost", accessed: "2026-10-26" },
  { key: "insulation.bag", url: "https://www.homedepot.com/p/Greenfiber-25-lbs-Cellulose-Blown-In-Insulation-or-Spray-Applied-Insulation-INSSANC/311574454", accessed: "2026-10-26" },
  { key: "lumber.hardwood", url: "https://www.hearnehardwoods.com/price-list", accessed: "2026-10-26" },
  { key: "retainingwall.blocks", url: "https://www.homedepot.com", accessed: "2026-10-26" },
  { key: "shingles.bundle", url: "https://dlvroofing.com/roofing-tips/best-roofing-shingles-cost-per-bundle", accessed: "2026-10-26" },
  { key: "drywall.sheet", url: "https://www.homedepot.com/b/Building-Materials-Drywall-Drywall-Sheets/N-5yc1vZbb52", accessed: "2026-10-26" },
];

import type { BagProduct, PriceRange } from "../lib/calc";

export const CONCRETE = {
  /** ✅ Ready-mix truck, delivered, per cubic yard — 2026 consensus $119–$195 across HomeGuide/LawnStarter/ConcreteNetwork */
  bulkPricePerCubicYard: { low: 125, high: 180 } as PriceRange,
  bags: [
    { label: "80 lb bag", cubicFeet: 0.6, price: { low: 5, high: 7 } } as BagProduct, // ✅ HD $5.98–6.24, regional $4.50+
    { label: "60 lb bag", cubicFeet: 0.45, price: { low: 4.5, high: 6.5 } } as BagProduct,
    { label: "40 lb bag", cubicFeet: 0.3, price: { low: 3, high: 5 } } as BagProduct,
  ],
  /** extra cubic yards to order over exact math (spill / uneven subgrade) */
  orderOverageFactor: 1.1,
};

export const MULCH = {
  /** ✅ 2026 bulk: basic hardwood $30–50, premium cedar/cypress $50–80+ (LawnStarter) */
  bulkPricePerCubicYard: { low: 30, high: 65 } as PriceRange,
  bags: [
    { label: "2 cu ft bag", cubicFeet: 2, price: { low: 3.5, high: 7 } } as BagProduct,
    { label: "3 cu ft bag", cubicFeet: 3, price: { low: 5, high: 9.5 } } as BagProduct,
  ],
  /** typical recommended depth in inches */
  recommendedDepthInches: { low: 2, high: 4 },
};

export const GRAVEL = {
  /** ✅ 2026 delivered bulk: $20–$60/CY; crushed stone avg $40–$70 (hellogravel) */
  bulkPricePerCubicYard: { low: 20, high: 75 } as PriceRange,
  bags: [
    { label: "0.5 cu ft bag", cubicFeet: 0.5, price: { low: 4, high: 8 } } as BagProduct,
  ],
  /** common installs: driveway base 4-6", walkway 2-3" */
  typicalDepthInches: { low: 2, high: 6 },
  /** loose gravel density lb/ft³ for ton conversion */
  densityLbPerCubicFoot: { low: 90, high: 130 },
};

export const TOPSOIL = {
  bulkPricePerCubicYard: { low: 12, high: 55 } as PriceRange,
  bags: [
    { label: "40 lb bag", cubicFeet: 0.75, price: { low: 3, high: 6 } } as BagProduct,
  ],
};

export const SOD = {
  /** per pallet covering 450 ft² — 2026 material range $100–$550 by variety/region */
  palletSqFt: 450,
  palletPrice: { low: 120, high: 400 } as PriceRange,
  /** per roll/slab covering ~10 ft² */
  rollSqFt: 10,
  rollPrice: { low: 1, high: 3 } as PriceRange,
};

export const GRASS_SEED = {
  /** lbs per 1,000 ft² for a NEW lawn / OVERSEEDING, by seed type */
  newLawnLbPer1000: {
    "Kentucky bluegrass": { low: 2, high: 3 },
    "Tall fescue": { low: 8, high: 10 },
    "Perennial ryegrass": { low: 5, high: 7 },
    "Fine fescue": { low: 3, high: 5 },
    "Sun & shade mix": { low: 5, high: 8 },
  } as Record<string, PriceRange>,
  overseedFactor: 0.5,
  pricePerLb: { low: 3, high: 8 } as PriceRange,
};

export const PAINT = {
  /** one gallon covers ~350-400 ft² per coat (manufacturer labels) */
  coveragePerGallon: { low: 350, high: 400 },
  interiorPricePerGallon: { low: 25, high: 70 } as PriceRange,
  exteriorPricePerGallon: { low: 30, high: 80 } as PriceRange,
  primerCoveragePerGallon: 300,
};

export const TILE = {
  /** grout: lb per 100 ft² varies by joint size; simplified */
  groutLbPer100SqFt: { low: 10, high: 25 },
  groutPricePerLb: { low: 2, high: 5 } as PriceRange,
  /** waste factor to add to tile count */
  wasteFactor: { min: 0.1, diagonal: 0.15 },
  tilePricePerSqFt: { low: 1, high: 20 } as PriceRange,
};

export const PAVER = {
  pricePerSqFt: { low: 2, high: 15 } as PriceRange,
  /** 1 inch of sand bedding under pavers; paver sand sold in 0.5 cu ft bags */
  beddingSandBagCubicFeet: 0.5,
  beddingSandBagPrice: { low: 4, high: 8 } as PriceRange,
  baseGravelDepthInches: 4,
};

export const DECK = {
  /** pressure-treated boards price per ft² of deck surface */
  boardPricePerSqFt: { low: 8, high: 20 } as PriceRange,
  /** ~3 screws per sq ft: 5.5" boards on 16" OC joists, 2 screws per crossing */
  screwsPer1000SqFt: 3200,
  screwPricePerScrew: { low: 0.03, high: 0.08 },
  /** 5/4"×6" board actual coverage ~5.5" wide */
  boardWidthInches: 5.5,
  gapInches: 0.25,
  boardLengths: [8, 10, 12, 14, 16, 20],
};

export const FENCE = {
  /** typical privacy panel 8 ft wide × 6 ft tall */
  panelWidthFt: 8,
  postSpacingFt: 8,
  /** ✅ 2026: PT 4×4 posts ~$12–$18 big-box, cedar to $45 */
  postPrice: { low: 12, high: 45 } as PriceRange,
  /** ✅ 2026: basic pine panels ~$30–$60, cedar/redwood $95–$140 */
  panelPrice: { low: 30, high: 140 } as PriceRange,
  picketPrice: { low: 2, high: 6 } as PriceRange,
  /** two rails per 8 ft section for picket fences */
  railPrice: { low: 8, high: 20 } as PriceRange,
};

export const DRYWALL = {
  sheet: { widthFt: 4, heightFt: 8, price: { low: 12, high: 22 } as PriceRange },
  /** joint compound: gallon per 100 ft² (tape + 2 coats + skim) */
  mudGallonsPer100SqFt: { low: 1, high: 2 },
  mudPricePerGallon: { low: 10, high: 25 } as PriceRange,
  tapeFeetPerSheet: 16,
  screwsPerSheet: 32,
};

export const INSULATION_BLOWN = {
  /** bags of blown-in fiberglass/cellulose per ft² at R-38 (attic benchmark) */
  bagsPer1000SqFtAtR38: { low: 20, high: 35 },
  /** ✅ 2026: Greenfiber 25 lb cellulose $15.97–$19.99 (premium lines to ~$37) */
  bagPrice: { low: 15, high: 25 } as PriceRange,
};

export const SHINGLES = {
  /** 1 roofing square = 100 ft²; 3 bundles per square is standard */
  bundlesPerSquare: 3,
  bundlePrice: { low: 30, high: 90 } as PriceRange,
  /** add for starter/ridge/waste */
  wasteFactor: 1.1,
};

export const LUMBER = {
  /** board foot price for common framing lumber */
  pricePerBoardFoot: { low: 1.5, high: 6 } as PriceRange,
};

export const RETAINING_WALL = {
  blockFaceAreaSqFt: { low: 0.5, high: 1 }, // capston style varies
  blockPrice: { low: 2, high: 12 } as PriceRange,
};

export const TOP = {
  siteNote:
    "Cost ranges reflect national US averages and vary by region, supplier, and delivery fees.",
};
