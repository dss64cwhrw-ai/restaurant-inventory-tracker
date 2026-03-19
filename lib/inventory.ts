import { prisma } from "@/lib/prisma";
import type { InventoryItem } from "@/types/inventory";

export async function getInventoryItems(): Promise<InventoryItem[]> {
  const items = await prisma.inventoryItem.findMany({
    orderBy: {
      id: "asc",
    },
  });

  return items.map((item) => ({
    id: item.id,
    name: item.name,
    category: item.category,
    quantity: item.quantity,
    unit: item.unit,
    lowStockThreshold: item.lowStockThreshold,
  }));
}

export async function getInventorySummary() {
  const items = await getInventoryItems();
  const lowStockItems = items.filter(
    (item) => item.quantity <= item.lowStockThreshold,
  ).length;

  return {
    totalItems: items.length,
    lowStockItems,
  };
}
