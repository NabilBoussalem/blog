import type { Metadata } from 'next';
import { RecipeFrontmatter } from './schema';

export const SITE_URL = 'https://example-recipe-blog.com';
export const SITE_NAME = 'Savory & Sweet';
export const SITE_DESCRIPTION = 'Delicious recipes from around the world — simple, tested, and beautifully presented.';

export function getBaseMetadata(): Metadata {
  return {
    title: {
      default: SITE_NAME,
      template: `%s | ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    metadataBase: new URL(SITE_URL),
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function getRecipeMetadata(recipe: RecipeFrontmatter): Metadata {
  const url = `${SITE_URL}/recipes/${recipe.slug}`;
  return {
    title: recipe.title,
    description: recipe.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: recipe.title,
      description: recipe.description,
      url,
      type: 'article',
      images: [
        {
          url: recipe.image,
          width: 1200,
          height: 630,
          alt: recipe.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: recipe.title,
      description: recipe.description,
      images: [recipe.image],
    },
  };
}

export function getListingMetadata(title: string, description: string, path: string): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
    },
  };
}
