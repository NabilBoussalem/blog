import type { Metadata } from "next";

import { CategoryCard } from "@/components/CategoryCard";
import { SectionHeading } from "@/components/SectionHeading";
import { getRecipeCategories } from "@/lib/recipes";

export const metadata: Metadata = {
  title: "Categories",
  description: "Explore Olive & Thyme recipes by category, from breakfast favorites to seafood dinners.",
};

export default function CategoriesPage() {
  const categories = getRecipeCategories();

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 py-10 sm:px-6 lg:px-8 lg:py-14">
      <SectionHeading
        eyebrow="Browse all categories"
        title="A recipe shelf for every craving"
        description="Choose a category to jump straight into the dishes that match the kind of cooking you are in the mood for."
      />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => (
          <CategoryCard key={category.name} category={category} />
        ))}
      </div>
    </div>
  );
}
