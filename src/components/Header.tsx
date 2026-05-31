"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/recipes", label: "Recipes" },
  { href: "/categories", label: "Categories" },
  { href: "/about", label: "About" },
];

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/70 bg-cream-50/90 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-serif text-3xl font-semibold tracking-wide text-olive-950">
          Olive &amp; Thyme
        </Link>

        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label="Toggle navigation menu"
          onClick={() => setIsOpen((current) => !current)}
          className="inline-flex rounded-full border border-stone-300 bg-white/70 p-3 text-stone-700 shadow-sm transition hover:border-olive-300 hover:text-olive-800 md:hidden"
        >
          <span className="sr-only">Open navigation menu</span>
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.7">
            <path strokeLinecap="round" d={isOpen ? "M6 6l12 12M18 6 6 18" : "M4 7h16M4 12h16M4 17h16"} />
          </svg>
        </button>

        <nav aria-label="Primary" className="hidden items-center gap-2 md:flex">
          {navigation.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-olive-900 text-cream-50"
                    : "text-stone-700 hover:bg-white hover:text-olive-900"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {isOpen ? (
        <nav id="mobile-navigation" aria-label="Mobile" className="border-t border-stone-200 bg-cream-50 px-5 py-4 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-olive-900 text-cream-50"
                      : "bg-white/80 text-stone-700 hover:bg-white hover:text-olive-900"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
