import { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Container from "@/components/Container";
import RecipeMetaInfo from "@/components/RecipeMetaInfo";
import { getRecipeBySlug, getAllRecipeSlugs } from "@/lib/recipes";
import Link from "next/link";

interface RecipePageProps {
  params: Promise<{ slug: string }>;
}

/** Generate static paths for all recipe MDX files */
export async function generateStaticParams() {
  return getAllRecipeSlugs().map((slug) => ({ slug }));
}

/** Generate SEO metadata dynamically from frontmatter */
export async function generateMetadata({ params }: RecipePageProps): Promise<Metadata> {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);
  if (!recipe) return { title: "Recipe Not Found" };

  return {
    title: recipe.meta.title,
    description: recipe.meta.description,
  };
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);
  if (!recipe) notFound();

  return (
    <Container className="max-w-3xl">
      {/* Back link */}
      <Link
        href="/recipes"
        className="text-amber-600 hover:text-amber-800 text-sm mb-6 inline-block transition-colors"
      >
        ← Back to Recipes
      </Link>

      {/* Recipe header */}
      <header className="mb-8">
        <span className="text-sm font-semibold uppercase tracking-wide text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
          {recipe.meta.category}
        </span>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-amber-900 mt-4 mb-3">
          {recipe.meta.title}
        </h1>
        <p className="text-lg text-amber-700 leading-relaxed">
          {recipe.meta.description}
        </p>
        <p className="text-sm text-amber-500 mt-2">
          Published on{" "}
          {new Date(recipe.meta.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </header>

      {/* Recipe metadata cards */}
      <RecipeMetaInfo meta={recipe.meta} />

      {/* MDX content (ingredients, instructions, tips) */}
      <article className="prose mt-8">
        <MDXRemote source={recipe.content} />
      </article>
    </Container>
  );
}
