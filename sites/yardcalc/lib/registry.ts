import type { CategoryDef, LinkItem, ToolDefinition } from "@/shared";
import { tools } from "./tools";

export { tools };

export const categories: CategoryDef[] = [
  {
    slug: "concrete",
    name: "Concrete",
    title: "Concrete Calculators",
    metaDescription:
      "Concrete calculators for slabs, footings, columns and post holes — cubic yards, bag counts and 2026 cost estimates.",
    intro: [
      "Concrete math mistakes are expensive — a short pour means a cold joint, an over-order means a short-load fee. These calculators give you exact volumes, bag equivalents and current cost ranges for slabs, footings and more.",
    ],
  },
  {
    slug: "landscaping",
    name: "Landscaping",
    title: "Landscaping Calculators",
    metaDescription:
      "Mulch, gravel, topsoil, sod, grass seed and retaining wall calculators — cubic yards, bags and 2026 cost estimates for your yard.",
    intro: [
      "From mulching a flower bed to seeding a new lawn, these calculators convert your project dimensions into the exact quantities landscape suppliers sell — cubic yards, bags, pallets and pounds.",
    ],
  },
  {
    slug: "painting",
    name: "Painting",
    title: "Paint Calculators",
    metaDescription:
      "Interior and exterior paint calculators — gallons needed, coats, primer and 2026 paint cost estimates.",
    intro: [
      "Paint coverage depends on texture, color changes and coats. These calculators use manufacturer coverage rates (350–400 sq ft per gallon) and subtract doors and windows so you buy the right number of cans.",
    ],
  },
  {
    slug: "flooring",
    name: "Flooring & Paving",
    title: "Flooring & Paving Calculators",
    metaDescription:
      "Tile and paver calculators with waste factor, spacers, sand base and 2026 cost estimates for floors, patios and walkways.",
    intro: [
      "Tile and paver projects fail on the details — waste factor, joint sand, edge cuts. These calculators include the industry-standard 10–15% waste allowance so you don't run short mid-project.",
    ],
  },
  {
    slug: "outdoor",
    name: "Outdoor Structures",
    title: "Outdoor Structure Calculators",
    metaDescription:
      "Deck board, fence and railing calculators — board counts, posts, fasteners and 2026 lumber cost estimates.",
    intro: [
      "Decks and fences are lumber arithmetic at scale: boards, joists, posts, rails and hundreds of fasteners. These calculators lay out the full material list from your dimensions.",
    ],
  },
  {
    slug: "interior",
    name: "Interior",
    title: "Interior Material Calculators",
    metaDescription:
      "Drywall, insulation and interior finish calculators — sheets, mud, tape, fasteners and 2026 cost estimates.",
    intro: [
      "Interior finishing materials come in sheets, rolls and bags sized for standard framing. These calculators map your wall and ceiling areas onto the packages suppliers actually sell.",
    ],
  },
  {
    slug: "roofing",
    name: "Roofing",
    title: "Roofing Calculators",
    metaDescription:
      "Roofing shingle calculators — squares, bundles, waste factor and 2026 material cost estimates.",
    intro: [
      "Roofing is measured in squares (100 sq ft) and sold in bundles (3 per square). These calculators add the pitch multiplier and waste factor for an accurate shingle order.",
    ],
  },
  {
    slug: "lumber",
    name: "Lumber",
    title: "Lumber Calculators",
    metaDescription:
      "Board feet and lumber calculators — convert dimensions to board feet with 2026 price estimates.",
    intro: [
      "Rough lumber is priced by the board foot — a volume unit that surprises everyone the first time. These calculators convert nominal dimensions into board feet and cost.",
    ],
  },
];

export function getTool(slug: string): ToolDefinition | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getCategory(slug: string): CategoryDef | undefined {
  return categories.find((c) => c.slug === slug);
}

export function toolsByCategory(categorySlug: string): ToolDefinition[] {
  return tools.filter((t) => t.category === categorySlug);
}

export function getRelated(tool: ToolDefinition, max = 4): LinkItem[] {
  const sameCategory = tools.filter(
    (t) => t.category === tool.category && t.slug !== tool.slug,
  );
  const others = tools.filter(
    (t) => t.category !== tool.category && t.slug !== tool.slug,
  );
  return [...sameCategory, ...others].slice(0, max).map((t) => ({
    href: `/tools/${t.slug}`,
    title: t.h1,
  }));
}
