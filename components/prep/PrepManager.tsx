"use client";

import { useState } from "react";
import {
  createPrepTask,
  deletePrepTask,
  togglePrepTaskComplete,
  updatePrepTask,
} from "@/app/prep/actions";
import AddPrepTaskForm from "@/components/prep/AddPrepTaskForm";
import PrepTaskTable from "@/components/prep/PrepTaskTable";
import type { PrepTask, PrepTaskInput } from "@/types/prep";

type PrepManagerProps = {
  initialTasks: PrepTask[];
};

export default function PrepManager({ initialTasks }: PrepManagerProps) {
  const [tasks, setTasks] = useState<PrepTask[]>(initialTasks);
  const [editingTask, setEditingTask] = useState<PrepTask | null>(null);
  const [selectedStatus, setSelectedStatus] = useState("All Tasks");
  const [formErrorMessage, setFormErrorMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingTaskId, setDeletingTaskId] = useState<number | null>(null);
  const [togglingTaskId, setTogglingTaskId] = useState<number | null>(null);

  const filteredTasks = tasks.filter((task) => {
    if (selectedStatus === "Completed") {
      return task.completed;
    }

    if (selectedStatus === "Open") {
      return !task.completed;
    }

    return true;
  });

  const summary = {
    totalTasks: tasks.length,
    completedTasks: tasks.filter((task) => task.completed).length,
    openTasks: tasks.filter((task) => !task.completed).length,
  };

  async function handleAddTask(newTask: PrepTaskInput) {
    setIsSaving(true);
    setFormErrorMessage(null);

    const result = await createPrepTask(newTask);

    if (!result.success) {
      setFormErrorMessage(result.error);
      setIsSaving(false);
      return false;
    }

    setTasks((currentTasks) =>
      [...currentTasks, result.task].sort((taskA, taskB) =>
        taskA.dueTime.localeCompare(taskB.dueTime),
      ),
    );
    setIsSaving(false);
    return true;
  }

  function handleEditTask(task: PrepTask) {
    setEditingTask(task);
    setFormErrorMessage(null);
  }

  async function handleUpdateTask(updatedTask: PrepTask) {
    setIsSaving(true);
    setFormErrorMessage(null);

    const result = await updatePrepTask(updatedTask);

    if (!result.success) {
      setFormErrorMessage(result.error);
      setIsSaving(false);
      return false;
    }

    setTasks((currentTasks) =>
      currentTasks
        .map((task) => (task.id === result.task.id ? result.task : task))
        .sort((taskA, taskB) => taskA.dueTime.localeCompare(taskB.dueTime)),
    );
    setEditingTask(null);
    setIsSaving(false);
    return true;
  }

  async function handleToggleComplete(taskId: number) {
    setTogglingTaskId(taskId);
    setFormErrorMessage(null);

    const result = await togglePrepTaskComplete(taskId);

    if (!result.success) {
      setFormErrorMessage(result.error);
      setTogglingTaskId(null);
      return;
    }

    setTasks((currentTasks) =>
      currentTasks.map((task) => (task.id === result.task.id ? result.task : task)),
    );

    if (editingTask?.id === result.task.id) {
      setEditingTask(result.task);
    }

    setTogglingTaskId(null);
  }

  async function handleDeleteTask(taskId: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this prep task?",
    );

    if (!confirmed) {
      return;
    }

    setDeletingTaskId(taskId);
    setFormErrorMessage(null);

    const result = await deletePrepTask(taskId);

    if (!result.success) {
      setFormErrorMessage(result.error);
      setDeletingTaskId(null);
      return;
    }

    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId));

    if (editingTask?.id === taskId) {
      setEditingTask(null);
    }

    setDeletingTaskId(null);
  }

  function handleCancelEdit() {
    setEditingTask(null);
    setFormErrorMessage(null);
  }

  return (
    <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-3">
        <div className="metric-card rounded-[1.75rem] p-5">
          <p className="text-sm font-medium text-stone-500">Total Tasks</p>
          <p className="mt-3 text-3xl font-semibold text-stone-900">
            {summary.totalTasks}
          </p>
        </div>

        <div className="metric-card rounded-[1.75rem] p-5">
          <p className="text-sm font-medium text-stone-500">Completed Tasks</p>
          <p className="mt-3 text-3xl font-semibold text-stone-900">
            {summary.completedTasks}
          </p>
        </div>

        <div className="metric-card rounded-[1.75rem] p-5">
          <p className="text-sm font-medium text-stone-500">Open Tasks</p>
          <p className="mt-3 text-3xl font-semibold text-stone-900">
            {summary.openTasks}
          </p>
        </div>
      </section>

      <AddPrepTaskForm
        key={editingTask ? `edit-${editingTask.id}` : "create"}
        editingTask={editingTask}
        errorMessage={formErrorMessage}
        isPending={isSaving}
        onAddTask={handleAddTask}
        onUpdateTask={handleUpdateTask}
        onCancelEdit={handleCancelEdit}
      />

      <section className="section-card rounded-[1.75rem] p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-stone-900">Prep Tasks</h2>
            <p className="mt-1 text-sm text-stone-600">
              Track what still needs prep work and what is already finished.
            </p>
          </div>

          <div>
            <label
              htmlFor="prepStatusFilter"
              className="block text-sm font-medium text-stone-700"
            >
              Status Filter
            </label>
            <select
              id="prepStatusFilter"
              aria-describedby="prep-filter-help"
              value={selectedStatus}
              onChange={(event) => setSelectedStatus(event.target.value)}
              className="field-input mt-1 w-full rounded-xl px-3 py-2 text-sm text-stone-900 outline-none transition"
            >
              <option value="All Tasks">All Tasks</option>
              <option value="Open">Open</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        <p id="prep-filter-help" className="mt-4 text-sm text-stone-600">
          Use the status filter to switch between open, completed, or all prep
          tasks.
        </p>
      </section>

      {filteredTasks.length > 0 ? (
        <PrepTaskTable
          deletingTaskId={deletingTaskId}
          togglingTaskId={togglingTaskId}
          tasks={filteredTasks}
          onDeleteTask={handleDeleteTask}
          onEditTask={handleEditTask}
          onToggleComplete={handleToggleComplete}
        />
      ) : tasks.length > 0 ? (
        <section
          aria-live="polite"
          className="surface-panel rounded-[1.75rem] border-dashed p-8 text-center"
        >
          <h3 className="text-lg font-semibold text-stone-900">
            No matching prep tasks
          </h3>
          <p className="mt-2 text-sm text-stone-600">
            Try a different status filter to see more tasks.
          </p>
        </section>
      ) : (
        <section
          aria-live="polite"
          className="surface-panel rounded-[1.75rem] border-dashed p-8 text-center"
        >
          <h3 className="text-lg font-semibold text-stone-900">
            No prep tasks yet
          </h3>
          <p className="mt-2 text-sm text-stone-600">
            Add your first prep task above to start tracking kitchen work.
          </p>
        </section>
      )}
    </div>
  );
}
