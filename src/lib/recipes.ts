import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";

import { mdxComponents } from "@/components/mdx";
import type {
  Recipe,
  RecipeCategorySummary,
  RecipeFilters,
  RecipeFrontmatter,
  RecipeWithBody,
} from "@/types/recipe";

const recipesDirectory = path.join(process.cwd(), "content/recipes");

const categoryDescriptions: Record<string, string> = {
  Breakfast: "Soft starts, sweet bakes, and sunny brunch favorites.",
  Lunch: "Fresh midday meals that feel light, bright, and satisfying.",
  Dinner: "Comforting mains for easy weeknights and slow evenings.",
  Salad: "Crisp seasonal bowls with herbs, grains, and bold dressings.",
  Seafood: "Coastal-inspired dishes with simple, elegant flavors.",
  Vegetarian: "Colorful plant-forward recipes built around pantry staples.",
  Pasta: "Silky sauces, hearty shapes, and cozy Mediterranean comfort.",
};

function getRecipeFiles() {
  if (!fs.existsSync(recipesDirectory)) {
    return [];
  }

  return fs.readdirSync(recipesDirectory).filter((file) => file.endsWith(".mdx"));
}

function parseMinutes(value: string) {
  const match = value.match(/(\d+)/);
  return match ? Number(match[1]) : Number.POSITIVE_INFINITY;
}

function readRecipeFile(fileName: string): Recipe {
  const slug = fileName.replace(/\.mdx$/, "");
  const filePath = path.join(recipesDirectory, fileName);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    ...(data as RecipeFrontmatter),
    slug,
    content,
  };
}

function sortRecipes(recipes: Recipe[]) {
  return recipes.sort(
    (first, second) =>
      new Date(second.publishedAt).getTime() - new Date(first.publishedAt).getTime(),
  );
}

export function getAllRecipes() {
  return sortRecipes(getRecipeFiles().map(readRecipeFile));
}

export function getFeaturedRecipes(limit = 3) {
  return getAllRecipes()
    .filter((recipe) => recipe.featured)
    .slice(0, limit);
}

export function getLatestRecipes(limit = 4) {
  return getAllRecipes().slice(0, limit);
}

export function getRecipeBySlug(slug: string) {
  const recipePath = path.join(recipesDirectory, `${slug}.mdx`);
  if (!fs.existsSync(recipePath)) {
    return null;
  }

  return readRecipeFile(`${slug}.mdx`);
}

export async function getRecipeWithBody(slug: string): Promise<RecipeWithBody | null> {
  const recipe = getRecipeBySlug(slug);
  if (!recipe) {
    return null;
  }

  const { content } = await compileMDX({
    source: recipe.content,
    components: mdxComponents,
    options: {
      parseFrontmatter: false,
    },
  });

  return {
    ...recipe,
    body: content,
  };
}

export function getRelatedRecipes(recipe: Recipe, limit = 3) {
  return getAllRecipes()
    .filter((candidate) => candidate.slug !== recipe.slug)
    .sort((first, second) => {
      const firstScore = Number(first.category === recipe.category) +
        first.tags.filter((tag) => recipe.tags.includes(tag)).length;
      const secondScore = Number(second.category === recipe.category) +
        second.tags.filter((tag) => recipe.tags.includes(tag)).length;

      return secondScore - firstScore;
    })
    .slice(0, limit);
}

export function getRecipeCategories(): RecipeCategorySummary[] {
  const recipes = getAllRecipes();
  const categoryMap = new Map<string, RecipeCategorySummary>();

  recipes.forEach((recipe) => {
    const current = categoryMap.get(recipe.category);
    if (current) {
      current.count += 1;
      return;
    }

    categoryMap.set(recipe.category, {
      name: recipe.category,
      count: 1,
      description:
        categoryDescriptions[recipe.category] ??
        "Seasonal recipes with simple ingredients and balanced flavors.",
      image: recipe.image,
    });
  });

  return [...categoryMap.values()].sort((first, second) => first.name.localeCompare(second.name));
}

export function filterRecipes({ query, category, difficulty, maxTime }: RecipeFilters) {
  const normalizedQuery = query?.trim().toLowerCase();

  return getAllRecipes().filter((recipe) => {
    const matchesQuery =
      !normalizedQuery ||
      recipe.title.toLowerCase().includes(normalizedQuery) ||
      recipe.description.toLowerCase().includes(normalizedQuery) ||
      recipe.ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(normalizedQuery),
      );

    const matchesCategory = !category || category === "All" || recipe.category === category;
    const matchesDifficulty =
      !difficulty || difficulty === "All" || recipe.difficulty === difficulty;
    const matchesTime = !maxTime || parseMinutes(recipe.totalTime) <= maxTime;

    return matchesQuery && matchesCategory && matchesDifficulty && matchesTime;
  });
}

export function formatRecipeDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export function getCookingTimeOptions() {
  return [
    { label: "Any time", value: "All" },
    { label: "Under 20 minutes", value: "20" },
    { label: "Under 30 minutes", value: "30" },
    { label: "Under 45 minutes", value: "45" },
    { label: "Under 60 minutes", value: "60" },
  ];
}

export function getDifficultyOptions() {
  return ["All", "Easy", "Medium", "Advanced"];
}
