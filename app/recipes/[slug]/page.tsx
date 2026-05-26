import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

import { JsonLd } from "@/components/JsonLd";
import { mdxComponents } from "@/components/MDXComponents";
import { RecipeCard } from "@/components/RecipeCard";
import { RecipeMeta } from "@/components/RecipeMeta";
import { getAllRecipes, getRecipeBySlug, getRecipeSummary, getRelatedRecipes } from "@/lib/recipes";
import { siteConfig } from "@/lib/site";
import { toTermSlug } from "@/lib/taxonomy";

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
      description: "The recipe could not be found.",
    };
  }

  const canonical = `/recipes/${recipe.slug}`;

  return {
    title: recipe.title,
    description: recipe.description,
    alternates: { canonical },
    openGraph: {
      title: recipe.title,
      description: recipe.description,
      url: `${siteConfig.url}${canonical}`,
      images: [{ url: recipe.image, alt: recipe.imageAlt }],
      type: "article",
      publishedTime: recipe.date,
      modifiedTime: recipe.updatedAt,
      tags: recipe.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: recipe.title,
      description: recipe.description,
      images: [recipe.image],
    },
  };
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);

  if (!recipe) {
    notFound();
  }

  const { content } = await compileMDX({
    source: recipe.content,
    components: mdxComponents,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  });

  const summary = getRecipeSummary(recipe);
  const relatedRecipes = getRelatedRecipes(recipe);

  const recipeJsonLd = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.title,
    description: recipe.description,
    image: [`${siteConfig.url}${recipe.image}`],
    datePublished: recipe.date,
    dateModified: recipe.updatedAt,
    recipeYield: `${recipe.servings} servings`,
    prepTime: `PT${recipe.prepTime}M`,
    totalTime: `PT${recipe.totalTime}M`,
    recipeCategory: recipe.category,
    keywords: recipe.tags.join(", "),
    recipeIngredient: recipe.ingredients,
    recipeInstructions: recipe.instructions.map((instruction) => ({
      "@type": "HowToStep",
      text: instruction,
    })),
    nutrition: {
      "@type": "NutritionInformation",
      calories: `${recipe.calories} calories`,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Recipes",
        item: `${siteConfig.url}/recipes`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: recipe.title,
        item: `${siteConfig.url}/recipes/${recipe.slug}`,
      },
    ],
  };

  return (
    <article className="space-y-8">
      <JsonLd data={[recipeJsonLd, breadcrumbJsonLd]} />
      <header className="space-y-4">
        <div className="text-sm text-emerald-700">
          <Link href="/recipes">Recipes</Link> /{" "}
          <Link href={`/categories/${toTermSlug(recipe.category)}`}>{recipe.category}</Link>
        </div>
        <h1 className="text-4xl font-bold text-slate-900">{recipe.title}</h1>
        <p className="max-w-3xl text-slate-700">{recipe.description}</p>
        <RecipeMeta recipe={summary} />
      </header>

      <div className="relative h-72 w-full overflow-hidden rounded-3xl sm:h-96">
        <Image
          src={recipe.image}
          alt={recipe.imageAlt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 1200px"
          className="object-cover"
        />
      </div>

      <section className="grid gap-8 lg:grid-cols-[1.5fr,1fr]">
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-slate-900">Ingredients</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-emerald-500">
              {recipe.ingredients.map((ingredient) => (
                <li key={ingredient}>{ingredient}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900">Instructions</h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 marker:text-emerald-600">
              {recipe.instructions.map((instruction) => (
                <li key={instruction}>{instruction}</li>
              ))}
            </ol>
          </section>

          <section className="prose prose-slate max-w-none">{content}</section>
        </div>

        <aside className="space-y-4 rounded-2xl bg-white p-5">
          <h2 className="text-xl font-semibold text-slate-900">Quick info</h2>
          <p className="text-sm text-slate-700">Difficulty: {recipe.difficulty}</p>
          <p className="text-sm text-slate-700">Calories: {recipe.calories} per serving</p>
          <div className="flex flex-wrap gap-2 pt-2">
            {recipe.tags.map((tag) => (
              <Link
                key={tag}
                href={`/tags/${toTermSlug(tag)}`}
                className="rounded-full bg-sky-50 px-2 py-1 text-xs text-slate-700"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </aside>
      </section>

      <section>
        <h2 className="mb-5 text-2xl font-semibold text-slate-900">Related recipes</h2>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {relatedRecipes.map((item) => (
            <RecipeCard key={item.slug} recipe={item} />
          ))}
        </div>
      </section>
    </article>
  );
}
