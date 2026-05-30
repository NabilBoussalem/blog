# Saffron Table

A static-first recipe blog built with Next.js App Router, TypeScript, and MDX recipe content.

## Development

```bash
npm install
npm run dev
```

## Validation

```bash
npm run lint
npm run build
```

## Content model

- Recipes live in `/tmp/workspace/NabilBoussalem/blog/src/content/recipes`
- Typed recipe loading and sorting live in `/tmp/workspace/NabilBoussalem/blog/src/lib/recipes.ts`
- Recipe and listing JSON-LD helpers live in `/tmp/workspace/NabilBoussalem/blog/src/lib/schema.ts`

## Design notes

- Local self-hosted fonts are loaded with `next/font/local`
- Theme switching uses a small client component and persists in `localStorage`
- Recipe saves also persist in `localStorage`
