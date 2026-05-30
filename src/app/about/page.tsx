import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about The Cozy Kitchen and the person behind these delicious recipes.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <header className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-stone-800 tracking-tight">
          About The Cozy Kitchen
        </h1>
        <p className="mt-4 text-lg text-stone-500">
          Where great food meets simple cooking
        </p>
      </header>

      <div className="prose prose-stone prose-lg max-w-none">
        <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-sm border border-stone-100">
          <p className="text-stone-600 leading-relaxed">
            Welcome to <strong>The Cozy Kitchen</strong> — a place where food
            brings people together. I believe that cooking should be joyful, not
            stressful. Every recipe here is designed to be approachable, using
            everyday ingredients to create something truly special.
          </p>

          <p className="text-stone-600 leading-relaxed mt-6">
            Whether you&apos;re a seasoned home cook or just starting your
            kitchen journey, you&apos;ll find recipes that work. From quick
            weeknight dinners to lazy weekend baking projects, each dish has been
            tested, tasted, and perfected.
          </p>

          <h2 className="text-2xl font-bold text-stone-800 mt-10 mb-4">
            My Philosophy
          </h2>
          <ul className="space-y-3 text-stone-600">
            <li>
              🌿 <strong>Fresh, simple ingredients</strong> — great food
              doesn&apos;t need a long shopping list
            </li>
            <li>
              ⏱️ <strong>Respect your time</strong> — most recipes are ready in
              under an hour
            </li>
            <li>
              ❤️ <strong>Cook with love</strong> — food tastes better when you
              enjoy making it
            </li>
            <li>
              🌍 <strong>Inspired by the world</strong> — flavors from every
              corner, made at home
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-stone-800 mt-10 mb-4">
            What You&apos;ll Find Here
          </h2>
          <p className="text-stone-600 leading-relaxed">
            Every recipe comes with clear instructions, helpful tips, and honest
            cooking times. I share what works in my kitchen and hope it works in
            yours too. From comforting pastas and vibrant salads to decadent
            desserts and hearty dinners — there&apos;s something for every mood
            and every occasion.
          </p>

          <div className="mt-10 p-6 bg-terracotta-50 rounded-xl border border-terracotta-100">
            <p className="text-stone-700 italic text-center">
              &ldquo;Good food is the foundation of genuine happiness.&rdquo;
            </p>
            <p className="text-stone-500 text-center text-sm mt-2">
              — Auguste Escoffier
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
