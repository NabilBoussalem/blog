"use client";

import { useState, useMemo } from "react";
import { Recipe } from "@/lib/types";
import RecipeGrid from "@/components/RecipeGrid";
import SearchBar from "@/components/SearchBar";

interface RecipesClientProps {
  recipes: Recipe[];
  categories: string[];
  initialCategory?: string;
}

type SortOption = "newest" | "cookTime";

function parseDuration(time: string): number {
  const match = time.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

export default function RecipesClient({
  recipes,
  categories,
  initialCategory,
}: RecipesClientProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    initialCategory || ""
  );
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  const filteredRecipes = useMemo(() => {
    let filtered = recipes;

    if (search) {
      const query = search.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.frontmatter.title.toLowerCase().includes(query) ||
          r.frontmatter.description.toLowerCase().includes(query) ||
          r.frontmatter.tags.some((t) => t.toLowerCase().includes(query))
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(
        (r) => r.frontmatter.category === selectedCategory
      );
    }

    if (sortBy === "cookTime") {
      filtered = [...filtered].sort(
        (a, b) =>
          parseDuration(a.frontmatter.totalTime) -
          parseDuration(b.frontmatter.totalTime)
      );
    }

    return filtered;
  }, [recipes, search, selectedCategory, sortBy]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1">
          <SearchBar value={search} onChange={setSearch} />
        </div>
        <div className="flex gap-3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 rounded-xl border border-stone-200 bg-white text-stone-700 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-300"
            aria-label="Filter by category"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-4 py-3 rounded-xl border border-stone-200 bg-white text-stone-700 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-300"
            aria-label="Sort recipes"
          >
            <option value="newest">Newest First</option>
            <option value="cookTime">Cook Time</option>
          </select>
        </div>
      </div>

      <RecipeGrid
        recipes={filteredRecipes}
        emptyMessage="No recipes match your search. Try a different term or category."
      />
    </div>
  );
}
