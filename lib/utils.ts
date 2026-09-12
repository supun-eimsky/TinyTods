export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function formatCurrency(amount: number, currency = "Rs"): string {
  return `${currency}${amount.toFixed(2)}`;
}

export const ACCENT_CLASSES: Record<string, { bg: string; text: string; ring: string }> = {
  mint: { bg: "bg-mint-light", text: "text-teal-700", ring: "ring-mint" },
  sky: { bg: "bg-sky-light", text: "text-teal-700", ring: "ring-sky" },
  peach: { bg: "bg-peach-light", text: "text-teal-700", ring: "ring-peach" },
  sunshine: { bg: "bg-sunshine-light", text: "text-teal-700", ring: "ring-sunshine" },
  sage: { bg: "bg-sage", text: "text-teal-700", ring: "ring-mint" },
};
