import type { InventoryItem } from "@/types/inventory";

type InventoryStatus = "critical" | "low" | "ok";

type InventoryStatusDetails = {
  toneClassName: string;
  label: string;
  rank: number;
  rowClassName: string;
};

export function getInventoryStatus(
  quantity: number,
  lowStockThreshold: number,
): InventoryStatus {
  if (quantity === 0) {
    return "critical";
  }

  if (quantity <= lowStockThreshold) {
    return "low";
  }

  return "ok";
}

export function getInventoryStatusDetails(
  quantity: number,
  lowStockThreshold: number,
): InventoryStatusDetails {
  const status = getInventoryStatus(quantity, lowStockThreshold);

  if (status === "critical") {
    return {
      label: "Critical",
      rank: 0,
      rowClassName: "bg-red-50",
      toneClassName: "bg-red-100 text-red-700",
    };
  }

  if (status === "low") {
    return {
      label: "Low Stock",
      rank: 1,
      rowClassName: "bg-amber-50",
      toneClassName: "bg-amber-100 text-amber-700",
    };
  }

  return {
    label: "OK",
    rank: 2,
    rowClassName: "",
    toneClassName: "bg-emerald-100 text-emerald-700",
  };
}

export function compareInventoryUrgency(
  quantityA: number,
  lowStockThresholdA: number,
  quantityB: number,
  lowStockThresholdB: number,
) {
  const statusA = getInventoryStatusDetails(quantityA, lowStockThresholdA);
  const statusB = getInventoryStatusDetails(quantityB, lowStockThresholdB);

  if (statusA.rank !== statusB.rank) {
    return statusA.rank - statusB.rank;
  }

  if (quantityA !== quantityB) {
    return quantityA - quantityB;
  }

  return lowStockThresholdB - lowStockThresholdA;
}

export function isLowStock(quantity: number, lowStockThreshold: number) {
  return getInventoryStatus(quantity, lowStockThreshold) !== "ok";
}

export function sortInventoryByUrgency(items: InventoryItem[]) {
  return [...items].sort((itemA, itemB) =>
    compareInventoryUrgency(
      itemA.quantity,
      itemA.lowStockThreshold,
      itemB.quantity,
      itemB.lowStockThreshold,
    ),
  );
}

export function getLowStockItems(items: InventoryItem[]) {
  return sortInventoryByUrgency(
    items.filter((item) => isLowStock(item.quantity, item.lowStockThreshold)),
  );
}
