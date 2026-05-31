import Link from "next/link";
import { Container } from "@/components/Container";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/recipes", label: "Recipes" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="border-b border-amber-100 bg-white/90 backdrop-blur">
      <Container className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="text-2xl font-semibold tracking-tight text-stone-900">
          Saveurs Françaises
        </Link>
        <nav aria-label="Primary" className="flex flex-wrap gap-5 text-sm font-medium text-stone-600">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-amber-700">
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}
