import Link from "next/link";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/recipes", label: "Recipes" },
  { href: "/categories", label: "Categories" },
  { href: "/about", label: "About" },
];

export default function Footer() {
  return (
    <footer className="bg-olive-dark text-cream/90">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-serif font-bold text-white mb-3">
              Olive &amp; Thyme
            </h3>
            <p className="text-sm text-cream/70 leading-relaxed">
              Fresh, comforting recipes inspired by Mediterranean kitchens,
              seasonal ingredients, and the joy of cooking at home.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              Navigate
            </h4>
            <nav className="flex flex-col gap-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-cream/70 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              Follow Us
            </h4>
            <div className="flex gap-4">
              {["Instagram", "Pinterest", "Facebook"].map((social) => (
                <span
                  key={social}
                  className="text-sm text-cream/70 hover:text-white transition-colors cursor-pointer"
                >
                  {social}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-cream/10 text-center text-sm text-cream/50">
          &copy; {new Date().getFullYear()} Olive &amp; Thyme. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
