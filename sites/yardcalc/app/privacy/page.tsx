import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "YardCalc privacy policy — what we collect (very little) and why.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 pb-8 pt-6">
      <h1 className="text-3xl font-bold tracking-tight text-stone-900">Privacy Policy</h1>
      <p className="mt-2 text-sm text-stone-400">Last updated: October 25, 2026</p>
      <div className="mt-4 space-y-4 leading-relaxed text-stone-600">
        <h2 className="text-xl font-bold text-stone-900">The short version</h2>
        <p>
          YardCalc is a static website. All calculations run in your browser. We do not
          collect, store, or transmit the measurements or numbers you enter into any
          calculator.
        </p>
        <h2 className="text-xl font-bold text-stone-900">What we do not do</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>No user accounts and no login.</li>
          <li>No contact forms that send personal data to servers we control.</li>
          <li>No sale or sharing of personal information.</li>
        </ul>
        <h2 className="text-xl font-bold text-stone-900">Analytics</h2>
        <p>
          We may use privacy-friendly, aggregate web analytics that do not use cookies and
          do not identify individual visitors. This measures overall page popularity only.
        </p>
        <h2 className="text-xl font-bold text-stone-900">Advertising</h2>
        <p>
          If advertising appears on this site in the future, it may be served by third
          parties (such as Google) who may use cookies subject to their own policies. We
          will update this page before that happens, along with any cookie controls
          required by law.
        </p>
        <h2 className="text-xl font-bold text-stone-900">Children&apos;s privacy</h2>
        <p>
          This site is directed at adults planning home improvement projects and is not
          directed at children under 13.
        </p>
        <h2 className="text-xl font-bold text-stone-900">Contact</h2>
        <p>Questions about this policy? See the Contact page.</p>
      </div>
    </main>
  );
}
