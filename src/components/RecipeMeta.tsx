import type { RecipeSummary } from "@/lib/recipes";

type RecipeMetaProps = {
  recipe: Pick<
    RecipeSummary,
    "prepTime" | "cookTime" | "totalTime" | "servings" | "difficulty"
  >;
};

const entries = [
  ["Prep", "prepTime"],
  ["Cook", "cookTime"],
  ["Total", "totalTime"],
  ["Serves", "servings"],
  ["Difficulty", "difficulty"],
] as const;

export function RecipeMeta({ recipe }: RecipeMetaProps) {
  return (
    <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {entries.map(([label, key]) => (
        <div key={label} className="rounded-3xl bg-white px-4 py-4">
          <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">{label}</dt>
          <dd className="mt-2 font-serif text-xl text-foreground">{recipe[key]}</dd>
        </div>
      ))}
    </dl>
  );
}
