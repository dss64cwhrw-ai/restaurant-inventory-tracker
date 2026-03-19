export default function Loading() {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium text-stone-500">Loading</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900">
          Loading your workspace
        </h1>
        <p className="mt-3 text-sm text-stone-600 sm:text-base">
          Please wait while the latest dashboard, inventory, or prep data is
          loaded.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[1, 2, 3].map((card) => (
          <div
            key={card}
            className="h-28 animate-pulse rounded-2xl border border-stone-200 bg-white shadow-sm"
          />
        ))}
      </section>
    </div>
  );
}
