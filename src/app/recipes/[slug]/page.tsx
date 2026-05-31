import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Container } from "@/components/Container";
import { RecipeMeta } from "@/components/RecipeMeta";
import { mdxComponents } from "@/components/MdxContent";
import { getRecipeBySlug, getRecipeSlugs } from "@/lib/recipes";

type RecipePageProps = {
  params: Promise<{ slug: string }>;
};

// Prebuild every local MDX recipe page so the blog stays fully static in production.
export async function generateStaticParams() {
  return getRecipeSlugs().map((fileName) => ({
    slug: fileName.replace(/\.mdx$/, ""),
  }));
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
      images: [{ url: recipe.image, alt: recipe.title }],
      type: "article",
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

  return (
    <section className="py-16 sm:py-20">
      <Container className="space-y-10">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">{recipe.category}</p>
            <h1 className="text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl">{recipe.title}</h1>
            <p className="text-lg leading-8 text-stone-600">{recipe.description}</p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-amber-100 bg-amber-100 shadow-sm">
            <Image src={recipe.image} alt={recipe.title} fill priority className="object-cover" sizes="(min-width: 1024px) 40vw, 100vw" />
          </div>
        </div>

        <RecipeMeta recipe={recipe} />

        <article className="recipe-content rounded-[2rem] border border-amber-100 bg-white p-6 shadow-sm sm:p-10">
          {content}
        </article>
      </Container>
    </section>
  );
}
