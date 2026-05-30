import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-stone-800 text-stone-300 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🍽️</span>
              <span className="text-lg font-bold text-white">
                The Cozy Kitchen
              </span>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed">
              Simple, delicious recipes crafted with love. Bringing warmth and
              flavor to your kitchen, one recipe at a time.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { name: "Home", href: "/" },
                { name: "Recipes", href: "/recipes" },
                { name: "About", href: "/about" },
                { name: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-stone-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Categories
            </h3>
            <ul className="space-y-2">
              {["Breakfast", "Dinner", "Dessert", "Salad"].map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/recipes?category=${cat}`}
                    className="text-stone-400 hover:text-white transition-colors text-sm"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-700 mt-8 pt-8 text-center">
          <p className="text-stone-500 text-sm">
            &copy; {new Date().getFullYear()} The Cozy Kitchen. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
