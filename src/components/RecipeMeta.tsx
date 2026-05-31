interface RecipeMetaProps {
  prepTime: string;
  cookTime: string;
  totalTime: string;
  servings: number;
  difficulty: string;
  category: string;
}

export default function RecipeMeta({
  prepTime,
  cookTime,
  totalTime,
  servings,
  difficulty,
  category,
}: RecipeMetaProps) {
  const items = [
    { label: "Prep Time", value: prepTime, icon: "⏱️" },
    { label: "Cook Time", value: cookTime, icon: "🔥" },
    { label: "Total Time", value: totalTime, icon: "⏰" },
    { label: "Servings", value: `${servings}`, icon: "🍽️" },
    { label: "Difficulty", value: difficulty, icon: "📊" },
    { label: "Category", value: category, icon: "📂" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="bg-white rounded-xl border border-stone-200 p-4 text-center"
        >
          <span className="text-xl mb-1 block" role="img" aria-label={item.label}>
            {item.icon}
          </span>
          <p className="text-xs text-stone-400 mb-0.5">{item.label}</p>
          <p className="text-sm font-semibold text-stone-700">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
