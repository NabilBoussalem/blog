import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { RecipeCard } from "@/components/RecipeCard";
import { JsonLd } from "@/components/JsonLd";
import { getRecipesByCategorySlug, getCategoryBySlug, getTaxonomy } from "@/lib/recipes";
import { siteConfig } from "@/lib/site";

type CategoryPageProps = {
  params: Promise<{ category: string }>;
};

export async function generateStaticParams() {
  return getTaxonomy("category").map((item) => ({ category: item.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const foundCategory = getCategoryBySlug(category);

  if (!foundCategory) {
    return { title: "Category not found", description: "This category does not exist." };
  }

  return {
    title: `${foundCategory.name} recipes`,
    description: `Browse chilled and refreshing ${foundCategory.name.toLowerCase()} recipes for summer.`,
    alternates: { canonical: `/categories/${foundCategory.slug}` },
    openGraph: {
      title: `${foundCategory.name} recipes`,
      description: `Browse chilled and refreshing ${foundCategory.name.toLowerCase()} recipes for summer.`,
      url: `${siteConfig.url}/categories/${foundCategory.slug}`,
    },
    twitter: {
      card: "summary",
      title: `${foundCategory.name} recipes`,
      description: `Browse chilled and refreshing ${foundCategory.name.toLowerCase()} recipes for summer.`,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const foundCategory = getCategoryBySlug(category);
  if (!foundCategory) notFound();

  const recipes = getRecipesByCategorySlug(foundCategory.slug);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Categories", item: `${siteConfig.url}/recipes` },
      {
        "@type": "ListItem",
        position: 3,
        name: foundCategory.name,
        item: `${siteConfig.url}/categories/${foundCategory.slug}`,
      },
    ],
  };

  return (
    <section className="space-y-6">
      <JsonLd data={breadcrumbJsonLd} />
      <header className="space-y-2">
        <p className="text-sm text-emerald-700">
          <Link href="/recipes">Recipes</Link> / Category
        </p>
        <h1 className="text-3xl font-bold text-slate-900">{foundCategory.name}</h1>
        <p className="text-slate-700">{recipes.length} cool recipes in this category.</p>
      </header>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.slug} recipe={recipe} />
        ))}
      </div>
    </section>
  );
}
