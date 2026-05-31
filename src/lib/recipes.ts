import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Recipe, RecipeMeta } from "@/types/recipe";

const recipesDirectory = path.join(process.cwd(), "src/content/recipes");

export function getRecipeSlugs(): string[] {
  if (!fs.existsSync(recipesDirectory)) return [];
  return fs
    .readdirSync(recipesDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getRecipeBySlug(slug: string): Recipe {
  const fullPath = path.join(recipesDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title,
    description: data.description,
    image: data.image,
    category: data.category,
    difficulty: data.difficulty,
    prepTime: data.prepTime,
    cookTime: data.cookTime,
    totalTime: data.totalTime,
    servings: data.servings,
    tags: data.tags || [],
    featured: data.featured || false,
    publishedAt: data.publishedAt,
    ingredients: data.ingredients || [],
    instructions: data.instructions || [],
    notes: data.notes,
    content,
  };
}

export function getAllRecipes(): Recipe[] {
  const slugs = getRecipeSlugs();
  return slugs
    .map((slug) => getRecipeBySlug(slug))
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

export function getFeaturedRecipes(): Recipe[] {
  return getAllRecipes().filter((recipe) => recipe.featured);
}

export function getRecipesByCategory(category: string): Recipe[] {
  return getAllRecipes().filter(
    (recipe) => recipe.category.toLowerCase() === category.toLowerCase()
  );
}

export function getRelatedRecipes(currentSlug: string, limit = 3): RecipeMeta[] {
  const current = getRecipeBySlug(currentSlug);
  return getAllRecipes()
    .filter(
      (recipe) =>
        recipe.slug !== currentSlug &&
        (recipe.category === current.category ||
          recipe.tags.some((tag) => current.tags.includes(tag)))
    )
    .slice(0, limit)
    .map(({ content: _c, ...meta }) => meta);
}

export function getAllCategories(): { name: string; count: number }[] {
  const recipes = getAllRecipes();
  const categoryMap = new Map<string, number>();
  recipes.forEach((recipe) => {
    const count = categoryMap.get(recipe.category) || 0;
    categoryMap.set(recipe.category, count + 1);
  });
  return Array.from(categoryMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

function parseCookingMinutes(timeStr: string): number {
  const match = timeStr.match(/(\d+)/);
  if (!match) return 0;
  const num = parseInt(match[1], 10);
  if (timeStr.toLowerCase().includes("hour")) return num * 60;
  return num;
}

export function filterRecipes(
  recipes: Recipe[],
  filters: {
    search?: string;
    category?: string;
    difficulty?: string;
    cookingTime?: string;
  }
): Recipe[] {
  return recipes.filter((recipe) => {
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const matchesTitle = recipe.title.toLowerCase().includes(q);
      const matchesDesc = recipe.description.toLowerCase().includes(q);
      const matchesIngredient = recipe.ingredients.some((i) =>
        i.toLowerCase().includes(q)
      );
      const matchesTags = recipe.tags.some((t) =>
        t.toLowerCase().includes(q)
      );
      if (!matchesTitle && !matchesDesc && !matchesIngredient && !matchesTags) {
        return false;
      }
    }
    if (
      filters.category &&
      recipe.category.toLowerCase() !== filters.category.toLowerCase()
    ) {
      return false;
    }
    if (
      filters.difficulty &&
      recipe.difficulty.toLowerCase() !== filters.difficulty.toLowerCase()
    ) {
      return false;
    }
    if (filters.cookingTime) {
      const minutes = parseCookingMinutes(recipe.totalTime);
      if (filters.cookingTime === "Under 30 min" && minutes >= 30) return false;
      if (
        filters.cookingTime === "30–60 min" &&
        (minutes < 30 || minutes > 60)
      )
        return false;
      if (filters.cookingTime === "Over 60 min" && minutes <= 60) return false;
    }
    return true;
  });
}
