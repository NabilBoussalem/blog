import { SITE_URL } from '@/lib/seo';
import { RecipeFrontmatter } from '@/lib/schema';

interface ItemListJsonLdProps {
  recipes: RecipeFrontmatter[];
  name: string;
}

export default function ItemListJsonLd({ recipes, name }: ItemListJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    itemListElement: recipes.map((recipe, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${SITE_URL}/recipes/${recipe.slug}`,
      name: recipe.title,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
