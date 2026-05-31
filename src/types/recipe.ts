export type RecipeFrontmatter = {
  title: string;
  description: string;
  image: string;
  category: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  difficulty: string;
  date: string;
  featured?: boolean;
};

export type Recipe = RecipeFrontmatter & {
  slug: string;
  content: string;
};
