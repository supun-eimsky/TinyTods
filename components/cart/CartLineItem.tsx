"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { CartItem } from "@/types";
import { QuantitySelector } from "@/components/product/QuantitySelector";
import { formatCurrency } from "@/lib/utils";

interface CartLineItemProps {
  item: CartItem;
  onUpdateQuantity: (lineId: string, quantity: number) => void;
  onRemove: (lineId: string) => void;
}

export function CartLineItem({ item, onUpdateQuantity, onRemove }: CartLineItemProps) {
  const lineTotal = item.price * item.quantity;

  return (
    <div className="flex gap-4 sm:gap-5 py-5 border-b border-mint-light/70 last:border-0">
      <Link href={`/product/${item.slug}`} className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl overflow-hidden bg-mint-light/50 shrink-0">
        <Image src={item.image} alt={item.name} fill sizes="96px" className="object-cover" />
      </Link>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link href={`/product/${item.slug}`}>
              <h3 className="font-display text-base text-teal-800 leading-snug line-clamp-2 hover:text-sky transition-colors">
                {item.name}
              </h3>
            </Link>
            {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
              <p className="mt-1 text-xs text-teal-700/50">
                {Object.entries(item.selectedOptions)
                  .map(([label, value]) => `${label}: ${value}`)
                  .join(" · ")}
              </p>
            )}
          </div>
          <button
            onClick={() => onRemove(item.lineId)}
            aria-label={`Remove ${item.name} from cart`}
            className="text-teal-700/40 hover:text-peach transition-colors shrink-0"
          >
            <Trash2 size={18} />
          </button>
        </div>

        <div className="mt-3 flex items-center justify-between gap-3 flex-wrap">
          <QuantitySelector
            value={item?.quantity}
            onChange={(qty:any) => onUpdateQuantity(item.lineId, qty)}
            max={item.maxQuantity}
            size="sm"
          />
          <div className="flex items-baseline gap-2">
            {item.oldPrice && (
              <span className="text-xs text-teal-700/40 line-through">
                {formatCurrency(item.oldPrice * item.quantity, item.currency)}
              </span>
            )}
            <span className="font-display text-base text-teal-800">
              {formatCurrency(lineTotal, item.currency)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
