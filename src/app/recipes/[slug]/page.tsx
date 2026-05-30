import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { RecipeHero } from "@/components/RecipeHero";
import { RecipeJsonLd } from "@/components/RecipeJsonLd";
import { renderRecipeMdx } from "@/lib/mdx";
import { getAllRecipeSlugs, getRecipeBySlug } from "@/lib/recipes";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return getAllRecipeSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);

  if (!recipe) {
    return {};
  }

  return buildMetadata({
    title: recipe.title,
    description: recipe.description,
    path: recipe.url,
    image: recipe.image.src,
  });
}

export default async function RecipePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);

  if (!recipe) {
    notFound();
  }

  const content = await renderRecipeMdx(recipe.body);

  return (
    <>
      <RecipeJsonLd recipe={recipe} />
      <div className="container section-spacing recipe-page">
        <RecipeHero recipe={recipe} />
        <section className="recipe-layout">
          <aside className="recipe-sidebar" aria-label="Recipe details">
            <div className="info-panel">
              <h2>Ingredients</h2>
              <ul className="ingredient-list">
                {recipe.ingredients.map((ingredient) => (
                  <li key={ingredient}>{ingredient}</li>
                ))}
              </ul>
            </div>
            <div className="info-panel">
              <h2>Instructions</h2>
              <ol className="instruction-list">
                {recipe.instructions.map((instruction) => (
                  <li key={instruction}>{instruction}</li>
                ))}
              </ol>
            </div>
          </aside>
          <article className="recipe-prose">{content}</article>
        </section>
      </div>
    </>
  );
}
