import type { Metadata } from "next";
import { Baloo_2, Nunito } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { CartProvider } from "@/context/CartContext";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${baloo.variable} ${nunito.variable}`}>
      <body className="font-body bg-cream text-teal-800 antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:bg-white focus:text-teal-800 focus:px-4 focus:py-2 focus:rounded-full"
        >
          Skip to main content
        </a>
        <CartProvider>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
