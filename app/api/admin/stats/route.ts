import { NextResponse } from "next/server";
import { getDashboardStats } from "@/controllers/adminOrderController";

export async function GET() {
  try {
    const stats = await getDashboardStats();
    return NextResponse.json({ stats });
  } catch (error) {
    console.error("Failed to load dashboard stats:", error);
    return NextResponse.json({ error: "Failed to load stats." }, { status: 500 });
  }
}
