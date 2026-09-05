"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Check } from "lucide-react";
import { useState } from "react";
import { Rating } from "@/components/ui/Rating";
import { Badge } from "@/components/ui/Badge";
import { Product } from "@/types";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import {
  getDiscountPercent,
  isProductOnSale,
  formatProductPrice,
  formatProductOldPrice,
} from "@/lib/product-helpers";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [wishlisted, setWishlisted] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const { addItem } = useCart();
  const onSale = isProductOnSale(product);
  const oldPrice = formatProductOldPrice(product);

  function handleAddToCart() {
    // Quick-add from the grid uses each option's first value (e.g. the
    // smallest size). Shoppers who want a different option can still open
    // the product page and choose before adding.
    const defaultOptions = product.options
      ? Object.fromEntries(product.options.map((o) => [o.label, o.values[0]]))
      : undefined;
    addItem(product, 1, defaultOptions);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  }

  return (
    <div className="group relative bg-white rounded-4xl shadow-card hover:shadow-lift transition-shadow duration-300 overflow-hidden flex flex-col h-full">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-square bg-mint-light/50 overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {onSale && <Badge tone="sale">-{getDiscountPercent(product)}%</Badge>}
            {product.isNew && <Badge tone="new">New</Badge>}
          </div>
        </div>
      </Link>

      <button
        onClick={() => setWishlisted((w) => !w)}
        aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        aria-pressed={wishlisted}
        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-card hover:scale-110 transition-transform"
      >
        <Heart
          size={17}
          className={cn(
            "transition-colors",
            wishlisted ? "fill-peach text-peach" : "text-teal-700/50"
          )}
        />
      </button>

      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <p className="text-[11px] uppercase tracking-wide text-teal-700/40 font-semibold">
          {product.categorySlug.replace("-", " ")}
        </p>
        <Link href={`/product/${product.slug}`}>
          <h3 className="mt-1 font-display text-base sm:text-lg text-teal-800 leading-snug line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <Rating value={product.rating} reviewCount={product.reviewCount} className="mt-2" />

        <div className="mt-3 flex items-end justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-lg text-teal-800">{formatProductPrice(product)}</span>
            {oldPrice && (
              <span className="text-xs text-teal-700/40 line-through">{oldPrice}</span>
            )}
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className={cn(
            "mt-4 inline-flex items-center justify-center gap-2 rounded-full font-semibold text-sm py-2.5 transition-colors duration-300",
            justAdded
              ? "bg-mint-dark text-cream"
              : "bg-teal-50 hover:bg-teal-700 hover:text-cream text-teal-700"
          )}
        >
          {justAdded ? <Check size={16} /> : <ShoppingBag size={16} />}
          {justAdded ? "Added to Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
