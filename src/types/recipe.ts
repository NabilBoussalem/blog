export interface Recipe {
  slug: string;
  title: string;
  description: string;
  image: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  prepTime: string;
  cookTime: string;
  totalTime: string;
  servings: number;
  tags: string[];
  featured: boolean;
  publishedAt: string;
  ingredients: string[];
  instructions: string[];
  notes?: string;
  content: string;
}

export type RecipeMeta = Omit<Recipe, "content">;

export const CATEGORIES = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Salad",
  "Dessert",
  "Snack",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const DIFFICULTIES = ["Easy", "Medium", "Hard"] as const;

export const COOKING_TIMES = [
  "Under 30 min",
  "30–60 min",
  "Over 60 min",
] as const;
