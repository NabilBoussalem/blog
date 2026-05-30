import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ItemListJsonLd } from "@/components/RecipeJsonLd";
import { RecipeCard } from "@/components/RecipeCard";
import { getAllCategories, getRecipesByCategory, slugifyCategory } from "@/lib/recipes";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return getAllCategories().map((category) => ({ category: slugifyCategory(category) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const recipes = getRecipesByCategory(category);

  if (recipes.length === 0) {
    return {};
  }

  return buildMetadata({
    title: `${recipes[0].category} recipes`,
    description: `Browse ${recipes[0].category.toLowerCase()} recipes on Saffron Table.`,
    path: `/categories/${category}`,
    image: recipes[0].image.src,
  });
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const recipes = getRecipesByCategory(category);

  if (recipes.length === 0) {
    notFound();
  }

  const label = recipes[0].category;

  return (
    <>
      <ItemListJsonLd
        title={`${label} recipes`}
        description={`A category archive for ${label.toLowerCase()} recipes.`}
        path={`/categories/${category}`}
        recipes={recipes}
      />
      <section className="container page-heading section-spacing">
        <p className="eyebrow">Category</p>
        <h1>{label}</h1>
        <p>Recipes grouped by category for faster browsing, cleaner sharing, and better discoverability.</p>
      </section>
      <section className="container section-spacing">
        <div className="recipe-grid">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.slug} recipe={recipe} />
          ))}
        </div>
      </section>
    </>
  );
}
