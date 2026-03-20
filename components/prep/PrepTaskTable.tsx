"use client";

import type { PrepTask } from "@/types/prep";

type PrepTaskTableProps = {
  deletingTaskId: number | null;
  togglingTaskId: number | null;
  tasks: PrepTask[];
  onDeleteTask: (taskId: number) => Promise<void>;
  onEditTask: (task: PrepTask) => void;
  onToggleComplete: (taskId: number) => Promise<void>;
};

function formatDueTime(dueTime: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(dueTime));
}

export default function PrepTaskTable({
  deletingTaskId,
  togglingTaskId,
  tasks,
  onDeleteTask,
  onEditTask,
  onToggleComplete,
}: PrepTaskTableProps) {
  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-[rgba(137,98,66,0.16)] bg-[rgba(255,252,247,0.92)] shadow-[0_16px_30px_-24px_rgba(62,39,20,0.55)]">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-stone-200">
          <caption className="sr-only">
            Prep task table with task titles, stations, due times, completion
            status, and actions.
          </caption>
          <thead className="bg-[rgba(255,244,232,0.75)]">
            <tr>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-stone-500"
              >
                Title
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-stone-500"
              >
                Station
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-stone-500"
              >
                Due Time
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-stone-500"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-stone-500"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200">
            {tasks.map((task) => {
              const isBusy =
                deletingTaskId === task.id || togglingTaskId === task.id;

              return (
                <tr key={task.id} className="transition hover:bg-[rgba(255,247,237,0.72)]">
                  <th
                    scope="row"
                    className="px-4 py-4 text-left text-sm font-medium text-stone-900"
                  >
                    {task.title}
                  </th>
                  <td className="px-4 py-4 text-sm text-stone-600">
                    {task.station}
                  </td>
                  <td className="px-4 py-4 text-sm text-stone-600">
                    {formatDueTime(task.dueTime)}
                  </td>
                  <td className="px-4 py-4 text-sm text-stone-600">
                    <span
                      aria-label={`Task status: ${task.completed ? "Completed" : "Open"}`}
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        task.completed
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {task.completed ? "Completed" : "Open"}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-stone-600">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => void onToggleComplete(task.id)}
                        disabled={isBusy}
                        aria-label={
                          task.completed
                            ? `Mark ${task.title} as open`
                            : `Mark ${task.title} as complete`
                        }
                        className="button-secondary rounded-lg px-3 py-1.5 text-xs font-medium transition"
                      >
                        {togglingTaskId === task.id
                          ? "Saving..."
                          : task.completed
                            ? "Mark Open"
                            : "Mark Complete"}
                      </button>

                      <button
                        type="button"
                        onClick={() => onEditTask(task)}
                        disabled={isBusy}
                        aria-label={`Edit ${task.title}`}
                        className="button-secondary rounded-lg px-3 py-1.5 text-xs font-medium transition"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => void onDeleteTask(task.id)}
                        disabled={isBusy}
                        aria-label={`Delete ${task.title}`}
                        className="rounded-lg border border-red-200 bg-white/70 px-3 py-1.5 text-xs font-medium text-red-700 transition hover:bg-red-50"
                      >
                        {deletingTaskId === task.id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
