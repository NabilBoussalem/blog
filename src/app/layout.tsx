import type { Metadata } from "next";
import Link from "next/link";
import localFont from "next/font/local";

import { ThemeToggle } from "@/components/ThemeToggle";
import { absoluteUrl, siteConfig } from "@/lib/seo";

import "../styles/globals.css";

const bodyFont = localFont({
  variable: "--font-body",
  display: "swap",
  src: [
    {
      path: "./fonts/Lato-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Lato-Semibold.ttf",
      weight: "600",
      style: "normal",
    },
  ],
});

const displayFont = localFont({
  variable: "--font-display",
  display: "swap",
  src: [
    {
      path: "./fonts/LiberationSerif-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
});

const themeScript = `
(function(){
  try {
    var storedTheme = window.localStorage.getItem("theme");
    var resolvedTheme = storedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.dataset.theme = resolvedTheme;
    document.documentElement.style.colorScheme = resolvedTheme;
  } catch (error) {
    document.documentElement.dataset.theme = "light";
  }
})();`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: absoluteUrl("/images/recipes/chicken-tagine.svg"),
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [absoluteUrl("/images/recipes/chicken-tagine.svg")],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${bodyFont.variable} ${displayFont.variable}`}>
      <body>
        <a href="#content" className="skip-link">
          Skip to content
        </a>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <div className="site-shell">
          <header className="site-header">
            <div className="container header-inner">
              <Link href="/" className="brand-link">
                <span className="brand-mark">S</span>
                <span>
                  <strong>{siteConfig.name}</strong>
                  <small>Elegant recipes for everyday tables</small>
                </span>
              </Link>
              <nav aria-label="Primary navigation" className="site-nav">
                <Link href="/recipes">Recipes</Link>
                <Link href="/#categories">Categories</Link>
                <ThemeToggle />
              </nav>
            </div>
          </header>
          <main id="content" className="site-main">
            {children}
          </main>
          <footer className="site-footer">
            <div className="container footer-inner">
              <div>
                <p className="footer-title">{siteConfig.name}</p>
                <p>Static-first recipes with rich metadata, fast pages, and simple tools for saving and sharing.</p>
              </div>
              <nav aria-label="Footer">
                <Link href="/">Home</Link>
                <Link href="/recipes">All recipes</Link>
                <Link href="/recipes#categories">Browse categories</Link>
              </nav>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
