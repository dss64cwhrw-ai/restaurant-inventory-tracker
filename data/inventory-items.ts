import type { InventoryItemInput } from "@/types/inventory";

export const inventorySeedItems: InventoryItemInput[] = [
  {
    name: "Tomatoes",
    category: "Vegetables",
    quantity: 18,
    unit: "kg",
    lowStockThreshold: 10,
  },
  {
    name: "Lettuce",
    category: "Vegetables",
    quantity: 4,
    unit: "heads",
    lowStockThreshold: 6,
  },
  {
    name: "Chicken Breast",
    category: "Meat",
    quantity: 12,
    unit: "kg",
    lowStockThreshold: 8,
  },
  {
    name: "Mozzarella",
    category: "Dairy",
    quantity: 3,
    unit: "kg",
    lowStockThreshold: 5,
  },
  {
    name: "Flour",
    category: "Dry Goods",
    quantity: 25,
    unit: "kg",
    lowStockThreshold: 10,
  },
  {
    name: "Olive Oil",
    category: "Sauces",
    quantity: 2,
    unit: "bottles",
    lowStockThreshold: 3,
  },
  {
    name: "Rice",
    category: "Dry Goods",
    quantity: 14,
    unit: "kg",
    lowStockThreshold: 8,
  },
];
