"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import type { Category, Product } from "@/types";
import { ProductGrid } from "@/components/product/ProductGrid";
import { FilterDrawer } from "./FilterDrawer";
import { cn } from "@/lib/utils";

type SortOption = "featured" | "price-asc" | "price-desc" | "rating";

const sortLabels: Record<SortOption, string> = {
  featured: "Featured",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
  rating: "Top Rated",
};

const PAGE_SIZE = 8;

export function CategoriesExplorer({
  categories,
  products,
  initialCategory,
}: {
  categories: Category[];
  products: Product[];
  initialCategory?: string;
}) {
  const [activeCategory, setActiveCategory] = useState<string | undefined>(initialCategory);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortOption>("featured");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    let list = products;

    if (activeCategory) {
      list = list.filter((p) => p.categorySlug === activeCategory);
    }

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q)
      );
    }

    const sorted = [...list];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating);

    return sorted;
  }, [products, activeCategory, query, sort]);

  const visibleProducts = filtered.slice(0, visibleCount);

  return (
    <div>
      <div className="hidden lg:flex flex-wrap gap-2">
        <button
          onClick={() => {
            setActiveCategory(undefined);
            setVisibleCount(PAGE_SIZE);
          }}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-semibold transition-colors",
            !activeCategory ? "bg-teal-700 text-cream" : "bg-white text-teal-700 hover:bg-mint-light"
          )}
        >
          All Products
        </button>
        {categories.map((c) => (
          <button
            key={c.slug}
            onClick={() => {
              setActiveCategory(c.slug);
              setVisibleCount(PAGE_SIZE);
            }}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-semibold transition-colors",
              activeCategory === c.slug ? "bg-teal-700 text-cream" : "bg-white text-teal-700 hover:bg-mint-light"
            )}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 bg-white rounded-full px-4 py-3 shadow-card flex-1 max-w-md">
          <Search size={18} className="text-teal-700/50 shrink-0" />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setVisibleCount(PAGE_SIZE);
            }}
            placeholder="Search products..."
            aria-label="Search products"
            className="w-full bg-transparent outline-none text-sm text-teal-800 placeholder:text-teal-700/40"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setDrawerOpen(true)}
            className="lg:hidden inline-flex items-center gap-2 bg-white rounded-full px-4 py-3 shadow-card text-sm font-semibold text-teal-700"
          >
            <SlidersHorizontal size={16} /> Filter
          </button>

          <label className="sr-only" htmlFor="sort-select">
            Sort products
          </label>
          <select
            id="sort-select"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="bg-white rounded-full px-4 py-3 shadow-card text-sm font-semibold text-teal-700 outline-none"
          >
            {Object.entries(sortLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="mt-6 text-sm text-teal-700/60">
        Showing {visibleProducts.length} of {filtered.length} products
      </p>

      <div className="mt-4">
        <ProductGrid products={visibleProducts} />
      </div>

      {visibleCount < filtered.length && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
            className="rounded-full border-2 border-teal-700 text-teal-700 font-semibold px-8 py-3 hover:bg-teal-700 hover:text-cream transition-colors"
          >
            Load More
          </button>
        </div>
      )}

      <FilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={(slug) => {
          setActiveCategory(slug);
          setVisibleCount(PAGE_SIZE);
        }}
      />
    </div>
  );
}
