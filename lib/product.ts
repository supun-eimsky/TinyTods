import { Product } from "@/types";

/**
 * Plain, serialization-safe helpers for deriving presentation data from a
 * Product. These exist because Next.js strips class prototypes (methods,
 * getters) whenever data crosses a Server -> Client Component boundary —
 * so any "derived" product logic must live in plain functions like these
 * rather than on a class instance, or it silently disappears on the client.
 */

export function getDiscountPercent(product: Pick<Product, "price" | "oldPrice">): number {
  if (!product.oldPrice || product.oldPrice <= product.price) return 0;
  return Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
}

export function isOnSale(product: Pick<Product, "price" | "oldPrice">): boolean {
  return getDiscountPercent(product) > 0;
}

export function isInStock(product: Pick<Product, "stock">): boolean {
  return product.stock > 0;
}

export function formatPrice(amount: number, currency: string): string {
  return `${currency}${amount.toFixed(2)}`;
}

export function formattedPrice(product: Pick<Product, "price" | "currency">): string {
  return formatPrice(product.price, product.currency);
}

export function formattedOldPrice(product: Pick<Product, "oldPrice" | "currency">): string | null {
  return product.oldPrice ? formatPrice(product.oldPrice, product.currency) : null;
}
