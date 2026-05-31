import Image from "next/image";
import Link from "next/link";

import type { RecipeCategorySummary } from "@/types/recipe";

type CategoryCardProps = {
  category: RecipeCategorySummary;
};

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/recipes?category=${encodeURIComponent(category.name)}`}
      className="group overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative h-52 overflow-hidden">
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="space-y-3 p-6">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-serif text-3xl text-olive-950">{category.name}</h3>
          <span className="rounded-full bg-olive-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-olive-700">
            {category.count} recipes
          </span>
        </div>
        <p className="text-sm leading-7 text-stone-600">{category.description}</p>
      </div>
    </Link>
  );
}
