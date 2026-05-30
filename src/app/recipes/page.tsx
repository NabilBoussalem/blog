import { Metadata } from "next";
import { getAllRecipes, getAllCategories } from "@/lib/recipes";
import RecipesClient from "./RecipesClient";

export const metadata: Metadata = {
  title: "Recipes",
  description:
    "Browse all our delicious recipes. Filter by category, search by name, and find your next favorite meal.",
};

interface RecipesPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function RecipesPage({ searchParams }: RecipesPageProps) {
  const recipes = getAllRecipes();
  const categories = getAllCategories();
  const params = await searchParams;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-stone-800">All Recipes</h1>
        <p className="mt-3 text-lg text-stone-500">
          Explore our collection of tried-and-true recipes
        </p>
      </div>

      <RecipesClient
        recipes={recipes}
        categories={categories}
        initialCategory={params.category}
      />
    </div>
  );
}
