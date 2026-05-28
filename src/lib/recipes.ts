import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Recipe, RecipeFrontmatter, validateFrontmatter } from './schema';

const recipesDirectory = path.join(process.cwd(), 'src/content/recipes');

function getRecipeFiles(): string[] {
  return fs.readdirSync(recipesDirectory).filter((file) => file.endsWith('.mdx'));
}

function parseRecipeFile(fileName: string): Recipe {
  const filePath = path.join(recipesDirectory, fileName);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  const frontmatter = validateFrontmatter(data);
  return { ...frontmatter, content };
}

export function getAllRecipes(): Recipe[] {
  const files = getRecipeFiles();
  const recipes = files.map((file) => parseRecipeFile(file));
  return recipes.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getRecipeBySlug(slug: string): Recipe | undefined {
  const recipes = getAllRecipes();
  return recipes.find((recipe) => recipe.slug === slug);
}

export function getAllRecipeSlugs(): string[] {
  return getAllRecipes().map((recipe) => recipe.slug);
}

export function getAllCategories(): string[] {
  const recipes = getAllRecipes();
  const categories = new Set(recipes.map((r) => r.category));
  return Array.from(categories).sort();
}

export function getRecipesByCategory(category: string): Recipe[] {
  return getAllRecipes().filter(
    (recipe) => recipe.category.toLowerCase() === category.toLowerCase()
  );
}

export function getFeaturedRecipes(): Recipe[] {
  return getAllRecipes().slice(0, 3);
}

export type { Recipe, RecipeFrontmatter };
