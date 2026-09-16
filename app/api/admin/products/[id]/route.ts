import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  getProductForAdmin,
  updateProductAsAdmin,
  deleteProductAsAdmin,
  ProductValidationError,
} from "@/controllers/adminProductController";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const product = await getProductForAdmin(Number(id));
    console.log("sfdmnshkjdfshdlksjdshd",product)
    if (!product) {
      return NextResponse.json({ error: "Product not found." }, { status: 404 });
    }
    return NextResponse.json(
      { product },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  } catch (error) {
    console.error("Failed to load product:", error);
    return NextResponse.json({ error: "Failed to load product." }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const product = await updateProductAsAdmin(Number(id), body);
    revalidateProductPages(product.slug);
    return NextResponse.json({ product }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    if (error instanceof ProductValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    console.error("Failed to update product:", error);
    return NextResponse.json({ error: "Failed to update product." }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const product = await getProductForAdmin(Number(id));
    await deleteProductAsAdmin(Number(id));
    if (product) revalidateProductPages(product.slug);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete product:", error);
    return NextResponse.json({ error: "Failed to delete product." }, { status: 500 });
  }
}

function revalidateProductPages(slug: string) {
  revalidatePath("/");
  revalidatePath("/categories");
  revalidatePath("/offers");
  revalidatePath("/admin/products");
  revalidatePath(`/product/${slug}`);
}
