import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-4xl px-4 pb-8 pt-16 text-center">
      <h1 className="text-4xl font-bold text-stone-900">Page not found</h1>
      <p className="mt-3 text-stone-600">
        The calculator you&apos;re looking for doesn&apos;t exist (yet).
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-lg bg-emerald-700 px-5 py-2.5 font-medium text-white hover:bg-emerald-800"
      >
        Browse all calculators
      </Link>
    </main>
  );
}
