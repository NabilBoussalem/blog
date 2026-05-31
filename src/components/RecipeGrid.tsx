import { RecipeCard } from "@/components/RecipeCard";
import type { Recipe } from "@/types/recipe";

type RecipeGridProps = {
  recipes: Recipe[];
};

export function RecipeGrid({ recipes }: RecipeGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.slug} recipe={recipe} />
      ))}
    </div>
  );
}
