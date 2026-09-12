"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Search, ShoppingBag, Menu } from "lucide-react";
import { NavLink } from "@/types";
import { MobileMenu } from "./MobileMenu";
import { useCart } from "@/context/CartContext";
import { getCartItemCount } from "@/lib/cart-helpers";

const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Categories", href: "/categories" },
  // { label: "Offers", href: "/offers" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { items } = useCart();
  const cartCount = getCartItemCount(items);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-shadow duration-300 bg-cream/95 backdrop-blur ${scrolled ? "shadow-card" : ""
        }`}
    >
      <div className="container-content flex items-center justify-between gap-4 py-1">
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <Image
            src="/logo1.jpeg"
            alt="TinyTods logo"
            width={70}
            height={70}
            className="rounded-full transition-transform duration-300 group-hover:scale-105"
            priority
          />
          <span className="hidden sm:flex flex-col leading-tight">
            <span className="font-display text-xl text-teal-800">TinyTods</span>
            <span className="text-[13px] text-teal-700/60 -mt-0.5">little things, big smiles</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-teal-800 hover:text-sky transition-colors relative py-1 after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-0 after:bg-sky after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/categories"
            aria-label="Search products"
            className="hidden sm:inline-flex items-center justify-center w-10 h-10 rounded-full text-teal-700 hover:bg-mint-light transition-colors"
          >
            <Search size={20} />
          </Link>
          <Link
            href="/cart"
            aria-label={`View shopping cart, ${cartCount} item${cartCount === 1 ? "" : "s"}`}
            className="relative inline-flex items-center justify-center w-10 h-10 rounded-full text-teal-700 hover:bg-mint-light transition-colors"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-[16px] h-4 px-1 rounded-full bg-peach text-[10px] font-bold text-teal-800">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </Link>
         
          <button
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full text-teal-700 hover:bg-mint-light transition-colors"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={navLinks} />
    </header>
  );
}
