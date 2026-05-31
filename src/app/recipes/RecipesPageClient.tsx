"use client";

import { useState } from "react";
import Container from "@/components/Container";
import RecipeGrid from "@/components/RecipeGrid";
import CategoryFilter from "@/components/CategoryFilter";
import SearchInput from "@/components/SearchInput";
import { RecipeMeta } from "@/lib/types";

interface RecipesPageClientProps {
  recipes: RecipeMeta[];
  categories: string[];
}

/** Client component handling search and category filtering */
export default function RecipesPageClient({ recipes, categories }: RecipesPageClientProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const filtered = recipes.filter((recipe) => {
    const matchesCategory = selectedCategory === "" || recipe.category === selectedCategory;
    const matchesSearch =
      search === "" ||
      recipe.title.toLowerCase().includes(search.toLowerCase()) ||
      recipe.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Container>
      <h1 className="text-4xl font-serif font-bold text-amber-900 mb-2">All Recipes</h1>
      <p className="text-amber-700 mb-8">
        Browse our collection of authentic French recipes.
      </p>

      <div className="md:flex md:items-start md:justify-between md:gap-4 mb-2">
        <SearchInput value={search} onChange={setSearch} />
      </div>

      <CategoryFilter
        categories={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <RecipeGrid recipes={filtered} />
    </Container>
  );
}
