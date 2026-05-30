import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CategoryBadge } from "@/components/CategoryBadge";
import { RecipeGrid } from "@/components/RecipeGrid";
import { RecipeMeta } from "@/components/RecipeMeta";
import { getAllRecipes, getRecipeBySlug, getRecipeSlugs, getRelatedRecipes } from "@/lib/recipes";

type RecipeDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getRecipeSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: RecipeDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug);

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

export default async function RecipeDetailPage({ params }: RecipeDetailPageProps) {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug);

  if (!recipe) {
    notFound();
  }

  const [relatedRecipes, allRecipes] = await Promise.all([
    getRelatedRecipes(slug, 3),
    getAllRecipes(),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted">
        <ol className="flex items-center gap-2">
          <li>
            <Link href="/" className="transition hover:text-accent">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/recipes" className="transition hover:text-accent">
              Recipes
            </Link>
          </li>
          <li>/</li>
          <li className="text-foreground">{recipe.title}</li>
        </ol>
      </nav>

      <article className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="overflow-hidden rounded-[2rem] shadow-[0_24px_60px_rgba(79,55,38,0.1)]">
          <Image
            src={recipe.image}
            alt={recipe.title}
            width={1200}
            height={900}
            priority
            className="h-full w-full object-cover"
          />
        </div>

        <div className="rounded-[2rem] border border-border bg-card p-6 shadow-[0_20px_50px_rgba(79,55,38,0.07)] sm:p-8">
          <CategoryBadge category={recipe.category} />
          <h1 className="mt-5 font-serif text-5xl text-balance">{recipe.title}</h1>
          <p className="mt-5 text-lg leading-8 text-muted">{recipe.description}</p>
          <div className="mt-8">
            <RecipeMeta recipe={recipe} />
          </div>
          <div className="mt-8 rounded-3xl bg-white p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-olive">Filed under</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <CategoryBadge category={recipe.category} />
              {recipe.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-8 rounded-3xl bg-[#f0e4d6] p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">More to explore</p>
            <p className="mt-3 text-base leading-7 text-muted">
              Discover {allRecipes.length} recipes across calm weeknight dinners, baking projects, and simple sides.
            </p>
            <Link
              href="/recipes"
              className="mt-4 inline-flex text-sm font-semibold text-accent transition hover:text-accent-strong"
            >
              Browse all recipes →
            </Link>
          </div>
        </div>
      </article>

      <section className="mt-10 rounded-[2rem] border border-border bg-card p-6 shadow-[0_20px_50px_rgba(79,55,38,0.07)] sm:p-8">
        <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-foreground prose-p:text-muted prose-strong:text-foreground prose-li:text-muted">
          {recipe.content}
        </div>
      </section>

      <section className="mt-12">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold">Related recipes</p>
            <h2 className="mt-2 font-serif text-4xl">Keep cooking</h2>
          </div>
        </div>
        <RecipeGrid
          recipes={relatedRecipes}
          emptyTitle="No related recipes yet"
          emptyDescription="Add more MDX recipes to surface related recommendations here."
        />
      </section>
    </div>
  );
}
