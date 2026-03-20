import StockStatusBadge from "@/components/inventory/StockStatusBadge";
import { compareInventoryUrgency } from "@/lib/inventory-status";
import type { InventoryItem } from "@/types/inventory";

type LowStockAlertsProps = {
  emptyMessage: string;
  items: InventoryItem[];
  title: string;
};

export default function LowStockAlerts({
  emptyMessage,
  items,
  title,
}: LowStockAlertsProps) {
  const alertItems = [...items]
    .sort((itemA, itemB) =>
      compareInventoryUrgency(
        itemA.quantity,
        itemA.lowStockThreshold,
        itemB.quantity,
        itemB.lowStockThreshold,
      ),
    )
    .slice(0, 5);

  return (
    <section
      aria-labelledby="low-stock-alerts-title"
      className="section-card rounded-[1.75rem] p-5"
    >
      <div>
        <h2
          id="low-stock-alerts-title"
          className="text-lg font-semibold text-stone-900"
        >
          {title}
        </h2>
        <p className="mt-1 text-sm text-stone-600">
          Items here need attention soon because their stock is at or below the
          low-stock threshold.
        </p>
      </div>

      {alertItems.length > 0 ? (
        <ul className="mt-5 space-y-3">
          {alertItems.map((item) => (
            <li
              key={item.id}
              className="rounded-[1.4rem] border border-[rgba(137,98,66,0.12)] bg-[rgba(255,247,237,0.62)] p-4"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-stone-900">
                    {item.name}
                  </p>
                  <p className="mt-1 text-sm text-stone-600">
                    {item.category}
                  </p>
                  <p className="mt-2 text-sm text-stone-600">
                    Current: {item.quantity} {item.unit}
                  </p>
                  <p className="text-sm text-stone-600">
                    Low stock at: {item.lowStockThreshold} {item.unit}
                  </p>
                </div>

                <div className="sm:text-right">
                  <StockStatusBadge
                    quantity={item.quantity}
                    lowStockThreshold={item.lowStockThreshold}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div
          aria-live="polite"
          className="surface-muted mt-5 rounded-[1.4rem] border-dashed p-5"
        >
          <p className="text-sm text-stone-600">{emptyMessage}</p>
        </div>
      )}
    </section>
  );
}
