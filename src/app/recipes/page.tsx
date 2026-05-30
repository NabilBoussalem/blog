import type { Metadata } from "next";
import { RecipeGrid } from "@/components/RecipeGrid";
import { SearchBar } from "@/components/SearchBar";
import { filterRecipes, getAllCategories, getAllRecipes } from "@/lib/recipes";

export const metadata: Metadata = {
  title: "Recipes",
  description: "Browse the full recipe collection with filters for category, search, and cooking time.",
};

type RecipesPageProps = {
  searchParams: Promise<{
    query?: string;
    category?: string;
    sort?: string;
  }>;
};

export default async function RecipesPage({ searchParams }: RecipesPageProps) {
  const [{ query = "", category = "", sort = "newest" }, recipes, categories] = await Promise.all([
    searchParams,
    getAllRecipes(),
    getAllCategories(),
  ]);

  const filteredRecipes = filterRecipes(recipes, { query, category, sort });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <section className="rounded-[2rem] border border-border bg-card p-6 shadow-[0_20px_50px_rgba(79,55,38,0.07)] sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">Recipe collection</p>
        <h1 className="mt-3 font-serif text-5xl text-balance">Find your next favorite dish.</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-muted">
          Search by name or ingredient theme, filter by category, and sort by newest recipes or total cooking time.
        </p>
        <div className="mt-8">
          <SearchBar
            defaultQuery={query}
            categories={categories}
            defaultCategory={category}
            defaultSort={sort}
          />
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <p className="text-sm text-muted">
            Showing <span className="font-semibold text-foreground">{filteredRecipes.length}</span> recipe{filteredRecipes.length === 1 ? "" : "s"}
          </p>
        </div>
        <RecipeGrid
          recipes={filteredRecipes}
          emptyTitle="No recipes match your filters"
          emptyDescription="Try clearing the search, switching categories, or sorting by newest to explore the full collection."
        />
      </section>
    </div>
  );
}
