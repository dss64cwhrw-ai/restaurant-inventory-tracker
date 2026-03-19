"use client";

export default function GlobalError({
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-stone-100 text-stone-900">
        <main className="mx-auto flex min-h-screen max-w-3xl items-center px-4 py-10 sm:px-6">
          <section className="w-full rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-medium text-stone-500">Something went wrong</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900">
              The app hit an unexpected error
            </h1>
            <p className="mt-3 text-sm text-stone-600 sm:text-base">
              Try loading the page again. If the problem continues, restart the
              dev server or double-check your environment variables.
            </p>

            <button
              type="button"
              onClick={() => unstable_retry()}
              className="mt-5 rounded-xl bg-stone-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-stone-700"
            >
              Try Again
            </button>
          </section>
        </main>
      </body>
    </html>
  );
}
