"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

export function QuantitySelector({ max = 10 }: { max?: number }) {
  const [qty, setQty] = useState(1);

  return (
    <div className="inline-flex items-center rounded-full border-2 border-mint-light overflow-hidden">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => setQty((q) => Math.max(1, q - 1))}
        className="w-11 h-11 flex items-center justify-center text-teal-700 hover:bg-mint-light transition-colors"
      >
        <Minus size={16} />
      </button>
      <span className="w-10 text-center font-semibold text-teal-800" aria-live="polite">
        {qty}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => setQty((q) => Math.min(max, q + 1))}
        className="w-11 h-11 flex items-center justify-center text-teal-700 hover:bg-mint-light transition-colors"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
