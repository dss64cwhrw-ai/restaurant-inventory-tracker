"use client";

import { useState } from "react";
import {
  createInventoryItem,
  deleteInventoryItem,
  updateInventoryItem,
} from "@/app/inventory/actions";
import AddItemForm from "@/components/inventory/AddItemForm";
import InventoryTable from "@/components/inventory/InventoryTable";
import LowStockAlerts from "@/components/inventory/LowStockAlerts";
import {
  getLowStockItems,
  getInventoryStatus,
  isLowStock,
  sortInventoryByUrgency,
} from "@/lib/inventory-status";
import type { InventoryItem, InventoryItemInput } from "@/types/inventory";

type InventoryManagerProps = {
  initialItems: InventoryItem[];
};

export default function InventoryManager({
  initialItems,
}: InventoryManagerProps) {
  const [items, setItems] = useState<InventoryItem[]>(initialItems);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");
  const [formErrorMessage, setFormErrorMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingItemId, setDeletingItemId] = useState<number | null>(null);

  const categoryOptions = [
    "All Categories",
    ...Array.from(new Set(items.map((item) => item.category))).sort(),
  ];

  const sortedItems = sortInventoryByUrgency(items);

  const filteredItems = sortedItems.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All Categories" ||
      item.category === selectedCategory;
    const itemStatus = getInventoryStatus(
      item.quantity,
      item.lowStockThreshold,
    );
    const matchesStatus =
      selectedStatus === "All Statuses" ||
      (selectedStatus === "Critical" && itemStatus === "critical") ||
      (selectedStatus === "Low Stock" && itemStatus === "low") ||
      (selectedStatus === "Needs Attention" && itemStatus !== "ok") ||
      (selectedStatus === "OK" && itemStatus === "ok");

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const allLowStockItems = getLowStockItems(items);
  const visibleLowStockItems = filteredItems.filter((item) =>
    isLowStock(item.quantity, item.lowStockThreshold),
  ).length;
  const criticalItems = items.filter((item) => item.quantity === 0).length;

  async function handleAddItem(newItem: InventoryItemInput) {
    setIsSaving(true);
    setFormErrorMessage(null);

    const result = await createInventoryItem(newItem);

    if (!result.success) {
      setFormErrorMessage(result.error);
      setIsSaving(false);
      return false;
    }

    setItems((currentItems) => [...currentItems, result.item]);
    setIsSaving(false);
    return true;
  }

  function handleEditItem(item: InventoryItem) {
    setEditingItem(item);
    setFormErrorMessage(null);
  }

  async function handleUpdateItem(updatedItem: InventoryItem) {
    setIsSaving(true);
    setFormErrorMessage(null);

    const result = await updateInventoryItem(updatedItem);

    if (!result.success) {
      setFormErrorMessage(result.error);
      setIsSaving(false);
      return false;
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === result.item.id ? result.item : item,
      ),
    );
    setEditingItem(null);
    setIsSaving(false);
    return true;
  }

  async function handleDeleteItem(itemId: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this item?",
    );

    if (!confirmed) {
      return;
    }

    setDeletingItemId(itemId);
    setFormErrorMessage(null);

    const result = await deleteInventoryItem(itemId);

    if (!result.success) {
      setFormErrorMessage(result.error);
      setDeletingItemId(null);
      return;
    }

    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== itemId),
    );

    if (editingItem?.id === itemId) {
      setEditingItem(null);
    }

    setDeletingItemId(null);
  }

  function handleCancelEdit() {
    setEditingItem(null);
    setFormErrorMessage(null);
  }

  return (
    <div className="space-y-6">
      <AddItemForm
        key={editingItem ? `edit-${editingItem.id}` : "create"}
        editingItem={editingItem}
        errorMessage={formErrorMessage}
        isPending={isSaving}
        onAddItem={handleAddItem}
        onUpdateItem={handleUpdateItem}
        onCancelEdit={handleCancelEdit}
      />

      <section className="section-card rounded-[1.75rem] p-5">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-stone-900">Filters</h2>
          <p className="mt-1 text-sm text-stone-600">
            Use search and stock filters to narrow the inventory table below.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label
              htmlFor="search"
              className="block text-sm font-medium text-stone-700"
            >
              Search
            </label>
            <input
              id="search"
              type="text"
              placeholder="Search items..."
              aria-describedby="inventory-filter-help"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="field-input mt-1 w-full rounded-xl px-3 py-2 text-sm text-stone-900 outline-none transition"
            />
          </div>

          <div>
            <label
              htmlFor="categoryFilter"
              className="block text-sm font-medium text-stone-700"
            >
              Category
            </label>
            <select
              id="categoryFilter"
              aria-describedby="inventory-filter-help"
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              className="field-input mt-1 w-full rounded-xl px-3 py-2 text-sm text-stone-900 outline-none transition"
            >
              {categoryOptions.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="statusFilter"
              className="block text-sm font-medium text-stone-700"
            >
              Stock Status
            </label>
            <select
              id="statusFilter"
              aria-describedby="inventory-filter-help"
              value={selectedStatus}
              onChange={(event) => setSelectedStatus(event.target.value)}
              className="field-input mt-1 w-full rounded-xl px-3 py-2 text-sm text-stone-900 outline-none transition"
            >
              <option value="All Statuses">All Statuses</option>
              <option value="Needs Attention">Needs Attention</option>
              <option value="Critical">Critical</option>
              <option value="Low Stock">Low Stock</option>
              <option value="OK">OK</option>
            </select>
          </div>
        </div>

        <p id="inventory-filter-help" className="mt-4 text-sm text-stone-600">
          Filters update the visible inventory list without changing your saved
          data.
        </p>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <button
            type="button"
            onClick={() => setSelectedStatus("Needs Attention")}
            aria-pressed={selectedStatus === "Needs Attention"}
            className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-800 transition hover:bg-amber-100"
          >
            Show Items Needing Attention
          </button>
          <button
            type="button"
            onClick={() => setSelectedStatus("All Statuses")}
            aria-pressed={selectedStatus === "All Statuses"}
            className="button-secondary rounded-xl px-4 py-2 text-sm font-medium transition"
          >
            Show All Items
          </button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="metric-card rounded-[1.75rem] p-5">
          <p className="text-sm font-medium text-stone-500">
            Total Inventory Items
          </p>
          <p className="mt-3 text-3xl font-semibold text-stone-900">
            {items.length}
          </p>
        </div>

        <div className="metric-card rounded-[1.75rem] p-5">
          <p className="text-sm font-medium text-stone-500">Visible Items</p>
          <p className="mt-3 text-3xl font-semibold text-stone-900">
            {filteredItems.length}
          </p>
        </div>

        <div className="metric-card rounded-[1.75rem] p-5">
          <p className="text-sm font-medium text-stone-500">
            Visible Low Stock Items
          </p>
          <p className="mt-3 text-3xl font-semibold text-stone-900">
            {visibleLowStockItems}
          </p>
        </div>

        <div className="metric-card rounded-[1.75rem] p-5">
          <p className="text-sm font-medium text-stone-500">Critical Items</p>
          <p className="mt-3 text-3xl font-semibold text-stone-900">
            {criticalItems}
          </p>
        </div>
      </section>

      <LowStockAlerts
        emptyMessage="You do not have any low stock items right now."
        items={allLowStockItems}
        title="Low Stock Alerts"
      />

      {filteredItems.length > 0 ? (
        <InventoryTable
          deletingItemId={deletingItemId}
          items={filteredItems}
          onEditItem={handleEditItem}
          onDeleteItem={handleDeleteItem}
        />
      ) : items.length === 0 ? (
        <section
          aria-live="polite"
          className="surface-panel rounded-[1.75rem] border-dashed p-8 text-center"
        >
          <h3 className="text-lg font-semibold text-stone-900">
            No inventory items yet
          </h3>
          <p className="mt-2 text-sm text-stone-600">
            Add your first inventory item above to start tracking stock.
          </p>
        </section>
      ) : (
        <section
          aria-live="polite"
          className="surface-panel rounded-[1.75rem] border-dashed p-8 text-center"
        >
          <h3 className="text-lg font-semibold text-stone-900">
            No matching items
          </h3>
          <p className="mt-2 text-sm text-stone-600">
            No inventory items match your current search or stock filters.
          </p>
        </section>
      )}
    </div>
  );
}
