import { ItemListJsonLd } from "@/components/RecipeJsonLd";
import { RecipeCard } from "@/components/RecipeCard";
import { getAllCategories, getAllRecipes, slugifyCategory } from "@/lib/recipes";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Recipes",
  description: "Browse every recipe on Saffron Table, from weeknight comfort dishes to polished desserts.",
  path: "/recipes",
});

export default function RecipesPage() {
  const recipes = getAllRecipes();
  const categories = getAllCategories();

  return (
    <>
      <ItemListJsonLd
        title="All recipes"
        description="An item list of every published recipe on Saffron Table."
        path="/recipes"
        recipes={recipes}
      />
      <section className="container page-heading section-spacing">
        <p className="eyebrow">Recipe archive</p>
        <h1>Every recipe, arranged for quick browsing.</h1>
        <p>
          Static pages, detailed frontmatter, and clean recipe cards keep this archive easy to scan on desktop and mobile.
        </p>
      </section>
      <section className="container section-spacing">
        <div className="recipe-grid">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.slug} recipe={recipe} />
          ))}
        </div>
      </section>
      <section id="categories" className="container section-spacing category-panel">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">Categories</p>
            <h2>Pick a mood, then cook from there.</h2>
          </div>
        </div>
        <div className="category-list" role="list">
          {categories.map((category) => (
            <a key={category} href={`/categories/${slugifyCategory(category)}`} className="category-link">
              <span>{category}</span>
              <span aria-hidden="true">→</span>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
