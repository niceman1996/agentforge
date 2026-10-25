import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getCategory, toolsByCategory } from "@/lib/registry";
import { Breadcrumbs, JsonLd } from "@/shared";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) return {};
  return {
    title: cat.title,
    description: cat.metaDescription,
    alternates: { canonical: `/category/${cat.slug}` },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) notFound();
  const catTools = toolsByCategory(cat.slug);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yardcalc.pages.dev";

  return (
    <main className="mx-auto max-w-4xl px-4 pb-8 pt-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
            {
              "@type": "ListItem",
              position: 2,
              name: cat.name,
              item: `${siteUrl}/category/${cat.slug}`,
            },
          ],
        }}
      />
      <Breadcrumbs items={[{ href: "/", title: "Home" }, { href: `/category/${cat.slug}`, title: cat.name }]} />
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-stone-900">{cat.title}</h1>
      {cat.intro.map((p, i) => (
        <p key={i} className="mt-3 leading-relaxed text-stone-600">
          {p}
        </p>
      ))}
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {catTools.map((t) => (
          <li key={t.slug}>
            <a
              href={`/tools/${t.slug}`}
              className="block h-full rounded-xl border border-stone-200 bg-white p-4 shadow-sm transition hover:border-emerald-300 hover:shadow"
            >
              <span className="font-semibold text-stone-800">{t.h1}</span>
              <span className="mt-1 block text-sm leading-relaxed text-stone-500">
                {t.metaDescription}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
