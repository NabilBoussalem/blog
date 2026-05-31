import Link from "next/link";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/recipes", label: "Recipes" },
  { href: "/categories", label: "Categories" },
  { href: "/about", label: "About" },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-stone-200 bg-cream-50">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div className="space-y-4">
          <p className="font-serif text-3xl font-semibold text-olive-950">Olive &amp; Thyme</p>
          <p className="max-w-md text-sm leading-7 text-stone-600">
            A warm recipe journal filled with seasonal cooking, slow dinners, and easy meals inspired by Mediterranean kitchens.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-2xl text-olive-900">Navigate</h2>
          <ul className="mt-4 space-y-3 text-sm text-stone-600">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link className="transition hover:text-olive-900" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-serif text-2xl text-olive-900">Elsewhere</h2>
          <ul className="mt-4 space-y-3 text-sm text-stone-600">
            <li><span aria-hidden="true">◎</span> Instagram</li>
            <li><span aria-hidden="true">◎</span> Pinterest</li>
            <li><span aria-hidden="true">◎</span> Newsletter</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-stone-200/80 px-5 py-4 text-center text-xs tracking-[0.2em] text-stone-500 uppercase">
        © 2026 Olive &amp; Thyme. Made for warm, everyday cooking.
      </div>
    </footer>
  );
}
