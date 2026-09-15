import { query, execute } from "@/lib/db";
import { Category } from "@/types";

interface CategoryRow {
  id: number;
  slug: string;
  name: string;
  description: string;
  image: string;
  accent: string;
  product_count?: number;
}

function mapRow(row: CategoryRow): Category {
  return {
    id: String(row.id),
    slug: row.slug as Category["slug"],
    name: row.name,
    description: row.description,
    image: row.image,
    accent: row.accent as Category["accent"],
    productCount: row.product_count ?? 0,
  };
}

// Categories carry a live product count computed via a subquery, so the
// storefront (and admin category list, if that's ever added) never shows
// a stale count after products are added/removed/moved.
const SELECT_WITH_COUNT = `
  SELECT c.*, (SELECT COUNT(*) FROM products p WHERE p.category_slug = c.slug) AS product_count
  FROM categories c
`;

export const CategoryService = {
  async list(): Promise<Category[]> {
    const rows = await query<CategoryRow>(`${SELECT_WITH_COUNT} ORDER BY c.name ASC`);
    return rows.map(mapRow);
  },

  async getBySlug(slug: string): Promise<Category | null> {
    const rows = await query<CategoryRow>(`${SELECT_WITH_COUNT} WHERE c.slug = ? LIMIT 1`, [slug]);
    return rows[0] ? mapRow(rows[0]) : null;
  },

  // --- Admin-only mutations ---

  async create(input: Omit<Category, "id" | "productCount">): Promise<Category> {
    const result = await execute(
      "INSERT INTO categories (slug, name, description, image, accent) VALUES (?, ?, ?, ?, ?)",
      [input.slug, input.name, input.description, input.image, input.accent]
    );
    const rows = await query<CategoryRow>(`${SELECT_WITH_COUNT} WHERE c.id = ? LIMIT 1`, [
      result.insertId,
    ]);
    return mapRow(rows[0]);
  },
};
