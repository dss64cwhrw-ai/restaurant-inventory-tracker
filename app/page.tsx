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

const workflowSteps = [
  {
    title: "Sign In Securely",
    description:
      "Clerk handles authentication while protected routes keep dashboard, inventory, and prep workflows private.",
  },
  {
    title: "Track Stock",
    description:
      "Inventory items are stored in PostgreSQL through Prisma, with search, filters, and edit flows kept intentionally readable.",
  },
  {
    title: "Spot Risk Early",
    description:
      "Low-stock indicators and dashboard summaries help surface what needs attention before service gets disrupted.",
  },
  {
    title: "Manage Prep Work",
    description:
      "Prep tasks stay tied to the signed-in user so day-to-day kitchen work can be planned and reviewed in one place.",
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
    <div className="section-shell">
      <section className="surface-panel-strong section-block relative overflow-hidden">
        <div className="hero-orb hero-orb-primary -right-16 -top-16 h-56 w-56" />
        <div className="hero-orb hero-orb-secondary -bottom-16 right-28 h-48 w-48" />
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div className="relative">
            <p className="pill-label">Full-Stack Portfolio Project</p>
            <h1 className="page-title mt-6 font-semibold text-stone-950 [font-family:var(--font-fraunces)]">
              Restaurant Inventory Tracker
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-stone-700">
              A simple, modern restaurant operations demo built to show
              authentication, protected routes, Prisma-backed CRUD, and a clean
              App Router structure in a way that still feels approachable.
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-600">
              The product focuses on inventory visibility, low-stock awareness,
              and prep task tracking, while keeping the UI understandable for a
              beginner-friendly portfolio project.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              {userId ? (
                <>
                  <Link
                    href="/dashboard"
                    prefetch={false}
                    className="button-primary rounded-xl px-4 py-2.5 text-sm font-medium transition"
                  >
                    Open Dashboard
                  </Link>
                  <Link
                    href="/inventory"
                    prefetch={false}
                    className="button-secondary rounded-xl px-4 py-2.5 text-sm font-medium transition"
                  >
                    Review Inventory
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/sign-in"
                    className="button-primary rounded-xl px-4 py-2.5 text-sm font-medium transition"
                  >
                    Sign In to Explore
                  </Link>
                  <Link
                    href="/sign-up"
                    className="button-secondary rounded-xl px-4 py-2.5 text-sm font-medium transition"
                  >
                    Create an Account
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="relative rounded-[1.85rem] border border-[rgba(127,94,67,0.14)] bg-[#fffaf4]/88 p-5 shadow-[0_26px_50px_-36px_rgba(62,39,20,0.65)]">
            <p className="eyebrow">Overview</p>
            <div className="mt-5 grid gap-4">
              <div className="rounded-[1.45rem] bg-[var(--accent-soft)] p-4">
                <p className="text-sm font-medium text-stone-500">Primary Goal</p>
                <p className="mt-2 text-lg font-semibold text-stone-950">
                  Give restaurant teams a clearer view of stock health and prep work.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <div className="rounded-[1.35rem] bg-white/80 p-4">
                  <p className="text-sm font-medium text-stone-500">Protected Areas</p>
                  <p className="mt-2 text-3xl font-semibold text-stone-950">3</p>
                  <p className="mt-1 text-sm text-stone-600">
                    Dashboard, inventory, and prep.
                  </p>
                </div>
                <div className="rounded-[1.35rem] bg-white/80 p-4">
                  <p className="text-sm font-medium text-stone-500">Data Layer</p>
                  <p className="mt-2 text-lg font-semibold text-stone-950">
                    Clerk, Prisma, PostgreSQL
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="section-heading">
          <p className="eyebrow">Overview</p>
          <h2>Built to present real full-stack patterns clearly.</h2>
          <p>
            This app is intentionally small in scope, but it still demonstrates
            the product fundamentals employers expect to see: authentication,
            protected routes, server-side data access, validation, CRUD flows,
            and thoughtful UI states.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-[1.75rem] bg-white/70 p-5 shadow-[0_18px_34px_-30px_rgba(62,39,20,0.55)]">
            <p className="eyebrow">Why It Exists</p>
            <p className="mt-3 text-lg font-semibold text-stone-950">
              A portfolio-ready demo of restaurant operations software.
            </p>
          </div>
          <div className="rounded-[1.75rem] bg-[var(--teal-soft)]/80 p-5 shadow-[0_18px_34px_-30px_rgba(62,39,20,0.55)]">
            <p className="eyebrow">What It Emphasizes</p>
            <p className="mt-3 text-lg font-semibold text-stone-950">
              Clear workflows, safe structure, and readable implementation.
            </p>
          </div>
        </div>
      </section>

      <section className="section-block section-card">
        <div className="section-heading">
          <p className="eyebrow">Capabilities</p>
          <h2>Core product areas are grouped around practical restaurant tasks.</h2>
          <p>
            Instead of presenting disconnected features, the app is organized
            around the everyday problems it helps solve: stock tracking, alert
            visibility, and prep coordination.
          </p>
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {featureCards.map((card) => (
            <div
              key={card.title}
              className="rounded-[1.65rem] border border-[rgba(127,94,67,0.1)] bg-white/70 p-5"
            >
              <p className="eyebrow">Feature</p>
              <h3 className="mt-3 text-xl font-semibold text-stone-950">
                {card.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-stone-600">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="section-heading">
          <p className="eyebrow">Workflow</p>
          <h2>Simple flow from authentication to action.</h2>
          <p>
            The product is designed so a user can sign in, review risk, update
            inventory, and track prep tasks without getting lost in the UI.
          </p>
        </div>
        <div className="grid gap-4">
          {workflowSteps.map((step, index) => (
            <div
              key={step.title}
              className="grid gap-4 rounded-[1.7rem] border border-[rgba(127,94,67,0.1)] bg-white/74 p-5 sm:grid-cols-[auto_1fr]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--accent-soft)] text-sm font-semibold text-[var(--accent-strong)]">
                {index + 1}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-stone-950">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-stone-600">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
        <div className="surface-panel section-block">
          <div className="section-heading">
            <p className="eyebrow">About</p>
            <h2>A portfolio project framed like a real product, not a toy example.</h2>
            <p>
              This project is meant to show thoughtful engineering decisions in
              a scope that is still easy to follow. It keeps the architecture
              simple, but still demonstrates patterns like protected data access,
              database-backed UI, and validation-driven form handling.
            </p>
          </div>
        </div>

        <div className="surface-panel section-block">
          <div className="section-heading">
            <p className="eyebrow">Stack</p>
            <h2>Small stack, practical choices.</h2>
            <p>
              The implementation stays focused on readable, mainstream tools so
              the project remains approachable and easy to discuss in a portfolio.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {stackItems.map((item) => (
              <span key={item} className="pill-label">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Link
          href="/dashboard"
          prefetch={false}
          className="rounded-[1.75rem] bg-white/70 p-5 shadow-[0_18px_32px_-28px_rgba(62,39,20,0.55)] transition hover:-translate-y-0.5"
        >
          <p className="eyebrow">Explore</p>
          <h2 className="mt-3 text-xl font-semibold text-stone-950">Dashboard</h2>
          <p className="mt-3 text-sm leading-7 text-stone-600">
            Review inventory risk, low-stock alerts, and open prep totals in one
            summary view.
          </p>
        </Link>

        <Link
          href="/inventory"
          prefetch={false}
          className="rounded-[1.75rem] bg-white/70 p-5 shadow-[0_18px_32px_-28px_rgba(62,39,20,0.55)] transition hover:-translate-y-0.5"
        >
          <p className="eyebrow">Explore</p>
          <h2 className="mt-3 text-xl font-semibold text-stone-950">Inventory</h2>
          <p className="mt-3 text-sm leading-7 text-stone-600">
            Manage stock with readable forms, filters, status badges, and alert-driven visibility.
          </p>
        </Link>

        <Link
          href="/prep"
          prefetch={false}
          className="rounded-[1.75rem] bg-white/70 p-5 shadow-[0_18px_32px_-28px_rgba(62,39,20,0.55)] transition hover:-translate-y-0.5"
        >
          <p className="eyebrow">Explore</p>
          <h2 className="mt-3 text-xl font-semibold text-stone-950">Prep</h2>
          <p className="mt-3 text-sm leading-7 text-stone-600">
            Track prep work with a simple task table, completion states, and clear editing flows.
          </p>
        </Link>
      </section>

      <section className="surface-panel-strong section-block">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="section-heading max-w-3xl">
            <p className="eyebrow">Ready To Explore</p>
            <h2>See the protected product areas and the full-stack workflow in action.</h2>
            <p>
              The public page explains the project. The protected pages show the
              actual working dashboard, inventory management, and prep tracking experience.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Link
              href={userId ? "/dashboard" : "/sign-in"}
              prefetch={false}
              className="button-primary rounded-xl px-4 py-2.5 text-sm font-medium text-center transition"
            >
              {userId ? "Go to Dashboard" : "Sign In"}
            </Link>
            <Link
              href={userId ? "/inventory" : "/sign-up"}
              prefetch={false}
              className="button-secondary rounded-xl px-4 py-2.5 text-sm font-medium text-center transition"
            >
              {userId ? "Open Inventory" : "Create Account"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
