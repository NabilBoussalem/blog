import type { ReactNode } from "react";

export type RecipeDifficulty = "Easy" | "Medium" | "Advanced";

export type RecipeFrontmatter = {
  title: string;
  description: string;
  image: string;
  category: string;
  difficulty: RecipeDifficulty;
  prepTime: string;
  cookTime: string;
  totalTime: string;
  servings: number;
  tags: string[];
  notes?: string[];
  featured?: boolean;
  publishedAt: string;
  ingredients: string[];
  instructions: string[];
};

export type Recipe = RecipeFrontmatter & {
  slug: string;
  content: string;
};

export type RecipeWithBody = Recipe & {
  body: ReactNode;
};

export type RecipeFilters = {
  query?: string;
  category?: string;
  difficulty?: string;
  maxTime?: number;
};

export type RecipeCategorySummary = {
  name: string;
  count: number;
  description: string;
  image: string;
};
