# Harvest Table

A modern recipe blog built with Next.js App Router, TypeScript, Tailwind CSS, and MDX-based recipe content.

## Features

- Editorial, responsive recipe blog design
- MDX recipes loaded from `src/content/recipes`
- Search, category filtering, and sorting on the recipes page
- Dynamic recipe detail pages with SEO metadata
- Reusable UI components for cards, badges, metadata, layout, and search
- Accessible, semantic page structure with graceful empty states

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- MDX rendering with `next-mdx-remote`
- Frontmatter parsing with `gray-matter`

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000).

## Validation

- Lint: `npm run lint`
- Production build: `npm run build`

## Content Authoring

Recipes live in `src/content/recipes` as `.mdx` files.

Example frontmatter:

```mdx
---
title: "Creamy Garlic Pasta"
description: "A quick and comforting pasta recipe with garlic, cream, and parmesan."
date: "2026-05-30"
category: "Dinner"
tags: ["pasta", "quick", "comfort food"]
image: "/images/creamy-garlic-pasta.svg"
prepTime: "10 minutes"
cookTime: "20 minutes"
totalTime: "30 minutes"
servings: 4
difficulty: "Easy"
featured: true
---
```
