import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default async function AppHeader() {
  const { userId } = await auth();

  return (
    <header className="border-b border-stone-200 bg-white">
      <div className="flex flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
            Beginner-Friendly Full-Stack App
          </p>
          <h1 className="mt-1 text-xl font-semibold text-stone-900">
            Restaurant Inventory Tracker
          </h1>
          <p className="mt-1 text-sm text-stone-600">
            {userId
              ? "You are signed in. Your dashboard, inventory, and prep data are scoped to your account."
              : "Sign in to explore the protected dashboard, inventory, and prep workflows."}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {userId ? (
            <>
              <Link
                href="/dashboard"
                prefetch={false}
                className="rounded-xl border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-100"
              >
                Dashboard
              </Link>
              <div aria-label="User account menu">
                <UserButton />
              </div>
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="rounded-xl border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-100"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="rounded-xl bg-stone-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-stone-700"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
