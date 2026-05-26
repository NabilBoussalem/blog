import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Refreshing seasonal meals`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-[#f7fbf7] text-slate-900">
        <header className="sticky top-0 z-20 border-b border-emerald-100 bg-white/95 backdrop-blur">
          <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
            <Link href="/" className="text-lg font-semibold text-emerald-700">
              Cold Summer Recipes
            </Link>
            <div className="flex items-center gap-4 text-sm text-slate-700">
              <Link href="/recipes" className="hover:text-emerald-700">
                Recipes
              </Link>
              <Link href="/about" className="hover:text-emerald-700">
                About
              </Link>
            </div>
          </nav>
        </header>
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6">{children}</main>
        <footer className="border-t border-emerald-100 bg-white py-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Cold Summer Recipes
        </footer>
      </body>
    </html>
  );
}
