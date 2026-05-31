import { Metadata } from "next";
import { getAllRecipes, getAllCategories } from "@/lib/recipes";
import RecipesPageClient from "./RecipesPageClient";

export const metadata: Metadata = {
  title: "Recipes",
  description: "Browse all authentic French recipes — from classic mains to delightful desserts.",
};

export default function RecipesPage() {
  const recipes = getAllRecipes();
  const categories = getAllCategories();

  return <RecipesPageClient recipes={recipes} categories={categories} />;
}
