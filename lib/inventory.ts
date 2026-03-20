import { prisma } from "@/lib/prisma";
import { getLowStockItems } from "@/lib/inventory-status";
import type { InventoryItem } from "@/types/inventory";

export async function getInventoryItems(userId: string): Promise<InventoryItem[]> {
  const items = await prisma.inventoryItem.findMany({
    where: {
      userId,
    },
    orderBy: {
      id: "asc",
    },
  });

 return items.map((item: any) => ({
    id: item.id,
    name: item.name,
    category: item.category,
    quantity: item.quantity,
    unit: item.unit,
    lowStockThreshold: item.lowStockThreshold,
  }));
}

export async function getInventorySummary(userId: string) {
  const items = await getInventoryItems(userId);
  const lowStockItems = getLowStockItems(items).length;
  const criticalItems = items.filter((item) => item.quantity === 0).length;

  return {
    totalItems: items.length,
    lowStockItems,
    criticalItems,
    okItems: items.length - lowStockItems,
  };
}
