import Link from "next/link";
import { getAllRecipes, getFeaturedRecipes, getAllCategories } from "@/lib/recipes";
import RecipeGrid from "@/components/RecipeGrid";

export default function HomePage() {
  const allRecipes = getAllRecipes();
  const featuredRecipes = getFeaturedRecipes(3);
  const latestRecipes = allRecipes.slice(0, 6);
  const categories = getAllCategories();

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-stone-100 via-terracotta-50 to-gold-50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-800 tracking-tight leading-tight">
            Simple, Delicious Recipes
            <br />
            <span className="text-terracotta-600">for Every Day</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-stone-500 max-w-2xl mx-auto leading-relaxed">
            Discover comforting meals, fresh ideas, and easy-to-follow recipes
            that bring joy to your kitchen.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/recipes"
              className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-terracotta-600 text-white font-medium hover:bg-terracotta-700 transition-colors shadow-md"
            >
              Browse Recipes
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-white text-stone-700 font-medium hover:bg-stone-50 transition-colors border border-stone-200"
            >
              About Us
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Recipes */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-800">
              Featured Recipes
            </h2>
            <p className="mt-3 text-stone-500">
              Our most loved dishes, handpicked for you
            </p>
          </div>
          <RecipeGrid
            recipes={featuredRecipes}
            emptyMessage="No featured recipes yet. Check back soon!"
          />
        </div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-stone-800">
                Browse by Category
              </h2>
              <p className="mt-3 text-stone-500">
                Find exactly what you&apos;re craving
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.map((category) => {
                const count = allRecipes.filter(
                  (r) => r.frontmatter.category === category
                ).length;
                return (
                  <Link
                    key={category}
                    href={`/recipes?category=${category}`}
                    className="group bg-stone-50 hover:bg-terracotta-50 rounded-2xl p-6 text-center transition-all hover:shadow-md border border-stone-100 hover:border-terracotta-200"
                  >
                    <h3 className="text-lg font-semibold text-stone-800 group-hover:text-terracotta-700">
                      {category}
                    </h3>
                    <p className="mt-1 text-sm text-stone-400">
                      {count} {count === 1 ? "recipe" : "recipes"}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Latest Recipes */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-stone-800">
                Latest Recipes
              </h2>
              <p className="mt-3 text-stone-500">
                Fresh from our kitchen to yours
              </p>
            </div>
            <Link
              href="/recipes"
              className="hidden sm:inline-flex items-center gap-2 text-terracotta-600 hover:text-terracotta-700 font-medium transition-colors"
            >
              View all
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
          <RecipeGrid
            recipes={latestRecipes}
            emptyMessage="No recipes published yet. Stay tuned!"
          />
          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/recipes"
              className="inline-flex items-center gap-2 text-terracotta-600 hover:text-terracotta-700 font-medium"
            >
              View all recipes →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
