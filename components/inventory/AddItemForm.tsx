"use client";

import { useState } from "react";
import type { InventoryItem, InventoryItemInput } from "@/types/inventory";

type AddItemFormProps = {
  editingItem: InventoryItem | null;
  isPending: boolean;
  errorMessage: string | null;
  onAddItem: (item: InventoryItemInput) => Promise<boolean>;
  onUpdateItem: (item: InventoryItem) => Promise<boolean>;
  onCancelEdit: () => void;
};

type FormValues = {
  name: string;
  category: string;
  quantity: string;
  unit: string;
  lowStockThreshold: string;
};

type FormErrors = {
  name?: string;
  category?: string;
  quantity?: string;
  unit?: string;
  lowStockThreshold?: string;
};

const initialValues: FormValues = {
  name: "",
  category: "",
  quantity: "",
  unit: "",
  lowStockThreshold: "",
};

function buildFormValues(item: InventoryItem | null): FormValues {
  if (!item) {
    return initialValues;
  }

  return {
    name: item.name,
    category: item.category,
    quantity: item.quantity.toString(),
    unit: item.unit,
    lowStockThreshold: item.lowStockThreshold.toString(),
  };
}

export default function AddItemForm({
  editingItem,
  isPending,
  errorMessage,
  onAddItem,
  onUpdateItem,
  onCancelEdit,
}: AddItemFormProps) {
  const [values, setValues] = useState<FormValues>(buildFormValues(editingItem));
  const [errors, setErrors] = useState<FormErrors>({});

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = event.target;

    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: undefined,
    }));
  }

  function validateForm() {
    const nextErrors: FormErrors = {};
    const quantity = Number(values.quantity);
    const lowStockThreshold = Number(values.lowStockThreshold);

    if (!values.name.trim()) {
      nextErrors.name = "Item Name is required.";
    }

    if (!values.category.trim()) {
      nextErrors.category = "Category is required.";
    }

    if (!values.quantity.trim()) {
      nextErrors.quantity = "Quantity is required.";
    } else if (Number.isNaN(quantity) || quantity <= 0) {
      nextErrors.quantity = "Quantity must be greater than 0.";
    }

    if (!values.unit.trim()) {
      nextErrors.unit = "Unit is required.";
    }

    if (!values.lowStockThreshold.trim()) {
      nextErrors.lowStockThreshold = "Low Stock Threshold is required.";
    } else if (Number.isNaN(lowStockThreshold) || lowStockThreshold < 0) {
      nextErrors.lowStockThreshold =
        "Low Stock Threshold must be 0 or greater.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const nextItem = {
      name: values.name.trim(),
      category: values.category.trim(),
      quantity: Number(values.quantity),
      unit: values.unit.trim(),
      lowStockThreshold: Number(values.lowStockThreshold),
    };

    const wasSuccessful = editingItem
      ? await onUpdateItem({
        id: editingItem.id,
        ...nextItem,
      })
      : await onAddItem(nextItem);

    if (!wasSuccessful) {
      return;
    }

    setValues(initialValues);
    setErrors({});
  }

  function handleCancelClick() {
    setValues(initialValues);
    setErrors({});
    onCancelEdit();
  }

  return (
    <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
      <div>
        <h2 className="text-lg font-semibold text-stone-900">
          {editingItem ? "Edit Item" : "Add New Item"}
        </h2>
        <p className="mt-1 text-sm text-stone-600">
          {editingItem
            ? "You are editing an existing inventory item. Save your changes or cancel to return to add mode."
            : "This form adds items to the visible list only for the current page session."}
        </p>
      </div>

      {errorMessage ? (
        <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {errorMessage}
        </p>
      ) : null}

      <form className="mt-5 grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-stone-700"
          >
            Item Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={values.name}
            onChange={handleChange}
            disabled={isPending}
            className="mt-1 w-full rounded-xl border border-stone-300 px-3 py-2 text-sm text-stone-900 outline-none transition focus:border-stone-500"
          />
          {errors.name ? (
            <p className="mt-1 text-xs text-red-600">{errors.name}</p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-stone-700"
          >
            Category
          </label>
          <input
            id="category"
            name="category"
            type="text"
            value={values.category}
            onChange={handleChange}
            disabled={isPending}
            className="mt-1 w-full rounded-xl border border-stone-300 px-3 py-2 text-sm text-stone-900 outline-none transition focus:border-stone-500"
          />
          {errors.category ? (
            <p className="mt-1 text-xs text-red-600">{errors.category}</p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="quantity"
            className="block text-sm font-medium text-stone-700"
          >
            Quantity
          </label>
          <input
            id="quantity"
            name="quantity"
            type="number"
            min="1"
            step="any"
            value={values.quantity}
            onChange={handleChange}
            disabled={isPending}
            className="mt-1 w-full rounded-xl border border-stone-300 px-3 py-2 text-sm text-stone-900 outline-none transition focus:border-stone-500"
          />
          {errors.quantity ? (
            <p className="mt-1 text-xs text-red-600">{errors.quantity}</p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="unit"
            className="block text-sm font-medium text-stone-700"
          >
            Unit
          </label>
          <input
            id="unit"
            name="unit"
            type="text"
            value={values.unit}
            onChange={handleChange}
            disabled={isPending}
            className="mt-1 w-full rounded-xl border border-stone-300 px-3 py-2 text-sm text-stone-900 outline-none transition focus:border-stone-500"
          />
          {errors.unit ? (
            <p className="mt-1 text-xs text-red-600">{errors.unit}</p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="lowStockThreshold"
            className="block text-sm font-medium text-stone-700"
          >
            Low Stock Threshold
          </label>
          <input
            id="lowStockThreshold"
            name="lowStockThreshold"
            type="number"
            min="0"
            step="1"
            value={values.lowStockThreshold}
            onChange={handleChange}
            disabled={isPending}
            className="mt-1 w-full rounded-xl border border-stone-300 px-3 py-2 text-sm text-stone-900 outline-none transition focus:border-stone-500"
          />
          {errors.lowStockThreshold ? (
            <p className="mt-1 text-xs text-red-600">
              {errors.lowStockThreshold}
            </p>
          ) : null}
        </div>

        <div className="flex items-end gap-3">
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center rounded-xl bg-stone-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-stone-700"
          >
            {isPending
              ? editingItem
                ? "Saving..."
                : "Adding..."
              : editingItem
                ? "Save Changes"
                : "Add Item"}
          </button>

          {editingItem ? (
            <button
              type="button"
              onClick={handleCancelClick}
              disabled={isPending}
              className="inline-flex items-center rounded-xl border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-100"
            >
              Cancel
            </button>
          ) : null}
        </div>
      </form>
    </section>
  );
}
