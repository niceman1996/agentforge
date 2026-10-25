// Shared calculation helpers. All math that appears in results should flow
// through these so rounding/convention rules stay consistent site-wide.

/** cubic feet → cubic yards (27 ft³ = 1 yd³) */
export function cuftToCuyd(cubicFeet: number): number {
  return cubicFeet / 27;
}

/** How many bags of `bagCubicFeet` cover `volumeCubicFeet` (bags always round UP). */
export function bagsNeeded(volumeCubicFeet: number, bagCubicFeet: number): number {
  if (bagCubicFeet <= 0) return 0;
  return Math.ceil(volumeCubicFeet / bagCubicFeet);
}

/** Round up to whole units of `step` (e.g. whole gallons of paint). */
export function roundUpTo(value: number, step: number): number {
  if (step <= 0) return value;
  return Math.ceil(value / step);
}

/** USD currency formatting: 1234.5 → "$1,235" */
export function usd(n: number, maxFractionDigits = 0): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: maxFractionDigits,
    minimumFractionDigits: 0,
  }).format(n);
}

/** Plain number formatting: 1234.56 → "1,234.6" */
export function num(n: number, digits = 1): string {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: digits,
  }).format(n);
}

/** Rectangle area in ft². */
export function rectArea(lengthFt: number, widthFt: number): number {
  return lengthFt * widthFt;
}

/** Circle area from diameter in ft². */
export function circleAreaFromDiameter(diameterFt: number): number {
  return (Math.PI * diameterFt * diameterFt) / 4;
}

export interface PriceRange {
  low: number;
  high: number;
}

export interface BagProduct {
  label: string;
  cubicFeet: number;
  price: PriceRange;
}

/** Format a price range: "$20 – $55" */
export function priceRangeText(range: PriceRange): string {
  return `${usd(range.low)} – ${usd(range.high)}`;
}

/**
 * Generic coverage math: given area (ft²) and coverage per unit, how many units.
 * Rounds up to `roundToStep` (default 1).
 */
export function unitsForArea(
  areaSqFt: number,
  coveragePerUnit: number,
  roundToStep = 1,
): number {
  if (coveragePerUnit <= 0) return 0;
  return roundUpTo(areaSqFt / coveragePerUnit, roundToStep);
}

/** Cost range from a quantity × unit price range. */
export function costRange(
  quantity: number,
  unitPrice: PriceRange,
): PriceRange {
  return { low: quantity * unitPrice.low, high: quantity * unitPrice.high };
}

/** Total area of up to 4 rectangle sections (walls with doors etc.). */
export function subtractArea(grossSqFt: number, openingsSqFt: number): number {
  return Math.max(0, grossSqFt - openingsSqFt);
}
