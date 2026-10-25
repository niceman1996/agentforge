import type { Metadata } from "next";
import Link from "next/link";
import { categories, toolsByCategory } from "@/lib/registry";
import { JsonLd } from "@/shared";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <main className="mx-auto max-w-4xl px-4 pb-8 pt-10">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "YardCalc",
          description:
            "Free DIY material calculators for concrete, mulch, gravel, paint, tile, decking and more.",
        }}
      />
      <h1 className="text-4xl font-bold tracking-tight text-stone-900">
        Yard & Home Material Calculators
      </h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-stone-600">
        Stop guessing at the garden center. YardCalc turns your project dimensions into
        exact material quantities — cubic yards, bags, gallons, sheets and bundles — with
        2026 US cost estimates for every project.
      </p>

      <div className="mt-10 space-y-8">
        {categories.map((cat) => {
          const catTools = toolsByCategory(cat.slug);
          if (catTools.length === 0) return null;
          return (
            <section key={cat.slug}>
              <div className="mb-3 flex items-baseline justify-between">
                <h2 className="text-xl font-bold text-stone-900">{cat.name}</h2>
                <Link
                  href={`/category/${cat.slug}`}
                  className="text-sm text-emerald-700 hover:underline"
                >
                  View all →
                </Link>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2">
                {catTools.map((t) => (
                  <li key={t.slug}>
                    <Link
                      href={`/tools/${t.slug}`}
                      className="block h-full rounded-xl border border-stone-200 bg-white p-4 shadow-sm transition hover:border-emerald-300 hover:shadow"
                    >
                      <span className="font-semibold text-stone-800">{t.h1}</span>
                      <span className="mt-1 block text-sm leading-relaxed text-stone-500">
                        {t.metaDescription}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </main>
  );
}
