import { inventoryItemSchema } from "@/lib/validations/inventory";

describe("inventory validation", () => {
  it("passes with valid input", () => {
    const result = inventoryItemSchema.safeParse({
      name: "Tomatoes",
      category: "Vegetables",
      quantity: 5,
      unit: "kg",
      lowStockThreshold: 2,
    });

    expect(result.success).toBe(true);
  });

  it("fails when name is missing", () => {
    const result = inventoryItemSchema.safeParse({
      name: "   ",
      category: "Vegetables",
      quantity: 5,
      unit: "kg",
      lowStockThreshold: 2,
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toBe("Item name is required.");
  });

  it("fails when quantity is negative", () => {
    const result = inventoryItemSchema.safeParse({
      name: "Tomatoes",
      category: "Vegetables",
      quantity: -1,
      unit: "kg",
      lowStockThreshold: 2,
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toBe(
      "Quantity must be 0 or greater.",
    );
  });

  it("fails when low stock threshold is negative", () => {
    const result = inventoryItemSchema.safeParse({
      name: "Tomatoes",
      category: "Vegetables",
      quantity: 5,
      unit: "kg",
      lowStockThreshold: -1,
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toBe(
      "Low stock threshold must be 0 or greater.",
    );
  });
});
