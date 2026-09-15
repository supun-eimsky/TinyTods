"use client";

import Image from "next/image";
import { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save, Upload, X } from "lucide-react";
import { Category, Product, ProductOption } from "@/types";

interface ProductFormProps {
  categories: Category[];
  /** Present when editing an existing product; omitted when creating. */
  product?: Product;
}

interface FormState {
  name: string;
  slug: string;
  categorySlug: string;
  price: string;
  oldPrice: string;
  currency: string;
  images: string;
  shortDescription: string;
  description: string;
  optionsText: string;
  isNew: boolean;
  isFeatured: boolean;
  stock: string;
  shippingInfo: string;
}

function optionsToText(options?: ProductOption[]): string {
  if (!options || options.length === 0) return "";
  return options.map((o) => `${o.label}: ${o.values.join(", ")}`).join("\n");
}

/** Parses lines like "Size: 0-3M, 3-6M, 6-12M" into ProductOption[].
 *  Blank lines and lines without a colon are ignored, so a half-finished
 *  line while typing doesn't break the rest of the form. */
function textToOptions(text: string): ProductOption[] | undefined {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  if (lines.length === 0) return undefined;

  const options: ProductOption[] = [];
  for (const line of lines) {
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;
    const label = line.slice(0, colonIndex).trim();
    const values = line
      .slice(colonIndex + 1)
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);
    if (label && values.length > 0) options.push({ label, values });
  }
  return options.length > 0 ? options : undefined;
}

function initialStateFor(product?: Product, categories?: Category[]): FormState {
  return {
    name: product?.name ?? "",
    slug: product?.slug ?? "",
    categorySlug: product?.categorySlug ?? categories?.[0]?.slug ?? "",
    price: product?.price !== undefined ? String(product.price) : "",
    oldPrice: product?.oldPrice !== undefined ? String(product.oldPrice) : "",
    currency: product?.currency ?? "$",
    images: product?.images?.join("\n") ?? "",
    shortDescription: product?.shortDescription ?? "",
    description: product?.description ?? "",
    optionsText: optionsToText(product?.options),
    isNew: product?.isNew ?? false,
    isFeatured: product?.isFeatured ?? false,
    stock: product?.stock !== undefined ? String(product.stock) : "0",
    shippingInfo: product?.shippingInfo ?? "Ships in 1-2 business days.",
  };
}

const inputClass =
  "w-full rounded-2xl bg-cream px-4 py-3 text-sm text-teal-800 outline-none border-2 border-transparent focus-visible:border-sky";

