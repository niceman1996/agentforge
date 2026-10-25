import { describe, expect, it } from "vitest";
import { categories } from "@/lib/registry";
import { tools } from "@/lib/tools";
import { computeMap } from "@/lib/compute-map";

/**
 * Contract every registered tool must satisfy. New tools from batch
 * production must keep this green — it is the quality gate.
 */
describe("tool registry contract", () => {
  const categorySlugs = new Set(categories.map((c) => c.slug));

  it("has at least the two seed tools", () => {
    expect(tools.length).toBeGreaterThanOrEqual(2);
  });

  it("slugs are kebab-case and unique", () => {
    const seen = new Set<string>();
    for (const t of tools) {
      expect(t.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
      expect(seen.has(t.slug)).toBe(false);
      seen.add(t.slug);
    }
  });

  it("every tool has a valid category", () => {
    for (const t of tools) {
      expect(categorySlugs.has(t.category)).toBe(true);
    }
  });

  it("titles ≤ 62 chars, meta descriptions 100–165 chars", () => {
    for (const t of tools) {
      expect(t.title.length).toBeLessThanOrEqual(62);
      expect(t.metaDescription.length).toBeGreaterThanOrEqual(100);
      expect(t.metaDescription.length).toBeLessThanOrEqual(165);
    }
  });

  it("every tool has intro, fields, how-it-works and ≥4 FAQs", () => {
    for (const t of tools) {
      expect(t.intro.length).toBeGreaterThanOrEqual(1);
      expect(t.fields.length).toBeGreaterThanOrEqual(2);
      expect(t.howItWorks.steps.length).toBeGreaterThanOrEqual(3);
      expect(t.faqs.length).toBeGreaterThanOrEqual(4);
      for (const f of t.faqs) {
        expect(f.q.length).toBeGreaterThan(10);
        expect(f.a.length).toBeGreaterThan(50);
      }
    }
  });

  it("compute with defaults returns non-empty rows for every tool", () => {
    for (const t of tools) {
      const defaults: Record<string, number> = {};
      for (const f of t.fields) {
        defaults[f.name] = f.default ?? 10;
      }
      const r = t.compute(defaults);
      expect(r.rows.length).toBeGreaterThanOrEqual(3);
      for (const row of r.rows) {
        expect(row.label.length).toBeGreaterThan(3);
        expect(row.value).toMatch(/\d/); // must contain a number
      }
    }
  });

  it("compute-map covers every registered tool", () => {
    for (const t of tools) {
      expect(computeMap[t.slug]).toBeDefined();
    }
  });
});
