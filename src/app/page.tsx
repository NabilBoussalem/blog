import Link from 'next/link';
import RecipeCard from '@/components/RecipeCard';
import ItemListJsonLd from '@/components/ItemListJsonLd';
import { getFeaturedRecipes, getAllRecipes } from '@/lib/recipes';

export default function HomePage() {
  const featured = getFeaturedRecipes();
  const latest = getAllRecipes().slice(0, 6);

  return (
    <>
      <ItemListJsonLd recipes={latest} name="Latest Recipes" />
      <section className="hero-section">
        <div className="container">
          <h1 className="hero-section__title">Savory &amp; Sweet</h1>
          <p className="hero-section__subtitle">
            Delicious recipes from around the world — simple, tested, and beautifully presented.
          </p>
          <Link href="/recipes" className="hero-section__cta">
            Browse All Recipes
          </Link>
        </div>
      </section>

      <section className="section container">
        <h2 className="section__title">Featured Recipes</h2>
        <div className="recipe-grid">
          {featured.map((recipe) => (
            <RecipeCard key={recipe.slug} recipe={recipe} />
          ))}
        </div>
      </section>

      <section className="section container">
        <h2 className="section__title">Latest Recipes</h2>
        <div className="recipe-grid">
          {latest.map((recipe) => (
            <RecipeCard key={recipe.slug} recipe={recipe} />
          ))}
        </div>
        <div className="section__actions">
          <Link href="/recipes" className="button">
            View All Recipes
          </Link>
        </div>
      </section>
    </>
  );
}
