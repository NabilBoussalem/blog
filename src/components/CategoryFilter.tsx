"use client";

type CategoryFilterProps = {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
};

export function CategoryFilter({ categories, selectedCategory, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {["All", ...categories].map((category) => {
        const isActive = selectedCategory === category;

        return (
          <button
            key={category}
            type="button"
            onClick={() => onSelect(category)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              isActive
                ? "bg-stone-900 text-white shadow-lg"
                : "border border-amber-200 bg-white text-stone-700 hover:border-amber-300 hover:text-amber-700"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
