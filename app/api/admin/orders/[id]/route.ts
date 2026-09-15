import { NextRequest, NextResponse } from "next/server";
import {
  getOrderForAdmin,
  updateOrderStatusAsAdmin,
  OrderStatusError,
} from "@/controllers/adminOrderController";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const order = await getOrderForAdmin(Number(id));
    if (!order) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }
    return NextResponse.json({ order });
  } catch (error) {
    console.error("Failed to load order:", error);
    return NextResponse.json({ error: "Failed to load order." }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const order = await updateOrderStatusAsAdmin(Number(id), body?.status);
    return NextResponse.json({ order });
  } catch (error) {
    if (error instanceof OrderStatusError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    console.error("Failed to update order status:", error);
    return NextResponse.json({ error: "Failed to update order status." }, { status: 500 });
  }
}
