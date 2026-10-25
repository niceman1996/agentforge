import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Get a Fixed-Price Quote",
  description:
    "Describe the job in one email — goal, tools, timeline, budget range. You get a written spec and a fixed quote within 48 hours. Keep the spec either way.",
  alternates: { canonical: "/contact" },
};

const mailBody = [
  "Goal — what should the agent or automation do?",
  "",
  "Current tools — CRM, inbox, spreadsheets, anything it must connect to:",
  "",
  "Timeline — when do you need it live:",
  "",
  "Budget range — even a rough number helps:",
].join("\n");

const mailto = `mailto:${site.email}?subject=${encodeURIComponent(
  "Agent project inquiry",
)}&body=${encodeURIComponent(mailBody)}`;

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 pb-8 pt-8">
      <h1 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
        Get a fixed-price quote
      </h1>
      <p className="mt-3 leading-relaxed text-stone-600">
        One email starts the whole thing. Within 48 hours you&apos;ll have a one-page spec
        and a fixed quote. If you don&apos;t like them, keep the spec and walk away — no
        charge, no follow-up pestering.
      </p>

      <a
        href={mailto}
        className="mt-6 inline-block rounded-lg bg-emerald-700 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-800"
      >
        Email {site.email}
      </a>

      <section className="mt-8 rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
        <h2 className="font-semibold text-stone-900">What to include (template inside)</h2>
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-stone-600">
          <li>
            <strong className="text-stone-800">Goal.</strong> What should the agent or
            automation do? One sentence is enough to start.
          </li>
          <li>
            <strong className="text-stone-800">Current tools.</strong> The CRM, inbox,
            spreadsheets or databases it needs to touch.
          </li>
          <li>
            <strong className="text-stone-800">Timeline.</strong> When you need it live.
          </li>
          <li>
            <strong className="text-stone-800">Budget range.</strong> Even a rough number
            keeps the spec realistic — no anchoring games.
          </li>
        </ul>
        <p className="mt-4 text-xs leading-relaxed text-stone-400">
          The button above opens your mail app with this template pre-filled. Prefer plain
          text? Write anything at all — a rough description is a fine starting point.
        </p>
      </section>

      <p className="mt-6 text-sm leading-relaxed text-stone-500">
        NDAs welcome before any detail is shared. We reply to every inquiry within 48
        hours, {site.timezone}, weekdays.
      </p>
    </main>
  );
}
