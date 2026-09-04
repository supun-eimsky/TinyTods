"use client";

import { useState } from "react";
import { Heart, ShoppingBag, Zap } from "lucide-react";
import { Product as ProductModel } from "@/models/Product";
import { Rating } from "@/components/ui/Rating";
import { Badge } from "@/components/ui/Badge";
import { ProductOptions } from "./ProductOptions";
import { QuantitySelector } from "./QuantitySelector";
import { cn } from "@/lib/utils";

export function ProductPurchasePanel({ product }: { product: ProductModel }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [added, setAdded] = useState(false);

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-teal-700/40">
        {product.categorySlug.replace("-", " ")}
      </p>
      <h1 className="mt-2 font-display text-3xl sm:text-4xl text-teal-800">{product.name}</h1>

      <div className="mt-3 flex items-center gap-3">
        <Rating value={product.rating} reviewCount={product.reviewCount} size={16} />
        {product.isOnSale && <Badge tone="sale">-{product.discountPercent}%</Badge>}
        {product.isNew && <Badge tone="new">New</Badge>}
      </div>

      <div className="mt-5 flex items-baseline gap-3">
        <span className="font-display text-3xl text-teal-800"> Rs.125</span>
       
          <span className="text-lg text-teal-700/40 line-through">152</span>
        
      </div>

      <p className="mt-5 text-teal-700/70 leading-relaxed max-w-md">{product.shortDescription}</p>

      {product.options && product.options.length > 0 && (
        <div className="mt-7">
          <ProductOptions options={product.options} />
        </div>
      )}

      <div className="mt-7 flex items-center gap-4 flex-wrap">
        <p className="text-sm font-semibold text-teal-800">Quantity</p>
        <QuantitySelector max={Math.min(10, product.stock)} />
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-3">
       
        <button
          onClick={() => setWishlisted((w) => !w)}
          aria-pressed={wishlisted}
          aria-label="Add to wishlist"
          className="inline-flex items-center justify-center w-14 h-14 rounded-full border-2 border-mint-light hover:border-peach transition-colors shrink-0"
        >
          <Heart size={20} className={cn(wishlisted ? "fill-peach text-peach" : "text-teal-700/60")} />
        </button>
      </div>

      <p className="mt-5 text-xs text-teal-700/50">
        {product.inStock ? `In stock — ${product.stock} available` : "Currently out of stock"}
      </p>
    </div>
  );
}
