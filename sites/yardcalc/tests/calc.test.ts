import { describe, expect, it } from "vitest";
import {
  bagsNeeded,
  circleAreaFromDiameter,
  costRange,
  cuftToCuyd,
  num,
  rectArea,
  roundUpTo,
  unitsForArea,
  usd,
} from "@/shared/lib/calc";

describe("calc utils", () => {
  it("cuftToCuyd: 27 ft³ = 1 yd³", () => {
    expect(cuftToCuyd(27)).toBeCloseTo(1, 10);
    expect(cuftToCuyd(33.333)).toBeCloseTo(1.2346, 3);
  });

  it("bagsNeeded always rounds UP", () => {
    expect(bagsNeeded(33.333, 0.6)).toBe(56);
    expect(bagsNeeded(15, 2)).toBe(8);
    expect(bagsNeeded(12, 2)).toBe(6); // exact, no extra bag
  });

  it("roundUpTo returns whole-step COUNT", () => {
    expect(roundUpTo(4.2, 1)).toBe(5);
    expect(roundUpTo(0.37, 0.25)).toBe(2); // 0.37 needs 2 quarter-steps (≈0.5)
    expect(roundUpTo(0.25, 0.25)).toBe(1);
  });

  it("usd formats without cents by default", () => {
    expect(usd(1234.5)).toBe("$1,235");
    expect(usd(190.12)).toBe("$190");
  });

  it("num formats with sensible digits", () => {
    expect(num(1.2346, 2)).toBe("1.23");
    expect(num(0.5555, 2)).toBe("0.56");
  });

  it("area helpers", () => {
    expect(rectArea(10, 6)).toBe(60);
    expect(circleAreaFromDiameter(10)).toBeCloseTo(78.54, 2);
  });

  it("unitsForArea rounds up", () => {
    expect(unitsForArea(800, 350, 1)).toBe(3); // 800/350=2.29 → 3 gallons
  });

  it("costRange multiplies both ends", () => {
    expect(costRange(2, { low: 140, high: 190 })).toEqual({ low: 280, high: 380 });
  });
});
