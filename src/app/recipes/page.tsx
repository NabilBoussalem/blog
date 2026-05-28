import type { Metadata } from 'next';
import RecipeCard from '@/components/RecipeCard';
import ItemListJsonLd from '@/components/ItemListJsonLd';
import { getAllRecipes } from '@/lib/recipes';
import { getListingMetadata } from '@/lib/seo';

export const metadata: Metadata = getListingMetadata(
  'All Recipes',
  'Browse our complete collection of tested and delicious recipes.',
  '/recipes'
);

export default function RecipesPage() {
  const recipes = getAllRecipes();

  return (
    <>
      <ItemListJsonLd recipes={recipes} name="All Recipes" />
      <section className="section container">
        <h1 className="section__title">All Recipes</h1>
        <p className="section__description">
          Browse our complete collection of tested and delicious recipes.
        </p>
        <div className="recipe-grid">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.slug} recipe={recipe} />
          ))}
        </div>
      </section>
    </>
  );
}
