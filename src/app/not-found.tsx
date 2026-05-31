import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-7xl flex-col items-center justify-center px-5 py-16 text-center sm:px-6 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-terracotta-700">Not found</p>
      <h1 className="mt-4 font-serif text-6xl text-olive-950">That recipe is not on the table.</h1>
      <p className="mt-4 max-w-xl text-sm leading-7 text-stone-600">
        The page you were looking for could not be found. Try browsing the full recipe collection instead.
      </p>
      <Link
        href="/recipes"
        className="mt-8 inline-flex rounded-full bg-olive-900 px-5 py-3 text-sm font-semibold text-cream-50 transition hover:bg-olive-700"
      >
        Browse recipes
      </Link>
    </div>
  );
}
