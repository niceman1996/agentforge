import { describe, expect, it } from "vitest";
import { gravelCalculator } from "@/lib/tools/gravel-calculator";
import { topsoilCalculator } from "@/lib/tools/topsoil-calculator";
import { sodCalculator } from "@/lib/tools/sod-calculator";
import { grassSeedCalculator } from "@/lib/tools/grass-seed-calculator";
import { retainingWallCalculator } from "@/lib/tools/retaining-wall-calculator";
import { paintCalculator } from "@/lib/tools/paint-calculator";
import { tileCalculator } from "@/lib/tools/tile-calculator";
import { paverCalculator } from "@/lib/tools/paver-calculator";

/** rows helper: label → value */
function r(rows: { label: string; value: string }[]) {
  return Object.fromEntries(rows.map((x) => [x.label, x.value]));
}

describe("gravel calculator math", () => {
  it("10×10 at 3in: 0.93 yd³, 1.38 tons, 50 bags", () => {
    const rows = r(gravelCalculator.compute({ length: 10, width: 10, depth: 3 }).rows);
    expect(rows["Gravel volume"]).toBe("0.93 cu yd");
    expect(rows["Approximate weight"]).toBe("1.38 tons");
    expect(rows["0.5 cu ft bags"]).toBe("50 bags");
    expect(rows["Bulk gravel cost (est.)"]).toBe("$14 – $69");
  });
});

describe("topsoil calculator math", () => {
  it("10×10 at 6in: 1.85 yd³, 67 bags", () => {
    const rows = r(topsoilCalculator.compute({ length: 10, width: 10, depth: 6 }).rows);
    expect(rows["Topsoil needed"]).toBe("1.85 cu yd");
    expect(rows["40 lb bags (≈0.75 cu ft)"]).toBe("67 bags");
    expect(rows["Bulk cost (est.)"]).toBe("$22 – $102");
  });
});

describe("sod calculator math", () => {
  it("20×20 lawn: 42 rolls, 1 pallet", () => {
    const rows = r(sodCalculator.compute({ length: 20, width: 20 }).rows);
    expect(rows["Sod rolls (10 sq ft each)"]).toBe("42 rolls");
    expect(rows["Full pallets (450 sq ft each)"]).toBe("1 pallets");
    expect(rows["Cost by roll (est.)"]).toBe("$42 – $126");
  });
});

describe("grass seed calculator math", () => {
  it("50×40 lawn (2,000 sqft): fescue 18 lb, mix 13 lb", () => {
    const rows = r(grassSeedCalculator.compute({ length: 50, width: 40 }).rows);
    expect(rows["Lawn area"]).toBe("2,000 sq ft");
    expect(rows["Tall fescue"]).toBe("18 lb");
    expect(rows["Sun & shade mix"]).toBe("13 lb");
    expect(rows["Seed cost (est., mix)"]).toBe("$39 – $104");
  });
});

describe("retaining wall calculator math", () => {
  it("20ft × 2ft: 61 exact, 65 with waste, ~15 caps", () => {
    const rows = r(retainingWallCalculator.compute({ length: 20, height: 2 }).rows);
    expect(rows["Blocks (exact)"]).toBe("61 blocks");
    expect(rows["Blocks with 5% waste"]).toBe("65 blocks");
    expect(rows["Cap blocks needed"]).toBe("15 caps (approx.)");
  });
});

describe("paint calculator math", () => {
  it("perimeter 40 × 8ft, 2 doors, 2 windows, 2 coats: 2 gallons", () => {
    const rows = r(
      paintCalculator.compute({ perimeter: 40, height: 8, doors: 2, windows: 2, coats: 2 }).rows,
    );
    expect(rows["Paintable wall area"]).toBe("250 sq ft");
    expect(rows["Paint needed"]).toBe("2 gallons");
    expect(rows["Primer (if needed, 1 coat)"]).toBe("1 gallon");
  });
  it("same room, 1 coat, no openings", () => {
    const rows = r(
      paintCalculator.compute({ perimeter: 40, height: 8, doors: 0, windows: 0, coats: 1 }).rows,
    );
    expect(rows["Paint needed"]).toBe("1 gallon"); // 320/350 = 0.91 → 1
  });
});

describe("tile calculator math", () => {
  it("10×10 with 12in tile, 10% waste: 110 tiles", () => {
    const rows = r(
      tileCalculator.compute({ length: 10, width: 10, tileLength: 12, tileWidth: 12, waste: 10 })
        .rows,
    );
    expect(rows["Tiles with 10% waste"]).toBe("110 tiles");
    expect(rows["Grout (estimated)"]).toBe("18 lb");
  });
  it("small subway tile 3×6", () => {
    const rows = r(
      tileCalculator.compute({ length: 10, width: 5, tileLength: 6, tileWidth: 3, waste: 10 }).rows,
    );
    // area 50, tile 0.125 sqft → 400 exact → 440 with waste
    expect(rows["Tiles with 10% waste"]).toBe("440 tiles");
  });
});

describe("paver calculator math", () => {
  it("12×12 patio, 10% waste: 24 sand bags, 1.78 yd³ base", () => {
    const rows = r(paverCalculator.compute({ length: 12, width: 12, waste: 10 }).rows);
    expect(rows["Pavers with 10% waste"]).toBe("158.4 sq ft");
    expect(rows["Bedding sand (1 in)"]).toBe("24 bags (0.5 cu ft)");
    expect(rows["Base gravel (4 in)"]).toBe("1.78 cu yd");
  });
});
