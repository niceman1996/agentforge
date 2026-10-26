import Link from "next/link";

export type LinkItem = { href: string; title: string };
export type Faq = { q: string; a: string };

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
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-emerald-700">
              {link.title}
            </Link>
          ))}
        </nav>
        <details className="relative sm:hidden">
          <summary className="cursor-pointer list-none text-stone-600 select-none">
            ☰ Menu
          </summary>
          <div className="absolute right-0 z-20 mt-2 w-44 rounded-lg border border-stone-200 bg-white p-2 shadow-lg">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded px-3 py-2 text-sm text-stone-700 hover:bg-stone-100"
              >
                {link.title}
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
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-emerald-700">
              {link.title}
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

export function FaqSection({ faqs }: { faqs: Faq[] }) {
  return (
    <section className="mt-10">
      <h2 className="mb-4 text-2xl font-bold text-stone-900">Frequently Asked Questions</h2>
      <div className="divide-y divide-stone-200 rounded-xl border border-stone-200 bg-white">
        {faqs.map((faq) => (
          <details key={faq.q} className="group p-4">
            <summary className="cursor-pointer list-none font-semibold text-stone-800 marker:hidden group-open:text-emerald-700">
              {faq.q}
            </summary>
            <p className="mt-2 leading-relaxed text-stone-600">{faq.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
