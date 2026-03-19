import { auth } from "@clerk/nextjs/server";
import PrepManager from "@/components/prep/PrepManager";
import { getPrepTasks } from "@/lib/prep";

export const dynamic = "force-dynamic";

export default async function PrepPage() {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) {
    return redirectToSignIn();
  }

  const tasks = await getPrepTasks(userId);

  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-3xl font-semibold tracking-tight text-stone-900">
          Prep Tasks
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-stone-600 sm:text-base">
          This page loads only your prep tasks from the database. You can add,
          update, complete, and remove tasks for your own kitchen workflow.
        </p>
      </section>

      <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
        <div>
          <h2 className="text-lg font-semibold text-stone-900">
            Today&apos;s Prep Workflow
          </h2>
          <p className="mt-1 text-sm text-stone-600">
            Keep prep organized by tracking the station, due time, and current
            task status in one place.
          </p>
        </div>
      </section>

      <PrepManager initialTasks={tasks} />

      <section className="rounded-2xl border border-dashed border-stone-300 bg-stone-50 p-5">
        <p className="text-sm text-stone-600">
          Prep changes now save to PostgreSQL through Prisma and stay after
          refresh.
        </p>
      </section>
    </div>
  );
}
