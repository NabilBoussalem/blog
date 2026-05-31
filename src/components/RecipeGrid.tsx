import type { Recipe } from "@/types/recipe";

import { RecipeCard } from "./RecipeCard";

type RecipeGridProps = {
  recipes: Recipe[];
  emptyTitle?: string;
  emptyDescription?: string;
};

export function RecipeGrid({
  recipes,
  emptyTitle = "No recipes found",
  emptyDescription = "Try a broader search or clear one of the active filters.",
}: RecipeGridProps) {
  if (!recipes.length) {
    return (
      <div className="rounded-[2rem] border border-dashed border-stone-300 bg-white/70 px-8 py-16 text-center shadow-sm">
        <h2 className="font-serif text-4xl text-olive-950">{emptyTitle}</h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-600">{emptyDescription}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {recipes.map((recipe, index) => (
        <RecipeCard key={recipe.slug} recipe={recipe} priority={index < 2} />
      ))}
    </div>
  );
}
