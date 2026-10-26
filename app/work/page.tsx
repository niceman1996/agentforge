import type { Metadata } from "next";
import { cases } from "@/lib/content";

export const metadata: Metadata = {
  title: "Our Work — Built by an Agent Factory",
  description:
    "Live, public proof: a 17-tool calculator network with 39 automated tests, this very website built in a day, and the spec-driven agent factory behind them.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 pb-8 pt-8">
      <h1 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
        Our work
      </h1>
      <p className="mt-3 max-w-2xl leading-relaxed text-stone-600">
        We&apos;re a new studio. Rather than client logos, here is what our production line
        has actually shipped — public, live, and inspectable by anyone. Client case studies
        will join this page as references clear.
      </p>

      <div className="mt-8 space-y-6">
        {cases.map((c) => (
          <article
            key={c.id}
            className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm"
          >
            <h2 className="text-xl font-bold text-stone-900">{c.title}</h2>
            <p className="mt-2 leading-relaxed text-stone-600">{c.summary}</p>
            <ul className="mt-4 space-y-2">
              {c.details.map((d) => (
                <li key={d} className="flex gap-2 text-sm leading-relaxed text-stone-700">
                  <span aria-hidden="true" className="mt-0.5 text-emerald-700">
                    ▸
                  </span>
                  {d}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              {c.metrics.map((m) => (
                <span
                  key={m}
                  className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-900"
                >
                  {m}
                </span>
              ))}
            </div>
            {c.href ? (
              <a
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-sm font-semibold text-emerald-700 hover:underline"
              >
                Visit the live site ↗
              </a>
            ) : null}
          </article>
        ))}
      </div>
    </main>
  );
}
