import { OrderService } from "@/services/orderService";
import { OrderStatus } from "@/types";

const VALID_STATUSES: OrderStatus[] = [
  "pending",
  "confirmed",
  "out_for_delivery",
  "delivered",
  "cancelled",
];

export class OrderStatusError extends Error {}

export async function listOrdersForAdmin(status?: string) {
  const filter =
    status && VALID_STATUSES.includes(status as OrderStatus)
      ? { status: status as OrderStatus }
      : undefined;
  return OrderService.list(filter);
}

export async function getOrderForAdmin(id: number) {
  return OrderService.getById(id);
}

export async function updateOrderStatusAsAdmin(id: number, status: string) {
  if (!VALID_STATUSES.includes(status as OrderStatus)) {
    throw new OrderStatusError(`Invalid status: ${status}`);
  }
  return OrderService.updateStatus(id, status as OrderStatus);
}

export async function getDashboardStats() {
  return OrderService.getStats();
}
