import { NextResponse } from "next/server";
import { CategoryService } from "@/services/categoryService";

export async function GET() {
  try {
    const categories = await CategoryService.list();
    return NextResponse.json({ categories });
  } catch (error) {
    console.error("Failed to list categories:", error);
    return NextResponse.json({ error: "Failed to load categories." }, { status: 500 });
  }
}
