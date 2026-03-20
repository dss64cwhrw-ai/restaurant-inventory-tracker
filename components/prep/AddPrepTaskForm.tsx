"use client";

import { useState } from "react";
import { prepTaskSchema } from "@/lib/validations/prep";
import type { PrepTask, PrepTaskInput } from "@/types/prep";

type AddPrepTaskFormProps = {
  editingTask: PrepTask | null;
  errorMessage: string | null;
  isPending: boolean;
  onAddTask: (task: PrepTaskInput) => Promise<boolean>;
  onUpdateTask: (task: PrepTask) => Promise<boolean>;
  onCancelEdit: () => void;
};

type FormValues = {
  title: string;
  station: string;
  dueTime: string;
};

type FormErrors = {
  title?: string;
  station?: string;
  dueTime?: string;
};

const initialValues: FormValues = {
  title: "",
  station: "",
  dueTime: "",
};

function formatForDateTimeInput(dueTime: string) {
  const date = new Date(dueTime);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return localDate.toISOString().slice(0, 16);
}

function buildFormValues(task: PrepTask | null): FormValues {
  if (!task) {
    return initialValues;
  }

  return {
    title: task.title,
    station: task.station,
    dueTime: formatForDateTimeInput(task.dueTime),
  };
}

export default function AddPrepTaskForm({
  editingTask,
  errorMessage,
  isPending,
  onAddTask,
  onUpdateTask,
  onCancelEdit,
}: AddPrepTaskFormProps) {
  const [values, setValues] = useState<FormValues>(buildFormValues(editingTask));
  const [errors, setErrors] = useState<FormErrors>({});
  const formTitleId = editingTask
    ? `prep-form-title-${editingTask.id}`
    : "prep-form-title";

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
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
    const result = prepTaskSchema.safeParse({
      title: values.title,
      station: values.station,
      dueTime: values.dueTime,
    });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;

      nextErrors.title = fieldErrors.title?.[0];
      nextErrors.station = fieldErrors.station?.[0];
      nextErrors.dueTime = fieldErrors.dueTime?.[0];
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const nextTask = {
      title: values.title.trim(),
      station: values.station.trim(),
      dueTime: new Date(values.dueTime).toISOString(),
    };

    const wasSuccessful = editingTask
      ? await onUpdateTask({
          id: editingTask.id,
          completed: editingTask.completed,
          ...nextTask,
        })
      : await onAddTask(nextTask);

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
          {editingTask ? "Edit Prep Task" : "Add Prep Task"}
        </h2>
        <p className="mt-1 text-sm text-stone-600">
          {editingTask
            ? "Update the task details below, then save your changes."
            : "Add a simple prep task for your kitchen team."}
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
            htmlFor="title"
            className="block text-sm font-medium text-stone-700"
          >
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            aria-invalid={Boolean(errors.title)}
            aria-describedby={errors.title ? "prep-title-error" : undefined}
            value={values.title}
            onChange={handleChange}
            disabled={isPending}
            className="field-input mt-1 w-full rounded-xl px-3 py-2 text-sm text-stone-900 outline-none transition"
          />
          {errors.title ? (
            <p id="prep-title-error" className="mt-1 text-xs text-red-600">
              {errors.title}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="station"
            className="block text-sm font-medium text-stone-700"
          >
            Station
          </label>
          <input
            id="station"
            name="station"
            type="text"
            required
            aria-invalid={Boolean(errors.station)}
            aria-describedby={errors.station ? "prep-station-error" : undefined}
            value={values.station}
            onChange={handleChange}
            disabled={isPending}
            className="field-input mt-1 w-full rounded-xl px-3 py-2 text-sm text-stone-900 outline-none transition"
          />
          {errors.station ? (
            <p id="prep-station-error" className="mt-1 text-xs text-red-600">
              {errors.station}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="dueTime"
            className="block text-sm font-medium text-stone-700"
          >
            Due Time
          </label>
          <input
            id="dueTime"
            name="dueTime"
            type="datetime-local"
            required
            aria-invalid={Boolean(errors.dueTime)}
            aria-describedby={errors.dueTime ? "prep-due-time-error" : undefined}
            value={values.dueTime}
            onChange={handleChange}
            disabled={isPending}
            className="field-input mt-1 w-full rounded-xl px-3 py-2 text-sm text-stone-900 outline-none transition"
          />
          {errors.dueTime ? (
            <p id="prep-due-time-error" className="mt-1 text-xs text-red-600">
              {errors.dueTime}
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
              ? editingTask
                ? "Updating..."
                : "Adding..."
              : editingTask
                ? "Save Changes"
                : "Add Task"}
          </button>

          {editingTask ? (
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
