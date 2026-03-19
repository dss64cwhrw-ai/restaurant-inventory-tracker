"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { inventoryItemSchema } from "@/lib/validations/inventory";
import type { InventoryItem, InventoryItemInput } from "@/types/inventory";

type InventoryActionResult =
  | { success: true; item: InventoryItem }
  | { success: false; error: string };

type DeleteInventoryActionResult =
  | { success: true }
  | { success: false; error: string };

function validateInventoryItem(input: InventoryItemInput) {
  const result = inventoryItemSchema.safeParse(input);

  if (!result.success) {
    const firstIssue = result.error.issues[0];
    return firstIssue?.message ?? "Please check the inventory form.";
  }

  return result.data;
}

export async function createInventoryItem(
  input: InventoryItemInput,
): Promise<InventoryActionResult> {
  const { userId } = await auth();

  if (!userId) {
    return { success: false, error: "You must be signed in." };
  }

  const validatedInput = validateInventoryItem(input);

  if (typeof validatedInput === "string") {
    return { success: false, error: validatedInput };
  }

  try {
    const item = await prisma.inventoryItem.create({
      data: {
        userId,
        name: validatedInput.name,
        category: validatedInput.category,
        quantity: validatedInput.quantity,
        unit: validatedInput.unit,
        lowStockThreshold: validatedInput.lowStockThreshold,
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
  } catch {
    return {
      success: false,
      error: "Could not save the item. Please try again.",
    };
  }
}

export async function updateInventoryItem(
  input: InventoryItem,
): Promise<InventoryActionResult> {
  const { userId } = await auth();

  if (!userId) {
    return { success: false, error: "You must be signed in." };
  }

  const validatedInput = validateInventoryItem(input);

  if (typeof validatedInput === "string") {
    return { success: false, error: validatedInput };
  }

  const existingItem = await prisma.inventoryItem.findFirst({
    where: {
      id: input.id,
      userId,
    },
  });

  if (!existingItem) {
    return { success: false, error: "Item not found." };
  }

  try {
    const item = await prisma.inventoryItem.update({
      where: { id: input.id },
      data: {
        name: validatedInput.name,
        category: validatedInput.category,
        quantity: validatedInput.quantity,
        unit: validatedInput.unit,
        lowStockThreshold: validatedInput.lowStockThreshold,
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
  } catch {
    return {
      success: false,
      error: "Could not update the item. Please try again.",
    };
  }
}

export async function deleteInventoryItem(
  itemId: number,
): Promise<DeleteInventoryActionResult> {
  const { userId } = await auth();

  if (!userId) {
    return { success: false, error: "You must be signed in." };
  }

  const existingItem = await prisma.inventoryItem.findFirst({
    where: {
      id: itemId,
      userId,
    },
  });

  if (!existingItem) {
    return { success: false, error: "Item not found." };
  }

  try {
    await prisma.inventoryItem.delete({
      where: { id: itemId },
    });

    revalidatePath("/inventory");
    revalidatePath("/dashboard");

    return { success: true };
  } catch {
    return {
      success: false,
      error: "Could not delete the item. Please try again.",
    };
  }
}
