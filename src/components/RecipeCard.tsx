import Image from "next/image";
import Link from "next/link";

import { SaveRecipeButton } from "@/components/SaveRecipeButton";
import type { RecipeSummary } from "@/lib/schema";

function formatDuration(duration: string) {
  const hours = duration.match(/(\d+)H/u)?.[1];
  const minutes = duration.match(/(\d+)M/u)?.[1];

  return [hours ? `${hours} hr` : null, minutes ? `${minutes} min` : null].filter(Boolean).join(" ");
}

export function RecipeCard({ recipe }: { recipe: RecipeSummary }) {
  return (
    <article className="recipe-card">
      <Link href={recipe.url} className="recipe-card-media">
        <Image
          src={recipe.image.src}
          alt={recipe.image.alt}
          width={recipe.image.width}
          height={recipe.image.height}
          sizes="(min-width: 1180px) 360px, (min-width: 760px) 45vw, 100vw"
        />
      </Link>
      <div className="recipe-card-content">
        <div className="recipe-card-meta">
          <span className="chip">{recipe.category}</span>
          <span className="detail-inline">{formatDuration(recipe.totalTime)}</span>
        </div>
        <div className="recipe-card-copy">
          <h3>
            <Link href={recipe.url}>{recipe.title}</Link>
          </h3>
          <p>{recipe.description}</p>
        </div>
        <div className="recipe-card-actions">
          <Link href={recipe.url} className="text-link">
            View recipe
          </Link>
          <SaveRecipeButton slug={recipe.slug} title={recipe.title} variant="ghost" />
        </div>
      </div>
    </article>
  );
}
