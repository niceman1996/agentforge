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
          Client engagements run on infrastructure you own (for example your own n8n, OpenAI
          or Anthropic accounts); credentials stay with you and never pass through us.
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
