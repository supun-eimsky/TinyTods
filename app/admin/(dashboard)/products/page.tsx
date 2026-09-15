import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { listProductsForAdmin } from "@/controllers/adminProductController";
import { ProductTable } from "@/components/admin/ProductTable";

export const metadata: Metadata = { title: "Products" };

export default async function AdminProductsPage() {
  const products = await listProductsForAdmin();

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl text-teal-800">Products</h1>
          <p className="mt-1 text-teal-700/60">{products.length} products in your catalog.</p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 rounded-full bg-teal-700 hover:bg-teal-800 text-cream font-semibold px-5 py-3 transition-colors shadow-soft"
        >
          <Plus size={18} /> Add Product
        </Link>
      </div>

      <div className="mt-6">
        <ProductTable products={products} />
      </div>
    </div>
  );
}
