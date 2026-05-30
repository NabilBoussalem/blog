interface CategoryBadgeProps {
  category: string;
  size?: "sm" | "md";
}

const categoryColors: Record<string, string> = {
  Breakfast: "bg-amber-100 text-amber-800",
  Lunch: "bg-green-100 text-green-800",
  Dinner: "bg-rose-100 text-rose-800",
  Dessert: "bg-pink-100 text-pink-800",
  Salad: "bg-emerald-100 text-emerald-800",
  Snack: "bg-orange-100 text-orange-800",
  Soup: "bg-yellow-100 text-yellow-800",
};

export default function CategoryBadge({
  category,
  size = "sm",
}: CategoryBadgeProps) {
  const colorClass =
    categoryColors[category] || "bg-stone-100 text-stone-700";
  const sizeClass =
    size === "sm" ? "text-xs px-2.5 py-0.5" : "text-sm px-3 py-1";

  return (
    <span
      className={`inline-block rounded-full font-medium ${colorClass} ${sizeClass}`}
    >
      {category}
    </span>
  );
}
