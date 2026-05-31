import type { Metadata } from "next";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://olive-and-thyme.example.com"),
  title: {
    default: "Olive & Thyme | Mediterranean recipe blog",
    template: "%s | Olive & Thyme",
  },
  description:
    "Fresh, comforting recipes inspired by Mediterranean kitchens, seasonal ingredients, and slow weekend meals.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground">
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
