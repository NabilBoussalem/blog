# 🇫🇷 La Cuisine Française — French Recipe Blog

A modern blog for French recipes built with Next.js, TypeScript, Tailwind CSS, and MDX.

## Tech Stack

- **Next.js 16** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **MDX** for recipe content (via `next-mdx-remote`)
- **gray-matter** for frontmatter parsing
- Static generation for all recipe pages

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── content/recipes/        # MDX recipe files
├── public/images/          # Recipe images
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── page.tsx        # Home page
│   │   ├── recipes/        # Recipes listing + [slug] detail
│   │   ├── about/          # About page
│   │   └── contact/        # Contact page
│   ├── components/         # Reusable UI components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Container.tsx
│   │   ├── RecipeCard.tsx
│   │   ├── RecipeGrid.tsx
│   │   ├── RecipeMetaInfo.tsx
│   │   ├── CategoryFilter.tsx
│   │   └── SearchInput.tsx
│   └── lib/                # Utility functions
│       ├── recipes.ts      # Read/parse MDX files
│       └── types.ts        # TypeScript interfaces
```

## Adding a New Recipe

1. Create a new `.mdx` file in `content/recipes/` (e.g., `bouillabaisse.mdx`).
2. Add frontmatter at the top of the file:

```mdx
---
title: "Bouillabaisse"
description: "A traditional Provençal fish stew from Marseille."
image: "/images/bouillabaisse.jpg"
category: "Soup"
prepTime: "30 minutes"
cookTime: "45 minutes"
servings: 6
difficulty: "Hard"
date: "2026-06-01"
featured: false
---

## Ingredients

- Your ingredients here...

## Instructions

1. Step one...
2. Step two...
```

3. The recipe will automatically appear on the site. The slug is derived from the filename (e.g., `bouillabaisse.mdx` → `/recipes/bouillabaisse`).
4. Optionally add an image to `public/images/` matching the `image` path in the frontmatter.
5. Set `featured: true` to display the recipe in the Featured section on the home page.

## Available Scripts

| Command         | Description                  |
| --------------- | ---------------------------- |
| `npm run dev`   | Start development server     |
| `npm run build` | Build for production         |
| `npm run start` | Start production server      |
| `npm run lint`  | Run ESLint                   |

## Routes

| Route              | Description                |
| ------------------ | -------------------------- |
| `/`                | Home page                  |
| `/recipes`         | All recipes with search    |
| `/recipes/[slug]`  | Individual recipe page     |
| `/about`           | About the blog             |
| `/contact`         | Contact form (UI only)     |
