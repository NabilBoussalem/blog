"use client";

import { useMemo, useState } from "react";
import { CategoryFilter } from "@/components/CategoryFilter";
import { RecipeGrid } from "@/components/RecipeGrid";
import { SearchInput } from "@/components/SearchInput";
import type { Recipe } from "@/types/recipe";

type RecipesBrowserProps = {
  categories: string[];
  recipes: Recipe[];
};

export function RecipesBrowser({ categories, recipes }: RecipesBrowserProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRecipes = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return recipes.filter((recipe) => {
      const matchesCategory = selectedCategory === "All" || recipe.category === selectedCategory;
      const matchesSearch =
        normalizedSearch.length === 0 ||
        recipe.title.toLowerCase().includes(normalizedSearch) ||
        recipe.description.toLowerCase().includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [recipes, searchTerm, selectedCategory]);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 rounded-[2rem] border border-amber-100 bg-amber-50/70 p-6 lg:grid-cols-[1.4fr_1fr] lg:items-center">
        <SearchInput value={searchTerm} onChange={setSearchTerm} />
        <CategoryFilter categories={categories} selectedCategory={selectedCategory} onSelect={setSelectedCategory} />
      </div>
      {filteredRecipes.length > 0 ? (
        <RecipeGrid recipes={filteredRecipes} />
      ) : (
        <div className="rounded-[2rem] border border-dashed border-amber-200 bg-white px-6 py-16 text-center text-stone-600">
          No recipes matched your search. Try another category or keyword.
        </div>
      )}
    </div>
  );
}
