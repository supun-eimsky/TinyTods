import { NextRequest, NextResponse } from "next/server";
import {
  listProductsForAdmin,
  createProductAsAdmin,
  ProductValidationError,
} from "@/controllers/adminProductController";

export async function GET() {
  try {
    const products = await listProductsForAdmin();
    return NextResponse.json({ products });
  } catch (error) {
    console.error("Failed to list products:", error);
    return NextResponse.json({ error: "Failed to load products." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const product = await createProductAsAdmin(body);
    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    if (error instanceof ProductValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    console.error("Failed to create product:", error);
    return NextResponse.json({ error: "Failed to create product." }, { status: 500 });
  }
}
