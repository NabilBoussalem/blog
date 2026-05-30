import { RecipeFrontmatter } from "@/lib/types";

interface RecipeMetaProps {
  frontmatter: RecipeFrontmatter;
}

export default function RecipeMeta({ frontmatter }: RecipeMetaProps) {
  const items = [
    { label: "Prep Time", value: frontmatter.prepTime, icon: "⏱️" },
    { label: "Cook Time", value: frontmatter.cookTime, icon: "🍳" },
    { label: "Total Time", value: frontmatter.totalTime, icon: "⏰" },
    { label: "Servings", value: `${frontmatter.servings} servings`, icon: "👥" },
    { label: "Difficulty", value: frontmatter.difficulty, icon: "📊" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="bg-stone-50 rounded-xl p-4 text-center"
        >
          <div className="text-2xl mb-1">{item.icon}</div>
          <div className="text-xs text-stone-500 mb-1">{item.label}</div>
          <div className="text-sm font-semibold text-stone-700">
            {item.value}
          </div>
        </div>
      ))}
    </div>
  );
}
