import { z } from "zod";

import { absoluteUrl } from "@/lib/seo";

const isoDateString = z.preprocess((value) => {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  return value;
}, z.string().refine((value) => !Number.isNaN(Date.parse(value)), {
  message: "Expected a valid date string",
}));

const durationString = z.string().refine((value) => {
  const match = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/u.exec(value);

  return Boolean(match && (match[1] !== undefined || match[2] !== undefined || match[3] !== undefined));
}, {
  message: "Expected an ISO-8601 duration like PT45M or PT1H30M",
});

export const nutritionSchema = z
  .object({
    calories: z.string().optional(),
    carbohydrateContent: z.string().optional(),
    proteinContent: z.string().optional(),
    fatContent: z.string().optional(),
    fiberContent: z.string().optional(),
    sugarContent: z.string().optional(),
    sodiumContent: z.string().optional(),
  })
  .partial();

export const recipeFrontmatterSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  slug: z.string().min(1),
  date: isoDateString,
  updated: isoDateString,
  category: z.string().min(1),
  tags: z.array(z.string().min(1)).min(1),
  image: z.object({
    src: z.string().min(1),
    alt: z.string().min(1),
    width: z.number().int().positive(),
    height: z.number().int().positive(),
  }),
  prepTime: durationString,
  cookTime: durationString,
  totalTime: durationString,
  servings: z.string().min(1),
  ingredients: z.array(z.string().min(1)).min(1),
  instructions: z.array(z.string().min(1)).min(1),
  nutrition: nutritionSchema.optional(),
  author: z.string().min(1).optional(),
  rating: z.number().positive().max(5).optional(),
  ratingCount: z.number().int().positive().optional(),
});

export type RecipeFrontmatter = z.infer<typeof recipeFrontmatterSchema>;
export type RecipeSummary = RecipeFrontmatter & {
  categorySlug: string;
  url: string;
};
export type Recipe = RecipeSummary & {
  body: string;
};

export function buildRecipeJsonLd(recipe: RecipeSummary) {
  return {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.title,
    description: recipe.description,
    image: [absoluteUrl(recipe.image.src)],
    author: {
      "@type": "Person",
      name: recipe.author ?? "Nabil Boussalem",
    },
    datePublished: recipe.date,
    dateModified: recipe.updated,
    prepTime: recipe.prepTime,
    cookTime: recipe.cookTime,
    totalTime: recipe.totalTime,
    recipeYield: recipe.servings,
    recipeCategory: recipe.category,
    keywords: recipe.tags.join(", "),
    recipeIngredient: recipe.ingredients,
    recipeInstructions: recipe.instructions.map((step, index) => ({
      "@type": "HowToStep",
      name: `Step ${index + 1}`,
      text: step,
    })),
    ...(recipe.nutrition
      ? {
          nutrition: {
            "@type": "NutritionInformation",
            ...recipe.nutrition,
          },
        }
      : {}),
    ...(recipe.rating && recipe.ratingCount
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: recipe.rating,
            ratingCount: recipe.ratingCount,
          },
        }
      : {}),
  };
}

export function buildItemListJsonLd({
  title,
  description,
  path,
  recipes,
}: {
  title: string;
  description: string;
  path: string;
  recipes: RecipeSummary[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: title,
    description,
    url: absoluteUrl(path),
    itemListElement: recipes.map((recipe, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(recipe.url),
      name: recipe.title,
      image: absoluteUrl(recipe.image.src),
    })),
  };
}
