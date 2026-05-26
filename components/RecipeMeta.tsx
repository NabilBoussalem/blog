import type { RecipeSummary } from "@/lib/types";

type RecipeMetaProps = {
  recipe: RecipeSummary;
};

export function RecipeMeta({ recipe }: RecipeMetaProps) {
  return (
    <dl className="grid grid-cols-2 gap-3 rounded-2xl bg-white/70 p-4 text-sm text-slate-700 sm:grid-cols-4">
      <div>
        <dt className="font-semibold text-slate-900">Prep</dt>
        <dd>{recipe.prepTime} min</dd>
      </div>
      <div>
        <dt className="font-semibold text-slate-900">Chill</dt>
        <dd>{recipe.chillTime} min</dd>
      </div>
      <div>
        <dt className="font-semibold text-slate-900">Total</dt>
        <dd>{recipe.totalTime} min</dd>
      </div>
      <div>
        <dt className="font-semibold text-slate-900">Servings</dt>
        <dd>{recipe.servings}</dd>
      </div>
    </dl>
  );
}
