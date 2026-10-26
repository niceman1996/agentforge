import type { Metadata } from "next";
import Link from "next/link";
import { KnowledgeAssistantPreview, WorkflowPreview } from "@/components/work-demos";
import { cases } from "@/lib/content";

export const metadata: Metadata = {
  title: "AI Assistant & Workflow Previews — AgentForge",
  description:
    "Explore honest, interactive previews of a document assistant and a human-reviewed workflow, plus a live engineering project.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 pb-8 pt-8">
      <h1 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
        See what we build
      </h1>
      <p className="mt-3 max-w-2xl leading-relaxed text-stone-600">
        Try two in-house previews, then inspect a public product we have shipped. The
        previews use fictional sample data and are clearly marked; they are not presented
        as client deployments or measured client results.
      </p>

      <div className="mt-8 space-y-5">
        <KnowledgeAssistantPreview />
        <WorkflowPreview />
      </div>

      <section className="mt-14">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700">
              Shipped engineering project
            </p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-stone-900">
              A live product, built end to end
            </h2>
          </div>
          <Link href="/services" className="text-sm font-semibold text-emerald-700 hover:underline">
            See services and pricing →
          </Link>
        </div>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-stone-600">
          YardCalc demonstrates product research, implementation, quality checks and release.
          It is an engineering delivery example; it is not an AI assistant case study.
        </p>

        <div className="mt-5 space-y-6">
          {cases.map((c) => (
            <article
              key={c.id}
              className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-xl font-bold text-stone-900">{c.title}</h3>
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
      </section>

      <section className="mt-12 rounded-2xl bg-emerald-800 px-6 py-8 text-center sm:px-10">
        <h2 className="text-2xl font-bold text-white">Have a workflow like this?</h2>
        <p className="mx-auto mt-2 max-w-xl leading-relaxed text-emerald-100">
          Tell us what you want to run and where it should live. We&apos;ll review the task and
          your hardware, then send a fixed scope and price.
        </p>
        <Link
          href="/contact"
          className="mt-5 inline-block rounded-lg bg-white px-5 py-3 text-sm font-semibold text-emerald-800 hover:bg-emerald-50"
        >
          Discuss a project
        </Link>
      </section>
    </main>
  );
}
