import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { RecipeCard } from "@/components/RecipeCard";
import { getRecipesByTagSlug, getTagBySlug, getTaxonomy } from "@/lib/recipes";
import { siteConfig } from "@/lib/site";

type TagPageProps = {
  params: Promise<{ tag: string }>;
};

export async function generateStaticParams() {
  return getTaxonomy("tag").map((item) => ({ tag: item.slug }));
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag } = await params;
  const foundTag = getTagBySlug(tag);

  if (!foundTag) {
    return { title: "Tag not found", description: "This tag does not exist." };
  }

  return {
    title: `#${foundTag.name} recipes`,
    description: `Find refreshing summer recipes tagged with ${foundTag.name}.`,
    alternates: { canonical: `/tags/${foundTag.slug}` },
    openGraph: {
      title: `#${foundTag.name} recipes`,
      description: `Find refreshing summer recipes tagged with ${foundTag.name}.`,
      url: `${siteConfig.url}/tags/${foundTag.slug}`,
    },
    twitter: {
      card: "summary",
      title: `#${foundTag.name} recipes`,
      description: `Find refreshing summer recipes tagged with ${foundTag.name}.`,
    },
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const foundTag = getTagBySlug(tag);
  if (!foundTag) notFound();

  const recipes = getRecipesByTagSlug(foundTag.slug);

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <p className="text-sm text-emerald-700">
          <Link href="/recipes">Recipes</Link> / Tag
        </p>
        <h1 className="text-3xl font-bold text-slate-900">#{foundTag.name}</h1>
        <p className="text-slate-700">{recipes.length} recipes match this tag.</p>
      </header>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.slug} recipe={recipe} />
        ))}
      </div>
    </section>
  );
}
