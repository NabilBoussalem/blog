/** Metadata extracted from recipe MDX frontmatter */
export interface RecipeMeta {
  slug: string;
  title: string;
  description: string;
  image: string;
  category: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  difficulty: string;
  date: string;
  featured: boolean;
}
