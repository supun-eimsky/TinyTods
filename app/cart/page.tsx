"use client";

import Link from "next/link";
import { ArrowRight, ChevronLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { CartLineItem } from "@/components/cart/CartLineItem";
import { OrderSummary } from "@/components/cart/OrderSummary";
import { EmptyCart } from "@/components/cart/EmptyCart";

export default function CartPage() {
  const { items, isLoaded, updateQuantity, removeItem } = useCart();

  // Wait for the client-only localStorage read before deciding whether to
  // show "empty cart" — otherwise a returning shopper briefly sees an
  // empty cart flash before their saved items load in.
  if (!isLoaded) {
    return <div className="container-content py-20" />;
  }

  const currency = items[0]?.currency ?? "$";

  return (
    <div className="bg-cream min-h-screen py-10 sm:py-14">
      <div className="container-content">
        <Link
          href="/categories"
          className="inline-flex items-center gap-1 text-sm font-semibold text-teal-700/70 hover:text-teal-700 transition-colors"
        >
          <ChevronLeft size={16} /> Continue Shopping
        </Link>

        <h1 className="mt-4 font-display text-3xl sm:text-4xl text-teal-800">Your Cart</h1>

        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="mt-8 grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-4xl shadow-card p-5 sm:p-7">
              <p className="text-sm text-teal-700/50 mb-2">
                {items.reduce((n, i) => n + i.quantity, 0)} item
                {items.reduce((n, i) => n + i.quantity, 0) === 1 ? "" : "s"} in your cart
              </p>
              {items.map((item) => (
                <CartLineItem
                  key={item.lineId}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
              ))}
            </div>

            <div className="lg:col-span-1 space-y-4">
              <OrderSummary items={items} currency={currency} />
              <Link
                href="/checkout"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-teal-700 hover:bg-teal-800 text-cream font-semibold px-8 py-4 transition-colors shadow-soft"
              >
                Proceed to Checkout <ArrowRight size={18} />
              </Link>
              <p className="text-center text-xs text-teal-700/50">
                Cash on Delivery available — no card needed.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
