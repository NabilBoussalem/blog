export interface RecipeFrontmatter {
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  image: string;
  prepTime: string;
  cookTime: string;
  totalTime: string;
  servings: number;
  difficulty: string;
  featured?: boolean;
}

export interface Recipe {
  slug: string;
  frontmatter: RecipeFrontmatter;
  content: string;
}
