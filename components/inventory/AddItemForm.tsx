"use client";

import { useState } from "react";
import { inventoryItemSchema } from "@/lib/validations/inventory";
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
  const formTitleId = editingItem
    ? `inventory-form-title-${editingItem.id}`
    : "inventory-form-title";

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
    const result = inventoryItemSchema.safeParse({
      name: values.name,
      category: values.category,
      quantity: Number(values.quantity),
      unit: values.unit,
      lowStockThreshold: Number(values.lowStockThreshold),
    });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;

      nextErrors.name = fieldErrors.name?.[0];
      nextErrors.category = fieldErrors.category?.[0];
      nextErrors.quantity = fieldErrors.quantity?.[0];
      nextErrors.unit = fieldErrors.unit?.[0];
      nextErrors.lowStockThreshold = fieldErrors.lowStockThreshold?.[0];
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
    <section
      aria-labelledby={formTitleId}
      className="section-card rounded-[1.75rem] p-5"
    >
      <div>
        <h2 id={formTitleId} className="text-lg font-semibold text-stone-900">
          {editingItem ? "Edit Item" : "Add New Item"}
        </h2>
        <p className="mt-1 text-sm text-stone-600">
          {editingItem
            ? "You are editing an existing inventory item. Save your changes or cancel to return to add mode."
            : "This form adds a new inventory item and saves it to your account."}
        </p>
      </div>

      {errorMessage ? (
        <p
          role="alert"
          className="mt-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
        >
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
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            value={values.name}
            onChange={handleChange}
            disabled={isPending}
            className="field-input mt-1 w-full rounded-xl px-3 py-2 text-sm text-stone-900 outline-none transition"
          />
          {errors.name ? (
            <p id="name-error" className="mt-1 text-xs text-red-600">
              {errors.name}
            </p>
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
            required
            aria-invalid={Boolean(errors.category)}
            aria-describedby={errors.category ? "category-error" : undefined}
            value={values.category}
            onChange={handleChange}
            disabled={isPending}
            className="field-input mt-1 w-full rounded-xl px-3 py-2 text-sm text-stone-900 outline-none transition"
          />
          {errors.category ? (
            <p id="category-error" className="mt-1 text-xs text-red-600">
              {errors.category}
            </p>
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
            min="0"
            step="any"
            required
            inputMode="decimal"
            aria-invalid={Boolean(errors.quantity)}
            aria-describedby={errors.quantity ? "quantity-error" : undefined}
            value={values.quantity}
            onChange={handleChange}
            disabled={isPending}
            className="field-input mt-1 w-full rounded-xl px-3 py-2 text-sm text-stone-900 outline-none transition"
          />
          {errors.quantity ? (
            <p id="quantity-error" className="mt-1 text-xs text-red-600">
              {errors.quantity}
            </p>
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
            required
            aria-invalid={Boolean(errors.unit)}
            aria-describedby={errors.unit ? "unit-error" : undefined}
            value={values.unit}
            onChange={handleChange}
            disabled={isPending}
            className="field-input mt-1 w-full rounded-xl px-3 py-2 text-sm text-stone-900 outline-none transition"
          />
          {errors.unit ? (
            <p id="unit-error" className="mt-1 text-xs text-red-600">
              {errors.unit}
            </p>
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
            required
            inputMode="numeric"
            aria-invalid={Boolean(errors.lowStockThreshold)}
            aria-describedby={
              errors.lowStockThreshold ? "low-stock-threshold-error" : undefined
            }
            value={values.lowStockThreshold}
            onChange={handleChange}
            disabled={isPending}
            className="field-input mt-1 w-full rounded-xl px-3 py-2 text-sm text-stone-900 outline-none transition"
          />
          {errors.lowStockThreshold ? (
            <p
              id="low-stock-threshold-error"
              className="mt-1 text-xs text-red-600"
            >
              {errors.lowStockThreshold}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <button
            type="submit"
            disabled={isPending}
            className="button-primary inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition"
          >
            {isPending
              ? editingItem
                ? "Updating..."
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
              className="button-secondary inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition"
            >
              Cancel
            </button>
          ) : null}
        </div>
      </form>
    </section>
  );
}
