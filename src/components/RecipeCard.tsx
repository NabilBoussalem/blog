import Link from "next/link";
import { RecipeMeta } from "@/lib/types";

interface RecipeCardProps {
  recipe: RecipeMeta;
}

/** Card component displaying a recipe preview with metadata */
export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link href={`/recipes/${recipe.slug}`} className="group block">
      <article className="rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow duration-300 border border-amber-50">
        {/* Image placeholder — uses a warm gradient when no image is available */}
        <div className="aspect-[4/3] bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center text-6xl">
          {getCategoryEmoji(recipe.category)}
        </div>
        <div className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
              {recipe.category}
            </span>
            <span className="text-xs text-amber-500">{recipe.difficulty}</span>
          </div>
          <h3 className="text-xl font-serif font-bold text-amber-900 group-hover:text-amber-700 transition-colors mb-2">
            {recipe.title}
          </h3>
          <p className="text-amber-700 text-sm line-clamp-2 mb-3">
            {recipe.description}
          </p>
          <div className="flex items-center gap-4 text-xs text-amber-500">
            <span>🕐 Prep: {recipe.prepTime}</span>
            <span>🔥 Cook: {recipe.cookTime}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

/** Map category names to emoji for visual flair */
function getCategoryEmoji(category: string): string {
  const map: Record<string, string> = {
    "Main Dish": "🍲",
    Dessert: "🥞",
    Soup: "🥣",
    Appetizer: "🥧",
  };
  return map[category] ?? "🍽️";
}
