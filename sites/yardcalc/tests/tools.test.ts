import { describe, expect, it } from "vitest";
import { concreteSlab } from "@/lib/tools/concrete-calculator";
import { mulchCalculator } from "@/lib/tools/mulch-calculator";

describe("concrete slab calculator math", () => {
  it("10×10 slab at 4in: 1.23 yd³ exact, 1.36 yd³ ordered, 56×80lb bags", () => {
    const r = concreteSlab.compute({ length: 10, width: 10, thickness: 4 });
    const rows = Object.fromEntries(r.rows.map((x) => [x.label, x.value]));
    expect(rows["Slab volume (exact)"]).toBe("1.23 cu yd");
    expect(rows["Order with 10% extra"]).toBe("1.36 cu yd");
    expect(rows["80 lb bags (exact volume)"]).toBe("56 bags");
    expect(rows["60 lb bags (exact volume)"]).toBe("75 bags");
    // bulk: 1.358 yd³ × $140–190 = $190.1 – $258.0
    expect(rows["Ready-mix truck cost (est.)"]).toBe("$190 – $258");
  });

  it("small pad 3×3 at 4in", () => {
    const r = concreteSlab.compute({ length: 3, width: 3, thickness: 4 });
    const rows = Object.fromEntries(r.rows.map((x) => [x.label, x.value]));
    expect(rows["80 lb bags (exact volume)"]).toBe("5 bags"); // 3 cuft / 0.6 = 5 exact
  });
});

describe("mulch calculator math", () => {
  it("10×6 bed at 3in deep: 0.56 yd³, 8×2cuft bags", () => {
    const r = mulchCalculator.compute({ length: 10, width: 6, depth: 3 });
    const rows = Object.fromEntries(r.rows.map((x) => [x.label, x.value]));
    expect(rows["Mulch needed"]).toBe("0.56 cu yd");
    expect(rows["2 cu ft bags"]).toBe("8 bags");
    expect(rows["3 cu ft bags"]).toBe("5 bags");
  });

  it("one full yard at 3in over 108 sqft", () => {
    const r = mulchCalculator.compute({ length: 12, width: 9, depth: 3 });
    const rows = Object.fromEntries(r.rows.map((x) => [x.label, x.value]));
    expect(rows["Mulch needed"]).toBe("1 cu yd");
    expect(rows["2 cu ft bags"]).toBe("14 bags"); // 27/2=13.5 → 14
  });
});
