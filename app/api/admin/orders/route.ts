import { NextRequest, NextResponse } from "next/server";
import { listOrdersForAdmin } from "@/controllers/adminOrderController";

export async function GET(request: NextRequest) {
  try {
    const status = request.nextUrl.searchParams.get("status") ?? undefined;
    const orders = await listOrdersForAdmin(status);
    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Failed to list orders:", error);
    return NextResponse.json({ error: "Failed to load orders." }, { status: 500 });
  }
}
