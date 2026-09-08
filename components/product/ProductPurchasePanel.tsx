"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Heart, ShoppingBag, Zap, Check } from "lucide-react";
import { Product } from "@/types";
import { Rating } from "@/components/ui/Rating";
import { Badge } from "@/components/ui/Badge";
import { ProductOptions } from "./ProductOptions";
import { QuantitySelector } from "./QuantitySelector";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import {
  getDiscountPercent,
  isProductOnSale,
  isProductInStock,
  formatProductPrice,
  formatProductOldPrice,
} from "@/lib/product-helpers";

export function ProductPurchasePanel({ product }: { product: Product }) {
  const router = useRouter();
  const { addItem } = useCart();
  const [wishlisted, setWishlisted] = useState(false);
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(
    Object.fromEntries((product.options ?? []).map((o) => [o.label, o.values[0]]))
  );

  const onSale = isProductOnSale(product);
  const oldPrice = formatProductOldPrice(product);
  const inStock = isProductInStock(product);

  function handleAddToCart() {
    addItem(product, quantity, product.options ? selectedOptions : undefined);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  function handleBuyNow() {
    addItem(product, quantity, product.options ? selectedOptions : undefined);
    router.push("/checkout");
  }

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-teal-700/40">
        {product.categorySlug.replace("-", " ")}
      </p>
      <h1 className="mt-2 font-display text-3xl sm:text-4xl text-teal-800">{product.name}</h1>

      <div className="mt-3 flex items-center gap-3">
        <Rating value={product.rating} reviewCount={product.reviewCount} size={16} />
        {onSale && <Badge tone="sale">-{getDiscountPercent(product)}%</Badge>}
        {product.isNew && <Badge tone="new">New</Badge>}
      </div>

      <div className="mt-5 flex items-baseline gap-3">
        <span className="font-display text-3xl text-teal-800">{formatProductPrice(product)}</span>
        {oldPrice && (
          <span className="text-lg text-teal-700/40 line-through">{oldPrice}</span>
        )}
      </div>

      <p className="mt-5 text-teal-700/70 leading-relaxed max-w-md">{product.shortDescription}</p>

      {product.options && product.options.length > 0 && (
        <div className="mt-7">
          <ProductOptions
            options={product.options}
            selected={selectedOptions}
            onChange={(label, value) => setSelectedOptions((s) => ({ ...s, [label]: value }))}
          />
        </div>
      )}

      <div className="mt-7 flex items-center gap-4 flex-wrap">
        <p className="text-sm font-semibold text-teal-800">Quantity</p>
        <QuantitySelector value={quantity} onChange={setQuantity} max={Math.min(10, product.stock)} />
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleAddToCart}
          disabled={!inStock}
          className={cn(
            "inline-flex items-center justify-center gap-2 rounded-full font-semibold px-8 py-4 transition-colors shadow-soft disabled:opacity-50 disabled:pointer-events-none",
            added ? "bg-mint-dark text-cream" : "bg-teal-700 hover:bg-teal-800 text-cream"
          )}
        >
          {added ? <Check size={18} /> : <ShoppingBag size={18} />}
          {added ? "Added to Cart" : "Add to Cart"}
        </button>
       
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
        {inStock ? `In stock — ${product.stock} available` : "Currently out of stock"}
      </p>
    </div>
  );
}
