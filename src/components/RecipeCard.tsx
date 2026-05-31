import Image from "next/image";
import Link from "next/link";
import { RecipeMeta } from "@/components/RecipeMeta";
import type { Recipe } from "@/types/recipe";

type RecipeCardProps = {
  recipe: Recipe;
};

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <article className="group overflow-hidden rounded-[2rem] border border-amber-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/recipes/${recipe.slug}`} className="block h-full">
        <div className="relative aspect-[4/3] overflow-hidden bg-amber-100">
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 40vw, 100vw"
          />
          <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
            {recipe.category}
          </div>
        </div>
        <div className="flex h-full flex-col gap-4 p-6">
          <div className="space-y-3">
            <h3 className="text-2xl font-semibold tracking-tight text-stone-900">{recipe.title}</h3>
            <p className="text-sm leading-7 text-stone-600">{recipe.description}</p>
          </div>
          <RecipeMeta recipe={recipe} compact />
        </div>
      </Link>
    </article>
  );
}
