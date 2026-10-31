import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "AgentForge privacy policy, including its use of Google Analytics to measure site visits.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 pb-8 pt-8">
      <h1 className="text-3xl font-bold tracking-tight text-stone-900">Privacy policy</h1>
      <div className="mt-4 space-y-4 leading-relaxed text-stone-600">
        <p>
          This is a static website. It has no user accounts or contact form, and we do
          not ask you to submit personal information through the site.
        </p>
        <h2 className="text-xl font-semibold text-stone-900">Analytics and cookies</h2>
        <p>
          We use Google Analytics to measure page views and understand how visitors use
          this site. The page-view events include the page URL, path and title. Google
          may also collect usage and device information and use cookies. We do not add
          contact details or service request content to analytics events. For details on
          Google&apos;s data handling, see the{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-700 hover:underline"
          >
            Google Privacy Policy
          </a>
          .
        </p>
        <p>
          If you email us, we keep your message and address only to reply and, if you
          become a client, to deliver the work. We do not sell your message or address.
        </p>
        <p>
          We prioritize remote setup on a computer or server you own. You enter account
          credentials directly in your own environment. Any temporary remote access is
          agreed before use and removed after handover unless maintenance access is separately agreed.
        </p>
        <p>
          A locally hosted installation may still send inputs to a cloud model API or a
          connected service. The project scope identifies those services and data flows.
          Fully offline operation must be agreed explicitly after reviewing your hardware
          and task. Optional Custom GPT and Make setups use cloud platforms.
        </p>
        <p>
          This site is hosted on GitHub Pages; GitHub&apos;s handling of request logs is
          covered by{" "}
          <a
            href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-700 hover:underline"
          >
            GitHub&apos;s privacy statement
          </a>
          .
        </p>
        <p>
          Questions or requests: <span className="font-medium text-stone-800">{site.email}</span>.
        </p>
      </div>
    </main>
  );
}
