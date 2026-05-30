import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "The Cozy Kitchen — Simple, Delicious Recipes",
    template: "%s | The Cozy Kitchen",
  },
  description:
    "Discover simple, delicious recipes for every day. From quick weeknight dinners to show-stopping desserts.",
  keywords: ["recipes", "cooking", "food blog", "dinner", "dessert", "healthy"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
