import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "@/components/mdx-components";

const recipesDirectory = path.join(process.cwd(), "src/content/recipes");

export type RecipeFrontmatter = {
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
};

export type RecipeSummary = RecipeFrontmatter & {
  slug: string;
};

export type Recipe = RecipeSummary & {
  content: React.ReactNode;
};

type RecipeFilters = {
  query?: string;
  category?: string;
  sort?: string;
};

function normalizeFrontmatter(data: Record<string, unknown>): RecipeFrontmatter {
  return {
    title: String(data.title ?? "Untitled Recipe"),
    description: String(data.description ?? ""),
    date: String(data.date ?? "1970-01-01"),
    category: String(data.category ?? "Uncategorized"),
    tags: Array.isArray(data.tags) ? data.tags.map((tag) => String(tag)) : [],
    image: String(data.image ?? "/images/recipe-placeholder.svg"),
    prepTime: String(data.prepTime ?? "—"),
    cookTime: String(data.cookTime ?? "—"),
    totalTime: String(data.totalTime ?? "—"),
    servings: Number(data.servings ?? 0),
    difficulty: String(data.difficulty ?? "Easy"),
    featured: Boolean(data.featured ?? false),
  };
}

function parseMinutes(value: string) {
  const match = value.match(/(\d+)/);
  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER;
}

function sortByNewest(recipes: RecipeSummary[]) {
  return [...recipes].sort(
    (left, right) => new Date(right.date).getTime() - new Date(left.date).getTime(),
  );
}

export async function getRecipeSlugs() {
  const entries = await fs.readdir(recipesDirectory);
  return entries
    .filter((entry) => entry.endsWith(".mdx"))
    .map((entry) => entry.replace(/\.mdx$/, ""));
}

export async function getAllRecipes(): Promise<RecipeSummary[]> {
  const slugs = await getRecipeSlugs();
  const recipes = await Promise.all(
    slugs.map(async (slug) => {
      const source = await fs.readFile(path.join(recipesDirectory, `${slug}.mdx`), "utf8");
      const { data } = matter(source);

      return {
        slug,
        ...normalizeFrontmatter(data),
      };
    }),
  );

  return sortByNewest(recipes);
}

export async function getFeaturedRecipes(limit = 2) {
  const recipes = await getAllRecipes();
  const featured = recipes.filter((recipe) => recipe.featured);
  return (featured.length > 0 ? featured : recipes).slice(0, limit);
}

export async function getAllCategories() {
  const recipes = await getAllRecipes();
  return [...new Set(recipes.map((recipe) => recipe.category))].sort((left, right) =>
    left.localeCompare(right),
  );
}

export async function getRecipeBySlug(slug: string): Promise<Recipe | null> {
  try {
    const source = await fs.readFile(path.join(recipesDirectory, `${slug}.mdx`), "utf8");
    const { content, frontmatter } = await compileMDX<RecipeFrontmatter>({
      source,
      components: mdxComponents,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [remarkGfm],
        },
      },
    });

    return {
      slug,
      ...normalizeFrontmatter(frontmatter),
      content,
    };
  } catch {
    return null;
  }
}

export async function getRelatedRecipes(slug: string, limit = 3) {
  const recipes = await getAllRecipes();
  const currentRecipe = recipes.find((recipe) => recipe.slug === slug);

  if (!currentRecipe) {
    return [];
  }

  return recipes
    .filter((recipe) => recipe.slug !== slug)
    .map((recipe) => ({
      recipe,
      score:
        Number(recipe.category === currentRecipe.category) * 3 +
        recipe.tags.filter((tag) => currentRecipe.tags.includes(tag)).length,
    }))
    .sort((left, right) => right.score - left.score)
    .map(({ recipe }) => recipe)
    .slice(0, limit);
}

export function filterRecipes(recipes: RecipeSummary[], filters: RecipeFilters) {
  const normalizedQuery = filters.query?.trim().toLowerCase() ?? "";
  const normalizedCategory = filters.category?.trim().toLowerCase() ?? "";

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesQuery =
      normalizedQuery.length === 0 ||
      [recipe.title, recipe.description, recipe.category, ...recipe.tags]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery);

    const matchesCategory =
      normalizedCategory.length === 0 || recipe.category.toLowerCase() === normalizedCategory;

    return matchesQuery && matchesCategory;
  });

  if (filters.sort === "time") {
    return [...filteredRecipes].sort(
      (left, right) => parseMinutes(left.totalTime) - parseMinutes(right.totalTime),
    );
  }

  return sortByNewest(filteredRecipes);
}
