"use client";

import { useState } from "react";
import { ProductOption } from "@/types";
import { cn } from "@/lib/utils";

export function ProductOptions({ options }: { options: ProductOption[] }) {
  const [selected, setSelected] = useState<Record<string, string>>(
    Object.fromEntries(options.map((o) => [o.label, o.values[0]]))
  );

  return (
    <div className="space-y-5">
      {options.map((option) => (
        <div key={option.label}>
          <p className="text-sm font-semibold text-teal-800 mb-2">
            {option.label}: <span className="font-normal text-teal-700/70">{selected[option.label]}</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {option.values.map((value) => (
              <button
                key={value}
                onClick={() => setSelected((s) => ({ ...s, [option.label]: value }))}
                aria-pressed={selected[option.label] === value}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-semibold border-2 transition-colors",
                  selected[option.label] === value
                    ? "bg-teal-700 border-teal-700 text-cream"
                    : "border-mint-light text-teal-700 hover:border-mint-dark"
                )}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
