import {
  compareInventoryUrgency,
  getInventoryStatus,
  getInventoryStatusDetails,
  getLowStockItems,
  isLowStock,
  sortInventoryByUrgency,
} from "@/lib/inventory-status";

describe("inventory status logic", () => {
  it("returns ok when quantity is greater than the threshold", () => {
    expect(getInventoryStatus(12, 5)).toBe("ok");
  });

  it("returns low when quantity is equal to the threshold", () => {
    expect(getInventoryStatus(5, 5)).toBe("low");
  });

  it("returns low when quantity is below the threshold but above zero", () => {
    expect(getInventoryStatus(2, 5)).toBe("low");
  });

  it("returns critical when quantity is zero", () => {
    expect(getInventoryStatus(0, 5)).toBe("critical");
  });

  it("marks critical and low items as needing attention", () => {
    expect(isLowStock(0, 5)).toBe(true);
    expect(isLowStock(3, 5)).toBe(true);
    expect(isLowStock(8, 5)).toBe(false);
  });

  it("returns helpful status details for the UI", () => {
    expect(getInventoryStatusDetails(0, 3)).toMatchObject({
      label: "Critical",
      rank: 0,
    });

    expect(getInventoryStatusDetails(2, 3)).toMatchObject({
      label: "Low Stock",
      rank: 1,
    });

    expect(getInventoryStatusDetails(9, 3)).toMatchObject({
      label: "OK",
      rank: 2,
    });
  });

  it("sorts the most urgent inventory items first", () => {
    const items = [
      {
        id: 1,
        name: "Tomatoes",
        category: "Vegetables",
        quantity: 8,
        unit: "kg",
        lowStockThreshold: 4,
      },
      {
        id: 2,
        name: "Olive Oil",
        category: "Dry Goods",
        quantity: 0,
        unit: "bottles",
        lowStockThreshold: 2,
      },
      {
        id: 3,
        name: "Cheese",
        category: "Dairy",
        quantity: 2,
        unit: "kg",
        lowStockThreshold: 5,
      },
    ];

    const sortedItems = sortInventoryByUrgency(items);

    expect(sortedItems.map((item) => item.id)).toEqual([2, 3, 1]);
  });

  it("returns only low-stock items in urgency order", () => {
    const items = [
      {
        id: 1,
        name: "Tomatoes",
        category: "Vegetables",
        quantity: 8,
        unit: "kg",
        lowStockThreshold: 4,
      },
      {
        id: 2,
        name: "Olive Oil",
        category: "Dry Goods",
        quantity: 0,
        unit: "bottles",
        lowStockThreshold: 2,
      },
      {
        id: 3,
        name: "Cheese",
        category: "Dairy",
        quantity: 2,
        unit: "kg",
        lowStockThreshold: 5,
      },
    ];

    expect(getLowStockItems(items).map((item) => item.id)).toEqual([2, 3]);
  });

  it("compares urgency in the expected order", () => {
    expect(compareInventoryUrgency(0, 3, 2, 5)).toBeLessThan(0);
    expect(compareInventoryUrgency(2, 5, 9, 3)).toBeLessThan(0);
  });
});
