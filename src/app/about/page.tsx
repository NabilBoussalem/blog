import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Meet the voice behind Harvest Table and the story behind the recipe journal.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <section className="rounded-[2rem] border border-border bg-card p-8 shadow-[0_20px_50px_rgba(79,55,38,0.07)] sm:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">About Harvest Table</p>
        <h1 className="mt-4 font-serif text-5xl text-balance">A recipe journal built for calm, flavorful cooking.</h1>
        <div className="mt-8 space-y-6 text-lg leading-8 text-muted">
          <p>
            I created Harvest Table as a place to collect the meals I return to most: nourishing dinners, simple baking, and the kind of recipes that make a home feel warmer.
          </p>
          <p>
            Every post is written to feel editorial yet practical — with clean ingredient lists, relaxed instructions, and enough detail to help you cook confidently whether it’s a Tuesday night or a slow Sunday lunch.
          </p>
          <p>
            The blog is inspired by generous tables, pantry staples, and recipes that balance comfort with freshness. Think soft cream sauces, citrus-bright roasts, olive oil cakes, and sides you’ll want to make again the very next week.
          </p>
        </div>
      </section>
    </div>
  );
}
