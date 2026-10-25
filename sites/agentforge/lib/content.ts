/**
 * All marketing copy lives here as data; pages only render it.
 * tests/site.test.ts asserts the shape of every collection, so broken copy
 * (missing price, empty step, dead link) fails the build rather than shipping.
 */

export type Service = {
  id: string;
  name: string;
  price: string;
  timeline: string;
  blurb: string;
  includes: string[];
};

export type CaseStudy = {
  id: string;
  title: string;
  summary: string;
  details: string[];
  metrics: string[];
  href?: string;
};

export type ProcessStep = {
  title: string;
  body: string;
};

export type Faq = { q: string; a: string };

export const heroStats = [
  { value: "from $499", label: "fixed price, agreed up front" },
  { value: "48 hours", label: "to a written spec & fixed quote" },
  { value: "5–10 days", label: "typical agent delivery" },
  { value: "2 weeks", label: "support included with every build" },
];

export const whyCards = [
  {
    title: "Fixed price, written spec",
    body: "You approve a one-page spec and a fixed number before we write a line of code. No hourly meters, no surprises at the end.",
  },
  {
    title: "Factory speed",
    body: "We build with our own agent factory: research, implementation, tests and deploys run on one production line. What takes an agency a month takes us days — the calculator network in our work section shipped this way.",
  },
  {
    title: "Async-first",
    body: "No status meetings, ever. Email and recorded video updates on your schedule. We work UTC+8 with strong overlap with European mornings.",
  },
];

export const services: Service[] = [
  {
    id: "custom-agent",
    name: "Custom AI Agent / GPT",
    price: "from $499",
    timeline: "5–10 business days",
    blurb:
      "A production assistant built around your knowledge and your workflows — internal copilots, customer-facing bots, or custom GPTs grounded in your documentation.",
    includes: [
      "Written spec and fixed quote before any work starts",
      "Knowledge sourcing: your docs, FAQs, product and pricing data",
      "Prompt and guardrail design with a bank of test conversations",
      "Deployment (Custom GPT, web app, or API) plus a recorded walkthrough",
    ],
  },
  {
    id: "workflow-automation",
    name: "Workflow Automation",
    price: "from $999",
    timeline: "1–3 weeks",
    blurb:
      "n8n / Make pipelines that connect your CRM, inbox, spreadsheets and databases, with AI steps exactly where they pay for themselves — lead enrichment, report generation, content pipelines.",
    includes: [
      "Process audit: we map the workflow on paper before automating it",
      "Build and testing on your accounts — you keep every credential",
      "Error handling, retries and monitoring alerts",
      "Documentation and a recorded handover your team can replay",
    ],
  },
  {
    id: "care-plan",
    name: "Agent Care Plan",
    price: "from $199/mo",
    timeline: "ongoing, cancel monthly",
    blurb:
      "Agents drift as your data, offers and the underlying models change. The care plan keeps what we built (or what you already run) working.",
    includes: [
      "Monthly health check and fix of breakages",
      "Prompt updates when your offers or documentation change",
      "Model upgrade evaluations — new models land constantly",
      "Monthly report: usage, incidents, and hours saved",
    ],
  },
];

export const cases: CaseStudy[] = [
  {
    id: "yardcalc",
    title: "YardCalc — a 17-tool calculator network, shipped end-to-end",
    summary:
      "A public DIY material-calculator site: 17 calculators with verified 2026 US pricing, automated tests, and a hands-free deploy pipeline.",
    details: [
      "Research, price-data verification, implementation, tests and deployment all ran on our agent production line — humans reviewed and signed off on every number.",
      "Every calculator is backed by unit tests (39 and counting) and every rendered page passes an automated smoke test before it can go live.",
      "Live and serving at niceman1996.github.io/yardcalc.",
    ],
    metrics: ["17 tools live", "39 automated tests green", "2026 pricing data, source-verified"],
    href: "https://niceman1996.github.io/yardcalc/",
  },
  {
    id: "agentforge",
    title: "AgentForge — the site you are reading",
    summary:
      "This website was specified, written, built, tested and deployed by the same factory in a single working day.",
    details: [
      "It ships with content-contract tests (missing prices or empty sections fail the build), a sitemap, structured data and a rendered-page smoke test.",
      "A website that sells the factory should be factory-made. This one is.",
    ],
    metrics: ["Built in 1 working day", "Content locked by automated tests", "Static, fast, no tracking"],
  },
  {
    id: "factory",
    title: "The agent factory itself",
    summary:
      "Our internal production line: spec-driven, gated, and reviewed by humans at every handoff.",
    details: [
      "Every deliverable starts as a written spec — no work begins without one, including for internal tools.",
      "Automated gates at each stage: unit tests, smoke tests on rendered pages, and verification against the live deployment.",
      "Human review signs off on every deliverable before it reaches a client or the public internet.",
    ],
    metrics: ["Spec-first production", "Automated quality gates", "Human sign-off on every deliverable"],
  },
];

export const processSteps: ProcessStep[] = [
  {
    title: "1. Tell us the job",
    body: "Email us what you want automated or built: the goal, the tools you already use, your timeline and a budget range. Ten minutes of writing is enough — a rough description is a fine starting point.",
  },
  {
    title: "2. Fixed-price spec in 48 hours",
    body: "You get back a one-page spec and a fixed quote. If you don't like either, keep the spec and walk away — no charge, no hard feelings.",
  },
  {
    title: "3. We build",
    body: "You receive a short recorded video update once a week showing working progress — not slideware. Questions go by email; nothing needs a meeting.",
  },
  {
    title: "4. Delivery & walkthrough",
    body: "You get the working agent or workflow, written documentation, and a recorded demo you can replay and share with your team.",
  },
  {
    title: "5. Two weeks of support included",
    body: "Fixes and tuning are on us for two weeks after delivery. After that, the care plan keeps things healthy if you want it — cancel monthly.",
  },
];

export const serviceFaqs: Faq[] = [
  {
    q: "How much does a custom GPT or AI agent cost?",
    a: "Most single-purpose agents land between $500 and $2,000 — in line with what the freelance market pays for this work. You always get a fixed quote after a written spec, before any work starts, so the number is never a surprise.",
  },
  {
    q: "How long does a build take?",
    a: "Simple agents ship in 5–10 business days. Workflow automations take 1–3 weeks depending on how many systems they connect. The spec you get in step 2 includes the delivery date.",
  },
  {
    q: "What if I'm not happy with the result?",
    a: "You approve the spec first, so surprises are rare. Every build includes two weeks of fixes. If a deliverable misses the agreed spec, we fix it or refund it — the spec is the contract.",
  },
  {
    q: "Who owns the work?",
    a: "You do. Code, prompts and documentation are handed over in full. Automations run on your own accounts, so there is no lock-in: you can maintain everything yourself or hand it to anyone else.",
  },
  {
    q: "Where does my data live?",
    a: "In your accounts. We build against infrastructure you own — your OpenAI or Anthropic account, your n8n or Make subscription. Credentials never pass through us, and we're happy to sign an NDA before the spec.",
  },
  {
    q: "What time zone do you work in, and how do we communicate?",
    a: "We work UTC+8, with strong overlap with European mornings. All communication is async-first — email and recorded video — so the ocean between us never slows the project down.",
  },
];
