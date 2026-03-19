export default function PrepPage() {
  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-3xl font-semibold tracking-tight text-stone-900">
          Prep Tasks
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-stone-600 sm:text-base">
          Prep task tracking will be added later. This page is a simple
          placeholder so the project structure is ready to grow.
        </p>
      </section>

      <section className="rounded-2xl border border-dashed border-stone-300 bg-white p-5">
        <p className="text-sm text-stone-600">
          Future versions can show prep lists, due times, and task status here.
        </p>
      </section>
    </div>
  );
}
