"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { prepTaskSchema } from "@/lib/validations/prep";
import type { PrepTask, PrepTaskInput } from "@/types/prep";

type PrepTaskActionResult =
  | { success: true; task: PrepTask }
  | { success: false; error: string };

type DeletePrepTaskActionResult =
  | { success: true }
  | { success: false; error: string };

function validatePrepTask(input: PrepTaskInput) {
  const result = prepTaskSchema.safeParse(input);

  if (!result.success) {
    const firstIssue = result.error.issues[0];
    return firstIssue?.message ?? "Please check the prep task form.";
  }

  return result.data;
}

function mapPrepTask(task: {
  id: number;
  title: string;
  station: string;
  dueTime: Date;
  completed: boolean;
}): PrepTask {
  return {
    id: task.id,
    title: task.title,
    station: task.station,
    dueTime: task.dueTime.toISOString(),
    completed: task.completed,
  };
}

function revalidatePrepPages() {
  revalidatePath("/prep");
  revalidatePath("/dashboard");
}

export async function createPrepTask(
  input: PrepTaskInput,
): Promise<PrepTaskActionResult> {
  const { userId } = await auth();

  if (!userId) {
    return { success: false, error: "You must be signed in." };
  }

  const validatedInput = validatePrepTask(input);

  if (typeof validatedInput === "string") {
    return { success: false, error: validatedInput };
  }

  try {
    const task = await prisma.prepTask.create({
      data: {
        userId,
        title: validatedInput.title,
        station: validatedInput.station,
        dueTime: new Date(validatedInput.dueTime),
      },
    });

    revalidatePrepPages();

    return {
      success: true,
      task: mapPrepTask(task),
    };
  } catch {
    return {
      success: false,
      error: "Could not save the prep task. Please try again.",
    };
  }
}

export async function updatePrepTask(
  input: PrepTask,
): Promise<PrepTaskActionResult> {
  const { userId } = await auth();

  if (!userId) {
    return { success: false, error: "You must be signed in." };
  }

  const validatedInput = validatePrepTask(input);

  if (typeof validatedInput === "string") {
    return { success: false, error: validatedInput };
  }

  const existingTask = await prisma.prepTask.findFirst({
    where: {
      id: input.id,
      userId,
    },
  });

  if (!existingTask) {
    return { success: false, error: "Prep task not found." };
  }

  try {
    const task = await prisma.prepTask.update({
      where: {
        id: input.id,
      },
      data: {
        title: validatedInput.title,
        station: validatedInput.station,
        dueTime: new Date(validatedInput.dueTime),
        completed: input.completed,
      },
    });

    revalidatePrepPages();

    return {
      success: true,
      task: mapPrepTask(task),
    };
  } catch {
    return {
      success: false,
      error: "Could not update the prep task. Please try again.",
    };
  }
}

export async function togglePrepTaskComplete(
  taskId: number,
): Promise<PrepTaskActionResult> {
  const { userId } = await auth();

  if (!userId) {
    return { success: false, error: "You must be signed in." };
  }

  const existingTask = await prisma.prepTask.findFirst({
    where: {
      id: taskId,
      userId,
    },
  });

  if (!existingTask) {
    return { success: false, error: "Prep task not found." };
  }

  try {
    const task = await prisma.prepTask.update({
      where: {
        id: taskId,
      },
      data: {
        completed: !existingTask.completed,
      },
    });

    revalidatePrepPages();

    return {
      success: true,
      task: mapPrepTask(task),
    };
  } catch {
    return {
      success: false,
      error: "Could not update the prep task. Please try again.",
    };
  }
}

export async function deletePrepTask(
  taskId: number,
): Promise<DeletePrepTaskActionResult> {
  const { userId } = await auth();

  if (!userId) {
    return { success: false, error: "You must be signed in." };
  }

  const existingTask = await prisma.prepTask.findFirst({
    where: {
      id: taskId,
      userId,
    },
  });

  if (!existingTask) {
    return { success: false, error: "Prep task not found." };
  }

  try {
    await prisma.prepTask.delete({
      where: {
        id: taskId,
      },
    });

    revalidatePrepPages();

    return { success: true };
  } catch {
    return {
      success: false,
      error: "Could not delete the prep task. Please try again.",
    };
  }
}
