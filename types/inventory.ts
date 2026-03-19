export type InventoryItem = {
  id: number;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  lowStockThreshold: number;
};

export type InventoryItemInput = Omit<InventoryItem, "id">;
