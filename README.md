# Olive & Thyme — Mediterranean Recipe Blog

A modern recipe blog built with Next.js, TypeScript, Tailwind CSS, and MDX.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

- `/src/app` — Pages (Home, Recipes, Categories, About)
- `/src/components` — Reusable UI components
- `/src/content/recipes` — MDX recipe files
- `/src/lib/recipes.ts` — Recipe loading utilities
- `/src/types/recipe.ts` — TypeScript type definitions

## Adding Recipes

Create a new `.mdx` file in `src/content/recipes/` with frontmatter fields (title, description, category, difficulty, prepTime, cookTime, etc.). See existing recipes for reference.

## Scripts

- `npm run dev` — Development server
- `npm run build` — Production build
- `npm run lint` — ESLint
