import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({ title, subtitle, align = "center", className }: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      <h2 className="font-display text-3xl sm:text-4xl text-teal-800">{title}</h2>
      {subtitle && (
        <p className="mt-3 text-base sm:text-lg text-teal-700/70">{subtitle}</p>
      )}
    </div>
  );
}
