import Image from 'next/image';
import { RecipeFrontmatter } from '@/lib/schema';

interface RecipeHeroProps {
  recipe: RecipeFrontmatter;
}

function formatTime(iso: string): string {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
  if (!match) return iso;
  const hours = match[1] ? `${match[1]}h ` : '';
  const minutes = match[2] ? `${match[2]}m` : '';
  return `${hours}${minutes}`.trim();
}

export default function RecipeHero({ recipe }: RecipeHeroProps) {
  return (
    <header className="recipe-hero">
      <div className="recipe-hero__image-wrapper">
        <Image
          src={recipe.image}
          alt={`Photo of ${recipe.title}`}
          width={1200}
          height={630}
          priority
          sizes="100vw"
          className="recipe-hero__image"
        />
      </div>
      <div className="recipe-hero__content">
        <span className="recipe-hero__category">{recipe.category}</span>
        <h1 className="recipe-hero__title">{recipe.title}</h1>
        <p className="recipe-hero__description">{recipe.description}</p>
        <div className="recipe-hero__meta">
          <div className="recipe-hero__meta-item">
            <span className="recipe-hero__meta-label">Prep</span>
            <span className="recipe-hero__meta-value">{formatTime(recipe.prepTime)}</span>
          </div>
          <div className="recipe-hero__meta-item">
            <span className="recipe-hero__meta-label">Cook</span>
            <span className="recipe-hero__meta-value">{formatTime(recipe.cookTime)}</span>
          </div>
          <div className="recipe-hero__meta-item">
            <span className="recipe-hero__meta-label">Total</span>
            <span className="recipe-hero__meta-value">{formatTime(recipe.totalTime)}</span>
          </div>
          <div className="recipe-hero__meta-item">
            <span className="recipe-hero__meta-label">Servings</span>
            <span className="recipe-hero__meta-value">{recipe.servings}</span>
          </div>
        </div>
        <div className="recipe-hero__tags">
          {recipe.tags.map((tag) => (
            <span key={tag} className="recipe-hero__tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
