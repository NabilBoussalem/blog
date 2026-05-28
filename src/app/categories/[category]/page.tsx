import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import RecipeCard from '@/components/RecipeCard';
import ItemListJsonLd from '@/components/ItemListJsonLd';
import { getAllCategories, getRecipesByCategory } from '@/lib/recipes';
import { getListingMetadata } from '@/lib/seo';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category) => ({
    category: category.toLowerCase().replace(/\s+/g, '-'),
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const displayName = category.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  return getListingMetadata(
    `${displayName} Recipes`,
    `Browse all ${displayName.toLowerCase()} recipes.`,
    `/categories/${category}`
  );
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const displayName = category.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  const allCategories = getAllCategories();
  const matchedCategory = allCategories.find(
    (c) => c.toLowerCase().replace(/\s+/g, '-') === category
  );

  if (!matchedCategory) {
    notFound();
  }

  const recipes = getRecipesByCategory(matchedCategory);

  return (
    <>
      <ItemListJsonLd recipes={recipes} name={`${displayName} Recipes`} />
      <section className="section container">
        <h1 className="section__title">{displayName} Recipes</h1>
        <p className="section__description">
          Browse all our {displayName.toLowerCase()} recipes.
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
