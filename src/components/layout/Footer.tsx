import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-muted sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <p>© 2026 Harvest Table. Warm recipes for everyday cooking.</p>
        <div className="flex flex-wrap gap-4">
          <Link href="/recipes" className="transition hover:text-accent">
            Recipes
          </Link>
          <Link href="/about" className="transition hover:text-accent">
            About
          </Link>
          <Link href="/contact" className="transition hover:text-accent">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
