export const metadata = {
  title: "About",
  description: "Learn more about Olive & Thyme, our Mediterranean recipe blog.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-stone-800 mb-4">
          About Olive &amp; Thyme
        </h1>
        <p className="text-lg text-stone-500 max-w-2xl mx-auto leading-relaxed">
          A love letter to simple, wholesome cooking inspired by the warmth of
          Mediterranean kitchens.
        </p>
      </div>

      {/* Image placeholder */}
      <div className="aspect-[16/9] bg-olive/10 rounded-2xl mb-12 flex items-center justify-center text-olive/30 overflow-hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-20 w-20"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="space-y-6 text-stone-600 leading-relaxed">
        <p className="text-lg">
          Welcome to <strong className="text-stone-800">Olive &amp; Thyme</strong>{" "}
          — a place where good food meets simple living. We believe that the best
          meals are made with fresh, seasonal ingredients, a handful of pantry
          staples, and a generous drizzle of olive oil.
        </p>

        <p>
          Our recipes are inspired by the sun-drenched kitchens of the
          Mediterranean — from the herby flavors of Greek tavernas to the rustic
          comfort of Italian countryside cooking, and the vibrant spice of North
          African cuisine. Every dish is designed to be approachable, nourishing,
          and full of flavor.
        </p>

        <p>
          Whether you&apos;re a seasoned cook or just starting out, you&apos;ll find
          recipes here that feel like home. We focus on wholesome ingredients,
          easy-to-follow instructions, and the kind of meals that bring people
          together around the table.
        </p>

        <div className="bg-olive/5 rounded-2xl p-8 my-10">
          <h2 className="text-xl font-serif font-bold text-stone-800 mb-4">
            Our Philosophy
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-olive mt-0.5">🌿</span>
              <span>
                <strong className="text-stone-700">Fresh & Seasonal</strong> — We
                cook with what&apos;s in season and celebrate the natural flavors of
                good ingredients.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-olive mt-0.5">🍳</span>
              <span>
                <strong className="text-stone-700">Simple & Approachable</strong> —
                No complicated techniques. Just honest, satisfying food that
                anyone can make.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-olive mt-0.5">❤️</span>
              <span>
                <strong className="text-stone-700">Made with Love</strong> — Every
                recipe is tested, tasted, and shared with the hope that it brings
                joy to your kitchen.
              </span>
            </li>
          </ul>
        </div>

        <p>
          Thank you for being here. We hope these recipes inspire you to slow
          down, savor the process, and enjoy every bite. Happy cooking!
        </p>

        <p className="text-olive font-serif text-lg italic">
          — The Olive &amp; Thyme Team 🌿
        </p>
      </div>
    </div>
  );
}
