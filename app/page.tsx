import { auth } from "@clerk/nextjs/server";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home",
  description:
    "A beginner-friendly full-stack portfolio project for restaurant inventory tracking, low-stock alerts, and prep task management.",
};

const featureCards = [
  {
    title: "User-Scoped Inventory",
    description:
      "Signed-in users manage their own inventory items with database-backed create, edit, delete, search, and filtering flows.",
  },
  {
    title: "Low Stock Visibility",
    description:
      "The app highlights low and critical stock items with alert sections, status badges, and dashboard summaries.",
  },
  {
    title: "Prep Task Tracking",
    description:
      "Kitchen prep tasks can be added, updated, completed, and reviewed from a dedicated protected page.",
  },
];

const stackItems = [
  "Next.js App Router",
  "TypeScript",
  "Tailwind CSS",
  "Prisma",
  "PostgreSQL",
  "Clerk",
  "Zod",
];

export default async function Home() {
  const { userId } = await auth();

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium text-stone-500">Portfolio Project</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900">
          Restaurant Inventory Tracker
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-stone-600 sm:text-base">
          A beginner-friendly full-stack portfolio project built to help
          restaurant teams track inventory, catch low-stock risk early, and
          manage prep tasks in one place.
        </p>
        <p className="mt-3 text-sm text-stone-500">
          The public home page introduces the project, while the main app areas
          stay protected behind Clerk authentication.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          {userId ? (
            <>
              <Link
                href="/dashboard"
                prefetch={false}
                className="rounded-xl bg-stone-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-stone-700"
              >
                Go to Dashboard
              </Link>
              <Link
                href="/inventory"
                prefetch={false}
                className="rounded-xl border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-100"
              >
                Open Inventory
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="rounded-xl bg-stone-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-stone-700"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="rounded-xl border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-100"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {featureCards.map((card) => (
          <div
            key={card.title}
            className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm"
          >
            <h2 className="text-lg font-semibold text-stone-900">{card.title}</h2>
            <p className="mt-2 text-sm text-stone-600">{card.description}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-stone-900">
            What&apos;s Implemented
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-stone-600">
            <li>Protected dashboard, inventory, and prep routes</li>
            <li>Database-backed inventory CRUD with low-stock alerts</li>
            <li>Database-backed prep task CRUD with completion flow</li>
            <li>User-scoped data using Clerk auth and Prisma queries</li>
            <li>Beginner-friendly form validation with Zod</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-stone-900">Tech Stack</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {stackItems.map((item) => (
              <span
                key={item}
                className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-700"
              >
                {item}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm text-stone-600">
            The goal is to stay small, readable, and portfolio-friendly while
            still covering real full-stack patterns.
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Link
          href="/dashboard"
          prefetch={false}
          className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:border-stone-300"
        >
          <h2 className="text-lg font-semibold text-stone-900">Dashboard</h2>
          <p className="mt-2 text-sm text-stone-600">
            View inventory risk, open prep work, and low-stock alert summaries.
          </p>
        </Link>

        <Link
          href="/inventory"
          prefetch={false}
          className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:border-stone-300"
        >
          <h2 className="text-lg font-semibold text-stone-900">Inventory</h2>
          <p className="mt-2 text-sm text-stone-600">
            Manage inventory items with search, filters, validation, and stock
            status alerts.
          </p>
        </Link>

        <Link
          href="/prep"
          prefetch={false}
          className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:border-stone-300"
        >
          <h2 className="text-lg font-semibold text-stone-900">Prep</h2>
          <p className="mt-2 text-sm text-stone-600">
            Track prep tasks with create, edit, delete, and complete flows.
          </p>
        </Link>
      </section>
    </div>
  );
}
