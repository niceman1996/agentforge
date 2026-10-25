// Shared type contracts for all SOE tool sites.

export interface ToolField {
  name: string;
  label: string;
  unit?: string;
  /** reserved for future field kinds; only "number" is rendered today */
  type?: "number";
  default?: number;
  min?: number;
  max?: number;
  step?: number;
  help?: string;
}

export interface ResultRow {
  label: string;
  value: string;
  emphasis?: boolean;
}

export interface ComputeResult {
  rows: ResultRow[];
  note?: string;
}

export type ComputeFn = (v: Record<string, number>) => ComputeResult;

export interface Faq {
  q: string;
  a: string;
}

export interface ToolDefinition {
  /** URL slug, e.g. "mulch-calculator" → /tools/mulch-calculator */
  slug: string;
  /** <title> content (keep < 60 chars) */
  title: string;
  /** on-page H1 */
  h1: string;
  /** meta description (keep < 160 chars) */
  metaDescription: string;
  /** category slug from the site's category registry */
  category: string;
  /** intro paragraphs above the calculator */
  intro: string[];
  fields: ToolField[];
  compute: ComputeFn;
  howItWorks: {
    formula: string;
    steps: string[];
    example?: string;
  };
  faqs: Faq[];
  /** "2026-10-25" — shown as last-updated date */
  updated?: string;
}

export interface CategoryDef {
  slug: string;
  name: string;
  title: string;
  metaDescription: string;
  intro: string[];
}

export interface LinkItem {
  href: string;
  title: string;
}
