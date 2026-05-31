import { getAllCategories } from "@/lib/recipes";
import CategoryCard from "@/components/CategoryCard";

export const metadata = {
  title: "Categories",
  description: "Browse recipes by category.",
};

export default function CategoriesPage() {
  const categories = getAllCategories();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-800 mb-3">
          Recipe Categories
        </h1>
        <p className="text-stone-500 max-w-md mx-auto">
          Explore our collection of recipes organized by meal type
        </p>
      </div>

      {categories.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <CategoryCard key={cat.name} name={cat.name} count={cat.count} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-stone-400">
          <p>No categories yet. Add some recipes to get started!</p>
        </div>
      )}
    </div>
  );
}
