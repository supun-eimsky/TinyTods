import type { Metadata } from "next";
import { Suspense } from "react";
import { OrderConfirmationContent } from "@/components/order/OrderConfirmationContent";

export const metadata: Metadata = {
  title: "Order Confirmed",
  description: "Your TinyTods order has been placed and will be paid for on delivery.",
};

export default function OrderConfirmationPage() {
  return (
    // useSearchParams() (used to read the ?order= number) requires a
    // Suspense boundary in the App Router, since the value can only be
    // known once the client has read the URL.
    <Suspense fallback={<div className="container-content py-24" />}>
      <OrderConfirmationContent />
    </Suspense>
  );
}
