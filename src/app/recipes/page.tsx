import { Suspense } from "react";
import RecipesPageContent from "./RecipesPageContent";

export const metadata = {
  title: "Recipes",
  description:
    "Browse all recipes — filter by category, difficulty, and cooking time.",
};

export default function RecipesPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-6xl mx-auto px-4 py-16 text-center text-stone-400">
          Loading recipes...
        </div>
      }
    >
      <RecipesPageContent />
    </Suspense>
  );
}
