import type { MetadataRoute } from "next";

import { getAllCategories, getAllRecipes, getRecipesByCategory, slugifyCategory } from "@/lib/recipes";
import { siteConfig } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const recipes = getAllRecipes();
  const categories = getAllCategories();

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/recipes`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...recipes.map((recipe) => ({
      url: `${siteConfig.url}${recipe.url}`,
      lastModified: recipe.updated,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...categories.map((category) => {
      const items = getRecipesByCategory(category);
      return {
        url: `${siteConfig.url}/categories/${slugifyCategory(category)}`,
        lastModified: items[0]?.updated ?? new Date().toISOString(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      };
    }),
  ];
}
