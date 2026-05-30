import fs from "node:fs";
import path from "node:path";
import { cache } from "react";

import matter from "gray-matter";

import { type Recipe, type RecipeFrontmatter, type RecipeSummary, recipeFrontmatterSchema } from "@/lib/schema";

const recipesDirectory = path.join(process.cwd(), "src/content/recipes");

export function slugifyCategory(category: string) {
  return category.toLowerCase().trim().replace(/[^a-z0-9]+/gu, "-").replace(/^-|-$/gu, "");
}

function sortByDateDescending<T extends { date: string }>(recipes: T[]) {
  return recipes.sort((left, right) => Date.parse(right.date) - Date.parse(left.date));
}

function toSummary(frontmatter: RecipeFrontmatter): RecipeSummary {
  return {
    ...frontmatter,
    categorySlug: slugifyCategory(frontmatter.category),
    url: `/recipes/${frontmatter.slug}`,
  };
}

const readRecipeEntries = cache(() => {
  const fileNames = fs.readdirSync(recipesDirectory).filter((fileName) => fileName.endsWith(".mdx"));

  return sortByDateDescending(
    fileNames.map((fileName) => {
      const filePath = path.join(recipesDirectory, fileName);
      const source = fs.readFileSync(filePath, "utf8");
      const { content, data } = matter(source);
      const frontmatter = recipeFrontmatterSchema.parse(data);

      return {
        ...toSummary(frontmatter),
        body: content,
      } satisfies Recipe;
    }),
  );
});

export function getAllRecipes() {
  return readRecipeEntries().map((recipe) => toSummary(recipe));
}

export function getRecipeBySlug(slug: string) {
  return readRecipeEntries().find((recipe) => recipe.slug === slug) ?? null;
}

export function getAllRecipeSlugs() {
  return readRecipeEntries().map((recipe) => recipe.slug);
}

export function getAllCategories() {
  return Array.from(new Set(readRecipeEntries().map((recipe) => recipe.category))).sort((left, right) =>
    left.localeCompare(right),
  );
}

export function getRecipesByCategory(category: string) {
  return getAllRecipes().filter((recipe) => slugifyCategory(recipe.category) === slugifyCategory(category));
}

export function getFeaturedRecipes() {
  return getAllRecipes().slice(0, 2);
}
