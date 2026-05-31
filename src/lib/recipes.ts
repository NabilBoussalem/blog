import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { RecipeMeta } from "./types";

/** Directory where MDX recipe files are stored */
const recipesDirectory = path.join(process.cwd(), "content/recipes");

/** Parse frontmatter data into a typed RecipeMeta object */
function parseRecipeMeta(slug: string, data: Record<string, unknown>): RecipeMeta {
  return {
    slug,
    title: (data.title as string) ?? "",
    description: (data.description as string) ?? "",
    image: (data.image as string) ?? "",
    category: (data.category as string) ?? "",
    prepTime: (data.prepTime as string) ?? "",
    cookTime: (data.cookTime as string) ?? "",
    servings: (data.servings as number) ?? 0,
    difficulty: (data.difficulty as string) ?? "",
    date: (data.date as string) ?? "",
    featured: (data.featured as boolean) ?? false,
  };
}

/** Read all MDX files and return parsed frontmatter metadata */
export function getAllRecipes(): RecipeMeta[] {
  const files = fs.readdirSync(recipesDirectory).filter((f) => f.endsWith(".mdx"));

  const recipes = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const filePath = path.join(recipesDirectory, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);
    return parseRecipeMeta(slug, data);
  });

  // Sort by date descending (newest first)
  return recipes.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/** Get a single recipe by slug, returning frontmatter and raw MDX content */
export function getRecipeBySlug(slug: string): { meta: RecipeMeta; content: string } | null {
  const filePath = path.join(recipesDirectory, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    meta: parseRecipeMeta(slug, data),
    content,
  };
}

/** Get all unique categories from recipes */
export function getAllCategories(): string[] {
  const recipes = getAllRecipes();
  const categories = new Set(recipes.map((r) => r.category));
  return Array.from(categories).sort();
}

/** Get all recipe slugs for static generation */
export function getAllRecipeSlugs(): string[] {
  return fs
    .readdirSync(recipesDirectory)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}