export function ProductForm({ categories, product }: ProductFormProps) {
  const router = useRouter();
  const isEditing = !!product;
  const [form, setForm] = useState<FormState>(initialStateFor(product, categories));
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleImageUpload(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setError(null);
    const uploadData = new FormData();
    Array.from(files).forEach((file) => uploadData.append("images", file));

    try {
      const response = await fetch("/api/admin/uploads/images", {
        method: "POST",
        body: uploadData,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error ?? "Failed to upload images.");

      const currentImages = form.images
        .split("\n")
        .map((image) => image.trim())
        .filter(Boolean);
      set("images", [...currentImages, ...data.paths].join("\n"));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload images.");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  function removeImage(imageToRemove: string) {
    const images = form.images
      .split("\n")
      .map((image) => image.trim())
      .filter((image) => image && image !== imageToRemove);
    set("images", images.join("\n"));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (uploading) return;
    setSubmitting(true);
    setError(null);

    const payload = {
      name: form.name,
      slug: form.slug || undefined,
      categorySlug: form.categorySlug,
      price: Number(form.price),
      oldPrice: form.oldPrice ? Number(form.oldPrice) : undefined,
      currency: form.currency || "$",
      rating: product?.rating ?? 5,
      reviewCount: product?.reviewCount ?? 0,
      images: form.images
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
      shortDescription: form.shortDescription,
      description: form.description,
      options: textToOptions(form.optionsText),
      isNew: form.isNew,
      isFeatured: form.isFeatured,
      stock: Number(form.stock),
      shippingInfo: form.shippingInfo || undefined,
    };

    try {
      const url = isEditing ? `/api/admin/products/${product!.id}` : "/api/admin/products";
      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error ?? "Failed to save product.");

      router.push("/admin/products");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save product.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-4xl shadow-card p-6 sm:p-8 space-y-5">
        <h2 className="font-display text-lg text-teal-800">Basic Details</h2>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-teal-800 mb-1.5">
              Product Name
            </label>
            <input
              id="name"
              required
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              className={inputClass}
              placeholder="Soft Cotton Baby Romper"
            />
          </div>
          <div>
            <label htmlFor="slug" className="block text-sm font-semibold text-teal-800 mb-1.5">
              URL Slug
            </label>
            <input
              id="slug"
              value={form.slug}
              onChange={(e) => set("slug", e.target.value)}
              className={inputClass}
              placeholder="Auto-generated from name if left blank"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="categorySlug" className="block text-sm font-semibold text-teal-800 mb-1.5">
              Category
            </label>
            <select
              id="categorySlug"
              required
              value={form.categorySlug}
              onChange={(e) => set("categorySlug", e.target.value)}
              className={inputClass}
            >
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="stock" className="block text-sm font-semibold text-teal-800 mb-1.5">
              Stock
            </label>
            <input
              id="stock"
              type="number"
              min={0}
              required
              value={form.stock}
              onChange={(e) => set("stock", e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="shortDescription" className="block text-sm font-semibold text-teal-800 mb-1.5">
            Short Description
          </label>
          <input
            id="shortDescription"
            required
            value={form.shortDescription}
            onChange={(e) => set("shortDescription", e.target.value)}
            className={inputClass}
            placeholder="One line shown on product cards"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-semibold text-teal-800 mb-1.5">
            Full Description
          </label>
          <textarea
            id="description"
            required
            rows={4}
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            className={`${inputClass} resize-none`}
          />
        </div>
      </div>

      <div className="bg-white rounded-4xl shadow-card p-6 sm:p-8 space-y-5">
        <h2 className="font-display text-lg text-teal-800">Pricing</h2>
        <div className="grid sm:grid-cols-3 gap-5">
          <div>
            <label htmlFor="price" className="block text-sm font-semibold text-teal-800 mb-1.5">
              Price
            </label>
            <input
              id="price"
              type="number"
              step="0.01"
              min={0}
              required
              value={form.price}
              onChange={(e) => set("price", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="oldPrice" className="block text-sm font-semibold text-teal-800 mb-1.5">
              Original Price (optional)
            </label>
            <input
              id="oldPrice"
              type="number"
              step="0.01"
              min={0}
              value={form.oldPrice}
              onChange={(e) => set("oldPrice", e.target.value)}
              className={inputClass}
              placeholder="Leave blank if not on sale"
            />
          </div>
          <div>
            <label htmlFor="currency" className="block text-sm font-semibold text-teal-800 mb-1.5">
              Currency Symbol
            </label>
            <input
              id="currency"
              required
              value={form.currency}
              onChange={(e) => set("currency", e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-4xl shadow-card p-6 sm:p-8 space-y-5">
        <h2 className="font-display text-lg text-teal-800">Images & Options</h2>
        <div>
          <label htmlFor="images" className="block text-sm font-semibold text-teal-800 mb-1.5">
            Product Images
          </label>
          <label
            htmlFor="images"
            className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-teal-700/20 bg-cream px-4 py-6 text-sm font-semibold text-teal-700 transition-colors hover:border-sky hover:bg-sky-light/30"
          >
            {uploading ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
            {uploading ? "Uploading images..." : "Choose one or more images"}
          </label>
          <input
            id="images"
            type="file"
            accept="image/jpeg,image/png,image/gif,image/webp,image/avif"
            multiple
            onChange={handleImageUpload}
            disabled={uploading || submitting}
            className="sr-only"
          />
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {form.images
              .split("\n")
              .map((image) => image.trim())
              .filter(Boolean)
              .map((image) => (
                <div key={image} className="group relative aspect-square overflow-hidden rounded-2xl bg-mint-light/50">
                  <Image src={image} alt="Product image" fill sizes="(max-width: 640px) 50vw, 160px" className="object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(image)}
                    aria-label="Remove image"
                    className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-teal-700 shadow-card transition-transform hover:scale-105"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
          </div>
          <p className="mt-1.5 text-xs text-teal-700/50">JPEG, PNG, GIF, WebP, or AVIF. Maximum 10 MB per image.</p>
        </div>
        <div>
          <label htmlFor="optionsText" className="block text-sm font-semibold text-teal-800 mb-1.5">
            Variant Options (optional)
          </label>
          <textarea
            id="optionsText"
            rows={2}
            value={form.optionsText}
            onChange={(e) => set("optionsText", e.target.value)}
            className={`${inputClass} resize-none`}
            placeholder={"Size: 0-3M, 3-6M, 6-12M\nColor: Sage, Cream, Sky Blue"}
          />
          <p className="mt-1.5 text-xs text-teal-700/50">
            {'One option per line, formatted as "Label: value1, value2, value3".'}
          </p>
        </div>
        <div>
          <label htmlFor="shippingInfo" className="block text-sm font-semibold text-teal-800 mb-1.5">
            Shipping Info
          </label>
          <input
            id="shippingInfo"
            value={form.shippingInfo}
            onChange={(e) => set("shippingInfo", e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div className="bg-white rounded-4xl shadow-card p-6 sm:p-8">
        <h2 className="font-display text-lg text-teal-800 mb-4">Visibility</h2>
        <div className="flex flex-wrap gap-6">
          <label className="flex items-center gap-2.5 text-sm font-semibold text-teal-800 cursor-pointer">
            <input
              type="checkbox"
              checked={form.isFeatured}
              onChange={(e) => set("isFeatured", e.target.checked)}
              className="w-4 h-4 accent-teal-700"
            />
            Show in Featured Products
          </label>
          <label className="flex items-center gap-2.5 text-sm font-semibold text-teal-800 cursor-pointer">
            <input
              type="checkbox"
              checked={form.isNew}
              onChange={(e) => set("isNew", e.target.checked)}
              className="w-4 h-4 accent-teal-700"
            />
            Mark as New
          </label>
        </div>
      </div>

      {error && (
        <p className="text-sm text-peach font-semibold bg-white rounded-2xl px-4 py-3 shadow-card">{error}</p>
      )}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 rounded-full bg-teal-700 hover:bg-teal-800 text-cream font-semibold px-7 py-3.5 transition-colors shadow-soft disabled:opacity-60"
        >
          {submitting ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          {submitting ? "Saving..." : isEditing ? "Save Changes" : "Create Product"}
        </button>
      </div>
    </form>
  );
}
