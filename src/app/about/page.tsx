import { Metadata } from "next";
import Container from "@/components/Container";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about La Cuisine Française and our passion for French cooking.",
};

export default function AboutPage() {
  return (
    <Container className="max-w-3xl">
      <h1 className="text-4xl font-serif font-bold text-amber-900 mb-6">About</h1>

      <div className="prose">
        <p>
          Welcome to <strong>La Cuisine Française</strong> — a blog dedicated to the
          timeless art of French cooking. Here, we celebrate the rich culinary traditions
          of France, from the sun-drenched kitchens of Provence to the elegant bistros
          of Paris.
        </p>

        <h2>Our Mission</h2>
        <p>
          We believe that French cooking is more than just food — it is a way of life.
          Our mission is to make authentic French recipes accessible to home cooks
          everywhere, providing clear instructions, helpful tips, and the stories
          behind each dish.
        </p>

        <h2>What You&apos;ll Find Here</h2>
        <p>
          Each recipe on this blog is carefully curated and tested. You&apos;ll find a
          variety of dishes across categories:
        </p>
        <ul>
          <li><strong>Main Dishes</strong> — hearty classics like Coq au Vin and Ratatouille</li>
          <li><strong>Soups</strong> — warming bowls including French Onion Soup</li>
          <li><strong>Appetizers</strong> — elegant starters like Quiche Lorraine</li>
          <li><strong>Desserts</strong> — sweet treats from Crêpes to Tarte Tatin</li>
        </ul>

        <h2>About the Author</h2>
        <p>
          This blog is created with love by a passionate home cook who fell in love
          with French cuisine during years spent exploring the markets, vineyards,
          and restaurants of France. Every recipe shared here carries a piece of that
          experience.
        </p>

        <p>
          <em>Bon appétit!</em> 🇫🇷
        </p>
      </div>
    </Container>
  );
}
