import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default async function AppHeader() {
  const { userId } = await auth();

  return (
    <header className="border-b border-[rgba(127,94,67,0.12)] bg-[rgba(252,248,242,0.72)] backdrop-blur-xl">
      <div className="flex flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="space-y-2">
          <p className="pill-label w-fit">Restaurant operations demo</p>
          <div>
            <p className="eyebrow">Beginner-Friendly Full-Stack App</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-stone-950 [font-family:var(--font-fraunces)]">
              Restaurant Inventory Tracker
            </h1>
          </div>
          <p className="max-w-2xl text-sm leading-6 text-stone-600">
            {userId
              ? "You are signed in. Your dashboard, inventory, and prep data are scoped to your account."
              : "Sign in to explore the protected dashboard, inventory, and prep workflows."}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 lg:justify-end">
          {userId ? (
            <>
              <Link
                href="/dashboard"
                prefetch={false}
                className="button-secondary rounded-xl px-4 py-2 text-sm font-medium transition"
              >
                Dashboard
              </Link>
              <div aria-label="User account menu" className="rounded-full bg-white/80 p-1 shadow-[0_14px_28px_-24px_rgba(35,24,21,0.7)]">
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox:
                        "h-10 w-10 ring-4 ring-white/70 shadow-[0_12px_22px_-18px_rgba(35,24,21,0.7)]",
                      userButtonTrigger:
                        "rounded-full transition hover:scale-[1.02]",
                      userButtonPopoverCard:
                        "border border-[rgba(137,98,66,0.16)] bg-[#fffdf9] shadow-[0_22px_45px_-32px_rgba(62,39,20,0.55)]",
                    },
                  }}
                />
              </div>
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="button-secondary rounded-xl px-4 py-2 text-sm font-medium transition"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="button-primary rounded-xl px-4 py-2 text-sm font-medium transition"
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
