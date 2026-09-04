import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
  value: number;
  reviewCount?: number;
  size?: number;
  className?: string;
}

export function Rating({ value, reviewCount, size = 14, className }: RatingProps) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex items-center" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={size}
            className={i < Math.round(value) ? "fill-sunshine text-sunshine" : "fill-sage text-sage"}
          />
        ))}
      </div>
      <span className="sr-only">{`Rated ${value} out of 5 stars`}</span>
      {reviewCount !== undefined && (
        <span className="text-xs text-teal-700/60">({reviewCount})</span>
      )}
    </div>
  );
}
