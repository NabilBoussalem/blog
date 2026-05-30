import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getRecipeBySlug, getRecipeSlugs, getRelatedRecipes } from "@/lib/recipes";
import RecipeMeta from "@/components/RecipeMeta";
import CategoryBadge from "@/components/CategoryBadge";
import RecipeGrid from "@/components/RecipeGrid";
import MDXContent from "@/components/MDXContent";

interface RecipePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getRecipeSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: RecipePageProps): Promise<Metadata> {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);

  if (!recipe) {
    return { title: "Recipe Not Found" };
  }

  return {
    title: recipe.frontmatter.title,
    description: recipe.frontmatter.description,
    keywords: recipe.frontmatter.tags,
  };
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);

  if (!recipe) {
    notFound();
  }

  const relatedRecipes = getRelatedRecipes(slug, 3);

  return (
    <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Breadcrumb */}
      <nav className="mb-8" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-sm text-stone-400">
          <li>
            <Link href="/" className="hover:text-stone-600 transition-colors">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link
              href="/recipes"
              className="hover:text-stone-600 transition-colors"
            >
              Recipes
            </Link>
          </li>
          <li>/</li>
          <li className="text-stone-600">{recipe.frontmatter.title}</li>
        </ol>
      </nav>

      {/* Header */}
      <header className="mb-10">
        <CategoryBadge category={recipe.frontmatter.category} size="md" />
        <h1 className="mt-4 text-4xl sm:text-5xl font-bold text-stone-800 tracking-tight">
          {recipe.frontmatter.title}
        </h1>
        <p className="mt-4 text-lg text-stone-500 leading-relaxed">
          {recipe.frontmatter.description}
        </p>
        <time
          className="mt-4 block text-sm text-stone-400"
          dateTime={recipe.frontmatter.date}
        >
          Published on{" "}
          {new Date(recipe.frontmatter.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
      </header>

      {/* Hero Image Placeholder */}
      <div className="aspect-[16/9] rounded-2xl bg-stone-100 mb-10 flex items-center justify-center border border-stone-200">
        <div className="text-center text-stone-300">
          <svg
            className="w-20 h-20 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          <p className="mt-2 text-sm">Recipe Image</p>
        </div>
      </div>

      {/* Recipe Meta */}
      <div className="mb-10">
        <RecipeMeta frontmatter={recipe.frontmatter} />
      </div>

      {/* MDX Content */}
      <div className="mb-12">
        <MDXContent source={recipe.content} />
      </div>

      {/* Tags */}
      {recipe.frontmatter.tags.length > 0 && (
        <div className="mb-12 pt-8 border-t border-stone-200">
          <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-3">
            Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {recipe.frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block bg-stone-100 text-stone-600 rounded-full px-3 py-1 text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Related Recipes */}
      {relatedRecipes.length > 0 && (
        <section className="pt-8 border-t border-stone-200">
          <h2 className="text-2xl font-bold text-stone-800 mb-6">
            You Might Also Like
          </h2>
          <RecipeGrid recipes={relatedRecipes} />
        </section>
      )}
    </article>
  );
}
