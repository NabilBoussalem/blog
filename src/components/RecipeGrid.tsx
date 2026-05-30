import { RecipeCard } from "@/components/RecipeCard";
import type { RecipeSummary } from "@/lib/recipes";

type RecipeGridProps = {
  recipes: RecipeSummary[];
  emptyTitle?: string;
  emptyDescription?: string;
};

export function RecipeGrid({
  recipes,
  emptyTitle = "No recipes yet",
  emptyDescription = "Add a few MDX recipe files to start filling this collection.",
}: RecipeGridProps) {
  if (recipes.length === 0) {
    return (
      <div className="rounded-[2rem] border border-dashed border-border bg-card px-6 py-14 text-center shadow-[0_18px_40px_rgba(79,55,38,0.04)]">
        <h3 className="font-serif text-3xl text-foreground">{emptyTitle}</h3>
        <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-muted">{emptyDescription}</p>
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
