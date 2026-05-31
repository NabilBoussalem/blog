import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { RecipesBrowser } from "@/components/RecipesBrowser";
import { getAllRecipes, getRecipeCategories } from "@/lib/recipes";

export const metadata: Metadata = {
  title: "Recipes",
  description: "Browse the full library of French recipes with category filters and instant search.",
};

export default function RecipesPage() {
  const recipes = getAllRecipes();
  const categories = getRecipeCategories();

  return (
    <section className="py-16 sm:py-20">
      <Container className="space-y-8">
        <div className="max-w-3xl space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">Recipe archive</p>
          <h1 className="text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl">French recipes you can search, filter, and cook any day of the week.</h1>
          <p className="text-lg leading-8 text-stone-600">
            Every recipe is written in MDX, making the collection easy to maintain while keeping the site fast and statically generated.
          </p>
        </div>
        <RecipesBrowser categories={categories} recipes={recipes} />
      </Container>
    </section>
  );
}
