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

  function handleChange(field: keyof CheckoutFormData, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (items.length === 0) return;
    setSubmitting(true);

    // No payment gateway involved (Cash on Delivery only), so there's
    // nothing to charge here — we just record the order details we'd
    // hand off to a real order-processing backend later, then clear the
    // cart and send the shopper to a confirmation page.
    const orderNumber = `TT-${Date.now().toString().slice(-6)}`;
    try {
      window.sessionStorage.setItem(
        "tinytods-last-order",
        JSON.stringify({ orderNumber, customerName: form.fullName, items })
      );
    } catch {
      // Non-critical — the confirmation page falls back to a generic
      // message if this didn't save.
    }

    clearCart();
    router.push(`/order-confirmation?order=${orderNumber}`);
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
