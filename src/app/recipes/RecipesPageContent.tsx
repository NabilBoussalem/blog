"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import RecipeGrid from "@/components/RecipeGrid";
import SearchBar from "@/components/SearchBar";
import type { Recipe } from "@/types/recipe";

const DIFFICULTIES = ["Easy", "Medium", "Hard"];
const COOKING_TIMES = ["Under 30 min", "30–60 min", "Over 60 min"];

export default function RecipesPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const difficulty = searchParams.get("difficulty") || "";
  const cookingTime = searchParams.get("cookingTime") || "";

  useEffect(() => {
    fetch("/api/recipes?" + searchParams.toString())
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data.recipes);
        setCategories(data.categories);
        setLoading(false);
      });
  }, [searchParams]);

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/recipes?${params.toString()}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-800 mb-3">
          All Recipes
        </h1>
        <p className="text-stone-500 mb-8">
          Discover delicious Mediterranean-inspired recipes
        </p>
        <SearchBar />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 justify-center mb-10">
        {/* Category filter */}
        <select
          value={category}
          onChange={(e) => updateFilter("category", e.target.value)}
          className="px-4 py-2 rounded-full border border-stone-200 bg-white text-sm text-stone-600 focus:outline-none focus:ring-2 focus:ring-olive/30"
          aria-label="Filter by category"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Difficulty filter */}
        <select
          value={difficulty}
          onChange={(e) => updateFilter("difficulty", e.target.value)}
          className="px-4 py-2 rounded-full border border-stone-200 bg-white text-sm text-stone-600 focus:outline-none focus:ring-2 focus:ring-olive/30"
          aria-label="Filter by difficulty"
        >
          <option value="">All Difficulties</option>
          {DIFFICULTIES.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        {/* Cooking time filter */}
        <select
          value={cookingTime}
          onChange={(e) => updateFilter("cookingTime", e.target.value)}
          className="px-4 py-2 rounded-full border border-stone-200 bg-white text-sm text-stone-600 focus:outline-none focus:ring-2 focus:ring-olive/30"
          aria-label="Filter by cooking time"
        >
          <option value="">All Cooking Times</option>
          {COOKING_TIMES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        {/* Clear filters */}
        {(search || category || difficulty || cookingTime) && (
          <button
            onClick={() => router.push("/recipes")}
            className="px-4 py-2 rounded-full border border-tomato/30 text-tomato text-sm hover:bg-tomato/5 transition-colors"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Results */}
      {loading ? (
        <div className="text-center py-16 text-stone-400">
          Loading recipes...
        </div>
      ) : (
        <RecipeGrid
          recipes={recipes}
          emptyMessage="No recipes match your filters. Try adjusting your search."
        />
      )}
    </div>
  );
}
