import { getInventorySummary } from "@/lib/inventory";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const summary = await getInventorySummary();
  const summaryCards = [
    { label: "Total Items", value: summary.totalItems.toString() },
    { label: "Low Stock Items", value: summary.lowStockItems.toString() },
    { label: "Open Prep Tasks", value: "4" },
  ];

  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-3xl font-semibold tracking-tight text-stone-900">
          Dashboard
        </h1>
        <p className="mt-2 text-sm text-stone-600 sm:text-base">
          A simple overview of the inventory tracker will live here.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {summaryCards.map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm font-medium text-stone-500">{card.label}</p>
            <p className="mt-3 text-3xl font-semibold text-stone-900">
              {card.value}
            </p>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-dashed border-stone-300 bg-stone-50 p-5">
        <p className="text-sm text-stone-600">
          Inventory totals now come from the database through Prisma. Prep
          tasks are still placeholder content for this stage.
        </p>
      </section>
    </div>
  );
}
