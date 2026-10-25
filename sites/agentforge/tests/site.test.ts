import { describe, expect, it } from "vitest";
import { site } from "@/lib/site";
import {
  heroStats,
  whyCards,
  services,
  cases,
  processSteps,
  serviceFaqs,
} from "@/lib/content";

describe("site identity", () => {
  it("has a name, a title and a working contact email", () => {
    expect(site.name).toBe("AgentForge");
    expect(site.title).toMatch(/AgentForge/);
    expect(site.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  it("title mentions the core offer for SEO", () => {
    expect(site.title.toLowerCase()).toContain("ai agents");
    expect(site.description.toLowerCase()).toContain("workflow automation");
  });
});

describe("hero stats", () => {
  it("shows four concrete, non-empty stats", () => {
    expect(heroStats).toHaveLength(4);
    for (const s of heroStats) {
      expect(s.value.trim()).not.toBe("");
      expect(s.label.trim()).not.toBe("");
    }
  });
});

describe("why cards", () => {
  it("has three cards, each with a title and a body of substance", () => {
    expect(whyCards).toHaveLength(3);
    for (const c of whyCards) {
      expect(c.title.length).toBeGreaterThan(5);
      expect(c.body.length).toBeGreaterThan(40);
    }
  });
});

describe("services", () => {
  it("offers the three anchor packages", () => {
    expect(services.map((s) => s.id)).toEqual([
      "custom-agent",
      "workflow-automation",
      "care-plan",
    ]);
  });

  it("every service carries a price anchor and a timeline", () => {
    for (const s of services) {
      expect(s.price).toMatch(/^from \$\d+/);
      expect(s.timeline.trim()).not.toBe("");
    }
  });

  it("every service lists at least three concrete deliverables", () => {
    for (const s of services) {
      expect(s.includes.length).toBeGreaterThanOrEqual(3);
      for (const inc of s.includes) expect(inc.length).toBeGreaterThan(10);
    }
  });
});

describe("case studies", () => {
  it("has three entries, each with metrics and details", () => {
    expect(cases).toHaveLength(3);
    for (const c of cases) {
      expect(c.title.length).toBeGreaterThan(10);
      expect(c.summary.length).toBeGreaterThan(20);
      expect(c.metrics.length).toBeGreaterThanOrEqual(1);
      expect(c.details.length).toBeGreaterThanOrEqual(2);
    }
  });

  it("external links are https and absolute", () => {
    for (const c of cases) {
      if (c.href) expect(c.href).toMatch(/^https:\/\//);
    }
  });
});

describe("process", () => {
  it("walks through five steps in order", () => {
    expect(processSteps).toHaveLength(5);
    processSteps.forEach((p, i) => {
      expect(p.title.startsWith(`${i + 1}. `)).toBe(true);
      expect(p.body.length).toBeGreaterThan(40);
    });
  });
});

describe("faqs", () => {
  it("every question is a question and every answer has substance", () => {
    expect(serviceFaqs.length).toBeGreaterThanOrEqual(6);
    for (const f of serviceFaqs) {
      expect(f.q.trim().endsWith("?")).toBe(true);
      expect(f.a.length).toBeGreaterThan(40);
    }
  });

  it("covers the money questions buyers ask first", () => {
    const all = serviceFaqs.map((f) => f.q + f.a).join(" ").toLowerCase();
    for (const keyword of ["cost", "own", "data", "time zone"]) {
      expect(all).toContain(keyword);
    }
  });
});
