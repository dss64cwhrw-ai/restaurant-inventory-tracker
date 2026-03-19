import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/inventory", label: "Inventory" },
  { href: "/prep", label: "Prep" },
];

export default function AppSidebar() {
  return (
    <aside className="border-b border-stone-200 bg-white lg:min-h-screen lg:border-r lg:border-b-0">
      <div className="px-4 py-5 sm:px-6 lg:px-5">
        <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
            Project
          </p>
          <p className="mt-2 text-lg font-semibold text-stone-900">
            Inventory Tracker
          </p>
          <p className="mt-1 text-sm text-stone-600">
            Starter navigation for the first stage of the app.
          </p>
        </div>

        <nav className="mt-5 flex flex-col gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl px-3 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-100 hover:text-stone-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
