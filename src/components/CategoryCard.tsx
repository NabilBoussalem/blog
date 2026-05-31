import Link from "next/link";

interface CategoryCardProps {
  name: string;
  count: number;
  icon?: string;
}

const categoryIcons: Record<string, string> = {
  Breakfast: "🥞",
  Lunch: "🥗",
  Dinner: "🍽️",
  Salad: "🥬",
  Dessert: "🍰",
  Snack: "🥜",
};

export default function CategoryCard({ name, count }: CategoryCardProps) {
  const icon = categoryIcons[name] || "🍴";

  return (
    <Link
      href={`/recipes?category=${encodeURIComponent(name)}`}
      className="group block"
    >
      <div className="bg-white rounded-2xl border border-stone-200 p-6 text-center shadow-sm transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1 group-hover:border-olive/30">
        <span className="text-4xl mb-3 block" role="img" aria-label={name}>
          {icon}
        </span>
        <h3 className="font-serif text-lg font-bold text-stone-800 mb-1 group-hover:text-olive transition-colors">
          {name}
        </h3>
        <p className="text-sm text-stone-400">
          {count} {count === 1 ? "recipe" : "recipes"}
        </p>
      </div>
    </Link>
  );
}
