import type { ReactNode } from "react";
import Link from "next/link";
import type { Faq, LinkItem, ToolDefinition } from "./types";

/** Inject a JSON-LD structured-data block. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function SiteHeader({ brand, links }: { brand: string; links: LinkItem[] }) {
  return (
    <header className="sticky top-0 z-10 border-b border-stone-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="text-lg font-bold text-emerald-800">
          {brand}
        </Link>
        <nav className="hidden items-center gap-4 text-sm text-stone-600 sm:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-emerald-700">
              {l.title}
            </Link>
          ))}
        </nav>
        {/* mobile nav: no-JS collapsible */}
        <details className="relative sm:hidden">
          <summary className="cursor-pointer list-none text-stone-600 select-none">☰ Menu</summary>
          <div className="absolute right-0 z-20 mt-2 w-44 rounded-lg border border-stone-200 bg-white p-2 shadow-lg">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="block rounded px-3 py-2 text-sm text-stone-700 hover:bg-stone-100"
              >
                {l.title}
              </Link>
            ))}
          </div>
        </details>
      </div>
    </header>
  );
}

export function SiteFooter({
  brand,
  links,
  note,
}: {
  brand: string;
  links: LinkItem[];
  note?: string;
}) {
  return (
    <footer className="mt-16 border-t border-stone-200 bg-stone-50">
      <div className="mx-auto max-w-4xl px-4 py-8 text-sm text-stone-500">
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-emerald-700">
              {l.title}
            </Link>
          ))}
        </div>
        {note ? <p className="mt-4 leading-relaxed">{note}</p> : null}
        <p className="mt-4">
          © {new Date().getFullYear()} {brand}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

/**
 * Ad placeholder. Renders nothing until ads are enabled site-wide; kept as a
 * component so ad slots can be switched on without touching page code.
 */
export function AdSlot(_props: { slot: string; className?: string }) {
  return null;
}

export function Breadcrumbs({ items }: { items: LinkItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-stone-500">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, i) => (
          <li key={item.href} className="flex items-center gap-1">
            {i > 0 && <span aria-hidden="true">›</span>}
            <Link href={item.href} className="hover:text-emerald-700">
              {item.title}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Presentational number input used by the client-side calculator form. */
export function NumberFieldShell({
  label,
  unit,
  value,
  onInput,
  min,
  max,
  step,
  help,
}: {
  label: string;
  unit?: string;
  value: string;
  onInput: (v: string) => void;
  min?: number;
  max?: number;
  step?: number;
  help?: string;
}) {
  const id = `f-${label.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`;
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-stone-700">
        {label}
        {unit ? <span className="ml-1 font-normal text-stone-400">({unit})</span> : null}
      </label>
      <input
        id={id}
        type="number"
        inputMode="decimal"
        className="w-full rounded-lg border border-stone-300 px-3 py-2 text-base focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100"
        value={value}
        min={min}
        max={max}
        step={step ?? "any"}
        onInput={(e) => onInput((e.target as HTMLInputElement).value)}
      />
      {help ? <p className="mt-1 text-xs text-stone-400">{help}</p> : null}
    </div>
  );
}

export function ResultRows({
  rows,
  note,
}: {
  rows: { label: string; value: string; emphasis?: boolean }[];
  note?: string;
}) {
  return (
    <div>
      <dl className="divide-y divide-stone-100">
        {rows.map((r) => (
          <div key={r.label} className="flex items-baseline justify-between gap-4 py-2.5">
            <dt className={r.emphasis ? "text-sm font-semibold text-stone-800" : "text-sm text-stone-600"}>
              {r.label}
            </dt>
            <dd
              className={
                r.emphasis
                  ? "text-xl font-bold text-emerald-700 tabular-nums"
                  : "text-base font-medium text-stone-800 tabular-nums"
              }
            >
              {r.value}
            </dd>
          </div>
        ))}
      </dl>
      {note ? <p className="mt-2 text-xs leading-relaxed text-stone-400">{note}</p> : null}
    </div>
  );
}

export function FaqSection({ faqs }: { faqs: Faq[] }) {
  return (
    <section className="mt-10">
      <h2 className="mb-4 text-2xl font-bold text-stone-900">Frequently Asked Questions</h2>
      <div className="divide-y divide-stone-200 rounded-xl border border-stone-200 bg-white">
        {faqs.map((f) => (
          <details key={f.q} className="group p-4">
            <summary className="cursor-pointer list-none font-semibold text-stone-800 marker:hidden group-open:text-emerald-700">
              {f.q}
            </summary>
            <p className="mt-2 leading-relaxed text-stone-600">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function RelatedTools({ items }: { items: LinkItem[] }) {
  if (items.length === 0) return null;
  return (
    <section className="mt-10">
      <h2 className="mb-3 text-xl font-bold text-stone-900">Related Calculators</h2>
      <ul className="grid gap-2 sm:grid-cols-2">
        {items.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="block rounded-lg border border-stone-200 bg-white px-4 py-3 text-sm font-medium text-stone-700 hover:border-emerald-300 hover:text-emerald-700"
            >
              {l.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Server-side page shell that gives every tool page the same SEO structure. */
export function ToolPageShell({
  tool,
  categoryName,
  categoryHref,
  related,
  calculator,
}: {
  tool: ToolDefinition;
  categoryName: string;
  categoryHref: string;
  related: LinkItem[];
  calculator: ReactNode;
}) {
  return (
    <main className="mx-auto max-w-4xl px-4 pb-8 pt-6">
      <Breadcrumbs
        items={[
          { href: "/", title: "Home" },
          { href: categoryHref, title: categoryName },
          { href: `/tools/${tool.slug}`, title: tool.h1 },
        ]}
      />
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-stone-900">{tool.h1}</h1>
      {tool.intro.map((p, i) => (
        <p key={i} className="mt-3 leading-relaxed text-stone-600">
          {p}
        </p>
      ))}

      <div className="mt-6 rounded-xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
        {calculator}
      </div>

      <section className="mt-10">
        <h2 className="mb-3 text-2xl font-bold text-stone-900">How This Calculator Works</h2>
        <pre className="overflow-x-auto rounded-lg bg-stone-900 px-4 py-3 text-sm text-emerald-100">
          <code>{tool.howItWorks.formula}</code>
        </pre>
        <ol className="mt-4 list-decimal space-y-2 pl-5 leading-relaxed text-stone-600">
          {tool.howItWorks.steps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
        {tool.howItWorks.example ? (
          <p className="mt-4 rounded-lg bg-emerald-50 px-4 py-3 text-sm leading-relaxed text-emerald-900">
            <strong>Example:</strong> {tool.howItWorks.example}
          </p>
        ) : null}
      </section>

      <FaqSection faqs={tool.faqs} />
      <RelatedTools items={related} />
      {tool.updated ? (
        <p className="mt-8 text-xs text-stone-400">Last updated: {tool.updated}</p>
      ) : null}
    </main>
  );
}
