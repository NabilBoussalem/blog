export type Recipe = {
  title: string;
  slug: string;
  description: string;
  date: string;
  updatedAt: string;
  prepTime: number;
  chillTime: number;
  totalTime: number;
  servings: number;
  category: string;
  tags: string[];
  image: string;
  imageAlt: string;
  difficulty: string;
  calories: number;
  ingredients: string[];
  instructions: string[];
  content: string;
};

export type RecipeSummary = Omit<Recipe, "content">;
