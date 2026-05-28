import { RecipeFrontmatter } from '@/lib/schema';
import { SITE_URL } from '@/lib/seo';

interface RecipeJsonLdProps {
  recipe: RecipeFrontmatter;
}

export default function RecipeJsonLd({ recipe }: RecipeJsonLdProps) {
  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: recipe.title,
    description: recipe.description,
    image: recipe.image.startsWith('http') ? recipe.image : `${SITE_URL}${recipe.image}`,
    author: {
      '@type': 'Person',
      name: recipe.author ?? 'Savory & Sweet',
    },
    datePublished: recipe.date,
    dateModified: recipe.updated,
    prepTime: recipe.prepTime,
    cookTime: recipe.cookTime,
    totalTime: recipe.totalTime,
    recipeYield: `${recipe.servings} servings`,
    recipeCategory: recipe.category,
    keywords: recipe.tags.join(', '),
    recipeIngredient: recipe.ingredients,
    recipeInstructions: recipe.instructions.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      text: step,
    })),
  };

  if (recipe.nutrition) {
    jsonLd.nutrition = {
      '@type': 'NutritionInformation',
      ...recipe.nutrition,
    };
  }

  if (recipe.rating !== undefined && recipe.ratingCount !== undefined) {
    jsonLd.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: recipe.rating,
      ratingCount: recipe.ratingCount,
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
