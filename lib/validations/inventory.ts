import { z } from "zod";

export const inventoryItemSchema = z.object({
  name: z.string().trim().min(1, "Item name is required."),
  category: z.string().trim().min(1, "Category is required."),
  quantity: z
    .number({ error: "Quantity is required." })
    .min(0, "Quantity must be 0 or greater."),
  unit: z.string().trim().min(1, "Unit is required."),
  lowStockThreshold: z
    .number({ error: "Low stock threshold is required." })
    .min(0, "Low stock threshold must be 0 or greater."),
});

export type InventoryItemValidationInput = z.infer<typeof inventoryItemSchema>;
