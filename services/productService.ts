import { products, getProductBySlug, getFeaturedProducts, getProductsByCategory, getSaleProducts, getRelatedProducts } from "@/data/products";
import { Product as ProductModel } from "@/models/Product";
import { Product as ProductType } from "@/types";

/**
 * ProductService is the single seam between UI and data source.
 * Today it reads from static mock data; swap the function bodies here
 * for `fetch()`/DB calls later without touching components.
 */
export const ProductService = {
  async list(): Promise<ProductModel[]> {
    return products.map((p) => new ProductModel(p));
  },

  async getBySlug(slug: string): Promise<ProductModel | null> {
    const found = getProductBySlug(slug);
    return found ? new ProductModel(found) : null;
  },

  async getFeatured(): Promise<ProductModel[]> {
    return getFeaturedProducts().map((p) => new ProductModel(p));
  },

  async getByCategory(categorySlug: string): Promise<ProductModel[]> {
    return getProductsByCategory(categorySlug).map((p) => new ProductModel(p));
  },

  async getOnSale(): Promise<ProductModel[]> {
    return getSaleProducts().map((p) => new ProductModel(p));
  },

  async getRelated(product: ProductType, limit = 4): Promise<ProductModel[]> {
    return getRelatedProducts(product as any, limit).map((p) => new ProductModel(p));
  },

  async search(query: string): Promise<ProductModel[]> {
    const q = query.trim().toLowerCase();
    if (!q) return products.map((p) => new ProductModel(p));
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.categorySlug.toLowerCase().includes(q)
      )
      .map((p) => new ProductModel(p));
  },
};
