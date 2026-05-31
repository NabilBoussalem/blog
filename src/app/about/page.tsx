import type { Metadata } from "next";
import { Container } from "@/components/Container";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about the French cooking inspiration behind Saveurs Françaises.",
};

export default function AboutPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container className="max-w-3xl space-y-6">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">About the blog</p>
        <h1 className="text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl">A warm corner of the web for French home cooking.</h1>
        <div className="space-y-5 text-lg leading-8 text-stone-600">
          <p>
            Saveurs Françaises celebrates approachable French recipes, from rustic countryside dishes to classic café staples. The blog is designed to make each recipe easy to publish, browse, and cook.
          </p>
          <p>
            Posts are written in MDX so you can manage ingredients, instructions, and storytelling in a single file while keeping the site statically generated and SEO friendly.
          </p>
        </div>
      </Container>
    </section>
  );
}
