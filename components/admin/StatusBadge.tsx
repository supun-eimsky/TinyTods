import { OrderStatus } from "@/types";
import { cn } from "@/lib/utils";

const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

const STATUS_CLASSES: Record<OrderStatus, string> = {
  pending: "bg-sunshine-light text-teal-800",
  confirmed: "bg-sky-light text-teal-800",
  out_for_delivery: "bg-mint-light text-teal-800",
  delivered: "bg-mint-dark text-cream",
  cancelled: "bg-peach-light text-teal-800",
};

export function StatusBadge({ status, className }: { status: OrderStatus; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap",
        STATUS_CLASSES[status],
        className
      )}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
