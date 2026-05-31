# Saveurs Françaises

A modern French recipe blog built with Next.js App Router, TypeScript, Tailwind CSS, and MDX recipe posts.

## What this project includes

- Static recipe pages generated from MDX files in `/content/recipes`
- SEO-friendly page metadata, including dynamic metadata for each recipe
- Search and category filtering on the recipes page
- Reusable UI components for layout and recipe content
- Five sample French recipes ready to edit or extend

## Folder structure

```text
content/recipes        MDX recipe posts with frontmatter
public/images          Recipe artwork used by the sample posts
src/app                App Router pages and layouts
src/components         Reusable UI building blocks
src/lib                Recipe loading and parsing utilities
src/types              Shared TypeScript types
```

## Scripts

```bash
npm install
npm run dev
npm run lint
npm run build
```

## How a recipe is loaded

1. `src/lib/recipes.ts` reads MDX files from `content/recipes`.
2. `gray-matter` parses the frontmatter metadata.
3. The recipes page lists the parsed recipe summaries.
4. The dynamic route at `src/app/recipes/[slug]/page.tsx` statically generates one page per recipe and renders the MDX body.

## Add a new recipe

1. Create a new `.mdx` file in `/content/recipes`.
2. Use this frontmatter shape at the top of the file:

```md
---
title: "Recipe title"
description: "Short summary for cards and SEO."
image: "/images/your-image.svg"
category: "Main Dish"
prepTime: "20 minutes"
cookTime: "40 minutes"
servings: 4
difficulty: "Easy"
date: "2026-05-31"
featured: false
---
```

3. Write the recipe body in MDX using sections such as `## Ingredients` and `## Instructions`.
4. Add the referenced image to `/public/images`.
5. Run `npm run dev` to preview the new page locally.

## Main files to review

- `src/lib/recipes.ts` — reads and sorts recipe files
- `src/app/page.tsx` — home page hero, featured recipes, and recent recipes
- `src/app/recipes/page.tsx` — searchable recipe archive
- `src/app/recipes/[slug]/page.tsx` — statically generated recipe detail page
- `src/components/*` — layout and recipe presentation components

## Notes

The contact page currently provides the form UI only, with no backend submission handler.
