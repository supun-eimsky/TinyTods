import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  tone?: "sale" | "new" | "neutral";
  className?: string;
}

const toneClasses: Record<string, string> = {
  sale: "bg-peach text-teal-800",
  new: "bg-sky text-white",
  neutral: "bg-sage text-teal-800",
};

export function Badge({ children, tone = "neutral", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        toneClasses[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
