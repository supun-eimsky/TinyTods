import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { CategoryService } from "@/services/categoryService";
import { ProductForm } from "@/components/admin/ProductForm";

export const metadata: Metadata = { title: "Add Product" };

export default async function NewProductPage() {
  const categories = await CategoryService.list();

  return (
    <div>
      <Link
        href="/admin/products"
        className="inline-flex items-center gap-1 text-sm font-semibold text-teal-700/70 hover:text-teal-700 transition-colors"
      >
        <ChevronLeft size={16} /> Back to Products
      </Link>

      <h1 className="mt-4 font-display text-2xl sm:text-3xl text-teal-800">Add Product</h1>
      <p className="mt-1 text-teal-700/60">Add a new item to the TinyTods catalog.</p>

      <div className="mt-6 max-w-3xl">
        <ProductForm categories={categories} />
      </div>
    </div>
  );
}
