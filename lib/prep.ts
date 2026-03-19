import { prisma } from "@/lib/prisma";
import type { PrepTask } from "@/types/prep";

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

export async function getPrepTasks(userId: string): Promise<PrepTask[]> {
  const tasks = await prisma.prepTask.findMany({
    where: {
      userId,
    },
    orderBy: {
      dueTime: "asc",
    },
  });

  return tasks.map(mapPrepTask);
}

export async function getPrepSummary(userId: string) {
  const tasks = await getPrepTasks(userId);
  const completedTasks = tasks.filter((task) => task.completed).length;

  return {
    totalTasks: tasks.length,
    completedTasks,
    openTasks: tasks.length - completedTasks,
  };
}
