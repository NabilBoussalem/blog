import { NextRequest, NextResponse } from "next/server";
import { getAllRecipes, getAllCategories, filterRecipes } from "@/lib/recipes";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const search = searchParams.get("search") || undefined;
  const category = searchParams.get("category") || undefined;
  const difficulty = searchParams.get("difficulty") || undefined;
  const cookingTime = searchParams.get("cookingTime") || undefined;

  const allRecipes = getAllRecipes();
  const recipes = filterRecipes(allRecipes, {
    search,
    category,
    difficulty,
    cookingTime,
  });

  const categories = getAllCategories().map((c) => c.name);

  return NextResponse.json({
    recipes: recipes.map(({ content: _c, ...meta }) => meta),
    categories,
  });
}
