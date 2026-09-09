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
  const [submitError, setSubmitError] = useState("");

  function handleChange(field: keyof CheckoutFormData, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (items.length === 0) return;
    setSubmitting(true);
    setSubmitError("");

    // No payment gateway involved (Cash on Delivery only), so there's
    // nothing to charge here — save the order details locally, then clear
    // the cart and send the shopper to a confirmation page.
    const orderNumber = `TT-${Date.now().toString().slice(-6)}`;
    const order = { orderNumber, ...form, items };

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });

      if (!response.ok) throw new Error("Order could not be saved");

      window.sessionStorage.setItem(
        "tinytods-last-order",
        JSON.stringify({ orderNumber, customerName: form.fullName, items })
      );
      clearCart();
      router.push(`/order-confirmation?order=${orderNumber}`);
    } catch {
      setSubmitError("We couldn't save your order. Please try again.");
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

            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-teal-700 hover:bg-teal-800 text-cream font-semibold px-8 py-4 transition-colors shadow-soft disabled:opacity-60 disabled:pointer-events-none"
            >
              <Truck size={18} />
              {submitting ? "Placing Order..." : "Place Order — Pay on Delivery"}
            </button>

            {submitError && <p className="text-center text-sm text-red-700">{submitError}</p>}

            <p className="text-center text-xs text-teal-700/50">
              By placing this order you agree to pay the total amount in cash upon delivery.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
