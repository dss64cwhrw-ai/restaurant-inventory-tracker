import Link from "next/link";

export default function NotFound() {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-medium text-stone-500">404</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900">
          Page not found
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-stone-600 sm:text-base">
          The page you were looking for does not exist or may have been moved.
          You can head back to the home page or jump into the app sections
          below.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-xl bg-stone-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-stone-700"
          >
            Go Home
          </Link>
          <Link
            href="/dashboard"
            prefetch={false}
            className="rounded-xl border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-100"
          >
            Open Dashboard
          </Link>
        </div>
      </section>
    </div>
  );
}
