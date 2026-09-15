import { query, execute } from "@/lib/db";
import { Product, ProductOption, ProductReview } from "@/types";

/**
 * Raw row shape from the `products` table. JSON columns come back from
 * mysql2 already parsed into JS values (arrays/objects) when the column
 * type is JSON, so we only need to rename snake_case -> camelCase and
 * coerce DECIMAL strings/nulls into numbers.
 */
interface ProductRow {
  id: number;
  slug: string;
  name: string;
  category_slug: string;
  price: string | number;
  old_price: string | number | null;
  currency: string;
  rating: string | number;
  review_count: number;
  images: string[] | string;
  short_description: string;
  description: string;
  options: ProductOption[] | string | null;
  reviews: ProductReview[] | string | null;
  is_new: number;
  is_featured: number;
  stock: number;
  shipping_info: string | null;
}

/** mysql2 parses JSON columns automatically in most setups, but some
 *  configurations (or older MySQL/MariaDB versions) return the raw
 *  string instead — this handles both without the callers needing to
 *  care which one they got. */
function parseJsonColumn<T>(value: T | string | null): T | undefined {
  if (value === null || value === undefined) return undefined;
  if (typeof value === "string") {
    try {
      return JSON.parse(value) as T;
    } catch {
      return undefined;
    }
  }
  return value;
}

function mapRow(row: ProductRow): Product {
  return {
    id: String(row.id),
    slug: row.slug,
    name: row.name,
    categorySlug: row.category_slug as Product["categorySlug"],
    price: Number(row.price),
    oldPrice: row.old_price === null ? undefined : Number(row.old_price),
    currency: row.currency,
    rating: Number(row.rating),
    reviewCount: row.review_count,
    images: parseJsonColumn<string[]>(row.images) ?? [],
    shortDescription: row.short_description,
    description: row.description,
    options: parseJsonColumn<ProductOption[]>(row.options),
    reviews: parseJsonColumn<ProductReview[]>(row.reviews),
    isNew: !!row.is_new,
    isFeatured: !!row.is_featured,
    stock: row.stock,
    shippingInfo: row.shipping_info ?? undefined,
  };
}

/**
 * ProductService is the single seam between UI and data source — every
 * page/component reads products through here, never by querying MySQL
 * directly. Always returns plain data (matching the Product type), never
 * class instances: plain objects are the only thing guaranteed to survive
 * being passed from a Server Component into a "use client" component.
 * Derived/computed values (discount %, formatted price, etc.) live in
 * lib/product-helpers.ts as plain functions instead of model getters.
 */
export const ProductService = {
  async list(): Promise<Product[]> {
    const rows = await query<ProductRow>("SELECT * FROM products ORDER BY created_at DESC");
    return rows.map(mapRow);
  },

  async getBySlug(slug: string): Promise<Product | null> {
    const rows = await query<ProductRow>("SELECT * FROM products WHERE slug = ? LIMIT 1", [slug]);
    return rows[0] ? mapRow(rows[0]) : null;
  },

  async getById(id: number): Promise<Product | null> {
    const rows = await query<ProductRow>("SELECT * FROM products WHERE id = ? LIMIT 1", [id]);
    return rows[0] ? mapRow(rows[0]) : null;
  },

  async getFeatured(): Promise<Product[]> {
    const rows = await query<ProductRow>(
      "SELECT * FROM products WHERE is_featured = 1 ORDER BY created_at DESC"
    );
    return rows.map(mapRow);
  },

  async getByCategory(categorySlug: string): Promise<Product[]> {
    const rows = await query<ProductRow>(
      "SELECT * FROM products WHERE category_slug = ? ORDER BY created_at DESC",
      [categorySlug]
    );
    return rows.map(mapRow);
  },

  async getOnSale(): Promise<Product[]> {
    const rows = await query<ProductRow>(
      "SELECT * FROM products WHERE old_price IS NOT NULL AND old_price > price ORDER BY created_at DESC"
    );
    return rows.map(mapRow);
  },

  async getRelated(product: Product, limit = 4): Promise<Product[]> {
    const rows = await query<ProductRow>(
      "SELECT * FROM products WHERE category_slug = ? AND id != ? ORDER BY created_at DESC LIMIT ?",
      [product.categorySlug, Number(product.id), limit]
    );
    return rows.map(mapRow);
  },

  async search(searchTerm: string): Promise<Product[]> {
    const q = searchTerm.trim();
    if (!q) return this.list();
    const like = `%${q}%`;
    const rows = await query<ProductRow>(
      "SELECT * FROM products WHERE name LIKE ? OR short_description LIKE ? OR category_slug LIKE ? ORDER BY created_at DESC",
      [like, like, like]
    );
    return rows.map(mapRow);
  },

  // --- Admin-only mutations ---

  async create(input: Omit<Product, "id">): Promise<Product> {
    const result = await execute(
      `INSERT INTO products
        (slug, name, category_slug, price, old_price, currency, rating, review_count, images, short_description, description, options, reviews, is_new, is_featured, stock, shipping_info)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        input.slug,
        input.name,
        input.categorySlug,
        input.price,
        input.oldPrice ?? null,
        input.currency,
        input.rating,
        input.reviewCount,
        JSON.stringify(input.images),
        input.shortDescription,
        input.description,
        input.options ? JSON.stringify(input.options) : null,
        input.reviews ? JSON.stringify(input.reviews) : null,
        input.isNew ? 1 : 0,
        input.isFeatured ? 1 : 0,
        input.stock,
        input.shippingInfo ?? null,
      ]
    );
    const created = await this.getById(result.insertId);
    if (!created) throw new Error("Failed to load newly created product.");
    return created;
  },

  async update(id: number, input: Omit<Product, "id">): Promise<Product> {
    await execute(
      `UPDATE products SET
        slug = ?, name = ?, category_slug = ?, price = ?, old_price = ?, currency = ?,
        rating = ?, review_count = ?, images = ?, short_description = ?, description = ?,
        options = ?, reviews = ?, is_new = ?, is_featured = ?, stock = ?, shipping_info = ?
       WHERE id = ?`,
      [
        input.slug,
        input.name,
        input.categorySlug,
        input.price,
        input.oldPrice ?? null,
        input.currency,
        input.rating,
        input.reviewCount,
        JSON.stringify(input.images),
        input.shortDescription,
        input.description,
        input.options ? JSON.stringify(input.options) : null,
        input.reviews ? JSON.stringify(input.reviews) : null,
        input.isNew ? 1 : 0,
        input.isFeatured ? 1 : 0,
        input.stock,
        input.shippingInfo ?? null,
        id,
      ]
    );
    const updated = await this.getById(id);
    if (!updated) throw new Error("Product not found after update.");
    return updated;
  },

  async remove(id: number): Promise<void> {
    await execute("DELETE FROM products WHERE id = ?", [id]);
  },
};
