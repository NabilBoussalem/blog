import { RecipeMeta } from "@/lib/types";

interface RecipeMetaInfoProps {
  meta: RecipeMeta;
}

/** Displays recipe metadata (prep time, cook time, servings, difficulty) */
export default function RecipeMetaInfo({ meta }: RecipeMetaInfoProps) {
  const items = [
    { label: "Prep Time", value: meta.prepTime, icon: "🕐" },
    { label: "Cook Time", value: meta.cookTime, icon: "🔥" },
    { label: "Servings", value: `${meta.servings} servings`, icon: "🍽️" },
    { label: "Difficulty", value: meta.difficulty, icon: "📊" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
      {items.map((item) => (
        <div
          key={item.label}
          className="bg-amber-50 rounded-xl p-4 text-center border border-amber-100"
        >
          <span className="text-2xl block mb-1">{item.icon}</span>
          <span className="text-xs text-amber-500 uppercase tracking-wide">{item.label}</span>
          <p className="font-semibold text-amber-900 mt-1">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
