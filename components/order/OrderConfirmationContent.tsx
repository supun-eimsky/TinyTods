"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Truck, Home } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { DecoStar, DecoHeart } from "@/components/ui/Decorations";
import { CartItem } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { getCartTotal, getCartDiscount } from "@/lib/cart-helpers";

interface StoredOrder {
  orderNumber: string;
  customerName: string;
  items: CartItem[];
}

export function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order");
  const [order, setOrder] = useState<StoredOrder | null>(null);

  useEffect(() => {
    try {
      const stored = window.sessionStorage.getItem("tinytods-last-order");
      if (stored) setOrder(JSON.parse(stored));
    } catch {
      // No stored order details — the page still shows a generic
      // confirmation using just the order number from the URL.
    }
  }, []);

  const currency = order?.items[0]?.currency ?? "$";
  const total = order ? getCartTotal(order.items) : null;
  const discount = order ? getCartDiscount(order.items) : 0;

  return (
    <div className="bg-cream min-h-screen py-16 sm:py-24 relative overflow-hidden">
      <DecoStar className="absolute top-10 left-[10%] w-6 h-6 hidden sm:block" />
      <DecoHeart className="absolute bottom-16 right-[12%] w-5 h-5 hidden sm:block" color="#6DBFD8" />

      <div className="container-content max-w-lg text-center">
        <div className="mx-auto w-20 h-20 rounded-full bg-mint-light flex items-center justify-center">
          <CheckCircle2 size={40} className="text-teal-700" />
        </div>

        <h1 className="mt-6 font-display text-3xl sm:text-4xl text-teal-800">Order Placed!</h1>
        <p className="mt-3 text-teal-700/70">
          {order?.customerName ? `Thank you, ${order.customerName}! ` : "Thank you! "}
          Your little things are on their way to being packed with love.
        </p>

        {orderNumber && (
          <div className="mt-6 inline-flex items-center gap-2 bg-white rounded-full px-5 py-2.5 shadow-card">
            <span className="text-xs text-teal-700/50">Order Number</span>
            <span className="font-display text-sm text-teal-800">{orderNumber}</span>
          </div>
        )}

        <div className="mt-8 bg-white rounded-4xl shadow-card p-6 sm:p-8 text-left">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-sunshine-light flex items-center justify-center shrink-0">
              <Truck size={20} className="text-teal-800" />
            </div>
            <div>
              <p className="font-display text-base text-teal-800">Cash on Delivery</p>
              <p className="text-xs text-teal-700/60">Please keep the total ready for our delivery partner.</p>
            </div>
          </div>

          {order && total !== null && (
            <div className="dashed-divider mt-5 pt-5 space-y-2 text-sm">
              {discount > 0 && (
                <div className="flex items-center justify-between text-sky font-semibold">
                  <span>You saved</span>
                  <span>{formatCurrency(discount, currency)}</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="font-display text-base text-teal-800">Amount to pay on delivery</span>
                <span className="font-display text-xl text-teal-800">{formatCurrency(total, currency)}</span>
              </div>
            </div>
          )}
        </div>

        <p className="mt-6 text-sm text-teal-700/60">
          {"We'll send delivery updates to the contact details you provided."}
        </p>

        <div className="mt-8 flex justify-center">
          <Button href="/" variant="outline">
            <Home size={16} /> Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
