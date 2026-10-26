import type { Metadata } from "next";
import Link from "next/link";
import { FaqSection } from "@/components/site-ui";
import { services, serviceFaqs } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services & Pricing — Self-Hosted AI & Remote Setup",
  description:
    "Self-hosted AI assistants from $1,500, n8n workflows from $999, optional cloud GPT setup from $499, and maintenance from $199/mo. Remote setup on your systems.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 pb-8 pt-8">
      <h1 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
        Services &amp; pricing
      </h1>
      <p className="mt-3 max-w-2xl leading-relaxed text-stone-600">
        We prioritize remote deployment on your own computer or server. All prices are
        in USD and are starting prices for the scope below. Once your brief and hosting
        details are complete, we aim to send a written scope and fixed quote within two
        business days. Cloud options are available when they fit your requirements.
      </p>

      <div className="mt-8 space-y-6">
        {services.map((s) => (
          <section
            key={s.id}
            className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-xl font-bold text-stone-900">{s.name}</h2>
              <p className="text-lg font-bold text-emerald-700">{s.price}</p>
            </div>
            <p className="mt-1 text-sm font-medium text-stone-500">{s.timeline}</p>
            <p className="mt-3 leading-relaxed text-stone-600">{s.blurb}</p>
            <p className="mt-3 text-sm leading-relaxed text-stone-600">
              <strong className="text-stone-800">Deployment:</strong> {s.deployment}
            </p>
            <ul className="mt-4 space-y-2">
              {s.includes.map((inc) => (
                <li key={inc} className="flex gap-2 text-sm leading-relaxed text-stone-700">
                  <span aria-hidden="true" className="font-bold text-emerald-700">
                    ✓
                  </span>
                  {inc}
                </li>
              ))}
            </ul>
            <p className="mt-4 rounded-lg bg-stone-50 p-3 text-sm leading-relaxed text-stone-600">
              <strong className="text-stone-800">Scope &amp; limits:</strong> {s.scope}
            </p>
          </section>
        ))}
      </div>

      <section className="mt-8 rounded-xl border border-stone-200 bg-white p-6">
        <h2 className="text-xl font-bold text-stone-900">Local deployment and running costs</h2>
        <p className="mt-3 leading-relaxed text-stone-600">
          Installation on one supported host is included in the self-hosted project quote.
          Hardware purchases, hosting, model API usage, software licenses and subscriptions
          are paid by you through your own accounts. We list the expected services and costs
          before work starts.
        </p>
        <p className="mt-3 leading-relaxed text-stone-600">
          Local hosting can still use cloud model APIs. Fully offline inference requires a
          hardware and task review and must be agreed in the quote. For scheduled or always-on
          workflows, your host needs to stay powered and connected.
        </p>
      </section>

      <div className="mt-8 rounded-xl bg-emerald-50 px-5 py-6 text-center">
        <p className="font-semibold text-emerald-900">
          Not sure which bucket your job falls into?
        </p>
        <p className="mt-1 text-sm text-emerald-800">
          Describe it anyway — the spec we send back will name the right shape and price.
        </p>
        <Link
          href="/contact"
          className="mt-4 inline-block rounded-lg bg-emerald-700 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-800"
        >
          Get a fixed-price quote
        </Link>
      </div>

      <FaqSection faqs={serviceFaqs} />
    </main>
  );
}
