import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About YardCalc",
  description:
    "YardCalc provides free, accurate material calculators for DIY homeowners, backed by current US pricing data.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 pb-8 pt-6">
      <h1 className="text-3xl font-bold tracking-tight text-stone-900">About YardCalc</h1>
      <div className="mt-4 space-y-4 leading-relaxed text-stone-600">
        <p>
          YardCalc started with a simple frustration: every DIY project begins with the
          same question — <em>how much do I actually need?</em> — and the answers scattered
          across supplier sites rarely match the way materials are actually sold. A mulch
          bed isn&apos;t sold in square feet; it&apos;s sold in cubic yards or 2-cubic-foot
          bags.
        </p>
        <p>
          Every calculator on this site answers that question for one specific project
          type, in the units suppliers use, with the rounding conventions pros follow —
          bags round up, concrete orders include the 10% safety factor, tile includes the
          10% waste allowance.
        </p>
        <p>
          Cost estimates are based on national US average prices and are updated
          regularly. They are planning guides, not quotes — regional prices and delivery
          fees vary widely.
        </p>
        <p>
          YardCalc is an independent site. It is free to use, requires no signup, and
          works entirely in your browser — your measurements never leave your device.
        </p>
      </div>
    </main>
  );
}
