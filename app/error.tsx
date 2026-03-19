"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-medium text-stone-500">Something went wrong</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900">
          This page could not load correctly
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-stone-600 sm:text-base">
          Try loading the page again. If the problem continues, double-check
          your environment variables and database connection.
        </p>

        <button
          type="button"
          onClick={() => reset()}
          className="mt-5 rounded-xl bg-stone-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-stone-700"
        >
          Try Again
        </button>
      </section>
    </div>
  );
}
