import { auth } from "@clerk/nextjs/server";
import InventoryManager from "@/components/inventory/InventoryManager";
import { getInventoryItems } from "@/lib/inventory";

export const dynamic = "force-dynamic";

export default async function InventoryPage() {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) {
    return redirectToSignIn();
  }

  const items = await getInventoryItems(userId);

  return (
    <div className="space-y-6">
      <section className="surface-panel-strong section-block">
        <p className="pill-label">Protected Workspace</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-stone-950 [font-family:var(--font-fraunces)]">
          Inventory
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-stone-600 sm:text-base">
          This page loads only your inventory items from the database. Search,
          filters, and CRUD actions still stay simple and beginner-friendly.
        </p>
      </section>

      <section className="surface-panel rounded-[1.75rem] p-5">
        <div>
          <h2 className="text-lg font-semibold text-stone-900">
            Current Inventory
          </h2>
          <p className="mt-1 text-sm text-stone-600">
            Low-stock items now appear more clearly with summary cards, alert
            lists, and stronger stock-status labels.
          </p>
        </div>
      </section>

      <InventoryManager initialItems={items} />

      <section className="surface-muted rounded-[1.75rem] border-dashed p-5">
        <p className="text-sm text-stone-600">
          Inventory changes now save to PostgreSQL through Prisma and stay after
          refresh.
        </p>
      </section>
    </div>
  );
}
