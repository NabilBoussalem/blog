"use client";

interface CategoryFilterProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

/** Horizontal filter bar for recipe categories */
export default function CategoryFilter({ categories, selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        onClick={() => onSelect("")}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          selected === ""
            ? "bg-amber-700 text-white"
            : "bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200"
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selected === cat
              ? "bg-amber-700 text-white"
              : "bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
