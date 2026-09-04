import Link from "next/link";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
}

interface ButtonAsButton
  extends BaseProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  href?: undefined;
}

interface ButtonAsLink extends BaseProps {
  href: string;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-teal-700 text-cream hover:bg-teal-800 shadow-soft",
  secondary:
    "bg-sunshine text-teal-800 hover:bg-sunshine/90 shadow-soft",
  outline:
    "bg-transparent border-2 border-teal-700 text-teal-700 hover:bg-teal-700 hover:text-cream",
  ghost: "bg-white/70 text-teal-700 hover:bg-white",
};

const sizeClasses: Record<Size, string> = {
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none disabled:translate-y-0";

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = "primary", size = "md", children, className } = props;
  const classes = cn(base, variantClasses[variant], sizeClasses[size], className);

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  const { href: _href, ...buttonProps } = props as ButtonAsButton;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
