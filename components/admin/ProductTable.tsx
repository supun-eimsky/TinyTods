"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Pencil, Trash2, Loader2 } from "lucide-react";
import { Product } from "@/types";
import { formatCurrency } from "@/lib/utils";

export function ProductTable({ products }: { products: Product[] }) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete(product: Product) {
    if (!window.confirm(`Delete "${product.name}"? This can't be undone.`)) return;

    setDeletingId(product.id);
    setError(null);
    try {
      const response = await fetch(`/api/admin/products/${product.id}`, { method: "DELETE" });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.error ?? "Failed to delete product.");
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete product.");
    } finally {
      setDeletingId(null);
    }
  }

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-4xl shadow-card p-10 text-center">
        <p className="text-teal-700/60">No products yet — add your first one to get started.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-4xl shadow-card overflow-hidden">
      {error && <p className="px-6 pt-5 text-sm text-peach font-semibold">{error}</p>}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide text-teal-700/40 border-b border-mint-light/60">
              <th className="py-4 px-6 font-semibold">Product</th>
              <th className="py-4 px-4 font-semibold">Category</th>
              <th className="py-4 px-4 font-semibold">Price</th>
              <th className="py-4 px-4 font-semibold">Stock</th>
              <th className="py-4 px-4 font-semibold">Flags</th>
              <th className="py-4 px-6 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-mint-light/40 last:border-0">
                <td className="py-3 px-6">
                  <div className="flex items-center gap-3 min-w-[220px]">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-mint-light/50 shrink-0">
                      <Image src={product.images[0]} alt={product.name} fill sizes="48px" className="object-cover" />
                    </div>
                    <span className="font-semibold text-teal-800 line-clamp-2">{product.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-teal-700/70 capitalize whitespace-nowrap">
                  {product.categorySlug.replace("-", " ")}
                </td>
                <td className="py-3 px-4 text-teal-800 font-semibold whitespace-nowrap">
                  {formatCurrency(product.price, product.currency)}
                  {product.oldPrice && (
                    <span className="ml-1.5 text-xs text-teal-700/40 line-through">
                      {formatCurrency(product.oldPrice, product.currency)}
                    </span>
                  )}
                </td>
                <td className="py-3 px-4 text-teal-700/70">{product.stock}</td>
                <td className="py-3 px-4">
                  <div className="flex gap-1.5 flex-wrap">
                    {product.isFeatured && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-mint-light text-teal-800">
                        Featured
                      </span>
                    )}
                    {product.isNew && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-light text-teal-800">
                        New
                      </span>
                    )}
                  </div>
                </td>
                <td className="py-3 px-6">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      aria-label={`Edit ${product.name}`}
                      className="w-9 h-9 inline-flex items-center justify-center rounded-full hover:bg-mint-light text-teal-700 transition-colors"
                    >
                      <Pencil size={16} />
                    </Link>
                    <button
                      onClick={() => handleDelete(product)}
                      disabled={deletingId === product.id}
                      aria-label={`Delete ${product.name}`}
                      className="w-9 h-9 inline-flex items-center justify-center rounded-full hover:bg-peach-light text-teal-700 hover:text-peach transition-colors disabled:opacity-50"
                    >
                      {deletingId === product.id ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <Trash2 size={16} />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
