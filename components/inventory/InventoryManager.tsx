"use client";

import { useState } from "react";
import {
  createInventoryItem,
  deleteInventoryItem,
  updateInventoryItem,
} from "@/app/inventory/actions";
import AddItemForm from "@/components/inventory/AddItemForm";
import InventoryTable from "@/components/inventory/InventoryTable";
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

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All Categories" ||
      item.category === selectedCategory;
    const isLowStock = item.quantity <= item.lowStockThreshold;
    const matchesStatus =
      selectedStatus === "All Statuses" ||
      (selectedStatus === "Low Stock" && isLowStock) ||
      (selectedStatus === "OK" && !isLowStock);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const visibleLowStockItems = filteredItems.filter(
    (item) => item.quantity <= item.lowStockThreshold,
  ).length;

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

      <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
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
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="mt-1 w-full rounded-xl border border-stone-300 px-3 py-2 text-sm text-stone-900 outline-none transition focus:border-stone-500"
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
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              className="mt-1 w-full rounded-xl border border-stone-300 px-3 py-2 text-sm text-stone-900 outline-none transition focus:border-stone-500"
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
              value={selectedStatus}
              onChange={(event) => setSelectedStatus(event.target.value)}
              className="mt-1 w-full rounded-xl border border-stone-300 px-3 py-2 text-sm text-stone-900 outline-none transition focus:border-stone-500"
            >
              <option value="All Statuses">All Statuses</option>
              <option value="Low Stock">Low Stock</option>
              <option value="OK">OK</option>
            </select>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-stone-500">Visible Items</p>
          <p className="mt-3 text-3xl font-semibold text-stone-900">
            {filteredItems.length}
          </p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-stone-500">
            Visible Low Stock Items
          </p>
          <p className="mt-3 text-3xl font-semibold text-stone-900">
            {visibleLowStockItems}
          </p>
        </div>
      </section>

      {filteredItems.length > 0 ? (
        <InventoryTable
          deletingItemId={deletingItemId}
          items={filteredItems}
          onEditItem={handleEditItem}
          onDeleteItem={handleDeleteItem}
        />
      ) : (
        <section className="rounded-2xl border border-dashed border-stone-300 bg-white p-8 text-center shadow-sm">
          <h3 className="text-lg font-semibold text-stone-900">
            No matching items
          </h3>
          <p className="mt-2 text-sm text-stone-600">
            No inventory items match your current filters.
          </p>
        </section>
      )}
    </div>
  );
}
