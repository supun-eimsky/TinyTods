import { NextRequest, NextResponse } from "next/server";
import { placeOrder, OrderValidationError } from "@/controllers/orderController";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const order = await placeOrder(body);
    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    if (error instanceof OrderValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    const details = error instanceof Error
      ? {
          name: error.name,
          message: error.message,
          cause: error.cause instanceof Error ? error.cause.message : error.cause,
          stack: error.stack,
        }
      : { message: String(error) };
    console.error("Failed to create order", details);
    return NextResponse.json(
      { error: "Something went wrong placing your order. Please try again." },
      { status: 500 }
    );
  }
}
