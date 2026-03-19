export default function AppHeader() {
  return (
    <header className="border-b border-stone-200 bg-white">
      <div className="px-4 py-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
          Admin Shell
        </p>
        <h1 className="mt-1 text-xl font-semibold text-stone-900">
          Restaurant Inventory Tracker
        </h1>
        <p className="mt-1 text-sm text-stone-600">
          A simple starter layout for a beginner-friendly portfolio project.
        </p>
      </div>
    </header>
  );
}
