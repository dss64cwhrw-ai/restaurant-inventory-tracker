"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/inventory", label: "Inventory" },
  { href: "/prep", label: "Prep" },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="border-b border-[rgba(127,94,67,0.12)] bg-[rgba(252,248,242,0.76)] backdrop-blur-xl lg:min-h-screen lg:border-r lg:border-b-0">
      <div className="px-4 py-5 sm:px-6 lg:sticky lg:top-0 lg:px-5 lg:py-6">
        <div className="surface-panel-strong rounded-[1.9rem] p-5">
          <p className="pill-label">Portfolio Project</p>
          <p className="mt-4 text-2xl font-semibold tracking-tight text-stone-950 [font-family:var(--font-fraunces)]">
            Inventory Tracker
          </p>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            Inventory, low-stock visibility, and prep tracking in one simple
            full-stack demo.
          </p>
        </div>

        <nav aria-label="Primary" className="mt-5 flex flex-col gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              prefetch={item.href === "/" ? undefined : false}
              aria-current={pathname === item.href ? "page" : undefined}
              className={
                pathname === item.href
                  ? "rounded-2xl border border-[rgba(127,94,67,0.16)] bg-white px-4 py-3 text-sm font-medium text-stone-950 shadow-[0_16px_28px_-24px_rgba(35,24,21,0.72)]"
                  : "rounded-2xl border border-transparent px-4 py-3 text-sm font-medium text-stone-700 transition hover:border-[rgba(127,94,67,0.12)] hover:bg-white/70 hover:text-stone-950"
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-6 rounded-[1.5rem] border border-[rgba(127,94,67,0.1)] bg-white/55 p-4">
          <p className="eyebrow">Current Scope</p>
          <p className="mt-2 text-sm font-semibold text-stone-900">
            Same product flow, cleaner presentation
          </p>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            This interface pass keeps the existing auth, Prisma, CRUD, tests,
            and protected routes intact.
          </p>
        </div>
      </div>
    </aside>
  );
}
