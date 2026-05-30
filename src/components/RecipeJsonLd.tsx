import { buildItemListJsonLd, buildRecipeJsonLd, type RecipeSummary } from "@/lib/schema";

function JsonLdScript({ id, data }: { id: string; data: object }) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</gu, "\u003c"),
      }}
    />
  );
}

export function RecipeJsonLd({ recipe }: { recipe: RecipeSummary }) {
  return <JsonLdScript id={`recipe-jsonld-${recipe.slug}`} data={buildRecipeJsonLd(recipe)} />;
}

export function ItemListJsonLd({
  title,
  description,
  path,
  recipes,
}: {
  title: string;
  description: string;
  path: string;
  recipes: RecipeSummary[];
}) {
  return <JsonLdScript id={`itemlist-jsonld-${path}`} data={buildItemListJsonLd({ title, description, path, recipes })} />;
}
