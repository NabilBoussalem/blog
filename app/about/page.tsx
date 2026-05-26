import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About this recipe blog",
  description:
    "Learn about the mission behind Cold Summer Recipes and how to use this SEO-friendly recipe collection.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl space-y-5 rounded-2xl bg-white p-6">
      <h1 className="text-3xl font-bold text-slate-900">About Cold Summer Recipes</h1>
      <p className="leading-7 text-slate-700">
        Cold Summer Recipes is a focused collection of refreshing warm-weather meals. The blog is
        built for speed, accessibility, and search visibility using Next.js App Router, local MDX,
        and semantic markup.
      </p>
      <p className="leading-7 text-slate-700">
        You will find crisp salads, no-bake desserts, chilled soups, smoothie bowls, and meal-prep
        favorites designed to keep kitchen time low on hot days.
      </p>
    </section>
  );
}
