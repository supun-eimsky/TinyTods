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
    console.error("Failed to create order:", error);
    return NextResponse.json(
      { error: "Something went wrong placing your order. Please try again." },
      { status: 500 }
    );
  }
}
