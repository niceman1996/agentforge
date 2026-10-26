import Link from "next/link";
import { JsonLd, FaqSection } from "@/components/site-ui";
import { site } from "@/lib/site";
import { heroStats, whyCards, services, cases, processSteps, serviceFaqs } from "@/lib/content";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  description: site.description,
  email: site.email,
  url: site.url,
  areaServed: "Worldwide",
  priceRange: "$$",
  makesOffer: services.map((s) => ({
    "@type": "Offer",
    name: s.name,
    description: s.blurb,
  })),
};

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-700">
            Remote setup · Your computer or server
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
            AI agents and workflows, deployed on your systems.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-stone-600">
            AgentForge builds AI assistants and n8n automations for small teams, then helps
            install them remotely on your own computer or server. Hardware, scope and a
            fixed price are agreed before work starts.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="rounded-lg bg-emerald-700 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-800"
            >
              Get a fixed-price quote
            </Link>
            <Link
              href="/work"
              className="rounded-lg border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-stone-700 hover:border-emerald-400 hover:text-emerald-700"
            >
              See the work
            </Link>
          </div>
          <dl className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {heroStats.map((s) => (
              <div key={s.label}>
                <dd className="text-xl font-bold text-emerald-700 sm:text-2xl">{s.value}</dd>
                <dt className="mt-1 text-xs leading-snug text-stone-500">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Why */}
      <section className="mx-auto max-w-4xl px-4 py-14">
        <h2 className="text-2xl font-bold tracking-tight text-stone-900">
          A clear scope and a setup you control
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {whyCards.map((c) => (
            <div
              key={c.title}
              className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm"
            >
              <h3 className="font-semibold text-stone-900">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services preview */}
      <section className="border-y border-stone-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-14">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="text-2xl font-bold tracking-tight text-stone-900">
              Services &amp; pricing
            </h2>
            <Link href="/services" className="text-sm font-medium text-emerald-700 hover:underline">
              All details →
            </Link>
          </div>
          <p className="mt-3 text-sm text-stone-600">
            Prices in USD. Self-hosted projects include remote setup on one supported host;
            cloud GPT setup is an optional alternative.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {services.map((s) => (
              <Link
                key={s.id}
                href="/services"
                className="block rounded-xl border border-stone-200 bg-stone-50 p-5 transition hover:border-emerald-400"
              >
                <h3 className="font-semibold text-stone-900">{s.name}</h3>
                <p className="mt-1 text-lg font-bold text-emerald-700">{s.price}</p>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">
                  {s.blurb.split(" — ")[0]}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Work preview */}
      <section className="mx-auto max-w-4xl px-4 py-14">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-2xl font-bold tracking-tight text-stone-900">
            A shipped product, plus interactive previews
          </h2>
          <Link href="/work" className="text-sm font-medium text-emerald-700 hover:underline">
            All work →
          </Link>
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-stone-600">
          See a public product we shipped, then try two sample previews of the assistants and
          workflows we build.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {cases.slice(0, 2).map((c) => (
            <Link
              key={c.id}
              href="/work"
              className="block rounded-xl border border-stone-200 bg-white p-5 shadow-sm transition hover:border-emerald-400"
            >
              <h3 className="font-semibold text-stone-900">{c.title.split(" — ")[0]}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">{c.summary}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {c.metrics.map((m) => (
                  <span
                    key={m}
                    className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-900"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Process preview */}
      <section className="border-y border-stone-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-14">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="text-2xl font-bold tracking-tight text-stone-900">
              How a project runs
            </h2>
            <Link href="/process" className="text-sm font-medium text-emerald-700 hover:underline">
              Full process →
            </Link>
          </div>
          <ol className="mt-6 grid gap-3 sm:grid-cols-2">
            {processSteps.map((p) => (
              <li
                key={p.title}
                className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-3"
              >
                <span className="font-semibold text-stone-900">{p.title}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ (subset; full set on /services) */}
      <section className="mx-auto max-w-4xl px-4 py-14">
        <FaqSection faqs={serviceFaqs.slice(0, 3)} />
      </section>

      {/* Final CTA */}
      <section className="border-t border-stone-200 bg-emerald-800">
        <div className="mx-auto max-w-4xl px-4 py-12 text-center">
          <h2 className="text-2xl font-bold text-white">
            Have a job an agent should be doing?
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-emerald-100">
            Tell us the task and where you want it to run. Once your brief and hosting
            details are complete, we aim to send a scope and fixed quote within two business days.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-block rounded-lg bg-white px-5 py-3 text-sm font-semibold text-emerald-800 hover:bg-emerald-50"
          >
            Start the conversation
          </Link>
        </div>
      </section>

      <JsonLd data={jsonLd} />
    </main>
  );
}
