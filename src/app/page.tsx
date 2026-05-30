import Link from "next/link";
import { RecipeGrid } from "@/components/RecipeGrid";
import { getAllCategories, getAllRecipes, getFeaturedRecipes } from "@/lib/recipes";

export const metadata = {
  title: "Simple, Delicious Recipes for Every Day",
  description:
    "Discover cozy, modern recipes with elegant ingredient stories, practical tips, and everyday inspiration.",
};

export default async function HomePage() {
  const [featuredRecipes, latestRecipes, categories] = await Promise.all([
    getFeaturedRecipes(2),
    getAllRecipes().then((recipes) => recipes.slice(0, 3)),
    getAllCategories(),
  ]);

  return (
    <div className="pb-20">
      <section className="mx-auto grid max-w-6xl gap-10 px-4 pt-8 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:pt-14">
        <div className="rounded-[2rem] border border-border bg-card px-6 py-10 shadow-[0_24px_60px_rgba(79,55,38,0.08)] sm:px-10 sm:py-14">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-accent">
            Warm recipes, thoughtful cooking
          </p>
          <h1 className="max-w-2xl font-serif text-5xl leading-tight text-balance sm:text-6xl">
            Simple, Delicious Recipes for Every Day
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
            Seasonal dinners, cozy baking, and easy kitchen rituals — crafted to feel elegant enough for guests and simple enough for weeknights.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/recipes"
              className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-accent-strong"
            >
              Browse recipes
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-full border border-border bg-white px-6 py-3 text-sm font-semibold text-foreground transition hover:-translate-y-0.5 hover:border-accent/30 hover:text-accent"
            >
              Meet the cook
            </Link>
          </div>
        </div>

        <aside className="grid gap-5 rounded-[2rem] bg-[#f0e4d6] p-6 shadow-[0_20px_50px_rgba(79,55,38,0.08)]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-olive">
              At a glance
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {[
                ["Fresh recipes", "5 starter posts"],
                ["Editor’s picks", `${featuredRecipes.length} featured dishes`],
                ["Kitchen moods", `${categories.length} categories`],
              ].map(([label, value]) => (
                <div key={label} className="rounded-3xl bg-white/80 p-4">
                  <p className="text-sm text-muted">{label}</p>
                  <p className="mt-2 font-serif text-2xl text-foreground">{value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl bg-olive px-5 py-6 text-white">
            <p className="text-sm uppercase tracking-[0.24em] text-white/75">Today’s mood</p>
            <p className="mt-3 font-serif text-3xl">Comforting, bright, and just a little luxurious.</p>
          </div>
        </aside>
      </section>

      <section className="mx-auto mt-16 max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">Featured recipes</p>
            <h2 className="mt-2 font-serif text-4xl">Start with the favorites</h2>
          </div>
          <Link href="/recipes" className="text-sm font-semibold text-accent transition hover:text-accent-strong">
            View all recipes
          </Link>
        </div>
        <RecipeGrid recipes={featuredRecipes} />
      </section>

      <section className="mx-auto mt-16 max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-olive">Latest recipes</p>
          <h2 className="mt-2 font-serif text-4xl">Fresh from the kitchen journal</h2>
        </div>
        <RecipeGrid recipes={latestRecipes} />
      </section>

      <section className="mx-auto mt-16 max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-border bg-card p-6 shadow-[0_18px_40px_rgba(79,55,38,0.06)] sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold">Categories</p>
          <h2 className="mt-2 font-serif text-4xl">Browse by appetite</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/recipes?category=${encodeURIComponent(category)}`}
                className="group rounded-3xl border border-border bg-white px-5 py-6 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <p className="font-serif text-2xl text-foreground">{category}</p>
                <p className="mt-2 text-sm leading-7 text-muted">
                  Explore recipes curated around {category.toLowerCase()} moments.
                </p>
                <span className="mt-4 inline-flex text-sm font-semibold text-accent transition group-hover:text-accent-strong">
                  Explore category →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
