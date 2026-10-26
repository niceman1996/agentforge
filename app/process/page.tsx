import type { Metadata } from "next";
import Link from "next/link";
import { processSteps } from "@/lib/content";

export const metadata: Metadata = {
  title: "How We Work — Remote Setup on Your Systems",
  description:
    "From your brief and hardware review to remote installation, acceptance checks and handover. Fixed scope, customer-owned systems, and 14 days of bug-fix support.",
  alternates: { canonical: "/process" },
};

export default function ProcessPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 pb-8 pt-8">
      <h1 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
        How we work
      </h1>
      <p className="mt-3 max-w-2xl leading-relaxed text-stone-600">
        Five steps from your brief to a working setup on the agreed host. Routine updates
        happen by email and recorded video; remote installation sessions are arranged when needed.
      </p>

      <ol className="mt-8 space-y-4">
        {processSteps.map((p) => (
          <li
            key={p.title}
            className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm"
          >
            <h2 className="font-semibold text-stone-900">{p.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">{p.body}</p>
          </li>
        ))}
      </ol>

      <div className="mt-8 rounded-xl border border-emerald-200 bg-emerald-50 p-5">
        <h2 className="font-semibold text-emerald-900">Communication, concretely</h2>
        <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-emerald-900">
          <li>· Email and recorded video for routine updates; agreed remote sessions for installation.</li>
          <li>· We work UTC+8 and arrange installation times with you before requesting access.</li>
          <li>· Scope, price, delivery date, acceptance criteria and running costs are agreed in writing.</li>
        </ul>
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/contact"
          className="inline-block rounded-lg bg-emerald-700 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-800"
        >
          Start step 1 — it&apos;s one email
        </Link>
      </div>
    </main>
  );
}
