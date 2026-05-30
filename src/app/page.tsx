import Link from "next/link";

import { ItemListJsonLd } from "@/components/RecipeJsonLd";
import { RecipeCard } from "@/components/RecipeCard";
import { buildMetadata } from "@/lib/seo";
import { getAllCategories, getAllRecipes, getFeaturedRecipes, slugifyCategory } from "@/lib/recipes";

export const metadata = buildMetadata({
  description: "Discover elegant, approachable recipes with polished photography, rich metadata, and simple tools for saving and sharing.",
  path: "/",
});

export default function HomePage() {
  const featuredRecipes = getFeaturedRecipes();
  const latestRecipes = getAllRecipes().slice(0, 4);
  const categories = getAllCategories();
  const leadRecipe = featuredRecipes[0];

  return (
    <>
      <ItemListJsonLd
        title="Featured recipes"
        description="A curated list of featured recipes from Saffron Table."
        path="/"
        recipes={featuredRecipes}
      />
      <section className="home-hero container section-spacing">
        <div className="home-hero-copy">
          <p className="eyebrow">Fast, static, and made to be cooked from</p>
          <h1>Elegant recipes that stay practical from first glance to final step.</h1>
          <p className="hero-copy">
            Browse dishes with clean structure, useful cooking notes, and lightweight tools for saving favorites or sharing them with the people you cook for.
          </p>
          <div className="action-row">
            <Link href="/recipes" className="primary-button">
              Explore recipes
            </Link>
            <Link href="#categories" className="secondary-button">
              Browse categories
            </Link>
          </div>
        </div>
        {leadRecipe ? (
          <article className="hero-feature-card">
            <p className="eyebrow">Featured today</p>
            <h2>
              <Link href={leadRecipe.url}>{leadRecipe.title}</Link>
            </h2>
            <p>{leadRecipe.description}</p>
            <div className="tag-row">
              <span className="tag">{leadRecipe.category}</span>
              <span className="tag">{leadRecipe.servings}</span>
            </div>
          </article>
        ) : null}
      </section>

      <section className="container section-spacing">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">Featured recipes</p>
            <h2>Strong flavors, clearly presented.</h2>
          </div>
          <Link href="/recipes" className="text-link">
            View all recipes
          </Link>
        </div>
        <div className="recipe-grid">
          {featuredRecipes.map((recipe) => (
            <RecipeCard key={recipe.slug} recipe={recipe} />
          ))}
        </div>
      </section>

      <section className="container section-spacing">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">Latest from the kitchen</p>
            <h2>Fresh recipes with room for real notes and useful detail.</h2>
          </div>
        </div>
        <div className="recipe-grid recipe-grid-tight">
          {latestRecipes.map((recipe) => (
            <RecipeCard key={recipe.slug} recipe={recipe} />
          ))}
        </div>
      </section>

      <section id="categories" className="container section-spacing category-panel">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">Browse categories</p>
            <h2>Move from craving to category in one tap.</h2>
          </div>
        </div>
        <div className="category-list" role="list">
          {categories.map((category) => (
            <Link key={category} href={`/categories/${slugifyCategory(category)}`} className="category-link">
              <span>{category}</span>
              <span aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
