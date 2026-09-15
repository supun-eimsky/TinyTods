import { NextRequest, NextResponse } from "next/server";
import { OrderService } from "@/services/orderService";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ orderNumber: string }> }
) {
  try {
    const { orderNumber } = await params;
    const order = await OrderService.getByOrderNumber(orderNumber);
    if (!order) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }
    return NextResponse.json({ order });
  } catch (error) {
    console.error("Failed to load order:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
