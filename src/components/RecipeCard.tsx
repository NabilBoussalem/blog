import Image from 'next/image';
import Link from 'next/link';
import { RecipeFrontmatter } from '@/lib/schema';

interface RecipeCardProps {
  recipe: RecipeFrontmatter;
}

function formatTime(iso: string): string {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
  if (!match) return iso;
  const hours = match[1] ? `${match[1]}h ` : '';
  const minutes = match[2] ? `${match[2]}m` : '';
  return `${hours}${minutes}`.trim();
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <article className="recipe-card">
      <Link href={`/recipes/${recipe.slug}`} className="recipe-card__link">
        <div className="recipe-card__image-wrapper">
          <Image
            src={recipe.image}
            alt={`Photo of ${recipe.title}`}
            width={600}
            height={400}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="recipe-card__image"
          />
        </div>
        <div className="recipe-card__content">
          <span className="recipe-card__category">{recipe.category}</span>
          <h3 className="recipe-card__title">{recipe.title}</h3>
          <p className="recipe-card__description">{recipe.description}</p>
          <div className="recipe-card__meta">
            <span className="recipe-card__time">
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {formatTime(recipe.totalTime)}
            </span>
            <span className="recipe-card__servings">
              {recipe.servings} servings
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
