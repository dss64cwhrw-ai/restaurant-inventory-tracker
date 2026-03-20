import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="grid min-h-[70vh] gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
      <section className="surface-panel-strong flex rounded-[2rem] p-6 sm:p-8">
        <div className="my-auto">
          <p className="pill-label">Welcome Back</p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-stone-950 [font-family:var(--font-fraunces)]">
            Sign in to your restaurant workspace
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-stone-600 sm:text-base">
            Your dashboard, inventory, and prep tasks are already built. This
            screen just gets you back into the protected part of the app with a
            cleaner light-theme presentation.
          </p>
        </div>
      </section>

      <div className="flex items-center justify-center">
        <SignIn
          path="/sign-in"
          routing="path"
          signUpUrl="/sign-up"
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
