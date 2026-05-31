import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { RecipeGrid } from "@/components/RecipeGrid";
import { RecipeMeta } from "@/components/RecipeMeta";
import {
  formatRecipeDate,
  getAllRecipes,
  getRecipeBySlug,
  getRecipeWithBody,
  getRelatedRecipes,
} from "@/lib/recipes";

type RecipePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllRecipes().map((recipe) => ({ slug: recipe.slug }));
}

export async function generateMetadata({ params }: RecipePageProps): Promise<Metadata> {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);

  if (!recipe) {
    return {
      title: "Recipe not found",
    };
  }

  return {
    title: recipe.title,
    description: recipe.description,
    openGraph: {
      title: recipe.title,
      description: recipe.description,
      images: [recipe.image],
      type: "article",
    },
  };
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { slug } = await params;
  const recipe = await getRecipeWithBody(slug);

  if (!recipe) {
    notFound();
  }

  const relatedRecipes = getRelatedRecipes(recipe, 3);

  return (
    <article className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-5 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        <div className="space-y-6">
          <Link
            href="/recipes"
            className="inline-flex items-center gap-2 text-sm font-medium text-stone-500 transition hover:text-olive-900"
          >
            <span aria-hidden="true">←</span> Back to recipes
          </Link>
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
            <span className="rounded-full bg-olive-50 px-3 py-1 text-olive-700">{recipe.category}</span>
            <span className="rounded-full bg-terracotta-300/20 px-3 py-1 text-terracotta-700">{recipe.difficulty}</span>
            <span>{formatRecipeDate(recipe.publishedAt)}</span>
          </div>
          <div>
            <h1 className="font-serif text-6xl leading-none text-olive-950 sm:text-7xl">{recipe.title}</h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-stone-600">{recipe.description}</p>
          </div>
          <RecipeMeta recipe={recipe} />
        </div>

        <div className="relative h-[420px] overflow-hidden rounded-[2.5rem] border border-stone-200 bg-white shadow-card sm:h-[520px]">
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <aside className="space-y-8 rounded-[2.5rem] border border-stone-200 bg-white p-6 shadow-card sm:p-8 lg:sticky lg:top-24">
          <section>
            <h2 className="font-serif text-4xl text-olive-950">Ingredients</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-stone-700">
              {recipe.ingredients.map((ingredient) => (
                <li key={ingredient} className="flex gap-3">
                  <span className="mt-2 size-2 rounded-full bg-gold-400" aria-hidden="true" />
                  <span>{ingredient}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-4xl text-olive-950">Notes</h2>
            {recipe.notes?.length ? (
              <ul className="mt-4 space-y-3 text-sm leading-7 text-stone-700">
                {recipe.notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm leading-7 text-stone-600">No extra notes for this recipe just yet.</p>
            )}
          </section>
        </aside>

        <div className="space-y-10 rounded-[2.5rem] border border-stone-200 bg-white p-6 shadow-card sm:p-8">
          <section>
            <h2 className="font-serif text-4xl text-olive-950">Step-by-step instructions</h2>
            <ol className="mt-6 space-y-5">
              {recipe.instructions.map((instruction, index) => (
                <li key={instruction} className="flex gap-4 rounded-[1.75rem] bg-cream-50 px-4 py-4">
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-olive-900 text-sm font-semibold text-cream-50">
                    {index + 1}
                  </span>
                  <p className="pt-1 text-sm leading-7 text-stone-700">{instruction}</p>
                </li>
              ))}
            </ol>
          </section>

          <section>
            <h2 className="font-serif text-4xl text-olive-950">From the kitchen</h2>
            <div className="recipe-prose mt-4">{recipe.body}</div>
          </section>

          <section>
            <h2 className="font-serif text-4xl text-olive-950">Tags</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {recipe.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-olive-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-olive-700">
                  {tag}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>

      <section className="space-y-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-terracotta-700">Cook next</p>
          <h2 className="mt-3 font-serif text-5xl text-olive-950">Related recipes</h2>
        </div>
        <RecipeGrid
          recipes={relatedRecipes}
          emptyTitle="More recipes are on the way"
          emptyDescription="This recipe is the first of its kind for now, but more related dishes will be added soon."
        />
      </section>
    </article>
  );
}
