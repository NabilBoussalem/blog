import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/recipes", label: "Recipes" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-border/80 bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-serif text-3xl text-foreground transition hover:text-accent">
          Harvest Table
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-foreground transition hover:text-accent">
              {item.label}
            </Link>
          ))}
        </nav>

        <details className="md:hidden">
          <summary className="cursor-pointer list-none rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground">
            Menu
          </summary>
          <nav className="absolute right-4 mt-3 grid min-w-44 gap-2 rounded-3xl border border-border bg-card p-3 shadow-xl">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-2xl px-3 py-2 text-sm font-medium text-foreground transition hover:bg-background hover:text-accent">
                {item.label}
              </Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
