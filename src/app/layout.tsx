import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://saveurs-francaises.example"),
  title: {
    default: "Saveurs Françaises | French Recipe Blog",
    template: "%s | Saveurs Françaises",
  },
  description: "An elegant French recipe blog built with Next.js and MDX, featuring timeless classics and seasonal inspiration.",
  openGraph: {
    title: "Saveurs Françaises",
    description: "Discover approachable French recipes, from comforting soups to classic brasserie dishes.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saveurs Françaises",
    description: "French recipes and elegant home cooking ideas.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-amber-50 text-stone-900 antialiased">
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
