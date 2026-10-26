import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "AgentForge privacy policy: this site is static, sets no cookies and runs no tracking.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 pb-8 pt-8">
      <h1 className="text-3xl font-bold tracking-tight text-stone-900">Privacy policy</h1>
      <div className="mt-4 space-y-4 leading-relaxed text-stone-600">
        <p>
          This website is a static site: it sets no cookies, runs no analytics, and loads
          no third-party tracking scripts. We do not collect personal data through the
          site itself.
        </p>
        <p>
          If you email us, we keep your message and address only to reply and, if you
          become a client, to deliver the work. We never sell or share your information.
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
