import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="grid min-h-[70vh] gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
      <section className="surface-panel-strong flex rounded-[2rem] p-6 sm:p-8">
        <div className="my-auto">
          <p className="pill-label">Create Account</p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-stone-950 [font-family:var(--font-fraunces)]">
            Start tracking stock and prep with your own account
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-stone-600 sm:text-base">
            This keeps the portfolio app approachable while still showing
            protected routes, user-scoped data, and full-stack workflows in a
            polished light theme.
          </p>
        </div>
      </section>

      <div className="flex items-center justify-center">
        <SignUp
          path="/sign-up"
          routing="path"
          signInUrl="/sign-in"
          appearance={{
            elements: {
              rootBox: "w-full max-w-md",
            },
          }}
        />
      </div>
    </div>
  );
}
