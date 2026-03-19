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
    <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-stone-200">
          <caption className="sr-only">
            Prep task table with task titles, stations, due times, completion
            status, and actions.
          </caption>
          <thead className="bg-stone-50">
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
                <tr key={task.id} className="hover:bg-stone-50">
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
                        className="rounded-lg border border-stone-300 px-3 py-1.5 text-xs font-medium text-stone-700 transition hover:bg-stone-100"
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
                        className="rounded-lg border border-stone-300 px-3 py-1.5 text-xs font-medium text-stone-700 transition hover:bg-stone-100"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => void onDeleteTask(task.id)}
                        disabled={isBusy}
                        aria-label={`Delete ${task.title}`}
                        className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-700 transition hover:bg-red-50"
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
