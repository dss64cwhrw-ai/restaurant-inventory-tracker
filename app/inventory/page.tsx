import InventoryManager from "@/components/inventory/InventoryManager";
import { getInventoryItems } from "@/lib/inventory";

export const dynamic = "force-dynamic";

export default async function InventoryPage() {
  const items = await getInventoryItems();

  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-3xl font-semibold tracking-tight text-stone-900">
          Inventory
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-stone-600 sm:text-base">
          This page now loads inventory items from the database. Search,
          filters, and CRUD actions still stay simple and beginner-friendly.
        </p>
      </section>

      <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
        <div>
          <h2 className="text-lg font-semibold text-stone-900">
            Current Inventory
          </h2>
          <p className="mt-1 text-sm text-stone-600">
            Low-stock items are highlighted so they are easy to spot.
          </p>
        </div>
      </section>

      <InventoryManager initialItems={items} />

      <section className="rounded-2xl border border-dashed border-stone-300 bg-stone-50 p-5">
        <p className="text-sm text-stone-600">
          Inventory changes now save to PostgreSQL through Prisma and stay after
          refresh.
        </p>
      </section>
    </div>
  );
}
