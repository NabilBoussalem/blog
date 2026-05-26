import type { Metadata } from "next";
import { RecipeSearch } from "@/components/RecipeSearch";
import { getAllRecipeSummaries } from "@/lib/recipes";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "All cold summer recipes",
  description:
    "Search and filter cold summer recipes by category, prep time, and tags. Find chilled salads, no-bake treats, and smoothies.",
  alternates: { canonical: "/recipes" },
  openGraph: {
    title: "All cold summer recipes",
    description: "Search, filter, and sort all recipes for hot summer days.",
    url: `${siteConfig.url}/recipes`,
  },
  twitter: {
    card: "summary_large_image",
    title: "All cold summer recipes",
    description: "Search, filter, and sort all recipes for hot summer days.",
  },
};

export default function RecipesPage() {
  const recipes = getAllRecipeSummaries();
  const categories = [...new Set(recipes.map((recipe) => recipe.category))].sort((a, b) =>
    a.localeCompare(b),
  );

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900">All Cold Summer Recipes</h1>
        <p className="text-slate-700">
          Search by title, ingredients, and tags. Filter by category and prep time, then sort by
          newest or fastest.
        </p>
      </header>
      <RecipeSearch recipes={recipes} categories={categories} />
    </section>
  );
}
