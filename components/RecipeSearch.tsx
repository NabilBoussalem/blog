"use client";

import { useMemo, useState } from "react";
import { RecipeCard } from "@/components/RecipeCard";
import type { RecipeSummary } from "@/lib/types";

type RecipeSearchProps = {
  recipes: RecipeSummary[];
  categories: string[];
};

const prepTimeFilters = [
  { value: "all", label: "Any prep time" },
  { value: "10", label: "Under 10 minutes" },
  { value: "20", label: "Under 20 minutes" },
  { value: "30", label: "Under 30 minutes" },
];

export function RecipeSearch({ recipes, categories }: RecipeSearchProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [prepTime, setPrepTime] = useState("all");
  const [sort, setSort] = useState("newest");

  const filteredRecipes = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const prepLimit = prepTime === "all" ? Infinity : Number(prepTime);

    const result = recipes.filter((recipe) => {
      const searchableText = [
        recipe.title,
        recipe.description,
        recipe.ingredients.join(" "),
        recipe.tags.join(" "),
      ]
        .join(" ")
        .toLowerCase();

      const matchesQuery = normalizedQuery.length === 0 || searchableText.includes(normalizedQuery);
      const matchesCategory = category === "all" || recipe.category === category;
      const matchesPrep = recipe.prepTime <= prepLimit;

      return matchesQuery && matchesCategory && matchesPrep;
    });

    return result.sort((a, b) => {
      if (sort === "fastest") return a.totalTime - b.totalTime;
      if (sort === "popular") return b.tags.length - a.tags.length;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [category, prepTime, query, recipes, sort]);

  return (
    <div className="space-y-6">
      <div className="grid gap-3 rounded-2xl border border-emerald-100 bg-white p-4 sm:grid-cols-2 lg:grid-cols-4">
        <label className="space-y-1 text-sm text-slate-700">
          <span className="font-medium">Search recipes</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try salad, mint, yogurt..."
            className="w-full rounded-lg border border-emerald-200 px-3 py-2 outline-none ring-emerald-300 focus:ring"
          />
        </label>

        <label className="space-y-1 text-sm text-slate-700">
          <span className="font-medium">Category</span>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="w-full rounded-lg border border-emerald-200 px-3 py-2 outline-none ring-emerald-300 focus:ring"
          >
            <option value="all">All categories</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-1 text-sm text-slate-700">
          <span className="font-medium">Prep time</span>
          <select
            value={prepTime}
            onChange={(event) => setPrepTime(event.target.value)}
            className="w-full rounded-lg border border-emerald-200 px-3 py-2 outline-none ring-emerald-300 focus:ring"
          >
            {prepTimeFilters.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-1 text-sm text-slate-700">
          <span className="font-medium">Sort</span>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className="w-full rounded-lg border border-emerald-200 px-3 py-2 outline-none ring-emerald-300 focus:ring"
          >
            <option value="newest">Newest</option>
            <option value="fastest">Fastest</option>
            <option value="popular">Most popular</option>
          </select>
        </label>
      </div>

      {filteredRecipes.length === 0 ? (
        <p className="rounded-2xl bg-white p-6 text-center text-slate-600">
          No recipes match your filters yet.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.slug} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}
