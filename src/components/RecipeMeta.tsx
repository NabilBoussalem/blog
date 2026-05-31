import type { Recipe } from "@/types/recipe";

const metaItems = [
  { key: "prepTime", label: "Prep" },
  { key: "cookTime", label: "Cook" },
  { key: "totalTime", label: "Total" },
  { key: "servings", label: "Serves" },
] as const;

type RecipeMetaProps = {
  recipe: Pick<Recipe, "prepTime" | "cookTime" | "totalTime" | "servings" | "difficulty" | "category">;
};

export function RecipeMeta({ recipe }: RecipeMetaProps) {
  return (
    <dl className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {metaItems.map((item) => (
        <div key={item.key} className="rounded-3xl border border-stone-200 bg-white/80 px-4 py-4 shadow-sm">
          <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">{item.label}</dt>
          <dd className="mt-2 text-sm font-medium text-stone-800">{recipe[item.key]}</dd>
        </div>
      ))}
      <div className="rounded-3xl border border-stone-200 bg-white/80 px-4 py-4 shadow-sm">
        <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Difficulty</dt>
        <dd className="mt-2 text-sm font-medium text-stone-800">{recipe.difficulty}</dd>
      </div>
      <div className="rounded-3xl border border-stone-200 bg-white/80 px-4 py-4 shadow-sm">
        <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Category</dt>
        <dd className="mt-2 text-sm font-medium text-stone-800">{recipe.category}</dd>
      </div>
    </dl>
  );
}
