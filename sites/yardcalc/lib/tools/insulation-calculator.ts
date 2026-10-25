import type { ToolDefinition } from "@/shared";
import { INSULATION_BLOWN, num, usd, costRange } from "@/shared";

export const insulationCalculator: ToolDefinition = {
  slug: "insulation-calculator",
  title: "Blown-In Insulation Calculator — Bags & Cost",
  h1: "Blown-In Insulation Calculator",
  metaDescription:
    "Calculate how many bags of blown-in insulation you need for your attic depth and R-value target, with 2026 cost estimates. Free and instant.",
  category: "interior",
  intro: [
    "Blown-in insulation is the easiest way to top up an under-insulated attic, but coverage math is confusing: bags are rated in cubic feet, R-value depends on depth, and the blower machine's coverage chart rules the job.",
    "Enter your attic's square footage and target depth. The calculator estimates bags, cost, and the approximate R-value you'll achieve (cellulose at roughly R-3.7 per inch, fiberglass blown at R-2.2–3.2 per inch).",
  ],
  fields: [
    { name: "area", label: "Attic area", unit: "sq ft", default: 1000, min: 10, step: 10 },
    { name: "depth", label: "Target depth", unit: "inches", default: 14, min: 2, max: 30, step: 1, help: "14 in ≈ R-49 cellulose · R-38 ≈ 10–11 in cellulose" },
  ],
  compute: (v) => {
    const bagsPer1000Mid =
      (INSULATION_BLOWN.bagsPer1000SqFtAtR38.low + INSULATION_BLOWN.bagsPer1000SqFtAtR38.high) / 2;
    const bags = Math.ceil((v.area / 1000) * bagsPer1000Mid * (v.depth / 14));
    const rValue = v.depth * 2.8;
    const cost = costRange(bags, INSULATION_BLOWN.bagPrice);
    const volume = (v.area * v.depth) / 12;
    return {
      rows: [
        { label: "Insulation volume", value: `${num(volume, 0)} cu ft` },
        { label: "Bags needed", value: `${bags} bags`, emphasis: true },
        { label: "Approximate R-value", value: `≈ R-${num(rValue, 0)}` },
        { label: "Material cost (est.)", value: `${usd(cost.low)} – ${usd(cost.high)}` },
      ],
      note: "Estimate based on cellulose (≈R-3.7/in, ~27 bags per 1,000 sq ft at R-38). Your product's bag label and blower coverage chart override all estimates — manufacturers state exact bags per square foot at each depth.",
    };
  },
  howItWorks: {
    formula: "Bags = (Area ÷ 1,000) × ~27 bags × (Depth ÷ 14 in)   |   R ≈ Depth × 2.8–3.7 per inch",
    steps: [
      "Determine target depth: existing insulation + added depth must reach your R-goal (R-38 minimum in most US attics, R-49–R-60 recommended in cold climates).",
      "Estimate bags: a common cellulose product blows about 20–35 bags per 1,000 sq ft at R-38 (≈10–14 in settled).",
      "Scale bags by depth relative to the 14-inch benchmark.",
      "Estimate the R-value achieved: cellulose ≈ R-3.7 per inch, blown fiberglass ≈ R-2.2–3.2 per inch.",
      "Depth rulers: place a yardstick every ~300 sq ft so you can verify depth while blowing.",
    ],
    example:
      "A 1,000 sq ft attic topped to 14 in of cellulose: about 28 bags, ≈R-49 after settling, roughly $225–$550 in material.",
  },
  faqs: [
    {
      q: "How many inches of blown-in insulation equals R-38?",
      a: "For cellulose (R-3.7/inch), R-38 takes about 10–11 inches settled; for blown fiberglass (R-2.2–3.2/inch), expect 12–16 inches. Always use the settled depth from the bag's coverage chart — loose-blown depth fluffs up 15–20% and settles.",
    },
    {
      q: "How much does blown-in insulation cost in 2026?",
      a: "Bags of cellulose run roughly $15–$25 each (a 25 lb Greenfiber bag is about $16–$20 at big-box stores; premium lines reach ~$37). DIY material for a 1,000 sq ft attic at R-49 costs about $420–$700, with the blower machine usually free with a minimum bag purchase. Professional installation adds roughly $1–$2.50 per sq ft.",
    },
    {
      q: "Can I blow insulation over existing insulation?",
      a: "Yes — it's one of the best ROI projects in a home. Check that existing insulation is dry and unfaced (don't cover a vapor barrier with new fill), air-seal penetrations first, and keep insulation off recessed light fixtures and soffit vents using baffles.",
    },
    {
      q: "How deep should attic insulation be for my climate?",
      a: "US DOE guidance: R-38–R-49 for warm climates (zones 1–3), R-49–R-60 for most of the country, and R-60 for cold zone 7–8. In cellulose terms that's roughly 11–16 inches. Existing depth counts — measure and add what's missing.",
    },
    {
      q: "Cellulose or blown fiberglass — which is better?",
      a: "Cellulose (ground paper, borate-treated) settles denser: better R-per-inch, better air sealing, but heavier on ceilings. Blown fiberglass is lighter and itchier but slightly lower R per inch. Both cost similar per achieved R; pick on price and availability locally.",
    },
  ],
  updated: "2026-10-26",
};
