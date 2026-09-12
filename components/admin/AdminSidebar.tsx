"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, ClipboardList, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Orders", href: "/admin/orders", icon: ClipboardList },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-teal-800 text-cream min-h-screen sticky top-0">
      <div className="p-6 flex items-center gap-3">
        <Image src="/logo.png" alt="TinyTods logo" width={40} height={40} className="rounded-full" />
        <div>
          <p className="font-display text-base leading-tight">TinyTods</p>
          <p className="text-[11px] text-cream/60">Admin Portal</p>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1 mt-4">
        {navItems.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
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
    </aside>
  );
}
