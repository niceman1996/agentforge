import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Get a Fixed-Price Quote",
  description:
    "Describe your goal, tools, hosting hardware and budget. Get a scope and fixed quote after a deployment review. Remote setup on your own computer or server.",
  alternates: { canonical: "/contact" },
};

const mailBody = [
  "Goal — what should the agent or automation do?",
  "",
  "Current tools — CRM, inbox, spreadsheets, anything it must connect to:",
  "",
  "Deployment host — your computer or server, operating system, RAM, and GPU if known:",
  "",
  "Can this host stay on when the workflow needs to run?",
  "",
  "Model preference — fully local/offline, or cloud API acceptable?",
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
        Tell us the task and where you want it to run. We prioritize remote setup on your
        own computer or server. Once your brief and hosting details are complete, we aim
        to send a one-page scope and fixed quote within two business days. Keep the initial
        scope and quote at no charge.
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
            <strong className="text-stone-800">Deployment host.</strong> Your computer or
            server, operating system, available RAM or GPU if known, and whether it can stay on.
          </li>
          <li>
            <strong className="text-stone-800">Model preference.</strong> Fully local/offline,
            or cloud APIs acceptable. We check hardware suitability before promising offline operation.
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
        NDAs welcome before any detail is shared. We work {site.timezone}, weekdays.
        Please do not email passwords, API keys or sensitive documents; setup access and
        a suitable way to share project data are agreed separately.
      </p>
    </main>
  );
}
