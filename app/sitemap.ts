import type { MetadataRoute } from "next";
import { getAllRecipes, getTaxonomy } from "@/lib/recipes";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = ["", "/recipes", "/about"].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: now,
  }));

  const recipeRoutes = getAllRecipes().map((recipe) => ({
    url: `${siteConfig.url}/recipes/${recipe.slug}`,
    lastModified: new Date(recipe.updatedAt || recipe.date),
  }));

  const categoryRoutes = getTaxonomy("category").map((category) => ({
    url: `${siteConfig.url}/categories/${category.slug}`,
    lastModified: now,
  }));

  const tagRoutes = getTaxonomy("tag").map((tag) => ({
    url: `${siteConfig.url}/tags/${tag.slug}`,
    lastModified: now,
  }));

  return [...staticRoutes, ...recipeRoutes, ...categoryRoutes, ...tagRoutes];
}
