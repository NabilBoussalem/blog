import Link from "next/link";
import { Suspense } from "react";
import { getAllRecipes, getFeaturedRecipes, getAllCategories } from "@/lib/recipes";
import RecipeGrid from "@/components/RecipeGrid";
import SearchBar from "@/components/SearchBar";
import CategoryCard from "@/components/CategoryCard";
import Newsletter from "@/components/Newsletter";

export default function HomePage() {
  const allRecipes = getAllRecipes();
  const featuredRecipes = getFeaturedRecipes();
  const categories = getAllCategories();
  const latestRecipes = allRecipes.slice(0, 6);

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-olive/10 via-cream to-golden/10 py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-stone-800 mb-6 leading-tight">
            Simple Recipes for Warm,
            <br />
            <span className="text-olive">Everyday Cooking</span>
          </h1>
          <p className="text-lg md:text-xl text-stone-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Fresh, comforting recipes inspired by Mediterranean kitchens,
            seasonal ingredients, and slow weekend meals.
          </p>
          <Suspense fallback={null}>
            <SearchBar placeholder="Search for a recipe or ingredient..." />
          </Suspense>
        </div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-stone-800 mb-2">
              Browse by Category
            </h2>
            <p className="text-stone-500">Find the perfect recipe for any meal</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <CategoryCard key={cat.name} name={cat.name} count={cat.count} />
            ))}
          </div>
        </section>
      )}

      {/* Featured Recipes */}
      {featuredRecipes.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-stone-800 mb-2">
                Featured Recipes
              </h2>
              <p className="text-stone-500">Our most-loved dishes</p>
            </div>
            <Link
              href="/recipes"
              className="text-sm font-medium text-olive hover:text-olive-dark transition-colors hidden sm:block"
            >
              View all →
            </Link>
          </div>
          <RecipeGrid recipes={featuredRecipes.slice(0, 3)} />
        </section>
      )}

      {/* Latest Recipes */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-stone-800 mb-2">
              Latest Recipes
            </h2>
            <p className="text-stone-500">Fresh from our kitchen</p>
          </div>
          <Link
            href="/recipes"
            className="text-sm font-medium text-olive hover:text-olive-dark transition-colors hidden sm:block"
          >
            View all →
          </Link>
        </div>
        <RecipeGrid
          recipes={latestRecipes}
          emptyMessage="No recipes yet. Check back soon!"
        />
      </section>

      {/* Newsletter */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Newsletter />
      </section>
    </div>
  );
}
