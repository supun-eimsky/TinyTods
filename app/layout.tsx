import type { Metadata } from "next";
import { Baloo_2, Nunito } from "next/font/google";
import "./globals.css";

const baloo = Baloo_2({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-baloo",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "TinyTods — Little Things, Big Smiles",
    template: "%s | TinyTods",
  },
  description:
    "TinyTods is a premium baby products store offering carefully chosen clothing, toys, feeding, bath & care, nursery and gift essentials for your little one.",
  keywords: [
    "baby products",
    "baby clothing",
    "baby toys",
    "nursery essentials",
    "TinyTods",
  ],
  openGraph: {
    title: "TinyTods — Little Things, Big Smiles",
    description:
      "Everything your little one needs, chosen with love.",
    type: "website",
  },
};

// This root layout intentionally stays minimal — fonts and global CSS
// only. The storefront's header/footer/cart/WhatsApp button live in
// app/(storefront)/layout.tsx, and the admin portal has its own separate
// layout, so neither leaks into the other.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${baloo.variable} ${nunito.variable}`}>
      <body className="font-body bg-cream text-teal-800 antialiased">
        {children}
      </body>
    </html>
  );
}
