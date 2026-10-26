"use client";

import { useState } from "react";

const assistantExamples = [
  {
    question: "How many paid vacation days do I get?",
    answer:
      "The sample handbook provides 15 paid vacation days per year. It allows up to 5 unused days to carry over.",
    source: "Sample employee handbook · Time off · page 8",
  },
  {
    question: "Who approves an expense over $500?",
    answer:
      "The sample policy says expenses over $500 need approval from a department manager before purchase.",
    source: "Sample employee handbook · Expenses · page 12",
  },
];

const workflowExample = {
  request:
    "When an invoice is marked approved, add its details to our finance sheet and ask me to review it.",
  steps: [
    { title: "Trigger", body: "Invoice status changes to approved" },
    { title: "Check", body: "Confirm vendor, amount and invoice number" },
    { title: "Prepare", body: "Draft a row for the finance sheet" },
    { title: "Review", body: "Show you the draft before any write is made" },
  ],
};

export function KnowledgeAssistantPreview() {
  const [activeExample, setActiveExample] = useState(0);
  const example = assistantExamples[activeExample];

  return (
    <section className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
      <div className="border-b border-stone-200 bg-stone-50 px-5 py-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700">
              In-house preview 01
            </p>
            <h2 className="mt-1 text-xl font-bold text-stone-900">
              Answers grounded in your documents
            </h2>
          </div>
          <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-stone-600 ring-1 ring-stone-200">
            Local deployment concept
          </span>
        </div>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-stone-600">
          A team member asks a question. The assistant answers from an approved handbook
          and points back to the source.
        </p>
      </div>

      <div className="grid gap-5 p-5 sm:grid-cols-[0.9fr_1.1fr] sm:p-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
            Try a sample question
          </p>
          <div className="mt-3 space-y-2">
            {assistantExamples.map((item, index) => (
              <button
                key={item.question}
                type="button"
                aria-pressed={activeExample === index}
                onClick={() => setActiveExample(index)}
                className={`w-full rounded-xl border p-3 text-left text-sm leading-relaxed transition ${
                  activeExample === index
                    ? "border-emerald-700 bg-emerald-50 text-emerald-950"
                    : "border-stone-200 bg-white text-stone-700 hover:border-emerald-400"
                }`}
              >
                {item.question}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-stone-900 p-4 text-white sm:p-5" aria-live="polite">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300">
            Sample conversation
          </p>
          <p className="mt-3 rounded-xl bg-white/10 p-3 text-sm text-stone-100">
            {example.question}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-stone-100">{example.answer}</p>
          <p className="mt-4 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs text-emerald-200">
            Source · {example.source}
          </p>
        </div>
      </div>

      <p className="border-t border-stone-100 px-5 py-3 text-xs leading-relaxed text-stone-500 sm:px-6">
        Scripted interface preview using fictional policy text. No AI model or client system
        is connected. A production build uses the agreed model, documents and host.
      </p>
    </section>
  );
}

export function WorkflowPreview() {
  const [showPlan, setShowPlan] = useState(false);

  return (
    <section className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
      <div className="border-b border-stone-200 bg-stone-50 px-5 py-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700">
              In-house preview 02
            </p>
            <h2 className="mt-1 text-xl font-bold text-stone-900">
              A workflow with a review step
            </h2>
          </div>
          <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-stone-600 ring-1 ring-stone-200">
            Self-hosted n8n concept
          </span>
        </div>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-stone-600">
          Start with an approved invoice, check its key fields, prepare a spreadsheet entry,
          then pause for a person to review it.
        </p>
      </div>

      <div className="p-5 sm:p-6">
        <div className="rounded-xl border border-stone-200 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
            Example request
          </p>
          <p className="mt-2 text-sm leading-relaxed text-stone-800">“{workflowExample.request}”</p>
        </div>

        <ol className="mt-4 grid gap-2 sm:grid-cols-4">
          {workflowExample.steps.map((step, index) => (
            <li key={step.title} className="relative rounded-xl bg-emerald-50 p-3">
              <span className="text-xs font-bold text-emerald-700">0{index + 1}</span>
              <h3 className="mt-2 text-sm font-semibold text-stone-900">{step.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-stone-600">{step.body}</p>
            </li>
          ))}
        </ol>

        <button
          type="button"
          aria-expanded={showPlan}
          onClick={() => setShowPlan((visible) => !visible)}
          className="mt-4 rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800"
        >
          {showPlan ? "Hide sample handoff" : "Preview the handoff"}
        </button>

        {showPlan ? (
          <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4" aria-live="polite">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-800">
              Draft for human review
            </p>
            <p className="mt-2 text-sm leading-relaxed text-stone-800">
              Invoice status: approved · Required fields: vendor, amount, invoice number ·
              Proposed action: prepare one finance-sheet row · Next: review the draft before writing
            </p>
          </div>
        ) : null}
      </div>

      <p className="border-t border-stone-100 px-5 py-3 text-xs leading-relaxed text-stone-500 sm:px-6">
        Illustrative workflow only. The button reveals a sample handoff; it does not connect
        to n8n, a spreadsheet or any client account.
      </p>
    </section>
  );
}
