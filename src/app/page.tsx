import Link from "next/link";
import Container from "@/components/Container";
import RecipeGrid from "@/components/RecipeGrid";
import { getAllRecipes } from "@/lib/recipes";

export default function HomePage() {
  const allRecipes = getAllRecipes();
  const featuredRecipes = allRecipes.filter((r) => r.featured);
  const recentRecipes = allRecipes.slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 py-20">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-amber-900 mb-6">
              La Cuisine Française
            </h1>
            <p className="text-xl text-amber-700 mb-8 leading-relaxed">
              Discover the art of French cooking through authentic recipes passed down
              through generations. From rustic Provençal stews to elegant Parisian
              desserts, explore the flavors of France.
            </p>
            <Link
              href="/recipes"
              className="inline-block bg-amber-700 text-white px-8 py-3 rounded-full font-medium hover:bg-amber-800 transition-colors shadow-lg"
            >
              Browse All Recipes
            </Link>
          </div>
        </Container>
      </section>

      {/* Featured Recipes */}
      {featuredRecipes.length > 0 && (
        <Container>
          <h2 className="text-3xl font-serif font-bold text-amber-900 mb-6">
            ⭐ Featured Recipes
          </h2>
          <RecipeGrid recipes={featuredRecipes} />
        </Container>
      )}

      {/* Recent Recipes */}
      <Container>
        <h2 className="text-3xl font-serif font-bold text-amber-900 mb-6">
          🕐 Recent Recipes
        </h2>
        <RecipeGrid recipes={recentRecipes} />
        <div className="text-center mt-8">
          <Link
            href="/recipes"
            className="text-amber-700 hover:text-amber-900 font-medium underline underline-offset-4 transition-colors"
          >
            View all recipes →
          </Link>
        </div>
      </Container>
    </>
  );
}
