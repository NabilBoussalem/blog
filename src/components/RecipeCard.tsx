import Image from "next/image";
import Link from "next/link";
import { CategoryBadge } from "@/components/CategoryBadge";
import type { RecipeSummary } from "@/lib/recipes";

type RecipeCardProps = {
  recipe: RecipeSummary;
  priority?: boolean;
};

export function RecipeCard({ recipe, priority = false }: RecipeCardProps) {
  return (
    <article className="group overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-[0_18px_40px_rgba(79,55,38,0.06)] transition hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(79,55,38,0.1)]">
      <Link href={`/recipes/${recipe.slug}`} className="block h-full">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={recipe.image}
            alt={recipe.title}
            width={800}
            height={600}
            priority={priority}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-5 sm:p-6">
          <CategoryBadge category={recipe.category} />
          <h3 className="mt-4 font-serif text-3xl leading-tight text-balance text-foreground">
            {recipe.title}
          </h3>
          <p className="mt-3 line-clamp-3 text-base leading-7 text-muted">{recipe.description}</p>
          <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-muted">
            <span>{recipe.totalTime}</span>
            <span aria-hidden="true">•</span>
            <span>{recipe.difficulty}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
