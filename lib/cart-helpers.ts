import { CartItem } from "@/types";

/**
 * Pure, serialization-safe helpers for cart totals. Kept separate from
 * the CartContext so the math is easy to test and reuse (cart page,
 * checkout summary, mini cart badge, etc.) without depending on React.
 */

export function buildLineId(productId: string, selectedOptions?: Record<string, string>): string {
  if (!selectedOptions || Object.keys(selectedOptions).length === 0) return productId;
  const optionsKey = Object.entries(selectedOptions)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([label, value]) => `${label}:${value}`)
    .join("|");
  return `${productId}::${optionsKey}`;
}

export function getCartItemCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

/** Sum of each line's current (already-discounted) selling price. */
export function getCartSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

/** What the cart would cost with no discounts applied at all. */
export function getCartOriginalTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + (item.oldPrice ?? item.price) * item.quantity, 0);
}

/** Total amount saved across every discounted line in the cart. */
export function getCartDiscount(items: CartItem[]): number {
  return getCartOriginalTotal(items) - getCartSubtotal(items);
}

/** Shipping is free storewide for now — kept as a function so it's easy
 *  to swap in real shipping-rate logic later without touching callers. */
export function getShippingCost(_items: CartItem[]): number {
  return 0;
}

export function getCartTotal(items: CartItem[]): number {
  return getCartSubtotal(items) + getShippingCost(items);
}
