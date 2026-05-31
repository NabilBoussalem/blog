import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { cache } from "react";
import type { Recipe, RecipeFrontmatter } from "@/types/recipe";

const recipesDirectory = path.join(process.cwd(), "content", "recipes");

function parseRecipeFile(fileName: string): Recipe {
  const slug = fileName.replace(/\.mdx$/, "");
  const filePath = path.join(recipesDirectory, fileName);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    content,
    ...(data as RecipeFrontmatter),
  };
}

export const getRecipeSlugs = cache(() => {
  return fs
    .readdirSync(recipesDirectory)
    .filter((fileName) => fileName.endsWith(".mdx"));
});

// Keep recipe loading cached because the same content is reused across pages and metadata generation.
export const getAllRecipes = cache(() => {
  return getRecipeSlugs()
    .map(parseRecipeFile)
    .sort((recipeA, recipeB) => {
      return new Date(recipeB.date).getTime() - new Date(recipeA.date).getTime();
    });
});

export const getRecipeBySlug = cache((slug: string) => {
  return getAllRecipes().find((recipe) => recipe.slug === slug);
});

export function getFeaturedRecipes() {
  return getAllRecipes().filter((recipe) => recipe.featured);
}

export function getRecentRecipes(limit = 3) {
  return getAllRecipes().slice(0, limit);
}

export function getRecipeCategories() {
  return [...new Set(getAllRecipes().map((recipe) => recipe.category))];
}
