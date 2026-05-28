export interface RecipeFrontmatter {
  title: string;
  description: string;
  slug: string;
  date: string;
  updated: string;
  category: string;
  tags: string[];
  image: string;
  prepTime: string;
  cookTime: string;
  totalTime: string;
  servings: number;
  ingredients: string[];
  instructions: string[];
  nutrition?: {
    calories?: string;
    fatContent?: string;
    carbohydrateContent?: string;
    proteinContent?: string;
    fiberContent?: string;
  };
  author?: string;
  rating?: number;
  ratingCount?: number;
}

export interface Recipe extends RecipeFrontmatter {
  content: string;
}

const requiredFields: (keyof RecipeFrontmatter)[] = [
  'title',
  'description',
  'slug',
  'date',
  'updated',
  'category',
  'tags',
  'image',
  'prepTime',
  'cookTime',
  'totalTime',
  'servings',
  'ingredients',
  'instructions',
];

export function validateFrontmatter(data: Record<string, unknown>): RecipeFrontmatter {
  for (const field of requiredFields) {
    if (data[field] === undefined || data[field] === null) {
      throw new Error(`Missing required frontmatter field: ${field}`);
    }
  }

  if (!Array.isArray(data.tags)) {
    throw new Error('Frontmatter field "tags" must be an array');
  }
  if (!Array.isArray(data.ingredients)) {
    throw new Error('Frontmatter field "ingredients" must be an array');
  }
  if (!Array.isArray(data.instructions)) {
    throw new Error('Frontmatter field "instructions" must be an array');
  }
  if (typeof data.servings !== 'number') {
    throw new Error('Frontmatter field "servings" must be a number');
  }

  return data as unknown as RecipeFrontmatter;
}
