import { describe, expect, it } from "vitest";
import { deckCalculator } from "@/lib/tools/deck-calculator";
import { fenceCalculator } from "@/lib/tools/fence-calculator";
import { drywallCalculator } from "@/lib/tools/drywall-calculator";
import { insulationCalculator } from "@/lib/tools/insulation-calculator";
import { roofShingleCalculator } from "@/lib/tools/roof-shingle-calculator";
import { boardFeetCalculator } from "@/lib/tools/board-feet-calculator";
import { postHoleConcreteCalculator } from "@/lib/tools/post-hole-concrete-calculator";

function r(rows: { label: string; value: string }[]) {
  return Object.fromEntries(rows.map((x) => [x.label, x.value]));
}

describe("deck calculator math", () => {
  it("12×12 deck, 5.5in boards, 0.25 gap: 301 linear ft, 26×12ft / 19×16ft", () => {
    const rows = r(deckCalculator.compute({ length: 12, width: 12, boardWidth: 5.5, gap: 0.25 }).rows);
    expect(rows["Decking needed"]).toBe("301 linear ft");
    expect(rows["Using 12 ft boards"]).toBe("26 boards");
    expect(rows["Using 16 ft boards"]).toBe("19 boards");
    expect(rows["Deck screws (2 per joist crossing)"]).toBe("≈ 461 screws");
    expect(rows["Deck materials (est.)"]).toBe("$1,152 – $2,880");
  });
});

describe("fence calculator math", () => {
  it("100 ft at 8 ft spacing: 14 posts, 13 sections, 28 bags", () => {
    const rows = r(fenceCalculator.compute({ length: 100, spacing: 8 }).rows);
    expect(rows["Posts needed"]).toBe("14 posts");
    expect(rows["Panel sections"]).toBe("13 sections (8 ft)");
    expect(rows["Concrete for posts"]).toBe("28 × 80 lb bags");
    expect(rows["Panel cost (est.)"]).toBe("$390 – $1,820");
  });
  it("48 ft at 8 ft: 7 posts exactly", () => {
    const rows = r(fenceCalculator.compute({ length: 48, spacing: 8 }).rows);
    expect(rows["Posts needed"]).toBe("7 posts");
    expect(rows["Panel sections"]).toBe("6 sections (8 ft)");
  });
});

describe("drywall calculator math", () => {
  it("perimeter 40, height 8, 10×10 ceiling: 15 sheets, 7 gal mud", () => {
    const rows = r(
      drywallCalculator.compute({ perimeter: 40, height: 8, ceilLength: 10, ceilWidth: 10 }).rows,
    );
    expect(rows["Total drywall area"]).toBe("420 sq ft");
    expect(rows["4×8 sheets (10% waste)"]).toBe("15 sheets");
    expect(rows["Joint compound"]).toBe("7 gallons (approx.)");
    expect(rows["Tape"]).toBe("240 ft");
    expect(rows["Screws"]).toBe("480 screws");
  });
});

describe("insulation calculator math", () => {
  it("1,000 sqft at 14in: 28 bags, ≈R-39", () => {
    const rows = r(insulationCalculator.compute({ area: 1000, depth: 14 }).rows);
    expect(rows["Bags needed"]).toBe("28 bags");
    expect(rows["Approximate R-value"]).toBe("≈ R-39");
    expect(rows["Material cost (est.)"]).toBe("$420 – $700");
  });
});

describe("roof shingle calculator math", () => {
  it("30×20 plane at 4/12: 6.32 squares, 21 bundles", () => {
    const rows = r(roofShingleCalculator.compute({ length: 30, width: 20, pitch: 4 }).rows);
    expect(rows["Actual roof area"]).toBe("632 sq ft");
    expect(rows["Roofing squares"]).toBe("6.32 squares");
    expect(rows["Bundles (3/sq + 10% waste)"]).toBe("21 bundles");
    expect(rows["Shingle cost (est.)"]).toBe("$630 – $1,890");
  });
  it("steeper pitch increases area", () => {
    const low = r(roofShingleCalculator.compute({ length: 30, width: 20, pitch: 3 }).rows);
    const high = r(roofShingleCalculator.compute({ length: 30, width: 20, pitch: 8 }).rows);
    expect(Number(high["Actual roof area"].replace(/[^\d]/g, ""))).toBeGreaterThan(
      Number(low["Actual roof area"].replace(/[^\d]/g, "")),
    );
  });
});

describe("board feet calculator math", () => {
  it("6/4 cherry 6in × 8ft × 10 boards: 60 bd ft", () => {
    const rows = r(
      boardFeetCalculator.compute({ thickness: 1.5, width: 6, length: 8, quantity: 10 }).rows,
    );
    expect(rows["Board feet per board"]).toBe("6 bd ft");
    expect(rows["Total board feet"]).toBe("60 bd ft");
  });
  it("2×4 × 8ft: 5.33 bd ft each", () => {
    const rows = r(
      boardFeetCalculator.compute({ thickness: 2, width: 4, length: 8, quantity: 1 }).rows,
    );
    expect(rows["Total board feet"]).toBe("5.33 bd ft");
  });
});

describe("post hole calculator math", () => {
  it("10 posts, 12in hole, 3ft deep: 2.36 ft³ each, 40×80lb bags", () => {
    const rows = r(postHoleConcreteCalculator.compute({ posts: 10, diameter: 12, depth: 3 }).rows);
    expect(rows["Concrete per hole"]).toBe("2.36 cu ft");
    expect(rows["Total volume"]).toBe("23.6 cu ft");
    expect(rows["80 lb bags"]).toBe("40 bags");
    expect(rows["60 lb bags"]).toBe("53 bags");
    expect(rows["Cost (80 lb bags, est.)"]).toBe("$200 – $280");
  });
});
