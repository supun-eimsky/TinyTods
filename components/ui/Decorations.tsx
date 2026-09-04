import { cn } from "@/lib/utils";

/**
 * Small hand-drawn style star/heart marks echoing the TinyTods logo's
 * scattered confetti. Positioned absolutely by the parent via className.
 */
export function DecoStar({ className, color = "#FFC44D" }: { className?: string; color?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("w-5 h-5", className)}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M12 2.5c.4 3.2 1 5.4 2 6.4s3.2 1.6 6.4 2c-3.2.4-5.4 1-6.4 2s-1.6 3.2-2 6.4c-.4-3.2-1-5.4-2-6.4s-3.2-1.6-6.4-2c3.2-.4 5.4-1 6.4-2s1.6-3.2 2-6.4Z"
        fill={color}
      />
    </svg>
  );
}

export function DecoHeart({ className, color = "#8FC8B5" }: { className?: string; color?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("w-5 h-5", className)}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M12 20.5s-7.6-4.6-10-9.1C.4 8.3 2 5 5.4 5c1.9 0 3.4 1 4.6 2.6C11.2 6 12.7 5 14.6 5 18 5 19.6 8.3 18 11.4c-2.4 4.5-6 9.1-6 9.1Z"
        fill={color}
      />
    </svg>
  );
}

export function DecoDot({ className, color = "#6DBFD8" }: { className?: string; color?: string }) {
  return <span className={cn("block w-1.5 h-1.5 rounded-full", className)} style={{ backgroundColor: color }} aria-hidden="true" />;
}

export function DecorativeField({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      <DecoStar className="absolute top-[8%] left-[6%] w-4 h-4 opacity-80" />
      <DecoHeart className="absolute top-[18%] right-[10%] w-4 h-4 opacity-70" color="#F5B78F" />
      <DecoStar className="absolute bottom-[20%] left-[14%] w-3 h-3 opacity-60" color="#6DBFD8" />
      <DecoHeart className="absolute bottom-[10%] right-[20%] w-3.5 h-3.5 opacity-70" />
      <DecoDot className="absolute top-[40%] left-[3%]" />
      <DecoDot className="absolute top-[60%] right-[6%]" color="#FFC44D" />
    </div>
  );
}
