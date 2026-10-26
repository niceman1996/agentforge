import type { Metadata } from "next";
import Link from "next/link";
import { processSteps } from "@/lib/content";

export const metadata: Metadata = {
  title: "How We Work — Fixed Price, Async-First",
  description:
    "From your first email to delivery: written spec and fixed quote in 48 hours, weekly recorded updates, two weeks of included support. No status meetings.",
  alternates: { canonical: "/process" },
};

export default function ProcessPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 pb-8 pt-8">
      <h1 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
        How we work
      </h1>
      <p className="mt-3 max-w-2xl leading-relaxed text-stone-600">
        Five steps, none of them a meeting. The whole process is designed to run across
        time zones without slowing down.
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
          <li>· Email and recorded video only — no calls required to get a build done.</li>
          <li>· We work UTC+8 with strong overlap with European mornings; US East clients get end-of-day recorded updates.</li>
          <li>· Every promise (scope, price, date) is written in the spec — the spec is the contract.</li>
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
