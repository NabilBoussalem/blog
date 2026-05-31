import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { getRecipeBySlug, getRecipeSlugs, getRelatedRecipes } from "@/lib/recipes";
import RecipeMeta from "@/components/RecipeMeta";
import RecipeGrid from "@/components/RecipeGrid";

interface RecipePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getRecipeSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: RecipePageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const recipe = getRecipeBySlug(slug);
    return {
      title: recipe.title,
      description: recipe.description,
      openGraph: {
        title: recipe.title,
        description: recipe.description,
        images: recipe.image ? [recipe.image] : [],
      },
    };
  } catch {
    return { title: "Recipe Not Found" };
  }
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { slug } = await params;

  let recipe;
  try {
    recipe = getRecipeBySlug(slug);
  } catch {
    notFound();
  }

  const relatedRecipes = getRelatedRecipes(slug, 3);

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-stone-400 mb-6">
        <Link href="/" className="hover:text-olive transition-colors">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/recipes" className="hover:text-olive transition-colors">
          Recipes
        </Link>
        <span className="mx-2">/</span>
        <span className="text-stone-600">{recipe.title}</span>
      </nav>

      {/* Header */}
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <Link
            href={`/recipes?category=${encodeURIComponent(recipe.category)}`}
            className="bg-olive/10 text-olive text-xs font-semibold px-3 py-1 rounded-full hover:bg-olive/20 transition-colors"
          >
            {recipe.category}
          </Link>
          <span
            className={`text-xs font-medium px-3 py-1 rounded-full ${
              recipe.difficulty === "Easy"
                ? "bg-green-50 text-green-700"
                : recipe.difficulty === "Medium"
                ? "bg-yellow-50 text-yellow-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            {recipe.difficulty}
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-serif font-bold text-stone-800 mb-4 leading-tight">
          {recipe.title}
        </h1>
        <p className="text-lg text-stone-500 leading-relaxed mb-6">
          {recipe.description}
        </p>
        <p className="text-sm text-stone-400">
          Published on{" "}
          {new Date(recipe.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </header>

      {/* Hero image placeholder */}
      <div className="aspect-[16/9] bg-olive/10 rounded-2xl mb-10 flex items-center justify-center text-olive/30 overflow-hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-20 w-20"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>

      {/* Recipe Meta */}
      <div className="mb-10">
        <RecipeMeta
          prepTime={recipe.prepTime}
          cookTime={recipe.cookTime}
          totalTime={recipe.totalTime}
          servings={recipe.servings}
          difficulty={recipe.difficulty}
          category={recipe.category}
        />
      </div>

      {/* Ingredients */}
      <section className="mb-10">
        <h2 className="text-2xl font-serif font-bold text-stone-800 mb-4">
          Ingredients
        </h2>
        <div className="bg-white rounded-2xl border border-stone-200 p-6">
          <ul className="space-y-2">
            {recipe.ingredients.map((ingredient, i) => (
              <li key={i} className="flex items-start gap-3 text-stone-600">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-olive shrink-0" />
                {ingredient}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Instructions */}
      <section className="mb-10">
        <h2 className="text-2xl font-serif font-bold text-stone-800 mb-4">
          Instructions
        </h2>
        <ol className="space-y-4">
          {recipe.instructions.map((step, i) => (
            <li key={i} className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-olive text-white rounded-full flex items-center justify-center text-sm font-bold">
                {i + 1}
              </span>
              <p className="text-stone-600 leading-relaxed pt-1">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* MDX Content */}
      {recipe.content.trim() && (
        <section className="mb-10 prose max-w-none">
          <h2 className="text-2xl font-serif font-bold text-stone-800 mb-4">
            Notes
          </h2>
          <div className="bg-olive/5 rounded-2xl p-6 text-stone-600 leading-relaxed whitespace-pre-line">
            {recipe.content.trim()}
          </div>
        </section>
      )}

      {/* Tags */}
      {recipe.tags.length > 0 && (
        <section className="mb-10">
          <h3 className="text-sm font-semibold text-stone-400 uppercase tracking-wider mb-3">
            Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {recipe.tags.map((tag) => (
              <Link
                key={tag}
                href={`/recipes?search=${encodeURIComponent(tag)}`}
                className="px-3 py-1 bg-stone-100 text-stone-500 text-sm rounded-full hover:bg-olive/10 hover:text-olive transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Related Recipes */}
      {relatedRecipes.length > 0 && (
        <section className="mt-16 pt-10 border-t border-stone-200">
          <h2 className="text-2xl font-serif font-bold text-stone-800 mb-6">
            You Might Also Like
          </h2>
          <RecipeGrid recipes={relatedRecipes} />
        </section>
      )}
    </article>
  );
}
