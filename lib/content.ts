/**
 * All marketing copy lives here as data; pages only render it.
 * tests/site.test.ts checks the content structure before release.
 */

export type Service = {
  id: string;
  name: string;
  price: string;
  timeline: string;
  blurb: string;
  deployment: string;
  scope: string;
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
  { value: "from $999", label: "customer-hosted workflow setup" },
  { value: "2 business days", label: "to a quote after your brief is complete" },
  { value: "Your systems", label: "remote setup on your computer or server" },
  { value: "14 days", label: "bug-fix support after project handover" },
];

export const whyCards = [
  {
    title: "Fixed price, written spec",
    body: "You approve a one-page spec and a fixed number before we write a line of code. No hourly meters, no surprises at the end.",
  },
  {
    title: "Deployed on your systems",
    body: "We prioritize remote setup on a computer or server you own. Hardware, operating system and model requirements are checked before we quote. You receive the configuration and instructions to run it yourself.",
  },
  {
    title: "Async-first",
    body: "Email and recorded video keep the project moving across time zones. When installation needs it, we arrange a remote setup session with your approval. We work UTC+8.",
  },
];

export const services: Service[] = [
  {
    id: "custom-agent",
    name: "Self-Hosted AI Assistant",
    price: "from $1,500",
    timeline: "1–3 weeks after requirements and access are ready",
    blurb:
      "An assistant for one agreed task, such as answering questions from your documents, deployed remotely on your own computer or server.",
    deployment: "One customer-owned computer or server, with hardware and operating system agreed before quoting.",
    scope: "One use case, one agreed document collection and one interface. Data cleanup, extra integrations, additional users or machines, and public internet access are scoped separately. Fully offline models require a hardware and task review.",
    includes: [
      "Written scope, acceptance examples and fixed quote before work begins",
      "Remote installation, configuration and testing on the agreed host",
      "Two revision rounds within the agreed scope",
      "Run, restart and backup instructions, recorded handover, and 14 days of bug fixes",
    ],
  },
  {
    id: "workflow-automation",
    name: "Self-Hosted Workflow Automation",
    price: "from $999",
    timeline: "5–10 business days after requirements and access are ready",
    blurb:
      "One n8n workflow that removes a repetitive task, such as moving leads into a spreadsheet or preparing a report. Remote deployment on your systems is the default.",
    deployment: "Self-hosted n8n on one customer-owned computer or server. Make or another cloud platform is an optional alternative by agreement.",
    scope: "One workflow, one trigger and up to two connected tools using their existing integrations or APIs. Custom API development, extra workflows and additional deployment targets are quoted separately.",
    includes: [
      "Workflow map, written acceptance criteria and fixed quote",
      "Remote setup and connection to accounts controlled by you",
      "Basic error handling and success/failure checks with sample data",
      "Two revision rounds, recorded handover, and 14 days of bug fixes",
    ],
  },
  {
    id: "custom-gpt",
    name: "Custom GPT Setup — Cloud Option",
    price: "from $499",
    timeline: "3–5 business days after your content is ready",
    blurb:
      "A focused Custom GPT configured inside your ChatGPT account, using your instructions and supplied knowledge files. This is an optional cloud service.",
    deployment: "Inside your ChatGPT account; this package is cloud-hosted and does not run locally.",
    scope: "One GPT, one use case and one supplied knowledge collection, with one revision round. A standalone website, API actions, database connections and document cleanup require a separate quote.",
    includes: [
      "Written scope and fixed quote before configuration starts",
      "Instructions, conversation starters and supplied knowledge setup",
      "Checks against agreed example questions",
      "Recorded walkthrough and 14 days of fixes within the agreed scope",
    ],
  },
  {
    id: "care-plan",
    name: "Agent Care Plan",
    price: "from $199/mo",
    timeline: "monthly, optional, cancel before the next billing period",
    blurb:
      "A small maintenance allowance for an agreed assistant or workflow. The starting plan includes up to two hours of remote maintenance each month.",
    deployment: "Remote maintenance of the agreed installation, with access approved by you.",
    scope: "Up to two hours per month, including checks, fixes and small changes; unused time does not roll over. Extra hours and new features need a separate quote. No round-the-clock support or uptime guarantee is included.",
    includes: [
      "A scheduled health check within the monthly time allowance",
      "Small prompt, configuration or workflow adjustments within that allowance",
      "A short record of checks, changes and time used",
      "Email support during UTC+8 business days; additional work agreed before billing",
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
    body: "Email your goal, current tools, timeline and budget range. For local deployment, include the operating system and available hardware, whether the machine can stay on, and whether cloud model APIs are acceptable. Do not email passwords or API keys.",
  },
  {
    title: "2. Scope and hardware review",
    body: "After the brief and hosting details are complete, we aim to send a one-page scope and fixed quote within two business days. It names the deployment target, model choice, recurring costs, revision allowance and acceptance checks. Keep the initial scope and quote at no charge.",
  },
  {
    title: "3. We build",
    body: "We build against the agreed examples and send progress by email or recorded video. You enter account credentials directly in your own environment. Any temporary setup access is agreed before use.",
  },
  {
    title: "4. Remote installation and handover",
    body: "For self-hosted projects, we arrange remote setup on the agreed computer or server and run the acceptance checks there. You receive the configuration, source where applicable, restart and backup instructions, and a recorded walkthrough. Temporary access is removed after handover unless separately agreed for maintenance.",
  },
  {
    title: "5. Fourteen days of bug-fix support",
    body: "Project builds include 14 days of fixes for behavior that misses the agreed scope. New features, new integrations and changes to the deployment environment are quoted separately. Ongoing care is optional, from $199 per month for up to two hours of maintenance.",
  },
];

export const serviceFaqs: Faq[] = [
  {
    q: "How much does a custom GPT or AI agent cost?",
    a: "A self-hosted AI assistant starts at $1,500. A single self-hosted n8n workflow starts at $999. Optional cloud Custom GPT setup starts at $499. These are starting prices for the stated scope; after reviewing your requirements and hardware, we agree a fixed quote before any work starts.",
  },
  {
    q: "How long does a build take?",
    a: "Allow 1–3 weeks for a self-hosted assistant, 5–10 business days for one workflow, or 3–5 business days for a Custom GPT. The schedule starts once the required content, supported hardware and agreed access are ready. Your written quote confirms the delivery date.",
  },
  {
    q: "What if I'm not happy with the result?",
    a: "We agree acceptance examples and the revision allowance before work begins. Project builds include 14 days of bug fixes for behavior that misses that scope. Any payment, acceptance and refund terms are agreed in writing before the project starts; additional features need a separate quote.",
  },
  {
    q: "Who owns the work?",
    a: "You receive the custom code, prompts, workflow configuration and documentation created for your project. The installation and service accounts are under your control. Third-party software and models remain subject to their own licenses and service terms.",
  },
  {
    q: "Where does my data live?",
    a: "For self-hosted projects, the installation runs on your computer or server. That does not automatically make it fully offline: cloud model APIs and connected services receive the inputs needed for the agreed workflow. We document those data flows in the scope. You enter credentials directly, and any temporary remote access is agreed with you. NDAs are welcome.",
  },
  {
    q: "What time zone do you work in, and how do we communicate?",
    a: "We work UTC+8 and use email and recorded video for routine updates. When remote installation needs a shared session, we arrange a time with you in advance. The project quote sets the communication and handover schedule.",
  },
  {
    q: "Can everything run locally without a cloud model?",
    a: "Potentially, after reviewing the task, operating system, memory and available CPU or GPU. A suitable local model must be checked against your acceptance examples. Offline operation is agreed explicitly in the quote; it is not included automatically. Custom GPT and Make options use cloud platforms.",
  },
  {
    q: "What ongoing costs are separate from the project price?",
    a: "Hardware, hosting, model API usage, software licenses and third-party subscriptions are paid through your own accounts. We list the expected services and costs in the quote. A local host must stay powered and connected for scheduled or always-on workflows. The optional $199/month care plan includes up to two hours of maintenance; it does not include those running costs.",
  },
];
