// layout.js
//
// The shell that wraps EVERY page in the app. Anything put here (like the
// Header and Footer) appears on all pages automatically, so individual
// pages only have to worry about their own content.

import { Inter } from "next/font/google";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// Next.js reads this and puts it into the <head> — browser tab title,
// Google search snippet, etc.
export const metadata = {
  title: "YogShakti — Yoga Asana Search Engine",
  description:
    "Search yoga asanas by Sanskrit name, English name or category, and learn what each pose does for the body.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${inter.className} flex min-h-full flex-col bg-white text-stone-900 antialiased`}
      >
        <Header />
        {/* "children" is whichever page is currently being viewed. */}
        {children}
        <Footer />
      </body>
    </html>
  );
}
