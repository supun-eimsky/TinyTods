"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import { LayoutDashboard, Package, ClipboardList, ExternalLink, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Orders", href: "/admin/orders", icon: ClipboardList },
];

interface AdminMobileNavProps {
  open: boolean;
  onClose: () => void;
}

export function AdminMobileNav({ open, onClose }: AdminMobileNavProps) {
  const pathname = usePathname();
  // Portal straight into document.body so this can never get trapped
  // inside an ancestor's stacking context (the topbar is itself sticky
  // with a z-index) — see components/layout/MobileMenu.tsx for the same
  // fix on the storefront side, and why it's needed.
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!mounted) return null;

  const nav = (
    <div
      className={cn("fixed inset-0 lg:hidden", open ? "pointer-events-auto" : "pointer-events-none")}
      style={{ zIndex: 9999 }}
      role="dialog"
      aria-modal="true"
      aria-label="Admin navigation"
      aria-hidden={!open}
    >
      <button
        aria-label="Close menu"
        onClick={onClose}
        tabIndex={open ? 0 : -1}
        className={cn("absolute inset-0 transition-opacity duration-300", open ? "opacity-100" : "opacity-0")}
        style={{ backgroundColor: "rgba(3, 42, 45, 0.45)" }}
      />
      <div
        className={cn(
          "absolute left-0 top-0 h-full w-[78%] max-w-xs bg-teal-800 text-cream shadow-lift transition-transform duration-300 ease-out flex flex-col",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="TinyTods logo" width={36} height={36} className="rounded-full" />
            <p className="font-display text-base">TinyTods Admin</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="w-8 h-8 inline-flex items-center justify-center rounded-full hover:bg-white/10"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-colors",
                  active ? "bg-white/10 text-cream" : "text-cream/60 hover:bg-white/5 hover:text-cream"
                )}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-semibold text-cream/60 hover:bg-white/5 hover:text-cream transition-colors"
          >
            <ExternalLink size={16} />
            View Storefront
          </Link>
        </div>
      </div>
    </div>
  );

  return createPortal(nav, document.body);
}
