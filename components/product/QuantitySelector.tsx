"use client";

import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  value: number;
  onChange: (next: number) => void;
  max?: number;
  min?: number;
  size?: "md" | "sm";
}

export function QuantitySelector({ value, onChange, max = 10, min = 1, size = "md" }: QuantitySelectorProps) {
  const dims = size === "sm" ? "w-9 h-9" : "w-11 h-11";
  const textWidth = size === "sm" ? "w-8" : "w-10";

  return (
    <div className="inline-flex items-center rounded-full border-2 border-mint-light overflow-hidden">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className={`${dims} flex items-center justify-center text-teal-700 hover:bg-mint-light transition-colors disabled:opacity-40 disabled:hover:bg-transparent`}
      >
        <Minus size={size === "sm" ? 14 : 16} />
      </button>
      <span className={`${textWidth} text-center font-semibold text-teal-800`} aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className={`${dims} flex items-center justify-center text-teal-700 hover:bg-mint-light transition-colors disabled:opacity-40 disabled:hover:bg-transparent`}
      >
        <Plus size={size === "sm" ? 14 : 16} />
      </button>
    </div>
  );
}
