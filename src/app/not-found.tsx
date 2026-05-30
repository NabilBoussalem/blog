import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-border bg-card px-6 py-12 shadow-[0_20px_50px_rgba(79,55,38,0.07)] sm:px-10">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">Recipe not found</p>
        <h1 className="mt-4 font-serif text-5xl">That page has left the oven.</h1>
        <p className="mt-5 text-lg leading-8 text-muted">
          The recipe you were looking for isn’t here yet. Head back to the full collection to keep browsing.
        </p>
        <Link
          href="/recipes"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-accent-strong"
        >
          Browse recipes
        </Link>
      </div>
    </div>
  );
}
