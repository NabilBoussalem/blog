# Cold Summer Recipes (Next.js + MDX)

Production-ready, SEO-friendly recipe blog built with Next.js App Router, TypeScript, Tailwind CSS, and local MDX content.

## Tech stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Local MDX files in `/content/recipes`

## Development

```bash
npm install
npm run dev
```

## Build and lint

```bash
npm run lint
npm run build
```

## Add a new recipe

1. Create a new `.mdx` file in `/content/recipes`.
2. Include required frontmatter fields:

```yaml
title:
slug:
description:
date:
updatedAt:
prepTime:
chillTime:
totalTime:
servings:
category:
tags:
image:
imageAlt:
difficulty:
calories:
ingredients:
instructions:
```

3. Add the image file under `/public/images` and reference it in `image`.
4. Keep ingredients and instructions as arrays for structured rendering and JSON-LD schema output.

## Required routes

- `/`
- `/recipes`
- `/recipes/[slug]`
- `/categories/[category]`
- `/tags/[tag]`
- `/about`
- `/sitemap.xml`
- `/robots.txt`
