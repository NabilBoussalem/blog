export default function Loading() {
  return (
    <div className="mx-auto flex min-h-[50vh] w-full max-w-7xl items-center justify-center px-5 py-20 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-stone-200 bg-white px-8 py-10 text-center shadow-card">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-terracotta-700">Loading</p>
        <h1 className="mt-4 font-serif text-4xl text-olive-950">Setting the table…</h1>
      </div>
    </div>
  );
}
