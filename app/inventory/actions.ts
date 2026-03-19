"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import type { InventoryItem, InventoryItemInput } from "@/types/inventory";

type InventoryActionResult =
  | { success: true; item: InventoryItem }
  | { success: false; error: string };

type DeleteInventoryActionResult =
  | { success: true }
  | { success: false; error: string };

function validateInventoryItem(input: InventoryItemInput) {
  if (!input.name.trim()) {
    return "Item Name is required.";
  }

  if (!input.category.trim()) {
    return "Category is required.";
  }

  if (input.quantity <= 0) {
    return "Quantity must be greater than 0.";
  }

  if (!input.unit.trim()) {
    return "Unit is required.";
  }

  if (input.lowStockThreshold < 0) {
    return "Low Stock Threshold must be 0 or greater.";
  }

  return null;
}

export async function createInventoryItem(
  input: InventoryItemInput,
): Promise<InventoryActionResult> {
  const error = validateInventoryItem(input);

  if (error) {
    return { success: false, error };
  }

  const item = await prisma.inventoryItem.create({
    data: {
      name: input.name.trim(),
      category: input.category.trim(),
      quantity: input.quantity,
      unit: input.unit.trim(),
      lowStockThreshold: input.lowStockThreshold,
    },
  });

  revalidatePath("/inventory");
  revalidatePath("/dashboard");

  return {
    success: true,
    item: {
      id: item.id,
      name: item.name,
      category: item.category,
      quantity: item.quantity,
      unit: item.unit,
      lowStockThreshold: item.lowStockThreshold,
    },
  };
}

export async function updateInventoryItem(
  input: InventoryItem,
): Promise<InventoryActionResult> {
  const error = validateInventoryItem(input);

  if (error) {
    return { success: false, error };
  }

  const existingItem = await prisma.inventoryItem.findUnique({
    where: { id: input.id },
  });

  if (!existingItem) {
    return { success: false, error: "Item not found." };
  }

  const item = await prisma.inventoryItem.update({
    where: { id: input.id },
    data: {
      name: input.name.trim(),
      category: input.category.trim(),
      quantity: input.quantity,
      unit: input.unit.trim(),
      lowStockThreshold: input.lowStockThreshold,
    },
  });

  revalidatePath("/inventory");
  revalidatePath("/dashboard");

  return {
    success: true,
    item: {
      id: item.id,
      name: item.name,
      category: item.category,
      quantity: item.quantity,
      unit: item.unit,
      lowStockThreshold: item.lowStockThreshold,
    },
  };
}

export async function deleteInventoryItem(
  itemId: number,
): Promise<DeleteInventoryActionResult> {
  const existingItem = await prisma.inventoryItem.findUnique({
    where: { id: itemId },
  });

  if (!existingItem) {
    return { success: false, error: "Item not found." };
  }

  await prisma.inventoryItem.delete({
    where: { id: itemId },
  });

  revalidatePath("/inventory");
  revalidatePath("/dashboard");

  return { success: true };
}
