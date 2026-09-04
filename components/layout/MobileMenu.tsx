"use client";

import Link from "next/link";
import Image from "next/image";
import { createPortal } from "react-dom";
import { X, Search } from "lucide-react";
import { NavLink } from "@/types";
import { useEffect, useState } from "react";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  links: NavLink[];
}

export function MobileMenu({ open, onClose, links }: MobileMenuProps) {
  // Rendered through a portal straight into document.body (see below).
  // document isn't available during server rendering, and we only want
  // to portal once the component has actually mounted on the client.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!mounted) return null;

  const menu = (
    <div
      className={`fixed inset-0 lg:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      style={{ zIndex: 9999 }}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
      aria-hidden={!open}
    >
      {/* Backdrop: the only element that fades. The drawer panel below
          stays fully opaque at all times and is shown/hidden purely by
          sliding it on/off screen, so it can never render semi-transparent. */}
      <button
        aria-label="Close menu"
        onClick={onClose}
        tabIndex={open ? 0 : -1}
        className={`absolute inset-0 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        style={{ backgroundColor: "rgba(3, 42, 45, 0.45)" }}
      />
      <div
        className={`absolute right-0 top-0 h-full w-[82%] max-w-sm bg-cream shadow-lift transition-transform duration-300 ease-out flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ opacity: 1 }}
      >
        <div className="flex items-center justify-between p-5 dashed-divider border-t-0 border-b-2">
          <div className="flex items-center gap-2">
            <Image src="/logo1.jpeg" alt="TinyTods logo" width={50} height={50} className="rounded-full" />
            <span className="font-display text-lg text-teal-800">TinyTods</span>
          </div>
          <button
            aria-label="Close menu"
            onClick={onClose}
            className="w-9 h-9 inline-flex items-center justify-center rounded-full hover:bg-mint-light text-teal-700"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-5">
          <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2.5 shadow-card">
            <Search size={18} className="text-teal-700/60" />
            <input
              type="search"
              placeholder="Search for baby joys..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-teal-700/40 text-teal-800"
            />
          </div>
        </div>

        <nav className="flex flex-col px-5 gap-1" aria-label="Mobile navigation links">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="py-3 px-3 rounded-2xl text-base font-semibold text-teal-800 hover:bg-mint-light transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto p-5 text-xs text-teal-700/50">
          little things, big smiles
        </div>
      </div>
    </div>
  );

  return createPortal(menu, document.body);
}
