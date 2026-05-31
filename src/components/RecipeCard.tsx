import Link from "next/link";
import { Recipe } from "@/types/recipe";

interface RecipeCardProps {
  recipe: Pick<
    Recipe,
    | "slug"
    | "title"
    | "description"
    | "image"
    | "category"
    | "prepTime"
    | "cookTime"
    | "difficulty"
  >;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link href={`/recipes/${recipe.slug}`} className="group block">
      <article className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
        {/* Image */}
        <div className="aspect-[4/3] bg-stone-100 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/20 to-transparent z-10" />
          <div className="w-full h-full bg-olive/10 flex items-center justify-center text-olive/30">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16"
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
          {/* Category badge */}
          <span className="absolute top-3 left-3 z-20 bg-white/90 backdrop-blur-sm text-olive text-xs font-semibold px-3 py-1 rounded-full">
            {recipe.category}
          </span>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-serif text-lg font-bold text-stone-800 mb-2 group-hover:text-olive transition-colors line-clamp-1">
            {recipe.title}
          </h3>
          <p className="text-sm text-stone-500 leading-relaxed mb-4 line-clamp-2">
            {recipe.description}
          </p>

          {/* Meta */}
          <div className="flex items-center justify-between text-xs text-stone-400">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {recipe.prepTime}
              </span>
              <span className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                  />
                </svg>
                {recipe.cookTime}
              </span>
            </div>
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-medium ${
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
        </div>
      </article>
    </Link>
  );
}
