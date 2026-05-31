import type { Recipe } from "@/types/recipe";

type RecipeMetaProps = {
  recipe: Pick<Recipe, "category" | "prepTime" | "cookTime" | "servings" | "difficulty" | "date">;
  compact?: boolean;
};

export function RecipeMeta({ recipe, compact = false }: RecipeMetaProps) {
  const items = [
    ["Category", recipe.category],
    ["Prep", recipe.prepTime],
    ["Cook", recipe.cookTime],
    ["Servings", String(recipe.servings)],
    ["Difficulty", recipe.difficulty],
  ];

  return (
    <div className={compact ? "grid grid-cols-2 gap-3 text-sm text-stone-600 sm:grid-cols-3" : "grid gap-4 rounded-3xl border border-amber-100 bg-amber-50/70 p-6 text-sm text-stone-700 sm:grid-cols-2 lg:grid-cols-5"}>
      {items.map(([label, value]) => (
        <div key={label}>
          <p className="font-medium text-stone-500">{label}</p>
          <p className="mt-1 text-base font-semibold text-stone-900">{value}</p>
        </div>
      ))}
      {!compact ? (
        <div className="sm:col-span-2 lg:col-span-5">
          <p className="font-medium text-stone-500">Published</p>
          <p className="mt-1 text-base font-semibold text-stone-900">{new Date(recipe.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
        </div>
      ) : null}
    </div>
  );
}
