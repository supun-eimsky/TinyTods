import { OrderService } from "@/services/orderService";
import { CreateOrderInput, OrderRecord } from "@/types";

export class OrderValidationError extends Error {
  constructor(message: string) {
    super(message);
  }
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export async function placeOrder(input: Partial<CreateOrderInput>): Promise<OrderRecord> {
  const required: (keyof CreateOrderInput)[] = ["customerName", "email", "phone", "address", "city"];
  for (const field of required) {
    if (!isNonEmptyString(input[field] as unknown)) {
      throw new OrderValidationError(`Missing required field: ${field}.`);
    }
  }

  if (!Array.isArray(input.items) || input.items.length === 0) {
    throw new OrderValidationError("Your cart is empty.");
  }

  return OrderService.create({
    customerName: input.customerName!.trim(),
    email: input.email!.trim(),
    phone: input.phone!.trim(),
    address: input.address!.trim(),
    city: input.city!.trim(),
    postalCode: input.postalCode?.trim() || undefined,
    notes: input.notes?.trim() || undefined,
    items: input.items,
  });
}
