import { ProductService } from "@/services/productService";
import { Product } from "@/types";

export class ProductValidationError extends Error {}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function validate(input: Partial<Product>) {
  if (!input.name?.trim()) throw new ProductValidationError("Product name is required.");
  if (!input.categorySlug) throw new ProductValidationError("Category is required.");
  if (input.price === undefined || input.price < 0)
    throw new ProductValidationError("Price must be a positive number.");
  if (input.oldPrice !== undefined && input.oldPrice !== null && input.oldPrice <= input.price!) {
    throw new ProductValidationError("Original price must be higher than the current price.");
  }
  if (!input.images || input.images.length === 0)
    throw new ProductValidationError("At least one product image URL is required.");
  if (input.stock === undefined || input.stock < 0)
    throw new ProductValidationError("Stock must be a positive number.");
}

export async function listProductsForAdmin(): Promise<Product[]> {
  return ProductService.list();
}

export async function getProductForAdmin(id: number): Promise<Product | null> {
  return ProductService.getById(id);
}

export async function createProductAsAdmin(input: Partial<Product>): Promise<Product> {
  validate(input);
  const slug = input.slug?.trim() || slugify(input.name!);

  return ProductService.create({
    slug,
    name: input.name!.trim(),
    categorySlug: input.categorySlug!,
    price: input.price!,
    oldPrice: input.oldPrice ?? undefined,
    currency: input.currency?.trim() || "$",
    rating: input.rating ?? 5,
    reviewCount: input.reviewCount ?? 0,
    images: input.images!,
    shortDescription: input.shortDescription?.trim() ?? "",
    description: input.description?.trim() ?? "",
    options: input.options,
    reviews: input.reviews,
    isNew: input.isNew ?? false,
    isFeatured: input.isFeatured ?? false,
    stock: input.stock!,
    shippingInfo: input.shippingInfo,
  });
}

export async function updateProductAsAdmin(id: number, input: Partial<Product>): Promise<Product> {
  validate(input);
  const slug = input.slug?.trim() || slugify(input.name!);

  return ProductService.update(id, {
    slug,
    name: input.name!.trim(),
    categorySlug: input.categorySlug!,
    price: input.price!,
    oldPrice: input.oldPrice ?? undefined,
    currency: input.currency?.trim() || "$",
    rating: input.rating ?? 5,
    reviewCount: input.reviewCount ?? 0,
    images: input.images!,
    shortDescription: input.shortDescription?.trim() ?? "",
    description: input.description?.trim() ?? "",
    options: input.options,
    reviews: input.reviews,
    isNew: input.isNew ?? false,
    isFeatured: input.isFeatured ?? false,
    stock: input.stock!,
    shippingInfo: input.shippingInfo,
  });
}

export async function deleteProductAsAdmin(id: number): Promise<void> {
  return ProductService.remove(id);
}
