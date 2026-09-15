import { ProductService } from "@/services/productService";
import { CategoryService } from "@/services/categoryService";

export interface CategoryPageFilters {
  category?: string;
  sort?: "featured" | "price-asc" | "price-desc" | "rating";
  query?: string;
}

export async function getCategoryPageData(filters: CategoryPageFilters) {
  const categories = await CategoryService.list();

  let products = filters.query
    ? await ProductService.search(filters.query)
    : await ProductService.list();

  if (filters.category) {
    products = products.filter((p) => p.categorySlug === filters.category);
  }

  switch (filters.sort) {
    case "price-asc":
      products = [...products].sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      products = [...products].sort((a, b) => b.price - a.price);
      break;
    case "rating":
      products = [...products].sort((a, b) => b.rating - a.rating);
      break;
    default:
      break;
  }

  return { categories, products };
}
