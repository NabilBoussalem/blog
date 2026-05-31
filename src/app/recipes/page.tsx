import type { Metadata } from "next";

import { RecipeGrid } from "@/components/RecipeGrid";
import { SearchBar } from "@/components/SearchBar";
import { SectionHeading } from "@/components/SectionHeading";
import {
  filterRecipes,
  getCookingTimeOptions,
  getDifficultyOptions,
  getRecipeCategories,
} from "@/lib/recipes";

export const metadata: Metadata = {
  title: "Recipes",
  description: "Browse every Olive & Thyme recipe by category, cooking time, difficulty, or ingredient.",
};

type RecipesPageProps = {
  searchParams: Promise<{
    q?: string;
    category?: string;
    difficulty?: string;
    time?: string;
  }>;
};

export default async function RecipesPage({ searchParams }: RecipesPageProps) {
  const params = await searchParams;
  const selectedCategory = params.category ?? "All";
  const selectedDifficulty = params.difficulty ?? "All";
  const selectedTime = params.time ?? "All";
  const recipes = filterRecipes({
    query: params.q,
    category: selectedCategory,
    difficulty: selectedDifficulty,
    maxTime: selectedTime !== "All" ? Number(selectedTime) : undefined,
  });
  const categories = getRecipeCategories();
  const difficultyOptions = getDifficultyOptions();
  const timeOptions = getCookingTimeOptions();

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 py-10 sm:px-6 lg:px-8 lg:py-14">
      <SectionHeading
        eyebrow="Recipe collection"
        title="Every recipe"
        description="Use the filters below to browse by category, cooking time, difficulty, or the ingredients you already have in the fridge."
      />

      <section className="rounded-[2.5rem] border border-stone-200 bg-white p-6 shadow-card sm:p-8">
        <SearchBar
          defaultValue={params.q}
          hiddenInputs={[
            { name: "category", value: selectedCategory !== "All" ? selectedCategory : undefined },
            { name: "difficulty", value: selectedDifficulty !== "All" ? selectedDifficulty : undefined },
            { name: "time", value: selectedTime !== "All" ? selectedTime : undefined },
          ]}
        />
        <form action="/recipes" className="mt-4 grid gap-4 md:grid-cols-3">
          <input type="hidden" name="q" value={params.q ?? ""} />
          <label className="space-y-2 text-sm font-medium text-stone-700">
            <span>Category</span>
            <select
              name="category"
              defaultValue={selectedCategory}
              className="w-full rounded-2xl border border-stone-200 bg-cream-50 px-4 py-3 outline-none focus:border-olive-300"
            >
              <option value="All">All categories</option>
              {categories.map((category) => (
                <option key={category.name} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-2 text-sm font-medium text-stone-700">
            <span>Difficulty</span>
            <select
              name="difficulty"
              defaultValue={selectedDifficulty}
              className="w-full rounded-2xl border border-stone-200 bg-cream-50 px-4 py-3 outline-none focus:border-olive-300"
            >
              {difficultyOptions.map((option) => (
                <option key={option} value={option}>
                  {option === "All" ? "Any difficulty" : option}
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-2 text-sm font-medium text-stone-700">
            <span>Cooking time</span>
            <select
              name="time"
              defaultValue={selectedTime}
              className="w-full rounded-2xl border border-stone-200 bg-cream-50 px-4 py-3 outline-none focus:border-olive-300"
            >
              {timeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-2xl bg-olive-900 px-5 py-3 text-sm font-semibold text-cream-50 transition hover:bg-olive-700 md:col-span-3 md:w-fit"
          >
            Apply filters
          </button>
        </form>
      </section>

      <section aria-live="polite" className="space-y-6">
        <p className="text-sm text-stone-500">
          Showing <span className="font-semibold text-stone-700">{recipes.length}</span> recipe{recipes.length === 1 ? "" : "s"}.
        </p>
        <RecipeGrid
          recipes={recipes}
          emptyTitle="No recipes match your filters"
          emptyDescription="Try removing one of the filters or searching for a broader ingredient like lemon, pasta, or herbs."
        />
      </section>
    </div>
  );
}
