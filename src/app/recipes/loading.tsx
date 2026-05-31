export default function LoadingRecipes() {
  return (
    <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="h-[420px] animate-pulse rounded-[2rem] border border-stone-200 bg-white/70" />
        ))}
      </div>
    </div>
  );
}
