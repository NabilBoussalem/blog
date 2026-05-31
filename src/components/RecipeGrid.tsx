import { RecipeMeta } from "@/lib/types";
import RecipeCard from "./RecipeCard";

interface RecipeGridProps {
  recipes: RecipeMeta[];
}

/** Responsive grid of recipe cards */
export default function RecipeGrid({ recipes }: RecipeGridProps) {
  if (recipes.length === 0) {
    return (
      <p className="text-center text-amber-600 py-12 text-lg">
        No recipes found. Try adjusting your search or filters.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.slug} recipe={recipe} />
      ))}
    </div>
  );
}
