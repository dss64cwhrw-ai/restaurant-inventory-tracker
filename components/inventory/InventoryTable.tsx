"use client";

import StockStatusBadge from "@/components/inventory/StockStatusBadge";
import type { InventoryItem } from "@/types/inventory";

type InventoryTableProps = {
  deletingItemId: number | null;
  items: InventoryItem[];
  onEditItem: (item: InventoryItem) => void;
  onDeleteItem: (itemId: number) => Promise<void>;
};

export default function InventoryTable({
  deletingItemId,
  items,
  onEditItem,
  onDeleteItem,
}: InventoryTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-stone-200">
          <thead className="bg-stone-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-stone-500">
                Item
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-stone-500">
                Category
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-stone-500">
                Quantity
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-stone-500">
                Low Stock At
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-stone-500">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-stone-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-stone-50">
                <td className="px-4 py-4 text-sm font-medium text-stone-900">
                  {item.name}
                </td>
                <td className="px-4 py-4 text-sm text-stone-600">
                  {item.category}
                </td>
                <td className="px-4 py-4 text-sm text-stone-600">
                  {item.quantity} {item.unit}
                </td>
                <td className="px-4 py-4 text-sm text-stone-600">
                  {item.lowStockThreshold} {item.unit}
                </td>
                <td className="px-4 py-4 text-sm text-stone-600">
                  <StockStatusBadge
                    quantity={item.quantity}
                    lowStockThreshold={item.lowStockThreshold}
                  />
                </td>
                <td className="px-4 py-4 text-sm text-stone-600">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => onEditItem(item)}
                      disabled={deletingItemId === item.id}
                      className="rounded-lg border border-stone-300 px-3 py-1.5 text-xs font-medium text-stone-700 transition hover:bg-stone-100"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => void onDeleteItem(item.id)}
                      disabled={deletingItemId === item.id}
                      className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-700 transition hover:bg-red-50"
                    >
                      {deletingItemId === item.id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
