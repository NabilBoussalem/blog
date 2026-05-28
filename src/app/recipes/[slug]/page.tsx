import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import RecipeHero from '@/components/RecipeHero';
import RecipeJsonLd from '@/components/RecipeJsonLd';
import { getAllRecipeSlugs, getRecipeBySlug } from '@/lib/recipes';
import { getRecipeMetadata } from '@/lib/seo';
import { markdownToHtml } from '@/lib/mdx';

interface RecipePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllRecipeSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: RecipePageProps): Promise<Metadata> {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);
  if (!recipe) return { title: 'Recipe Not Found' };
  return getRecipeMetadata(recipe);
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);

  if (!recipe) {
    notFound();
  }

  const htmlContent = await markdownToHtml(recipe.content);

  return (
    <>
      <RecipeJsonLd recipe={recipe} />
      <article className="recipe-page container">
        <RecipeHero recipe={recipe} />

        <div className="recipe-page__body">
          <section className="recipe-section">
            <h2 className="recipe-section__title">Ingredients</h2>
            <ul className="recipe-ingredients">
              {recipe.ingredients.map((ingredient, i) => (
                <li key={i} className="recipe-ingredients__item">
                  {ingredient}
                </li>
              ))}
            </ul>
          </section>

          <section className="recipe-section">
            <h2 className="recipe-section__title">Instructions</h2>
            <ol className="recipe-instructions">
              {recipe.instructions.map((step, i) => (
                <li key={i} className="recipe-instructions__step">
                  {step}
                </li>
              ))}
            </ol>
          </section>

          {recipe.nutrition && (
            <section className="recipe-section">
              <h2 className="recipe-section__title">Nutrition (per serving)</h2>
              <div className="recipe-nutrition">
                {recipe.nutrition.calories && (
                  <div className="recipe-nutrition__item">
                    <span className="recipe-nutrition__label">Calories</span>
                    <span className="recipe-nutrition__value">{recipe.nutrition.calories}</span>
                  </div>
                )}
                {recipe.nutrition.proteinContent && (
                  <div className="recipe-nutrition__item">
                    <span className="recipe-nutrition__label">Protein</span>
                    <span className="recipe-nutrition__value">{recipe.nutrition.proteinContent}</span>
                  </div>
                )}
                {recipe.nutrition.carbohydrateContent && (
                  <div className="recipe-nutrition__item">
                    <span className="recipe-nutrition__label">Carbs</span>
                    <span className="recipe-nutrition__value">{recipe.nutrition.carbohydrateContent}</span>
                  </div>
                )}
                {recipe.nutrition.fatContent && (
                  <div className="recipe-nutrition__item">
                    <span className="recipe-nutrition__label">Fat</span>
                    <span className="recipe-nutrition__value">{recipe.nutrition.fatContent}</span>
                  </div>
                )}
                {recipe.nutrition.fiberContent && (
                  <div className="recipe-nutrition__item">
                    <span className="recipe-nutrition__label">Fiber</span>
                    <span className="recipe-nutrition__value">{recipe.nutrition.fiberContent}</span>
                  </div>
                )}
              </div>
            </section>
          )}

          <section className="recipe-section mdx-content">
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
          </section>
        </div>
      </article>
    </>
  );
}
