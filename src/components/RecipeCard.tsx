import Image from "next/image";
import Link from "next/link";

import { formatRecipeDate } from "@/lib/recipes";
import type { Recipe } from "@/types/recipe";

type RecipeCardProps = {
  recipe: Recipe;
  priority?: boolean;
};

export function RecipeCard({ recipe, priority = false }: RecipeCardProps) {
  return (
    <article className="group overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/recipes/${recipe.slug}`} className="block">
        <div className="relative h-64 overflow-hidden">
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            priority={priority}
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
        </div>
        <div className="space-y-4 p-6">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em]">
            <span className="rounded-full bg-olive-50 px-3 py-1 text-olive-700">{recipe.category}</span>
            <span className="rounded-full bg-terracotta-300/20 px-3 py-1 text-terracotta-700">{recipe.difficulty}</span>
          </div>
          <div>
            <h3 className="font-serif text-3xl leading-none text-olive-950">{recipe.title}</h3>
            <p className="mt-3 text-sm leading-7 text-stone-600">{recipe.description}</p>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-stone-200 pt-4 text-sm text-stone-500">
            <span>{recipe.totalTime}</span>
            <span>{formatRecipeDate(recipe.publishedAt)}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
