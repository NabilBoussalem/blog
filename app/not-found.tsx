import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-xl space-y-3 rounded-2xl bg-white p-6 text-center">
      <h1 className="text-3xl font-bold text-slate-900">Recipe not found</h1>
      <p className="text-slate-700">The page you are looking for does not exist or was removed.</p>
      <Link href="/recipes" className="inline-block rounded-full bg-emerald-600 px-5 py-2 text-white">
        Back to recipes
      </Link>
    </section>
  );
}
