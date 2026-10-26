import type { Metadata } from "next";
import Link from "next/link";
import { FaqSection } from "@/components/site-ui";
import { services, serviceFaqs } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services & Pricing — Custom GPTs from $499",
  description:
    "Custom AI agents and GPTs from $499 (5–10 day delivery), n8n / Make workflow automation from $999, care plans from $199/mo. Fixed price with a written spec before any work starts.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 pb-8 pt-8">
      <h1 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
        Services &amp; pricing
      </h1>
      <p className="mt-3 max-w-2xl leading-relaxed text-stone-600">
        Every engagement starts the same way: a written spec and a fixed quote within 48
        hours of your first email. The prices below are floors, not estimates — most
        single-agent builds land between $500 and $2,000.
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
          </section>
        ))}
      </div>

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
