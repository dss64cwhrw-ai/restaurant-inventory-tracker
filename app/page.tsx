import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium text-stone-500">Project Overview</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900">
          Restaurant Inventory Tracker
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-stone-600 sm:text-base">
          This beginner-friendly project will help restaurant teams track
          inventory, monitor low stock, and organize prep work in one place.
          This stage only sets up the app shell so it is easy to expand later.
        </p>
        <p className="mt-3 text-sm text-stone-500">
          Authentication and database features will come later.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Link
          href="/dashboard"
          className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:border-stone-300"
        >
          <h2 className="text-lg font-semibold text-stone-900">Dashboard</h2>
          <p className="mt-2 text-sm text-stone-600">
            View a simple summary of inventory and prep activity.
          </p>
        </Link>

        <Link
          href="/inventory"
          className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:border-stone-300"
        >
          <h2 className="text-lg font-semibold text-stone-900">Inventory</h2>
          <p className="mt-2 text-sm text-stone-600">
            See where the inventory list and item management will live.
          </p>
        </Link>

        <Link
          href="/prep"
          className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:border-stone-300"
        >
          <h2 className="text-lg font-semibold text-stone-900">Prep</h2>
          <p className="mt-2 text-sm text-stone-600">
            Explore the future area for prep task tracking.
          </p>
        </Link>
      </section>
    </div>
  );
}
