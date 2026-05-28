import type { MetadataRoute } from 'next';
import { getAllRecipeSlugs, getAllCategories } from '@/lib/recipes';

const SITE_URL = 'https://example-recipe-blog.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const recipeSlugs = getAllRecipeSlugs();
  const categories = getAllCategories();

  const recipePages = recipeSlugs.map((slug) => ({
    url: `${SITE_URL}/recipes/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const categoryPages = categories.map((category) => ({
    url: `${SITE_URL}/categories/${category.toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${SITE_URL}/recipes`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...recipePages,
    ...categoryPages,
  ];
}
