import Image from "next/image";
import Link from "next/link";

import type { RecipeSummary } from "@/lib/types";
import { toTermSlug } from "@/lib/taxonomy";

type RecipeCardProps = {
  recipe: RecipeSummary;
  priority?: boolean;
};

export function RecipeCard({ recipe, priority = false }: RecipeCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm transition hover:shadow-md">
      <Link href={`/recipes/${recipe.slug}`} className="group block">
        <div className="relative h-48 w-full">
          <Image
            src={recipe.image}
            alt={recipe.imageAlt}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition group-hover:scale-[1.03]"
          />
        </div>
      </Link>
      <div className="space-y-3 p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
          <Link href={`/categories/${toTermSlug(recipe.category)}`}>{recipe.category}</Link>
        </p>
        <h2 className="text-xl font-semibold text-slate-900">
          <Link href={`/recipes/${recipe.slug}`}>{recipe.title}</Link>
        </h2>
        <p className="text-sm text-slate-600">{recipe.description}</p>
        <div className="flex flex-wrap gap-2 text-xs text-slate-600">
          <span className="rounded-full bg-emerald-50 px-2 py-1">{recipe.totalTime} min</span>
          {recipe.tags.slice(0, 3).map((tag) => (
            <Link
              key={`${recipe.slug}-${tag}`}
              href={`/tags/${toTermSlug(tag)}`}
              className="rounded-full bg-sky-50 px-2 py-1"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
