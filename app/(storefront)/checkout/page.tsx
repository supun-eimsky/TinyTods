"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, Truck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { CheckoutForm, CheckoutFormData } from "@/components/checkout/CheckoutForm";
import { PaymentMethod } from "@/components/checkout/PaymentMethod";
import { OrderSummary } from "@/components/cart/OrderSummary";
import { EmptyCart } from "@/components/cart/EmptyCart";

const emptyForm: CheckoutFormData = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
  notes: "",
};

export default function CheckoutPage() {
  const router = useRouter();
  const { items, isLoaded, clearCart } = useCart();
  const [form, setForm] = useState<CheckoutFormData>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(field: keyof CheckoutFormData, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (items.length === 0) return;
    setSubmitting(true);
    setError(null);

    try {
      // Cash on Delivery only — no payment gateway to call here. This
      // persists the order (and its line items) in MySQL via /api/orders,
      // then sends the shopper to the confirmation page, which fetches
      // the just-created order back from the same API to display it.
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: form.fullName,
          email: form.email,
          phone: form.phone,
          address: form.address,
          city: form.city,
          postalCode: form.postalCode,
          notes: form.notes,
          items,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error ?? "Something went wrong placing your order.");
      }

      clearCart();
      router.push(`/order-confirmation?order=${data.order.orderNumber}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong placing your order.");
      setSubmitting(false);
    }
  }

  if (!isLoaded) {
    return <div className="container-content py-20" />;
  }

  if (items.length === 0) {
    return (
      <div className="bg-cream min-h-screen py-10 sm:py-14">
        <div className="container-content">
          <EmptyCart />
        </div>
      </div>
    );
  }

  const currency = items[0]?.currency ?? "$";

  return (
    <div className="bg-cream min-h-screen py-10 sm:py-14">
      <div className="container-content">
        <Link
          href="/cart"
          className="inline-flex items-center gap-1 text-sm font-semibold text-teal-700/70 hover:text-teal-700 transition-colors"
        >
          <ChevronLeft size={16} /> Back to Cart
        </Link>

        <h1 className="mt-4 font-display text-3xl sm:text-4xl text-teal-800">Checkout</h1>

        <form onSubmit={handleSubmit} className="mt-8 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <CheckoutForm data={form} onChange={handleChange} />
            <PaymentMethod />
          </div>

          <div className="lg:col-span-1 space-y-4">
            <OrderSummary items={items} currency={currency} />

            {error && (
              <p className="text-sm text-peach bg-white rounded-2xl px-4 py-3 shadow-card">{error}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-teal-700 hover:bg-teal-800 text-cream font-semibold px-8 py-4 transition-colors shadow-soft disabled:opacity-60 disabled:pointer-events-none"
            >
              <Truck size={18} />
              {submitting ? "Placing Order..." : "Place Order — Pay on Delivery"}
            </button>

            <p className="text-center text-xs text-teal-700/50">
              By placing this order you agree to pay the total amount in cash upon delivery.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
