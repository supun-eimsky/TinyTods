import { CartItem } from "@/types";
import { formatCurrency } from "@/lib/utils";
import {
  getCartSubtotal,
  getCartOriginalTotal,
  getCartDiscount,
  getShippingCost,
  getCartTotal,
} from "@/lib/cart-helpers";
import { DecoHeart } from "@/components/ui/Decorations";

interface OrderSummaryProps {
  items: CartItem[];
  currency?: string;
}

/**
 * Shows the price breakdown (original total, discount, shipping, final
 * total) for whatever's in the cart. Used on both the cart page and the
 * checkout page so the numbers are always calculated the same way.
 */
export function OrderSummary({ items, currency = "$" }: OrderSummaryProps) {
  const originalTotal = getCartOriginalTotal(items);
  const discount = getCartDiscount(items);
  const subtotal = getCartSubtotal(items);
  const shipping = getShippingCost(items);
  const total = getCartTotal(items);

  return (
    <div className="bg-white rounded-4xl shadow-card p-6 sm:p-7">
      <h2 className="font-display text-xl text-teal-800 flex items-center gap-2">
        Order Summary <DecoHeart className="w-4 h-4" color="#F5B78F" />
      </h2>

      <div className="mt-5 space-y-3 text-sm">
        <div className="flex items-center justify-between text-teal-700/70">
          <span>Item total</span>
          <span>{formatCurrency(originalTotal, currency)}</span>
        </div>

        {discount > 0 && (
          <div className="flex items-center justify-between text-sky font-semibold">
            <span>Discount</span>
            <span>-{formatCurrency(discount, currency)}</span>
          </div>
        )}

        <div className="flex items-center justify-between text-teal-700/70">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal, currency)}</span>
        </div>

        <div className="flex items-center justify-between text-teal-700/70">
          <span>Shipping</span>
          <span>{shipping === 0 ? "Free" : formatCurrency(shipping, currency)}</span>
        </div>
      </div>

      <div className="dashed-divider mt-5 pt-5 flex items-center justify-between">
        <span className="font-display text-lg text-teal-800">Total</span>
        <span className="font-display text-2xl text-teal-800">{formatCurrency(total, currency)}</span>
      </div>

      {discount > 0 && (
        <p className="mt-3 text-xs text-sky font-semibold text-center">
          {`You're saving ${formatCurrency(discount, currency)} on this order! 🎉`}
        </p>
      )}
    </div>
  );
}
