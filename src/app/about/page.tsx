import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About",
  description: "Learn the story behind Olive & Thyme, a warm and modern Mediterranean-inspired recipe blog.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 py-10 sm:px-6 lg:px-8 lg:py-14">
      <section className="grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
        <div className="space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-terracotta-700">About Olive &amp; Thyme</p>
          <h1 className="font-serif text-6xl leading-none text-olive-950 sm:text-7xl">
            A recipe blog shaped by market mornings, olive oil, and slow suppers.
          </h1>
          <p className="max-w-2xl text-base leading-8 text-stone-600">
            Olive &amp; Thyme began as a place to collect the recipes that make everyday cooking feel calm and generous. The food here leans Mediterranean: plenty of herbs, citrus, grains, vegetables, and uncomplicated dishes that welcome sharing.
          </p>
          <p className="max-w-2xl text-base leading-8 text-stone-600">
            The goal is simple: recipes that are clear, dependable, and beautiful enough to return to all year long, whether you are cooking for one or setting a table for friends.
          </p>
        </div>

        <div className="relative h-[420px] overflow-hidden rounded-[2.5rem] border border-stone-200 bg-white shadow-card sm:h-[520px]">
          <Image
            src="/images/recipes/roasted-vegetable-couscous.svg"
            alt="A warm Mediterranean table"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {[
          ["Seasonal ingredients", "Recipes begin with what looks best at the market and what is already in the pantry."],
          ["Welcoming flavor", "Bright lemon, good olive oil, soft spice, and fresh herbs shape the rhythm of the cooking."],
          ["Reliable methods", "Every recipe is written to feel approachable, repeatable, and easy to build into real life."],
        ].map(([title, description]) => (
          <article key={title} className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-card">
            <h2 className="font-serif text-3xl text-olive-950">{title}</h2>
            <p className="mt-3 text-sm leading-7 text-stone-600">{description}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
