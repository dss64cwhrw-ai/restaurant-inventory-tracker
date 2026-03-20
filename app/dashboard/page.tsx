import { auth } from "@clerk/nextjs/server";
import LowStockAlerts from "@/components/inventory/LowStockAlerts";
import { getLowStockItems } from "@/lib/inventory-status";
import { getInventoryItems, getInventorySummary } from "@/lib/inventory";
import { getPrepSummary } from "@/lib/prep";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) {
    return redirectToSignIn();
  }

  const summary = await getInventorySummary(userId);
  const inventoryItems = await getInventoryItems(userId);
  const lowStockItems = getLowStockItems(inventoryItems);
  const prepSummary = await getPrepSummary(userId);
  const hasAnyData = summary.totalItems > 0 || prepSummary.totalTasks > 0;
  const summaryCards = [
    { label: "Total Items", value: summary.totalItems.toString() },
    { label: "Low Stock Items", value: summary.lowStockItems.toString() },
    { label: "Critical Items", value: summary.criticalItems.toString() },
    { label: "Open Prep Tasks", value: prepSummary.openTasks.toString() },
  ];

  return (
    <div className="space-y-6">
      <section className="surface-panel-strong section-block">
        <p className="pill-label">Protected Overview</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-stone-950 [font-family:var(--font-fraunces)]">
          Dashboard
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-stone-600 sm:text-base">
          Review your current inventory health, low-stock risk, and prep task
          progress in one place.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <div
            key={card.label}
            className="metric-card rounded-[1.75rem] p-5"
          >
            <p className="text-sm font-medium text-stone-500">{card.label}</p>
            <p className="mt-3 text-3xl font-semibold text-stone-950">
              {card.value}
            </p>
          </div>
        ))}
      </section>

      {!hasAnyData ? (
        <section className="surface-panel rounded-[1.75rem] border-dashed p-8 text-center">
          <h2 className="text-lg font-semibold text-stone-900">
            Your dashboard is ready
          </h2>
          <p className="mt-2 text-sm text-stone-600">
            Add your first inventory item or prep task to start seeing live
            dashboard summaries.
          </p>
        </section>
      ) : null}

      <LowStockAlerts
        emptyMessage="You do not have any low stock inventory alerts right now."
        items={lowStockItems}
        title="Low Stock Alert"
      />

      <section className="surface-muted rounded-[1.75rem] border-dashed p-5">
        <p className="text-sm text-stone-600">
          Inventory risk and prep totals come from the database through Prisma
          and stay scoped to the signed-in user.
        </p>
      </section>
    </div>
  );
}
