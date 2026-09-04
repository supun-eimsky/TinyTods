"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative aspect-square rounded-4xl overflow-hidden bg-mint-light/50 shadow-card">
        <Image
          src={images[active]}
          alt={name}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
          priority
        />
      </div>
      {images.length > 1 && (
        <div className="mt-4 flex gap-3">
          {images.map((img, i) => (
            <button
              key={img}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1} of ${name}`}
              aria-pressed={active === i}
              className={cn(
                "relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 ring-2 transition-all",
                active === i ? "ring-teal-700" : "ring-transparent opacity-70 hover:opacity-100"
              )}
            >
              <Image src={img} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
