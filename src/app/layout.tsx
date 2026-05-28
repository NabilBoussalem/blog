import type { Metadata } from 'next';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';
import { getBaseMetadata } from '@/lib/seo';
import '@/styles/globals.css';

export const metadata: Metadata = getBaseMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <header className="site-header">
          <div className="container site-header__inner">
            <Link href="/" className="site-header__logo">
              Savory &amp; Sweet
            </Link>
            <nav className="site-header__nav" aria-label="Main navigation">
              <Link href="/recipes" className="site-header__link">
                Recipes
              </Link>
              <Link href="/categories/main-course" className="site-header__link">
                Main Course
              </Link>
              <Link href="/categories/dessert" className="site-header__link">
                Dessert
              </Link>
              <ThemeToggle />
            </nav>
          </div>
        </header>
        <main className="site-main">{children}</main>
        <footer className="site-footer">
          <div className="container site-footer__inner">
            <p>&copy; {new Date().getFullYear()} Savory &amp; Sweet. All rights reserved.</p>
            <nav className="site-footer__nav" aria-label="Footer navigation">
              <Link href="/">Home</Link>
              <Link href="/recipes">Recipes</Link>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
