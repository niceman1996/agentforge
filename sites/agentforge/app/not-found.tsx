import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you were looking for does not exist.",
};

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-4 pb-8 pt-16 text-center">
      <h1 className="text-3xl font-bold tracking-tight text-stone-900">
        Page not found
      </h1>
      <p className="mt-3 text-stone-600">
        Even our factory makes the occasional wrong turn.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-lg bg-emerald-700 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-800"
      >
        Back to the homepage
      </Link>
    </main>
  );
}
