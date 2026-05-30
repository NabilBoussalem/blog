import Image from "next/image";
import Link from "next/link";

import { SaveRecipeButton } from "@/components/SaveRecipeButton";
import { ShareRecipeButton } from "@/components/ShareRecipeButton";
import { absoluteUrl } from "@/lib/seo";
import type { Recipe } from "@/lib/schema";

function formatDuration(duration: string) {
  const hours = duration.match(/(\d+)H/u)?.[1];
  const minutes = duration.match(/(\d+)M/u)?.[1];

  return [hours ? `${hours} hr` : null, minutes ? `${minutes} min` : null].filter(Boolean).join(" ");
}

export function RecipeHero({ recipe }: { recipe: Recipe }) {
  return (
    <section className="recipe-hero">
      <div className="recipe-hero-copy">
        <p className="eyebrow">{recipe.category}</p>
        <h1>{recipe.title}</h1>
        <p className="recipe-lead">{recipe.description}</p>
        <dl className="recipe-stat-grid">
          <div>
            <dt>Prep</dt>
            <dd>{formatDuration(recipe.prepTime)}</dd>
          </div>
          <div>
            <dt>Cook</dt>
            <dd>{formatDuration(recipe.cookTime)}</dd>
          </div>
          <div>
            <dt>Total</dt>
            <dd>{formatDuration(recipe.totalTime)}</dd>
          </div>
          <div>
            <dt>Serves</dt>
            <dd>{recipe.servings}</dd>
          </div>
        </dl>
        <div className="tag-row" aria-label="Recipe tags">
          {recipe.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
        <div className="action-row">
          <SaveRecipeButton slug={recipe.slug} title={recipe.title} />
          <ShareRecipeButton title={recipe.title} url={absoluteUrl(recipe.url)} />
          <Link href={`/categories/${recipe.categorySlug}`} className="secondary-button">
            More in {recipe.category}
          </Link>
        </div>
      </div>
      <div className="recipe-hero-media">
        <Image
          src={recipe.image.src}
          alt={recipe.image.alt}
          width={recipe.image.width}
          height={recipe.image.height}
          priority
          sizes="(min-width: 1180px) 540px, 100vw"
        />
      </div>
    </section>
  );
}
