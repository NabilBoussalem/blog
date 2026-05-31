import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

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
    <html lang="en" className={`${manrope.variable} ${cormorant.variable}`}>
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
