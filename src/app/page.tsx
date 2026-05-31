import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { RecipeGrid } from "@/components/RecipeGrid";
import { getFeaturedRecipes, getRecentRecipes } from "@/lib/recipes";

export const metadata: Metadata = {
  title: "Home",
  description: "Browse featured French recipes, recent dishes, and timeless cooking inspiration.",
};

export default function Home() {
  const featuredRecipes = getFeaturedRecipes().slice(0, 3);
  const recentRecipes = getRecentRecipes(3);

  return (
    <>
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 overflow-hidden rounded-[2.5rem] border border-amber-100 bg-white px-6 py-8 shadow-sm sm:px-10 sm:py-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:px-12 lg:py-14">
            <div className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">French recipe journal</p>
              <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl">
                Elegant French recipes for relaxed meals at home.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-stone-600">
                Saveurs Françaises shares classic dishes, comforting soups, and everyday bistro favorites you can publish and manage as simple MDX files.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/recipes" className="rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-stone-700">
                  Browse all recipes
                </Link>
                <Link href="/about" className="rounded-full border border-amber-200 px-6 py-3 text-sm font-semibold text-stone-700 transition hover:border-amber-300 hover:text-amber-700">
                  Learn about the blog
                </Link>
              </div>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-amber-100">
              <Image
                src="/images/french-table.svg"
                alt="Illustrated French table with ingredients"
                fill
                priority
                className="object-cover"
                sizes="(min-width: 1024px) 35vw, 100vw"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-8 sm:py-10">
        <Container className="space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">Featured recipes</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900">Start with the house favorites.</h2>
            </div>
            <Link href="/recipes" className="text-sm font-semibold text-amber-700 transition hover:text-amber-800">
              View all recipes →
            </Link>
          </div>
          <RecipeGrid recipes={featuredRecipes} />
        </Container>
      </section>

      <section className="py-8 sm:py-10">
        <Container className="space-y-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">Recent recipes</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900">Fresh additions from the recipe notebook.</h2>
          </div>
          <RecipeGrid recipes={recentRecipes} />
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <div className="rounded-[2.5rem] bg-stone-900 px-6 py-10 text-center text-white sm:px-10">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">Cook with confidence</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">Ready to explore every recipe?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-stone-300">
              Browse the full collection to find elegant starters, cozy soups, and iconic French classics for every occasion.
            </p>
            <Link href="/recipes" className="mt-6 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-stone-900 transition hover:bg-amber-100">
              Explore the recipe archive
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
