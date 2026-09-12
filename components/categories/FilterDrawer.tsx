"use client";

import { X } from "lucide-react";
import type { Category } from "@/types";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

interface FilterDrawerProps {
  open: boolean;
  onClose: () => void;
  categories: Category[];
  activeCategory?: string;
  onSelectCategory: (slug: string | undefined) => void;
}

export function FilterDrawer({ open, onClose, categories, activeCategory, onSelectCategory }: FilterDrawerProps) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[60] lg:hidden transition-opacity duration-300",
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}
      role="dialog"
      aria-modal="true"
      aria-label="Filter products"
    >
      <button aria-label="Close filters" onClick={onClose} className="absolute inset-0 bg-teal-900/40" />
      <div
        className={cn(
          "absolute left-0 top-0 h-full w-[80%] max-w-xs bg-cream shadow-lift transition-transform duration-300 flex flex-col",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-5 dashed-divider border-t-0 border-b-2">
          <h2 className="font-display text-lg text-teal-800">Filters</h2>
          <button onClick={onClose} aria-label="Close filters" className="w-9 h-9 rounded-full hover:bg-mint-light flex items-center justify-center text-teal-700">
            <X size={20} />
          </button>
        </div>
        <div className="p-5 overflow-y-auto">
          <p className="text-xs font-semibold uppercase tracking-wide text-teal-700/50 mb-3">Category</p>
          <div className="flex flex-col gap-1">
            <button
              onClick={() => onSelectCategory(undefined)}
              className={cn(
                "text-left px-3 py-2.5 rounded-2xl text-sm font-semibold transition-colors",
                !activeCategory ? "bg-teal-700 text-cream" : "hover:bg-mint-light text-teal-800"
              )}
            >
              All Products
            </button>
            {categories.map((c) => (
              <button
                key={c.slug}
                onClick={() => onSelectCategory(c.slug)}
                className={cn(
                  "text-left px-3 py-2.5 rounded-2xl text-sm font-semibold transition-colors",
                  activeCategory === c.slug ? "bg-teal-700 text-cream" : "hover:bg-mint-light text-teal-800"
                )}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-auto p-5">
          <button
            onClick={onClose}
            className="w-full rounded-full bg-sunshine text-teal-800 font-semibold py-3 shadow-soft"
          >
            Show Results
          </button>
        </div>
      </div>
    </div>
  );
}
