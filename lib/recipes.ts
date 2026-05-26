import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Recipe, RecipeSummary } from "@/lib/types";
import { toTermSlug } from "@/lib/taxonomy";

type TaxonomyItem = {
  name: string;
  slug: string;
  count: number;
};

const RECIPES_DIR = path.join(process.cwd(), "content", "recipes");

const toNumber = (value: unknown, fallback: number) => {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const parsed = Number(value);
    if (!Number.isNaN(parsed)) return parsed;
  }
  return fallback;
};

const toStringArray = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split("\n")
      .map((item) => item.replace(/^[-*]\s*/, "").trim())
      .filter(Boolean);
  }

  return [];
};

const normalizeRecipe = (
  fileName: string,
  frontmatter: Record<string, unknown>,
  content: string,
): Recipe => {
  const fileSlug = fileName.replace(/\.mdx?$/, "");

  const title = typeof frontmatter.title === "string" ? frontmatter.title : fileSlug;
  const slug =
    typeof frontmatter.slug === "string" && frontmatter.slug.trim().length > 0
      ? toTermSlug(frontmatter.slug)
      : toTermSlug(fileSlug);

  const description =
    typeof frontmatter.description === "string"
      ? frontmatter.description
      : "A refreshing cold summer recipe.";

  const date =
    typeof frontmatter.date === "string"
      ? frontmatter.date
      : new Date().toISOString().slice(0, 10);

  const updatedAt = typeof frontmatter.updatedAt === "string" ? frontmatter.updatedAt : date;

  const ingredients = toStringArray(frontmatter.ingredients);
  const instructions = toStringArray(frontmatter.instructions);

  return {
    title,
    slug,
    description,
    date,
    updatedAt,
    prepTime: toNumber(frontmatter.prepTime, 10),
    chillTime: toNumber(frontmatter.chillTime, 0),
    totalTime: toNumber(frontmatter.totalTime, 10),
    servings: toNumber(frontmatter.servings, 2),
    category:
      typeof frontmatter.category === "string" && frontmatter.category.trim().length > 0
        ? frontmatter.category
        : "Uncategorized",
    tags: toStringArray(frontmatter.tags),
    image: typeof frontmatter.image === "string" ? frontmatter.image : "/images/placeholder.svg",
    imageAlt:
      typeof frontmatter.imageAlt === "string" ? frontmatter.imageAlt : `${title} served cold`,
    difficulty: typeof frontmatter.difficulty === "string" ? frontmatter.difficulty : "Easy",
    calories: toNumber(frontmatter.calories, 0),
    ingredients,
    instructions,
    content,
  };
};

const parseRecipeFile = (fileName: string): Recipe => {
  const fullPath = path.join(RECIPES_DIR, fileName);
  const fileContent = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContent);
  return normalizeRecipe(fileName, data as Record<string, unknown>, content);
};

const recipeSort = (a: Recipe, b: Recipe) => {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
};

export const getAllRecipes = (): Recipe[] => {
  if (!fs.existsSync(RECIPES_DIR)) return [];

  return fs
    .readdirSync(RECIPES_DIR)
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map(parseRecipeFile)
    .sort(recipeSort);
};

export const getRecipeBySlug = (slug: string): Recipe | null => {
  const recipes = getAllRecipes();
  return recipes.find((recipe) => recipe.slug === slug) ?? null;
};

export const getRecipeSummary = (recipe: Recipe): RecipeSummary => {
  return {
    title: recipe.title,
    slug: recipe.slug,
    description: recipe.description,
    date: recipe.date,
    updatedAt: recipe.updatedAt,
    prepTime: recipe.prepTime,
    chillTime: recipe.chillTime,
    totalTime: recipe.totalTime,
    servings: recipe.servings,
    category: recipe.category,
    tags: recipe.tags,
    image: recipe.image,
    imageAlt: recipe.imageAlt,
    difficulty: recipe.difficulty,
    calories: recipe.calories,
    ingredients: recipe.ingredients,
    instructions: recipe.instructions,
  };
};

export const getAllRecipeSummaries = (): RecipeSummary[] => {
  return getAllRecipes().map(getRecipeSummary);
};

export const getTaxonomy = (type: "category" | "tag"): TaxonomyItem[] => {
  const counter = new Map<string, number>();

  for (const recipe of getAllRecipes()) {
    const values = type === "category" ? [recipe.category] : recipe.tags;
    for (const value of values) {
      const normalized = value.trim();
      if (!normalized) continue;
      counter.set(normalized, (counter.get(normalized) ?? 0) + 1);
    }
  }

  return [...counter.entries()]
    .map(([name, count]) => ({ name, slug: toTermSlug(name), count }))
    .sort((a, b) => a.name.localeCompare(b.name));
};

export const getCategoryBySlug = (categorySlug: string) => {
  return getTaxonomy("category").find((item) => item.slug === categorySlug) ?? null;
};

export const getTagBySlug = (tagSlug: string) => {
  return getTaxonomy("tag").find((item) => item.slug === tagSlug) ?? null;
};

export const getRecipesByCategorySlug = (categorySlug: string) => {
  return getAllRecipes().filter((recipe) => toTermSlug(recipe.category) === categorySlug);
};

export const getRecipesByTagSlug = (tagSlug: string) => {
  return getAllRecipes().filter((recipe) => recipe.tags.some((tag) => toTermSlug(tag) === tagSlug));
};

export const getRelatedRecipes = (recipe: Recipe, limit = 3): RecipeSummary[] => {
  const related = getAllRecipes()
    .filter((candidate) => candidate.slug !== recipe.slug)
    .map((candidate) => {
      const sharedTags = candidate.tags.filter((tag) => recipe.tags.includes(tag)).length;
      const sameCategory = candidate.category === recipe.category ? 2 : 0;
      return { recipe: candidate, score: sharedTags + sameCategory };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ recipe: item }) => getRecipeSummary(item));

  if (related.length > 0) return related;

  return getAllRecipeSummaries().filter((item) => item.slug !== recipe.slug).slice(0, limit);
};
