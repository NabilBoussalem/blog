import Image from "next/image";
import Link from "next/link";

import { CategoryCard } from "@/components/CategoryCard";
import { Newsletter } from "@/components/Newsletter";
import { RecipeGrid } from "@/components/RecipeGrid";
import { SearchBar } from "@/components/SearchBar";
import { SectionHeading } from "@/components/SectionHeading";
import { getFeaturedRecipes, getLatestRecipes, getRecipeCategories } from "@/lib/recipes";

export default function Home() {
  const featuredRecipes = getFeaturedRecipes(3);
  const latestRecipes = getLatestRecipes(3);
  const categories = getRecipeCategories();
  const heroRecipe = featuredRecipes[0] ?? latestRecipes[0];

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-24 px-5 py-10 sm:px-6 lg:px-8 lg:py-14">
      <section className="grid items-center gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
        <div className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-terracotta-700">
            Mediterranean kitchen journal
          </p>
          <div className="space-y-5">
            <h1 className="font-serif text-6xl leading-none text-olive-950 sm:text-7xl">
              Simple Recipes for Warm, Everyday Cooking
            </h1>
            <p className="max-w-xl text-base leading-8 text-stone-600">
              Fresh, comforting recipes inspired by Mediterranean kitchens, seasonal ingredients, and slow weekend meals.
            </p>
          </div>
          <SearchBar className="max-w-2xl" />
          <div className="flex flex-wrap gap-3 text-sm text-stone-600">
            <span className="rounded-full bg-white px-4 py-2 shadow-sm">Seasonal dishes</span>
            <span className="rounded-full bg-white px-4 py-2 shadow-sm">Weeknight comfort</span>
            <span className="rounded-full bg-white px-4 py-2 shadow-sm">Slow brunch favorites</span>
          </div>
        </div>

        {heroRecipe ? (
          <article className="overflow-hidden rounded-[2.5rem] border border-stone-200 bg-white shadow-card">
            <div className="relative h-[420px] sm:h-[520px]">
              <Image
                src={heroRecipe.image}
                alt={heroRecipe.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="space-y-4 p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
                <span className="rounded-full bg-olive-50 px-3 py-1 text-olive-700">Featured recipe</span>
                <span>{heroRecipe.category}</span>
                <span>{heroRecipe.totalTime}</span>
              </div>
              <div>
                <h2 className="font-serif text-4xl text-olive-950">{heroRecipe.title}</h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-600">{heroRecipe.description}</p>
              </div>
              <Link
                href={`/recipes/${heroRecipe.slug}`}
                className="inline-flex items-center rounded-full bg-olive-900 px-5 py-3 text-sm font-semibold text-cream-50 transition hover:bg-olive-700"
              >
                Read recipe
              </Link>
            </div>
          </article>
        ) : null}
      </section>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Browse by mood"
          title="Recipe categories"
          description="Start with the kind of meal you crave, from bright salads to pasta nights and cozy brunches."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.name} category={category} />
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Featured"
          title="Standout recipes for the week"
          description="A small collection of well-loved dishes that feel special, but still fit into everyday cooking."
        />
        <RecipeGrid recipes={featuredRecipes} />
      </section>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Latest from the kitchen"
          title="Freshly added recipes"
          description="The newest plates, pantry ideas, and easy dinner inspiration from Olive & Thyme."
        />
        <RecipeGrid recipes={latestRecipes} />
      </section>

      <Newsletter />
    </div>
  );
}
