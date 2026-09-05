import { Product } from "@/types";

/**
 * Plain, serialization-safe helpers for product data.
 *
 * IMPORTANT: These operate on plain `Product` objects (not the `Product`
 * class in `models/Product.ts`). Class getters/methods live on the
 * prototype, so when a Server Component passes a class instance down to a
 * Client Component, Next.js's server/client serialization drops every
 * method and getter — only own data fields survive. Any component that
 * might render on the client must use these functions instead of calling
 * methods on a model instance.
 */

export function getDiscountPercent(product: Pick<Product, "price" | "oldPrice">): number {
  if (!product.oldPrice || product.oldPrice <= product.price) return 0;
  return Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
}

export function isProductOnSale(product: Pick<Product, "price" | "oldPrice">): boolean {
  return getDiscountPercent(product) > 0;
}

export function isProductInStock(product: Pick<Product, "stock">): boolean {
  return product.stock > 0;
}

export function formatProductPrice(product: Pick<Product, "price" | "currency">): string {
  return `${product.currency}${product.price.toFixed(2)}`;
}

export function formatProductOldPrice(product: Pick<Product, "oldPrice" | "currency">): string | null {
  return product.oldPrice ? `${product.currency}${product.oldPrice.toFixed(2)}` : null;
}
