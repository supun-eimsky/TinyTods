"use client";

import { useState } from "react";
import type { Product } from "@/types";
import { Rating } from "@/components/ui/Rating";
import { cn } from "@/lib/utils";

const tabs = ["Description", "Shipping Info", "Reviews"] as const;
type Tab = (typeof tabs)[number];

export function ProductTabs({ product }: { product: Product }) {
  const [active, setActive] = useState<Tab>("Description");

  return (
    <div className="mt-16">
      <div className="flex gap-2 border-b-2 border-mint-light overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={cn(
              "px-5 py-3 text-sm font-semibold whitespace-nowrap border-b-2 -mb-0.5 transition-colors",
              active === tab
                ? "border-teal-700 text-teal-800"
                : "border-transparent text-teal-700/50 hover:text-teal-700"
            )}
          >
            {tab === "Reviews" ? `Reviews (${product.reviewCount})` : tab}
          </button>
        ))}
      </div>

      <div className="py-8 max-w-2xl">
        {active === "Description" && (
          <p className="text-teal-700/80 leading-relaxed">{product.description}</p>
        )}

        {active === "Shipping Info" && (
          <p className="text-teal-700/80 leading-relaxed">
            {product.shippingInfo ?? "Ships in 1-2 business days. Free returns within 30 days."}
          </p>
        )}

        {active === "Reviews" && (
          <div className="space-y-6">
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((review) => (
                <div key={review.id} className="border-b border-mint-light/70 pb-5 last:border-0">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-teal-800 text-sm">{review.author}</p>
                    <Rating value={review.rating} />
                  </div>
                  <p className="mt-2 text-sm text-teal-700/70">{review.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-teal-700/60 text-sm">No reviews yet — be the first to share your thoughts.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
