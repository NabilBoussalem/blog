import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Recipe, RecipeFrontmatter } from "./types";

const recipesDirectory = path.join(process.cwd(), "src/content/recipes");

export function getAllRecipes(): Recipe[] {
  if (!fs.existsSync(recipesDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(recipesDirectory);
  const recipes = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(recipesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        frontmatter: data as RecipeFrontmatter,
        content,
      };
    });

  return recipes.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );
}

export function getRecipeBySlug(slug: string): Recipe | undefined {
  const fullPath = path.join(recipesDirectory, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return undefined;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    frontmatter: data as RecipeFrontmatter,
    content,
  };
}

export function getRecipeSlugs(): string[] {
  if (!fs.existsSync(recipesDirectory)) {
    return [];
  }

  return fs
    .readdirSync(recipesDirectory)
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => fileName.replace(/\.mdx$/, ""));
}

export function getAllCategories(): string[] {
  const recipes = getAllRecipes();
  const categories = new Set(recipes.map((r) => r.frontmatter.category));
  return Array.from(categories).sort();
}

export function getAllTags(): string[] {
  const recipes = getAllRecipes();
  const tags = new Set(recipes.flatMap((r) => r.frontmatter.tags));
  return Array.from(tags).sort();
}

export function getRelatedRecipes(
  currentSlug: string,
  limit: number = 3
): Recipe[] {
  const current = getRecipeBySlug(currentSlug);
  if (!current) return [];

  const allRecipes = getAllRecipes().filter((r) => r.slug !== currentSlug);

  const scored = allRecipes.map((recipe) => {
    let score = 0;
    if (recipe.frontmatter.category === current.frontmatter.category) {
      score += 2;
    }
    const sharedTags = recipe.frontmatter.tags.filter((tag) =>
      current.frontmatter.tags.includes(tag)
    );
    score += sharedTags.length;
    return { recipe, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.recipe);
}

export function getFeaturedRecipes(limit: number = 3): Recipe[] {
  const recipes = getAllRecipes();
  const featured = recipes.filter((r) => r.frontmatter.featured);
  if (featured.length > 0) {
    return featured.slice(0, limit);
  }
  return recipes.slice(0, limit);
}
