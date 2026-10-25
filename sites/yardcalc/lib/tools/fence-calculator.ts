import type { ToolDefinition } from "@/shared";
import { FENCE, num, usd, costRange } from "@/shared";

export const fenceCalculator: ToolDefinition = {
  slug: "fence-calculator",
  title: "Fence Calculator — Posts, Panels & Concrete",
  h1: "Fence Calculator",
  metaDescription:
    "Calculate fence posts, panels, concrete and 2026 cost for a privacy or picket fence. Enter fence length and post spacing for instant results.",
  category: "outdoor",
  intro: [
    "A wood fence is a repeating unit: one post every 8 feet, one panel between each pair, and two bags of concrete per post to keep it plumb for decades. Get the counts right and the build is a rhythm; get them wrong and you're short a post at the far corner.",
    "Enter your total fence length and post spacing (8 ft is standard for privacy panels). The calculator counts posts, panels, concrete bags, and estimates lumber cost.",
  ],
  fields: [
    { name: "length", label: "Total fence length", unit: "ft", default: 100, min: 5, step: 1 },
    { name: "spacing", label: "Post spacing", unit: "ft", default: 8, min: 4, max: 10, step: 0.5, help: "Standard privacy panels: 8 ft" },
  ],
  compute: (v) => {
    const posts = Math.ceil(v.length / v.spacing) + 1;
    const sections = posts - 1;
    const concreteBags = posts * 2;
    const panelCost = costRange(sections, FENCE.panelPrice);
    const postCost = costRange(posts, FENCE.postPrice);
    return {
      rows: [
        { label: "Fence line", value: `${num(v.length, 0)} ft` },
        { label: "Posts needed", value: `${posts} posts`, emphasis: true },
        { label: "Panel sections", value: `${sections} sections (8 ft)` },
        { label: "Concrete for posts", value: `${concreteBags} × 80 lb bags` },
        { label: "Panel cost (est.)", value: `${usd(panelCost.low)} – ${usd(panelCost.high)}` },
        { label: "Post cost (est.)", value: `${usd(postCost.low)} – ${usd(postCost.high)}` },
      ],
      note: "Concrete estimate: two 80 lb bags per post (4×4 posts in 8–12 in holes). Add a rail set (2 rails) plus 13–14 pickets per 8 ft section if building stick-built instead of using pre-assembled panels.",
    };
  },
  howItWorks: {
    formula: "Posts = (Length ÷ Spacing) rounded up + 1   |   Panels = Posts − 1",
    steps: [
      "Divide total fence length by post spacing and round up — this is the number of gaps between posts.",
      "Add one for the closing post: gaps + 1 = total posts.",
      "Panels (or rail-plus-picket sections) equal the number of gaps.",
      "Set each post with two 80 lb bags of concrete in a hole dug 24–36 in deep (below frost line where required).",
      "For gates: subtract the gate width from the run and buy a gate kit with heavier hinges and a latch.",
    ],
    example:
      "A 100 ft fence at 8 ft spacing: 100 ÷ 8 = 12.5 → round up to 13 gaps + 1 = 14 posts, 13 panels, and 28 bags of concrete.",
  },
  faqs: [
    {
      q: "How deep should fence posts be buried?",
      a: "Dig holes ⅓ to ½ of the above-ground post height, and at least 6 inches deeper than your frost line — typically 24–36 inches for a 6 ft privacy fence. A 6 ft fence wants 4×4 posts in 10–12 inch holes set in concrete, with gravel at the bottom for drainage.",
    },
    {
      q: "How much concrete do I need per fence post?",
      a: "Two 80 lb bags per post is the standard rule for 4×4 posts in 10–12 inch holes at 24–30 inches deep. In firm soil some builders concrete only every other post and tamp the rest with gravel — but in loose soil or high-wind areas, concrete every post.",
    },
    {
      q: "How much does a wood privacy fence cost in 2026?",
      a: "DIY materials run roughly $10–$25 per linear foot: pressure-treated pre-assembled panels $30–$140 per 8 ft section, posts $12–$45 each, plus concrete and hardware. A 100 ft DIY fence typically totals $1,200–$2,500 in materials; professional installation adds $15–$40 per ft in labor.",
    },
    {
      q: "How many pickets do I need for a stick-built fence?",
      a: "A 6 ft tall privacy fence uses 13–14 pickets per 8 ft section at 5½ in wide boards butted tight (privacy), or fewer with spacing for a picket look. Multiply by your number of sections, and add two horizontal 2×4 rails per section.",
    },
    {
      q: "Should fence posts be set in concrete or gravel?",
      a: "Concrete for maximum rigidity and wind resistance — the standard for privacy fences. Tamped gravel works well for lighter fences and offers better drainage around the post (less rot), but posts can rack over time in loose soil. Many builders put 6 inches of gravel under every concreted post to prevent water pooling.",
    },
  ],
  updated: "2026-10-26",
};
