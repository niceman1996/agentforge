import type { ToolDefinition } from "@/shared";
import { DRYWALL, num, usd, costRange } from "@/shared";

export const drywallCalculator: ToolDefinition = {
  slug: "drywall-calculator",
  title: "Drywall Calculator — Sheets, Mud, Tape & Screws",
  h1: "Drywall Calculator",
  metaDescription:
    "Calculate how many drywall sheets you need plus joint compound, tape and screws, with 2026 cost estimates. Enter room dimensions for instant results.",
  category: "interior",
  intro: [
    "Hanging drywall is the easy half — finishing it takes joint compound, tape, and screws in quantities that surprise first-timers. This calculator totals your wall and ceiling area and converts it into the exact material list: sheets with 10% waste, mud by the gallon, tape by the foot, screws by the box.",
    "Measure the room's perimeter and wall height, and enter the ceiling dimensions (enter 0 if you're skipping the ceiling).",
  ],
  fields: [
    { name: "perimeter", label: "Room perimeter", unit: "ft", default: 40, min: 4, step: 0.5, help: "Add up all wall lengths around the room" },
    { name: "height", label: "Wall height", unit: "ft", default: 8, min: 4, step: 0.25 },
    { name: "ceilLength", label: "Ceiling length", unit: "ft (0 to skip)", default: 10, min: 0, step: 0.5 },
    { name: "ceilWidth", label: "Ceiling width", unit: "ft (0 to skip)", default: 10, min: 0, step: 0.5 },
  ],
  compute: (v) => {
    const wallArea = v.perimeter * v.height;
    const ceilArea = v.ceilLength * v.ceilWidth;
    const total = wallArea + ceilArea;
    const sheetArea = DRYWALL.sheet.widthFt * DRYWALL.sheet.heightFt;
    const sheets = Math.ceil((total / sheetArea) * 1.1);
    const mudGal = Math.ceil((total / 100) * 1.5);
    const tapeFt = sheets * DRYWALL.tapeFeetPerSheet;
    const screws = sheets * DRYWALL.screwsPerSheet;
    const cost = costRange(sheets, DRYWALL.sheet.price);
    return {
      rows: [
        { label: "Wall area", value: `${num(wallArea, 0)} sq ft` },
        { label: "Ceiling area", value: `${num(ceilArea, 0)} sq ft` },
        { label: "Total drywall area", value: `${num(total, 0)} sq ft` },
        { label: "4×8 sheets (10% waste)", value: `${sheets} sheets`, emphasis: true },
        { label: "Joint compound", value: `${mudGal} gallons (approx.)` },
        { label: "Tape", value: `${num(tapeFt, 0)} ft` },
        { label: "Screws", value: `${num(screws, 0)} screws` },
        { label: "Sheet cost (est.)", value: `${usd(cost.low)} – ${usd(cost.high)}` },
      ],
      note: "Screws assume 12 in wall / 12 in field ceiling spacing (about 32 per sheet). Mud covers tape coat, two fill coats, and skim — hot mud or a finish level 5 needs more.",
    };
  },
  howItWorks: {
    formula: "Sheets = (Perimeter × Height + Ceiling area) ÷ 32 × 1.10",
    steps: [
      "Wall area = room perimeter × wall height. Add ceiling length × width if you're boarding it.",
      "A standard 4 ft × 8 ft sheet covers 32 sq ft — divide total area by 32.",
      "Add 10% for cuts, breakage, and odd-size pieces.",
      "Joint compound: roughly 1–2 gallons per 100 sq ft for tape plus two coats.",
      "Tape: ~16 ft of joint per sheet; screws: ~32 per sheet at 12 inch spacing.",
    ],
    example:
      "A 10 ft × 10 ft room, 8 ft walls, with ceiling: walls 320 sq ft + ceiling 100 sq ft = 420 sq ft ÷ 32 = 13.1 → 15 sheets with waste, ~6 gallons of mud, 240 ft of tape.",
  },
  faqs: [
    {
      q: "How much does a sheet of drywall cost in 2026?",
      a: "A standard 4×8 half-inch sheet runs about $12–$22 depending on region and type — moisture-resistant green board and 5/8 in fire-code board cost more. A 10 ft × 10 ft room with ceiling needs roughly 15 sheets, so $180–$330 in board alone.",
    },
    {
      q: "Should I hang drywall vertically or horizontally?",
      a: "Horizontal hanging is the modern standard for walls under 9 ft: fewer butt joints (the hardest to finish), and each sheet spans more studs. Vertical works for commercial fire assemblies or concrete-wall furring. Either way, stagger your joints between rows.",
    },
    {
      q: "How much joint compound do I need?",
      a: "Plan 1–2 gallons of all-purpose mud per 100 sq ft of drywall for a standard three-coat tape-and-finish. A 4×8 bedroom typically takes 4–7 gallons including wastage. Buy an extra bucket — running out mid-skim is universal.",
    },
    {
      q: "What drywall thickness should I use?",
      a: "½ inch is the standard for walls and flat ceilings; 5/8 inch for ceilings over 24 in joist spacing, garages (fire separation), and sound dampening between layers. Lightweight ½ in board is easier to hang solo but sags more on 24 in ceilings.",
    },
    {
      q: "How many screws go into a sheet of drywall?",
      a: "About 32 per 4×8 sheet at 12 inches on center in the field and 8 inches on edges — roughly 1.3 screws per square foot. Over-screwing breaks the paper and creates finish bumps; under-screwing causes nail pops later.",
    },
  ],
  updated: "2026-10-26",
};
