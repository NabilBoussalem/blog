export function Newsletter() {
  return (
    <section className="overflow-hidden rounded-[2.5rem] border border-stone-200 bg-white shadow-card">
      <div className="grid gap-8 px-6 py-10 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-12 lg:py-14">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-terracotta-700">
            Newsletter
          </p>
          <h2 className="mt-4 font-serif text-5xl text-olive-950">
            Seasonal recipes, soft table settings, and simple kitchen notes.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-600">
            Join the Olive &amp; Thyme list for fresh weekly inspiration, menu ideas, and recipes worth repeating.
          </p>
        </div>
        <form className="space-y-4 rounded-[2rem] bg-cream-50 p-6" aria-label="Newsletter signup">
          <div>
            <label htmlFor="newsletter-name" className="mb-2 block text-sm font-medium text-stone-700">
              Name
            </label>
            <input
              id="newsletter-name"
              type="text"
              placeholder="Your first name"
              className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-700 outline-none focus:border-olive-300"
            />
          </div>
          <div>
            <label htmlFor="newsletter-email" className="mb-2 block text-sm font-medium text-stone-700">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-700 outline-none focus:border-olive-300"
            />
          </div>
          <button
            type="button"
            className="inline-flex w-full items-center justify-center rounded-2xl bg-olive-900 px-5 py-3 text-sm font-semibold text-cream-50 transition hover:bg-olive-700"
          >
            Join the list
          </button>
          <p className="text-xs leading-6 text-stone-500">No spam, just cozy recipes and thoughtful kitchen inspiration.</p>
        </form>
      </div>
    </section>
  );
}
