# The Cozy Kitchen — Recipe Blog

A modern recipe blog built with Next.js App Router, TypeScript, Tailwind CSS, and MDX.

## Features

- 🍽️ Beautiful, responsive recipe blog design
- 📝 Recipes written as MDX files with frontmatter
- 🔍 Search and filter recipes by category
- 📱 Fully responsive on mobile, tablet, and desktop
- 🎨 Warm, modern cooking-blog aesthetic
- 🏷️ SEO-friendly pages with metadata
- ⚡ Fast static generation with Next.js App Router

## Tech Stack

- **Next.js 16** with App Router
- **TypeScript** for type safety
- **Tailwind CSS 4** for styling
- **MDX** for recipe content
- **next-mdx-remote** for MDX rendering
- **gray-matter** for frontmatter parsing

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Project Structure

```
src/
├── app/
│   ├── about/          # About page
│   ├── contact/        # Contact page
│   ├── recipes/        # Recipes listing & detail pages
│   │   ├── [slug]/     # Dynamic recipe pages
│   │   └── page.tsx    # Recipes listing
│   ├── globals.css     # Global styles & Tailwind config
│   ├── layout.tsx      # Root layout with Header/Footer
│   └── page.tsx        # Home page
├── components/         # Reusable UI components
│   ├── CategoryBadge.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── MDXContent.tsx
│   ├── RecipeCard.tsx
│   ├── RecipeGrid.tsx
│   ├── RecipeMeta.tsx
│   └── SearchBar.tsx
├── content/
│   └── recipes/        # MDX recipe files
└── lib/
    ├── recipes.ts      # Recipe loading utilities
    └── types.ts        # TypeScript interfaces
```

## Adding New Recipes

Create a new `.mdx` file in `src/content/recipes/` with the following frontmatter:

```mdx
---
title: "Recipe Name"
description: "Brief description of the recipe"
date: "2026-01-01"
category: "Dinner"
tags: ["tag1", "tag2"]
image: "/images/recipe-image.jpg"
prepTime: "10 minutes"
cookTime: "20 minutes"
totalTime: "30 minutes"
servings: 4
difficulty: "Easy"
featured: false
---

## Ingredients

- Ingredient 1
- Ingredient 2

## Instructions

### Step 1: First Step

Instructions here...
```

The recipe will automatically appear on the site using the filename as the URL slug.
