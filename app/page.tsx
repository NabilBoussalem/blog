import Link from "next/link";
import { RecipeCard } from "@/components/RecipeCard";
import { getAllRecipeSummaries, getTaxonomy } from "@/lib/recipes";

export default function Home() {
  const recipes = getAllRecipeSummaries();
  const featured = recipes.slice(0, 3);
  const latest = recipes.slice(0, 6);
  const categories = getTaxonomy("category");

  return (
    <div className="space-y-14 pb-10">
      <section className="rounded-3xl bg-gradient-to-br from-yellow-100 via-lime-50 to-emerald-100 p-8">
        <h1 className="text-4xl font-bold text-emerald-900">Cold Summer Recipes for Busy Days</h1>
        <p className="mt-4 max-w-2xl text-slate-700">
          Discover light, refreshing meals from chilled soups to no-bake desserts. Every recipe is
          quick, nourishing, and made for hot weather cooking.
        </p>
        <div className="mt-6 flex gap-3">
          <Link href="/recipes" className="rounded-full bg-emerald-600 px-5 py-2 text-white">
            Browse Recipes
          </Link>
          <Link
            href="/about"
            className="rounded-full border border-emerald-300 bg-white px-5 py-2 text-emerald-800"
          >
            About this blog
          </Link>
        </div>
      </section>

      <section>
        <h2 className="mb-5 text-2xl font-semibold text-slate-900">Featured recipes</h2>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((recipe, index) => (
            <RecipeCard key={recipe.slug} recipe={recipe} priority={index === 0} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-5 text-2xl font-semibold text-slate-900">Browse by category</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="rounded-2xl border border-emerald-100 bg-white p-4 hover:border-emerald-300"
            >
              <p className="font-semibold text-slate-900">{category.name}</p>
              <p className="text-sm text-slate-600">{category.count} recipes</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-5 text-2xl font-semibold text-slate-900">Latest recipes</h2>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {latest.map((recipe) => (
            <RecipeCard key={recipe.slug} recipe={recipe} />
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-emerald-100 bg-white p-6 leading-7 text-slate-700">
        <h2 className="text-2xl font-semibold text-slate-900">Why these cold summer recipes?</h2>
        <p className="mt-3">
          This recipe collection is built around easy prep, hydrating ingredients, and make-ahead
          convenience. You will find salads, smoothie bowls, overnight oats, iced drinks, and
          chilled soups that are ideal for warm evenings, picnics, and meal prep.
        </p>
      </section>
    </div>
  );
}
